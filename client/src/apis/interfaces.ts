export interface RegisterCredentials {
  username: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  updatedAt: string;
  createdAt: string;
}

export interface LoginResponse {
  user: {
    id: number;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

export interface TaskResponse {
  id?: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
}

export interface TaskAttributes {
  id?: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
}
