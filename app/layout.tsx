import type React from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";
// import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AI UMKM Autopilot - Strategi Marketing Otomatis",
  description:
    "Dashboard AI untuk UMKM Indonesia yang menghasilkan strategi marketing otomatis dari satu foto produk menggunakan Gemini AI",
  generator: "TSPJT",
  icons: {
    icon: [
      {
        url: "/logo/primary.svg",
      },
      {
        url: "/logo/primary.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo/primary.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} ${poppins.className} font-sans antialiased`}
      >
        <LenisProvider>
          {children}
          <Toaster richColors position="top-center" />
          {/* <Analytics /> */}
        </LenisProvider>
      </body>
    </html>
  );
}
