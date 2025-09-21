"use client";

import { useRole as useRoleContext } from "@/context/RoleContext";

export function useRole() {
  return useRoleContext();
}