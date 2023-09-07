import Navbar from "@/components/layout/navigation";
import LoginModal from "@/components/modules/modals/authModals/loginModal";
import RegisterModal from "@/components/modules/modals/authModals/registerModal";
import AuthProvider from "@/providers/AuthProvider";
import NotificationProvider from "@/providers/NotificationProvider";
import { StateProvider } from "@/providers/StateProvider";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import React from "react";
import "./globals.css";
import Search from "@/components/modules/modals/searchModal";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gather-in",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: "tr" | "en";
  };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <StateProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>
              <div className="flex flex-col md:flex-row">
                <Search />
                <NotificationProvider />
                <LoginModal />
                <RegisterModal />
                <Navbar />
                {children}
              </div>
            </AuthProvider>
          </NextIntlClientProvider>
        </StateProvider>
      </body>
    </html>
  );
}
