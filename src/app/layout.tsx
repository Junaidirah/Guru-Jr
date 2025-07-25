import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "GuruJR - Jasa Raharja",
  description: "Guru-JR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
