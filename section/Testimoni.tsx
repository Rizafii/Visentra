import { Card } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    name: "Firmansyah Riza A",
    role: "Pengusaha Batik",
    avatar: "/hero/hero.png",
    testimonial:
      "Website BranchForce AI ini sangat membantu dalam bisnis saya, saya tidak perlu bingung untuk bagaimana memulai bisnis",
    bgColor: "bg-blue-400",
  },
  {
    name: "Oktavian Bagas N",
    role: "Pengusaha Makanan",
    avatar: "/hero/hero.png",
    testimonial:
      "Bisnis kerajinan saya bisa saya handle dengan cepat dan penjualan makin pesat!",
    bgColor: "bg-yellow-500",
  },
  {
    name: "Elnoah",
    role: "Pengusaha Kerajinan",
    avatar: "/hero/hero.png",
    testimonial:
      "Bisnis kerajinan saya bisa saya handle dengan cepat dan penjualan makin pesat!",
    bgColor: "bg-purple-400",
  },
  {
    name: "Elnoah",
    role: "Pengusaha Kerajinan",
    avatar: "/hero/hero.png",
    testimonial:
      "Bisnis kerajinan saya bisa saya handle dengan cepat dan penjualan makin pesat!",
    bgColor: "bg-purple-500",
  },
  {
    name: "Putra Dwi Cahyono",
    role: "Pengusaha Ilalp",
    avatar: "/hero/hero.png",
    testimonial:
      "Bisnis ilalp saya bisa saya handle dengan cepat dan penjualan makin pesat!",
    bgColor: "bg-lime-600",
  },
  {
    name: "Putra Dwi Cahyono",
    role: "Pengusaha Ilalp",
    avatar: "/hero/hero.png",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    bgColor: "bg-orange-400",
  },
];

export default function Testimoni() {
  return (
    <section className="w-full">
      <div className="container mx-auto py-12 lg:py-16 px-4 sm:px-6 lg:px-24">
        <header className="flex flex-col items-center text-center gap-4 mb-8 lg:mb-12">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Apa Kata Mereka?
          </h3>
          <p className="text-base sm:text-lg font-medium text-muted-foreground">
            Pengalaman Nyata dari Pengguna BrandForce
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`p-4 sm:p-6 ${testimonial.bgColor} border-none text-white gap-0 h-fit`}
            >
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm opacity-90">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {testimonial.testimonial}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
