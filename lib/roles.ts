export type Role = "guest" | "member" | "admin";
export function isAdminRole(role?: string | null) { return role === "admin"; }
