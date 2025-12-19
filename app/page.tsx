import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { MainWorkspace } from "@/components/dashboard/main-workspace";
import Navbar from "@/components/homepage/Navbar";
import Hero from "@/section/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="font-inter">
      <Navbar />
      <Hero />
    </main>
  );
}
