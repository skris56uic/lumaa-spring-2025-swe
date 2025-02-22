import { Request, Response } from "express";
import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).send({ error: "Invalid login credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
