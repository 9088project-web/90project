import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-page max-w-lg">
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-black uppercase text-wine">Register</p>
          <h1 className="text-4xl font-black text-ink">注册会员</h1>
        </div>
        <AuthForm mode="register" />
        <p className="mt-5 text-center text-sm text-ink/65">
          已有账号？ <Link href="/login" className="font-black text-wine underline underline-offset-4">登录</Link>
        </p>
      </div>
    </section>
  );
}

