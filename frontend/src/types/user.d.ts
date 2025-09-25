export type UserRole =  "issuer" | "verifier" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}