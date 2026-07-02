export async function requireAuth() {
  return { user: { id: "local-member", email: "member@test.local" }, profile: { full_name: "测试会员", role: "member" } };
}
export async function requireAdmin() {
  return { user: { id: "local-admin", email: "admin@90project.local" }, profile: { full_name: "Local Admin", role: "admin" } };
}
