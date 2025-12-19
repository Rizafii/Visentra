import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const menuItems = [
  { label: "Beranda", href: "" },
  { label: "Tentang", href: "" },
  { label: "Program", href: "" },
  { label: "Kontak", href: "" },
];

export default function Navbar() {
  return (
    <nav className="w-full  fixed">
      <div className="container mx-auto px-24 flex items-center justify-between py-4">
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
          <Button size="lg">
            Mulai Sekarang <ArrowRight size={18} strokeWidth={2} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
