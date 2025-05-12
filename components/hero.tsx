"use client"
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Calendar, Shield, Search, Check } from "lucide-react";
import BackgroundGrid from "./backgrounGrid";
import PulseBlob from "./pulseBolb";
import FeatureCard from "./feutureComponnet";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 }
  })
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 min-h-screen flex flex-col items-center justify-center py-16 px-4">
      <BackgroundGrid />
      <PulseBlob />
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-4 backdrop-blur-sm border border-blue-500/30">
            Next Generation Medical AI
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-100 to-sky-300"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={1}
        >
          AI-Powered Pneumonia Detection
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={2}
        >
          Early detection saves lives. Our advanced AI system analyzes medical images with
          <span className="text-white font-semibold"> 93% accuracy </span>
          in just minutes.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={3}
        >
          <FeatureCard
            icon={<Search className="w-10 h-10" />}
            title="Advanced AI Analysis"
            description="State-of-the-art machine learning algorithms trained on over 20000 medical images"
          />
          <FeatureCard
            icon={<Check className="w-10 h-10" />}
            title="93% Accurate Results"
            description="Industry-leading accuracy that helps doctors make better decisions, faster"
            className="md:translate-y-4"
          />
          <FeatureCard
            icon={<Shield className="w-10 h-10" />}
            title="HIPAA Compliant"
            description="Your medical data is protected with enterprise-grade encryption and security"
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={4}
        >
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Start Your Analysis</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/ai-detect" className="w-full sm:w-auto">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg flex items-center gap-2 shadow-xl shadow-blue-800/30 hover:shadow-blue-700/40 transition-all duration-300 rounded-xl"
              >
                <Upload className="w-5 h-5" />
                Upload Chest X-Ray
              </Button>
            </Link>
            <Link href="/appointment" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full px-8 py-6 text-lg border-blue-400/30 text-blue-100 hover:bg-blue-800/30 flex items-center gap-2 backdrop-blur-sm rounded-xl"
              >
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 flex flex-col items-center space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={5}
        >
          <p className="text-blue-200/80 text-center">Trusted by leading medical institutions worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-70">
            <img src="https://placehold.co/180x60/2563eb/FFFFFF?text=MedCenter" alt="Medical Center" className="h-8 grayscale hover:grayscale-0 transition-all" />
            <img src="https://placehold.co/180x60/2563eb/FFFFFF?text=HealthTech" alt="HealthTech" className="h-8 grayscale hover:grayscale-0 transition-all" />
            <img src="https://placehold.co/180x60/2563eb/FFFFFF?text=AI+Medical" alt="AI Medical" className="h-8 grayscale hover:grayscale-0 transition-all" />
          </div>

          <div className="flex items-center justify-center mt-8 gap-2 text-blue-200/60">
            <Check className="w-4 h-4" />
            <span className="text-sm">FDA Approved</span>
            <span className="mx-2">•</span>
            <Check className="w-4 h-4" />
            <span className="text-sm">CE Certified</span>
            <span className="mx-2">•</span>
            <Check className="w-4 h-4" />
            <span className="text-sm">ISO 13485</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
