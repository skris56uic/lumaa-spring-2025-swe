import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/user";
import jwt from "jsonwebtoken";
import db from "../models";

export interface AuthRequest extends Request {
  user?: UserInstance;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send({ error: "Please authenticate." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
    const user = await db.User.findByPk(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default authMiddleware;
