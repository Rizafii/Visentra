"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { Sparkles, Zap, Target, ShieldCheck } from "lucide-react";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
  className?: string;
  aspectRatio?: string;
}

function FeatureCard({ image, title, description, className = "", aspectRatio = "aspect-square" }: FeatureCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`relative group overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${aspectRatio} ${className}`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Hover Overlay with White Blur and Button */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 px-8 text-center">
            <Button className="bg-[#4EE4E9] text-white hover:bg-[#3FD3D8] rounded-full px-10 py-7 font-bold text-xl shadow-xl shadow-cyan-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
              Lihat selengkapnya
            </Button>
          </div>

          {/* Glassmorphism Info Bar */}
          <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-lg z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-dm-sans">{title}</h3>
            <p className="text-sm text-gray-800 font-medium leading-relaxed font-inter">
              {description}
            </p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-[2.5rem] border-none bg-slate-50"
        data-lenis-prevent
      >
        <div className="flex flex-col">
          {/* Detail Hero Part */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-6">
                  Fitur Unggulan
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-dm-sans text-gray-900 mb-6 leading-tight">
                  {title} <br />
                  <span className="text-indigo-600">Autopilot Bisnis</span>
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed font-inter">
                  Kembangkan bisnismu lebih cepat dengan bantuan AI yang sudah dilatih khusus untuk UMKM. Dari strategi konten hingga analisis pasar, biarkan teknologi bekerja untuk kesuksesanmu.
                </p>
                <Button size="lg" className="rounded-2xl px-8 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg transition-all hover:scale-105">
                  Gunakan Sekarang
                </Button>
              </div>
              <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden shadow-2xl">
                <Image src={image} alt={title} fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Subfeatures Grid */}
          <div className="bg-white p-8 md:p-12 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-bold mb-2 font-dm-sans text-gray-900">Kreativitas AI</h4>
                <p className="text-gray-500 text-xs leading-relaxed">Inspirasi konten harian yang relevan dengan tren.</p>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <h4 className="font-bold mb-2 font-dm-sans text-gray-900">Efisiensi Tinggi</h4>
                <p className="text-gray-500 text-xs leading-relaxed">Hemat waktu hingga 80% dalam rencana marketing.</p>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <h4 className="font-bold mb-2 font-dm-sans text-gray-900">Target Pas</h4>
                <p className="text-gray-500 text-xs leading-relaxed">Analisis audiens jitu untuk hasil maksimal.</p>
              </div>
            </div>
          </div>

          {/* Verification Bar */}
          <div className="px-8 pb-8 md:px-12 md:pb-12 bg-white">
            <div className="bg-indigo-600 text-white p-6 rounded-3xl flex items-start gap-4 shadow-lg">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm mb-1">Jaminan Hasil Profesional</p>
                <p className="text-xs opacity-90 leading-relaxed">Setiap output divalidasi oleh pakar marketing berpengalaman.</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Feature() {
  return (
    <section className="w-full bg-[#F8FAFC] py-24">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 rounded-full border border-indigo-200 bg-white shadow-sm mb-8">
            <span className="text-sm font-bold text-gray-900 font-inter">Fitur Visentra</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 font-dm-sans tracking-tight max-w-3xl">
            All the Tools you need to help
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed font-inter font-medium">
            Our All job-matching bot scans thousands of listings and <br className="hidden md:block" />
            uses smart allgoritmas to find the roles that best fit your skills <br className="hidden md:block" />
            and prefensc
          </p>
        </div>

        {/* Feature Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <FeatureCard
              image="https://images.unsplash.com/photo-1551288049-bbbda536ad37?q=80&w=2070&auto=format&fit=crop"
              title="Artificial Intelligence"
              description="AI membantu bisnismu jadi lebih terarah dan kamu bisa auto pilot bisnis kamu"
              aspectRatio="aspect-[4/3] md:aspect-[3/2]"
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
              title="Artificial Intelligence"
              description="AI membantu bisnismu jadi lebih terarah dan kamu bisa auto pilot bisnis kamu"
              aspectRatio="aspect-[4/3] md:aspect-square"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <FeatureCard
              image="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
              title="Artificial Intelligence"
              description="AI membantu bisnismu jadi lebih terarah dan kamu bisa auto pilot bisnis kamu"
              aspectRatio="aspect-[3/4] md:aspect-[4/5]"
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
              title="Artificial Intelligence"
              description="AI membantu bisnismu jadi lebih terarah dan kamu bisa auto pilot bisnis kamu"
              aspectRatio="aspect-[3/2] md:aspect-[2/1]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
