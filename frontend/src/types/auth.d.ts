import { Role } from "./user";

export interface LoginPayload {
  email: string;
  password: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  role: Role;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface ForgotPasswordPayload {
  email: string;
}
