import bcrypt from "bcryptjs";
import UsuarioData from "../data/UsuarioData";
import { SignupInput, LoginInput, AuthResponse } from "../dto/AuthDto";
import { AuthUtils } from "../utils/AuthUtils";

export class AuthBusiness {
  userData = UsuarioData;

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
        email: user.email
      });

      return {
        token,
        user: {
          id: user.id,
          name: user.nome,
          email: user.email
        }
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
