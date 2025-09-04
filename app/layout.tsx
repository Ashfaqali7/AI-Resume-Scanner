import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import NextAuthSessionProvider from "@/components/session-provider";
import AuthHeader from "@/components/auth-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume Scanner",
  description: "AI-powered resume analysis and job matching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <AuthHeader />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}