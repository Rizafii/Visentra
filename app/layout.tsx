import type React from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";
// import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI UMKM Autopilot - Strategi Marketing Otomatis",
  description:
    "Dashboard AI untuk UMKM Indonesia yang menghasilkan strategi marketing otomatis dari satu foto produk menggunakan Gemini AI",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-center" />
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
