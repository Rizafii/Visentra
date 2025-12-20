import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Stats() {
  return (
    <section className="w-full">
      <div className="container mx-auto py-12 lg:py-16 lg:px-24 px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8 lg:mb-0">
            {/* Orange Card */}
            <div className="bg-linear-to-br from-orange-400 to-primary rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-56 sm:min-h-70 relative overflow-hidden">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Strategi Marketing
                  <br />
                  dalam 60 Detik
                </h3>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="text-sm font-medium hover:underline">
                  Lihat Selengkapnya
                </button>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>

            {/* Dark Image Card */}
            <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden relative min-h-56 sm:min-h-70">
              <Image
                src="/stats/stats.png"
                alt="UMKM"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-between text-white">
                <div className="text-xs sm:text-sm font-medium">
                  Testimoni UMKM
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Konten Marketing
                    <br />
                    Jadi Lebih Mudah
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Statistics */}
          <div className="space-y-8 w-full">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              {/* Stat 1 */}
              <div className="text-center space-y-2">
                <div className="text-3xl sm:text-5xl font-bold">500+</div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight">
                  UMKM yang terbantu
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center space-y-2">
                <div className="text-3xl sm:text-5xl font-bold">29k+</div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight">
                  Orang yang
                  <br />
                  menggunakan
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center space-y-2 col-span-2 sm:col-span-1">
                <div className="text-3xl sm:text-5xl font-bold">150+</div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight">
                  UMKM yang terbantu
                </div>
              </div>
            </div>

            {/* Bottom Stat with Images */}
            <div className="bg-white dark:bg-card rounded-2xl p-4 sm:p-6 shadow-sm border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-card" />
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-orange-400 to-orange-600 border-2 border-white dark:border-card" />
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-green-400 to-green-600 border-2 border-white dark:border-card" />
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-card" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold">+72k</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
                  UMKM sangat terbantu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
