import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full pt-22">
      <div className="container mx-auto px-24  py-26 flex items-center justify-between">
        <div className="content flex flex-col items-start gap-4">
          <h1 className="font-extrabold font-poppins text-6xl leading-18 ">
            Autopilot <span className="text-primary">Pemasaran</span> <br />
            untuk UMKM Remaja
          </h1>
          <p className="max-w-160 font-medium text-lg leading-7">
            BrandForce AI adalah platform berbasis kecerdasan buatan yang
            membantu UMKM remaja membuat konten pemasaran secara otomatis,
            cepat, dan konsisten-tanpa perlu keahlian desain atau copywriting.
          </p>
          <Button size="lg">
            Mulai Sekarang <ArrowUpRight size={20} strokeWidth={3} />
          </Button>
        </div>
        <Image
          alt="hero"
          src={"/hero/hero.png"}
          width={500}
          height={500}
          className="w-120 h-auto"
        />
      </div>
    </section>
  );
}
