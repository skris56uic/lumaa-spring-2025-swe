import {
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  TaskAttributes,
  TaskResponse,
} from "./interfaces";

const API_URL = "http://localhost:3000";

export const register = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registration failed");
  }
  return response.json();
};

export const login = async (
  credentials: RegisterCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }
  return response.json();
};

export const getTasks = async (
  userId: string,
  token: string
): Promise<TaskResponse[]> => {
  const response = await fetch(`${API_URL}/tasks/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch tasks");
  }

  return response.json();
};

export const updateTask = async (
  task: TaskAttributes,
  token: string
): Promise<TaskResponse> => {
  const response = await fetch(`${API_URL}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update task");
  }

  return response.json();
};

export const deleteTask = async (
  id: number,
  user_id: number,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: user_id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete task");
  }
};

export const createTask = async (
  task: TaskResponse,
  userId: number,
  token: string
): Promise<TaskResponse> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...task, userId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create task");
  }

  return response.json();
};
