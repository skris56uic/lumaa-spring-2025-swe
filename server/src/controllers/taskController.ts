import { Request, Response } from "express";
import db from "../models";
import { UserInstance } from "../models/user";
import { TaskInstance } from "../models/task";

interface AuthRequest extends Request {
  user?: UserInstance;
}

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const tasks: TaskInstance[] = await db.Task.findAll({
      where: { userId: req.user!.id },
    });
    res.send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const task: TaskInstance = await db.Task.create({
      ...req.body,
      userId: req.user!.id,
    });
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const task: TaskInstance | null = await db.Task.findByPk(req.params.id);

    if (!task || task.userId !== req.user!.id) {
      res.status(404).send({ error: "Task not found" });
      return;
    }

    await task.update(req.body);
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const task: TaskInstance | null = await db.Task.findByPk(req.params.id);

    if (!task || task.userId !== req.user!.id) {
      res.status(404).send({ error: "Task not found" });
      return;
    }

    await task.destroy();
    res.send({ message: "Task deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};
