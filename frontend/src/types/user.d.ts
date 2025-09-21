export type UserRole = "admin" | "issuer" | "verifier" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}