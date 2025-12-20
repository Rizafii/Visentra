import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  usefulInfo: [
    { name: "Produk", href: "/#events" },
    { name: "Bantuan", href: "/#how-it-works" },
    { name: "FAQ", href: "/#faq" },
  ],
  exploreMore: [
    { name: "Tentang Kami", href: "/#about" },
    { name: "Testimoni", href: "/#testimonials" },
    { name: "Kontak", href: "/#contact" },
  ],
};

const socialMedia = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-primary">
      <div className="container mx-auto px-24 py-16 ">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-6">
            <Image
              src="/logo/logo-white.svg"
              alt="Brand Logo"
              className="w-42"
              width={500}
              height={500}
            />
            <p className="text-sm leading-relaxed text-white/70">
              Kami hadir untuk mempermudah UMKM di Indonesia untuk mempermudah
              bisnisnya. Memberikan solusi nyaman, dan modern
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socialMedia.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-accent"
                  >
                    <Icon className="h-5 w-5 text-white group-hover:text-primary" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Useful Info */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-background">Layanan</h3>
            <ul className="space-y-3">
              {footerLinks.usefulInfo.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore More */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-background">
              Jelajahi Lebih
            </h3>
            <ul className="space-y-3">
              {footerLinks.exploreMore.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/60">
            © 2025 All Right Reserved by BrandForce AI -{" "}
            <a
              href="https://instagram.com/mas_rizafii"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-white"
            >
              TSPJT
            </a>
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Kebijakan Privasi
            </a>
            <a
              href="/terms"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
