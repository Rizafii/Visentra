import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Stats() {
  return (
    <section className="w-full bg-[#F1F5F9] pb-24 pt-12">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col gap-12">

          {/* Main Visual Placeholder */}
          <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[1728/800] w-full ">
              <Image
                src="/hero/about.svg"
                alt="Visentra Brand Visual"
                fill
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-6">
                  <Image
                    src="/hero/logo/logo-white.svg"
                    alt="Visentra White Logo"
                    width={280}
                    height={80}
                    className="w-48 md:w-64 h-auto"
                  />
                </div>
                <p className="text-white text-lg md:text-2xl font-bold max-w-2xl leading-relaxed font-inter">
                  Solusi bisnis untuk umkm remaja yang ingin <br className="hidden md:block" />
                  memulai bisnis
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Content - Info */}
          <div className="max-w-4xl pt-4">
            <div className="inline-block relative mb-6">
              <h2 className="text-4xl md:text-5xl font-bold font-dm-sans text-gray-900 leading-tight">
                Apa itu Visentra
              </h2>
              {/* Thick custom underline */}
              <div className="absolute -bottom-2 left-0 w-3/4 h-1 bg-gray-400/50 rounded-full" />
            </div>

            <p className="text-lg md:text-xl text-gray-700 font-medium leading-[1.6] font-inter max-w-3xl">
              Visentra adalah sebuah platform yang membantu <br className="hidden md:block" />
              umkm untuk menjalankan bisnis mereka terutama <br className="hidden md:block" />
              remaja yang takut memulai sebuah bisnis
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
