"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const plans = [
    {
        name: "Gratis",
        badge: null,
        price: "Rp0",
        period: "/minggu",
        dark: false,
        perks: [
            "Generate Foto & Video 4x",
            "Planing bisnis 5x",
            "Generate Foto & Video 4x",
        ],
        cta: "Coba sekarang",
        href: "/workspace",
    },
    {
        name: "Semi Profesional",
        badge: "rekomendasi",
        price: "Rp100rb",
        period: "/bulan",
        dark: true,
        perks: [
            "Generate Foto & Video 4x",
            "Planing bisnis 5x",
            "1 Mentor",
            "Generate Foto & Video 4x",
        ],
        cta: "Coba sekarang",
        href: "/workspace",
    },
    {
        name: "Profesional",
        badge: null,
        price: "Rp700rb",
        period: "/Tahun",
        dark: false,
        perks: [
            "Generate Foto & Video 50x",
            "Planing bisnis 50x",
            "2 Mentor",
            "Generate Foto & Video 4x",
        ],
        cta: "Coba sekarang",
        href: "/workspace",
    },
];

export default function Pricing() {
    return (
        <section className="w-full bg-white py-20 lg:py-28 relative overflow-hidden">

            <div className="relative z-10 container mx-auto px-6 lg:px-24 xl:px-40">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center px-5 py-1.5 rounded-full bg-[#DDE7FF] mb-5">
                        <span className="text-xs font-semibold text-[#3B66D1] uppercase tracking-widest">
                            Pricing
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight font-dm-sans mb-4">
                        Simple &amp; transparent pricing
                    </h2>
                    <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
                        Choose a plan that fits your financial journey — with no hidden fees.
                        <br className="hidden sm:block" />
                        Start free and upgrade anytime.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto items-stretch">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300
                ${plan.dark
                                    ? "bg-[#1E2D5A] text-white shadow-2xl scale-[1.03]"
                                    : "bg-white text-gray-900 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1"
                                }`}
                        >
                            {/* Name + badge */}
                            <div className="flex items-center gap-2 mb-5">
                                <h3 className={`font-bold text-lg ${plan.dark ? "text-white" : "text-gray-900"}`}>
                                    {plan.name}
                                </h3>
                                {plan.badge && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B87CFF] text-white">
                                        {plan.badge}
                                    </span>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className={`text-3xl font-bold ${plan.dark ? "text-white" : "text-gray-900"}`}>
                                    {plan.price}
                                </span>
                                <span className={`text-sm ml-1 ${plan.dark ? "text-white/60" : "text-gray-400"}`}>
                                    {plan.period}
                                </span>
                            </div>

                            {/* Perks */}
                            <div className="mb-8">
                                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${plan.dark ? "text-white/50" : "text-gray-400"}`}>
                                    Keuntungan
                                </p>
                                <ul className="flex flex-col gap-2.5">
                                    {plan.perks.map((perk) => (
                                        <li key={perk} className="flex items-center gap-2.5">
                                            <CheckCircle2
                                                size={16}
                                                className={plan.dark ? "text-[#B87CFF]" : "text-[#3B66D1]"}
                                            />
                                            <span className={`text-sm ${plan.dark ? "text-white/80" : "text-gray-600"}`}>
                                                {perk}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className="mt-auto">
                                <Link href={plan.href}>
                                    <button
                                        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
                      ${plan.dark
                                                ? "bg-white text-[#1E2D5A] hover:bg-gray-100"
                                                : "border border-gray-200 text-gray-700 hover:border-[#3B66D1] hover:text-[#3B66D1]"
                                            }`}
                                    >
                                        {plan.cta}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
