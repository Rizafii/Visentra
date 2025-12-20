import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { MainWorkspace } from "@/components/dashboard/main-workspace";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/homepage/Navbar";
import Feature from "@/section/Feature";
import Hero from "@/section/Hero";
import Stats from "@/section/Stats";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Feature />
      <Footer />
    </main>
  );
}
