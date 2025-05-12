"use client"

import Benefits from "@/components/Benefits";
import CtaSection from "@/components/ctaSection";
import HeroSection from "@/components/hero";
import HowItWorks from "@/components/howItWorks";
import Technology from "@/components/technology";
import Testimonials from "@/components/testomonial";


export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 w-full">
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Technology />
      <CtaSection />
    </div>
  );
}