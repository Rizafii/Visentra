"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Beranda", href: "" },
  { label: "Tentang", href: "" },
  { label: "Program", href: "" },
  { label: "Kontak", href: "" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
          isScrolled ? "lg:px-42 px-6 pt-6 lg:pt-4" : "px-0 pt-0"
        }`}
      >
        <div
          className={`container mx-auto flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? "bg-white shadow-lg rounded-full lg:py-2 py-4 px-6 lg:px-8"
              : "lg:px-24 px-6 py-4 "
          }`}
        >
          <Link href="" className="brand">
            <Image
              src="/logo/logo.svg"
              alt="Brand Logo"
              className="lg:w-42 w-32"
              width={500}
              height={500}
            />
          </Link>
          <div className="nav-link hidden items-center gap-6 lg:flex">
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
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-primary"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={3} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <Link href="" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/logo/logo.svg"
                alt="Brand Logo"
                className="lg:w-42 w-32"
                width={500}
                height={500}
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-primary"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-bold text-gray-800 hover:text-primary transition-all duration-300 transform ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${index * 50 + 100}ms`
                    : "0ms",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="p-8 border-t">
            <Link href="/workspace" onClick={() => setIsMobileMenuOpen(false)}>
              <Button size="lg" className="w-full" asChild>
                <span className="flex items-center justify-center gap-2 text-lg">
                  Mulai Sekarang <ArrowRight size={20} strokeWidth={2} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
