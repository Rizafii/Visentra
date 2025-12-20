import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full pt-22">
      <div className="container lg:gap-0 gap-12 mx-auto lg:px-24 px-6  py-26 lg:flex-row flex-col-reverse flex items-start lg:items-center justify-between">
        <div className="content flex flex-col items-start gap-4">
          <h1 className="font-extrabold font-poppins text-5xl lg:text-6xl leading-15 lg:leading-18 ">
            Autopilot <span className="text-primary">Pemasaran</span>{" "}
            <br className="hidden lg:flex" />
            untuk UMKM Remaja
          </h1>
          <p className="max-w-160 font-medium lg:text-lg text-base leading-7">
            BrandForce AI adalah platform berbasis kecerdasan buatan yang
            membantu UMKM remaja membuat konten pemasaran secara otomatis,
            cepat, dan konsisten-tanpa perlu keahlian desain atau copywriting.
          </p>
          <Link href="/workspace">
            <Button size="lg" asChild>
              <span className="flex items-center gap-2">
                Mulai Sekarang <ArrowUpRight size={20} strokeWidth={3} />
              </span>
            </Button>
          </Link>
        </div>
        <Image
          alt="hero"
          src={"/hero/hero.png"}
          width={500}
          height={500}
          className="lg:w-120 w-62 h-auto"
        />
      </div>
    </section>
  );
}
