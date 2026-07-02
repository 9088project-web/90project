"use client";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  return (
    <form className="grid gap-4 rounded-card border border-ink/10 bg-warm p-6 shadow-soft">
      {mode === "register" ? (
        <>
          <label className="form-field"><span className="form-label">姓名</span><input className="form-input" defaultValue="测试会员" /></label>
          <label className="form-field"><span className="form-label">电话</span><input className="form-input" defaultValue="011-1097 7166" /></label>
        </>
      ) : null}
      <label className="form-field"><span className="form-label">Email</span><input className="form-input" type="email" defaultValue={mode === "login" ? "member@test.local" : ""} /></label>
      <label className="form-field"><span className="form-label">密码</span><input className="form-input" type="password" defaultValue={mode === "login" ? "member123456" : ""} /></label>
      <p className="rounded-card bg-cream px-3 py-2 text-sm font-bold text-wine">离线预览：完整本地登录会接入 Prisma SQLite。</p>
      <a href="/member/dashboard" className="rounded-card bg-blackgold px-5 py-3 text-center font-black text-goldLight">进入本地会员区</a>
    </form>
  );
}
