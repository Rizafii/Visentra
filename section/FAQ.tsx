"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Apa itu BrandForce AI?",
    answer:
      "BrandForce AI adalah platform berbasis kecerdasan buatan yang membantu UMKM dan bisnis dalam membangun, menganalisis, dan mengembangkan brand secara efisien. Dengan fitur analisis produk, strategi brand, dan pembuatan konten otomatis, BrandForce AI memudahkan proses branding dari awal hingga eksekusi.",
  },
  {
    question: "Bagaimana cara kerja BrandForce AI?",
    answer:
      "BrandForce AI menganalisis data produk, pasar, dan kompetitor menggunakan teknologi AI. Platform ini memberikan insight, rekomendasi strategi, serta membantu membuat konten pemasaran yang relevan dan efektif sesuai kebutuhan brand Anda.",
  },
  {
    question: "Apakah data saya aman di BrandForce AI?",
    answer:
      "Keamanan data Anda adalah prioritas kami. BrandForce AI menggunakan enkripsi dan standar keamanan industri untuk melindungi seluruh data pengguna, serta tidak membagikan data ke pihak ketiga tanpa izin.",
  },
  {
    question: "Apakah BrandForce AI berbayar?",
    answer:
      "BrandForce AI menyediakan paket gratis dengan fitur dasar, serta paket premium untuk kebutuhan bisnis yang lebih kompleks. Anda dapat memilih paket sesuai kebutuhan dan meng-upgrade kapan saja.",
  },
];
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full">
      <div className="container mx-auto py-12 lg:py-16 px-4 sm:px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="left flex flex-col flex-1 items-start text-start gap-4 mb-4 lg:mb-0">
            <h4 className="text-2xl sm:text-4xl lg:text-6xl font-bold max-w-60 leading-tight lg:leading-[1.15]">
              Frequenly Asked Question
            </h4>
            <p className="text-base sm:text-lg font-medium text-muted-foreground max-w-72 leading-6">
              Jawaban cepat buat pertanyaan yang sering kamu tanyain
            </p>
          </div>
          {/* FAQ Accordion */}
          <div className="flex flex-col gap-4 flex-2 w-full">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-primary/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
