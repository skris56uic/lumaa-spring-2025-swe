import { Request, Response } from "express";
import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: "Username and password are required" });
    return;
  }

  try {
    const existingUser = await db.User.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).send({ error: "Username already exists" });
      return;
    }

    const user = await db.User.create(req.body);
    const userPlain: { password?: string } = user.get({ plain: true });
    delete userPlain.password;
    res.status(201).send(userPlain);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: "Username and password are required" });
  }
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).send({ error: "Invalid login credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    const userPlain: { password?: string } = user.get({ plain: true });
    delete userPlain.password;
    res.send({ user: userPlain, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
