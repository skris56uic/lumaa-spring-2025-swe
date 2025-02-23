import { Request, Response } from "express";
import db from "../models";
import { UserInstance } from "../models/user";
import { TaskAttributes, TaskInstance } from "../models/task";

interface AuthRequest extends Request {
  user?: UserInstance;
}

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.params.userId as string;
  if (!userId) {
    res.status(400).send({ error: "User ID is required" });
    return;
  }
  try {
    const tasks: TaskInstance[] = await db.Task.findAll({
      where: { userId },
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
  const { title, description, isComplete, userId } = req.body as TaskAttributes;

  if (!title || !userId) {
    res.status(400).send({ error: "Title and userId is required" });
    return;
  }

  try {
    const task: TaskInstance = await db.Task.create({
      userId,
      title: title,
      description: !!description ? description : "",
      isComplete: isComplete === undefined ? false : isComplete,
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
  const id = req.params.id;

  const { title, description, isComplete, userId } = req.body as TaskAttributes;

  if (!id || !userId) {
    res.status(400).send({ error: "All fields are required" });
    return;
  }

  try {
    const task: TaskInstance | null = await db.Task.findByPk(req.params.id);

    if (!task || task.userId !== userId) {
      res.status(404).send({ error: "Task not found" });
      return;
    }

    await task.update({
      description: !!description ? description : task.description,
      id: +id,
      title: !!title ? title : task.title,
      isComplete: isComplete === undefined ? task.isComplete : isComplete,
      userId: userId,
    });
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  const { userId } = req.body as TaskAttributes;

  if (!id) {
    res.status(400).send({ error: "Task ID is required" });
    return;
  }
  try {
    const task: TaskInstance | null = await db.Task.findByPk(req.params.id);

    if (!task || task.userId !== userId) {
      res.status(404).send({ error: "Task not found" });
      return;
    }

    await task.destroy();
    res.send({ message: "Task deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};
