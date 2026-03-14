import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PayZen — Calm Finances for Shared Plans",
  description:
    "A polished shared-expense workspace with wallet funding and Stripe payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#0a0e1a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
