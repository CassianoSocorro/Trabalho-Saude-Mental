import bcrypt from "bcryptjs";
import UsuarioData from "../data/UsuarioData";
import { SignupInput, LoginInput, AuthResponse } from "../dto/AuthDto";
import { AuthUtils } from "../utils/AuthUtils";

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

export class AuthBusiness {
  userData = UsuarioData;

  async signup(input: SignupInput): Promise<AuthResponse> {
    try {
      if (!input.nome || !input.email || !input.password) {
        throw new Error(
          "Nome, e-mail e senha são obrigatórios para o cadastro."
        );
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
      });

      const token = AuthUtils.generateToken({
        userId: newUser.id,
        email: newUser.email,
      });

      return {
        token,
        user: {
          id: newUser.id,
          name: newUser.nome,
          email: newUser.email,
        },
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    try {
      if (!input.email || !input.password) {
        throw new Error("Email e senha são obrigatórios");
      }

      const user = await this.userData.findByEmail(input.email);
      if (!user) {
        throw new Error("Credenciais inválidas");
      }

      const passwordMatch = await bcrypt.compare(input.password, user.senha);
      if (!passwordMatch) {
        throw new Error("Credenciais inválidas");
      }

      const token = AuthUtils.generateToken({
        userId: user.id,
        email: user.email,
      });

      return {
        token,
        user: {
          id: user.id,
          name: user.nome,
          email: user.email,
        },
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
