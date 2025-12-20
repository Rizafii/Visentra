"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Beranda", href: "" },
  { label: "Tentang", href: "" },
  { label: "Program", href: "" },
  { label: "Kontak", href: "" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        isScrolled ? "px-42 pt-4" : "px-0 pt-0"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg rounded-full py-2 px-8"
            : "px-24 py-4 "
        }`}
      >
        <Link href="" className="brand">
          <Image
            src="/logo/logo.svg"
            alt="Brand Logo"
            className="w-42"
            width={500}
            height={500}
          />
        </Link>
        <div className="nav-link flex items-center gap-6">
          <div className="menu flex items-center gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/workspace">
            <Button size="lg" asChild>
              <span className="flex items-center gap-2">
                Mulai Sekarang <ArrowRight size={18} strokeWidth={2} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
