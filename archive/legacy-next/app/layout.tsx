import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000"),
  title: "九零食刻 90 PROJECT | 餐饮包伙食、活动餐饮与场地布置",
  description: "九零食刻 90 PROJECT 提供包伙食、活动餐饮、场地布置、鸡尾酒与 Mocktail 服务。会员可提交询问并查看报价状态。",
  keywords: ["九零食刻", "90 PROJECT", "包伙食", "活动餐饮", "Catering", "场地布置", "Mocktail"],
  openGraph: {
    title: "九零食刻 90 PROJECT | 一站式餐饮与活动服务",
    description: "为公司活动、生日派对、婚礼、开张仪式与私人聚会，提供餐饮与现场布置服务。",
    images: ["/images/hero.jpg"],
    locale: "zh_MY",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hans">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

