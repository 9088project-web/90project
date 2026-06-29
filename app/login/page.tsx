import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-page max-w-lg">
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-black uppercase text-wine">Member Login</p>
          <h1 className="text-4xl font-black text-ink">会员登录</h1>
        </div>
        <AuthForm mode="login" />
        <p className="mt-5 text-center text-sm text-ink/65">
          还没有账号？ <Link href="/register" className="font-black text-wine underline underline-offset-4">注册会员</Link>
        </p>
      </div>
    </section>
  );
}

