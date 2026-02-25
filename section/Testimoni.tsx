"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Firmansyah Riza A.",
    role: "Pengusaha Batik",
    initials: "FR",
    accent: "#3B66D1",
    stars: 5,
    text: "VISENTRA benar-benar mengubah cara saya mengelola bisnis. Strategi konten yang dihasilkan sangat relevan. Omzet naik hampir 40% dalam 2 bulan!",
  },
  {
    name: "Oktavian Bagas N.",
    role: "Pengusaha Makanan",
    initials: "OB",
    accent: "#B87CFF",
    stars: 5,
    text: "Dulu bingung bikin konten promosi, sekarang cukup ketik ide di VISENTRA dan semua sudah siap — foto, caption, bahkan video. Efisiensinya luar biasa!",
  },
  {
    name: "Sari Permata Dewi",
    role: "Toko Online Fashion",
    initials: "SP",
    accent: "#5B8AF5",
    stars: 5,
    text: "Pelanggan sering tanya 'desainernya siapa?' padahal saya buat sendiri pakai VISENTRA. Kontennya profesional banget!",
  },
  {
    name: "Hendri Kurniawan",
    role: "UMKM Kerajinan Kayu",
    initials: "HK",
    accent: "#7B5EA7",
    stars: 5,
    text: "Fitur foto produk otomatis sangat membantu. Produk kayu saya kelihatan jauh lebih menarik di marketplace.",
  },
  {
    name: "Putra Dwi Cahyono",
    role: "Pengusaha Kuliner Lokal",
    initials: "PD",
    accent: "#3B66D1",
    stars: 4,
    text: "Saya cuma fokus masak, sisanya diserahkan ke VISENTRA. Ide konten, jadwal posting, sampai caption semua sudah terurus otomatis.",
  },
  {
    name: "Rizky Amalia",
    role: "Brand Kosmetik Lokal",
    initials: "RA",
    accent: "#B87CFF",
    stars: 5,
    text: "VISENTRA membantu brand saya tampil setara dengan brand besar. Konten konsisten, estetik, dan sesuai target pasar. Highly recommended!",
  },
  {
    name: "Gilang Pratama",
    role: "Reseller Elektronik",
    initials: "GP",
    accent: "#5B8AF5",
    stars: 5,
    text: "Awalnya skeptis, tapi setelah coba VISENTRA satu minggu, konten saya langsung naik engagement-nya. Nggak nyangka bisa secepat ini!",
  },
  {
    name: "Melinda Rahma",
    role: "Pengusaha Skincare",
    initials: "MR",
    accent: "#7B5EA7",
    stars: 5,
    text: "VISENTRA bantu saya nulis deskripsi produk yang menarik dan SEO-friendly. Toko online saya makin gampang ditemukan pelanggan baru.",
  },
];

const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? "fill-amber-400 text-amber-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

function TestiCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="relative flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl p-5 shadow-md border border-gray-100 mx-3 flex flex-col gap-3 group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-60"
        style={{ backgroundColor: t.accent }}
      />

      {/* Big decorative quote */}
      <span
        className="text-5xl font-serif leading-none select-none -mb-1"
        style={{ color: `${t.accent}22` }}
      >
        &ldquo;
      </span>

      {/* Text */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{t.text}</p>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
          style={{ backgroundColor: t.accent }}
        >
          {t.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-tight truncate">{t.name}</p>
          <p className="text-xs text-gray-400 truncate">{t.role}</p>
        </div>
        <Stars count={t.stars} />
      </div>
    </div>
  );
}

export default function Testimoni() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F1F5F9] py-20 lg:py-28">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B87CFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#3B66D1]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 container mx-auto px-6 text-center mb-14">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#DDE7FF] mb-5">
          <span className="text-xs font-semibold text-[#3B66D1] uppercase tracking-widest">
            Testimoni Pengguna
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight font-dm-sans mb-4">
          Apa Kata Mereka?
        </h2>
        <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
          Ribuan pelaku UMKM sudah merasakan manfaat nyata dari{" "}
          <span className="font-semibold text-[#3B66D1]">VISENTRA</span>.
        </p>
      </div>

      {/* Marquee Row 1 — scroll left */}
      <div
        className="relative z-10 mb-4 overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}
      >
        <div className="flex marquee-left">
          {row1.map((t, i) => (
            <TestiCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — scroll right */}
      <div
        className="relative z-10 overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}
      >
        <div className="flex marquee-right">
          {row2.map((t, i) => (
            <TestiCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Bottom stats strip */}
      <div className="relative z-10 container mx-auto px-6 mt-14">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
          {[
            { value: "500+", label: "UMKM Bergabung" },
            { value: "4.9/5", label: "Rating Pengguna" },
            { value: "95%", label: "Tingkat Kepuasan" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: scroll-left 28s linear infinite;
          width: max-content;
        }
        .marquee-left:hover {
          animation-play-state: paused;
        }
        .marquee-right {
          animation: scroll-right 32s linear infinite;
          width: max-content;
        }
        .marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
