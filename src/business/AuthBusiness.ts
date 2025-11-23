// src/business/AuthBusiness.ts

import bcrypt from "bcryptjs";
import UsuarioData from "../data/UsuarioData";
import FuncionarioData from "../data/FuncionarioData"; // Importando Funcionários
import { SignupInput, LoginInput, AuthResponse } from "../dto/AuthDto";
import { AuthUtils } from "../utils/AuthUtils";

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10; 

export class AuthBusiness {
  userData = UsuarioData;
  funcionarioData = FuncionarioData; // Instância do Data de Funcionários

  // -------------------------------------------------------------------
  // MÉTODO PRIVADO: BUSCA UNIFICADA (A Mágica Acontece Aqui)
  // -------------------------------------------------------------------
  // Tenta achar o usuário em 'usuarios' ou 'funcionarios' e retorna um objeto padronizado
  private async findUserForLogin(email: string) {
    
    // 1. Tenta buscar na tabela de Pacientes/Usuários
    const user = await this.userData.findByEmail(email);
    if (user) {
        return user; // Usuários já têm 'role' no banco
    }

    // 2. Se não achou, tenta buscar na tabela de Funcionários
    const funcionario = await this.funcionarioData.findByEmail(email);
    if (funcionario) {
        // TRUQUE: Como funcionário pode não ter coluna 'role' no banco,
        // nós injetamos 'user' aqui para que o Token funcione.
        return { 
            ...funcionario, 
            role: 'user' // Define que funcionários são usuários comuns
        }; 
    }

    // 3. Não achou em lugar nenhum
    return undefined;
  }

  // -------------------------------------------------------------------
  // LÓGICA DE CADASTRO (Mantida igual)
  // -------------------------------------------------------------------
  private async processSignup(input: SignupInput, role: "user" | "admin"): Promise<AuthResponse> {
    try {
      if (!input.nome || !input.email || !input.password) {
        throw new Error("Nome, e-mail e senha são obrigatórios para o cadastro.");
      }

      const existingUser = await this.userData.findByEmail(input.email);
      if (existingUser) {
        throw new Error("Este e-mail já está cadastrado.");
      }

      const senhaHash = await bcrypt.hash(input.password, SALT_ROUNDS);

      const newUser = await this.userData.create({
        nome: input.nome,
        email: input.email,
        telefone: input.telefone || "",
        senha: senhaHash,
        role: role,
      });

      const token = AuthUtils.generateToken({
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      return {
        token,
        user: {
          id: newUser.id,
          name: newUser.nome,
          email: newUser.email,
          role: newUser.role,
        },
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
    
  public async signup(input: SignupInput): Promise<AuthResponse> {
    return this.processSignup(input, "user"); 
  }
    
  public async signupUser(input: SignupInput): Promise<AuthResponse> {
    return this.processSignup(input, "user"); 
  }

  public async signupAdmin(input: SignupInput): Promise<AuthResponse> {
    return this.processSignup(input, "admin"); 
  }

  // -------------------------------------------------------------------
  // MÉTODO LOGIN (Unificado e Seguro)
  // -------------------------------------------------------------------
  async login(input: LoginInput): Promise<AuthResponse> {
    try {
      if (!input.email || !input.password) {
        throw new Error("Email e senha são obrigatórios");
      }

      // 1. Usa a busca unificada para achar quem está logando
      // O TypeScript pode reclamar aqui se as interfaces não baterem, 
      // mas o 'as any' garante que o código rode se os campos essenciais (id, email, senha, role) existirem.
      const user: any = await this.findUserForLogin(input.email);

      if (!user) {
        throw new Error("Credenciais inválidas");
      }

      // 2. Compara a senha (funciona para User e Funcionario, pois ambos têm 'senha')
      const passwordMatch = await bcrypt.compare(input.password, user.senha);
      if (!passwordMatch) {
        throw new Error("Credenciais inválidas");
      }

      // 3. Gera o token (Agora 'user' garantidamente tem uma 'role')
      const token = AuthUtils.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role, // Vem do banco (Usuário) ou injetado (Funcionário)
      });

      return {
        token,
        user: {
          id: user.id,
          name: user.nome,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}