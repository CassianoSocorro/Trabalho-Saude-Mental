import { Request, Response, NextFunction } from "express";

export class AuthorizationMiddleware {
  static authorizeOwner(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticatedUserId = req.user?.userId;
      const targetUserId = Number(req.params.id);
      const userRole = req.user?.role;
      if (!authenticatedUserId) {
        return res.status(401).send({ error: "Usuário não autenticado" });
      }
      if (authenticatedUserId !== targetUserId && userRole !== "admin") {
        return res
          .status(403)
          .send({
            error:
              "Você só pode visualizar, editar ou deletar sua própria conta",
          });
      }
      next();
    } catch (error: any) {
      return res.status(500).send({ error: error.message });
    }
  }
}
