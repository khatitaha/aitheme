import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Calendar, MessageCircle } from "lucide-react";
import PulseBlob from "./pulseBolb";
import Link from "next/link";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1, duration: 0.5 }
    })
};

const CtaSection = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <PulseBlob />
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-white mb-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={0}
                >
                    Ready to Get Started?
                </motion.h2>
                <motion.p
                    className="text-neutral-400 mb-8 text-lg"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={1}
                >
                    Schedule your AI-powered scan today or chat with our medical AI assistant
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={2}
                >
                    <Link href="/appointment">
                        <Button
                            className="bg-neutral-700 hover:bg-neutral-600 text-white px-8 py-6 text-lg flex items-center gap-2 shadow-xl shadow-neutral-900/30 hover:shadow-neutral-800/40 transition-all duration-300 rounded-xl"
                        >
                            <Calendar className="w-5 h-5" />
                            Schedule Appointment
                        </Button>
                    </Link>
                    <Link href="/ai-detect">
                        <Button
                            variant="outline"
                            className="px-8 py-6 text-lg border-neutral-700 text-neutral-300 hover:bg-neutral-800/30 flex items-center gap-2 backdrop-blur-sm rounded-xl"
                        >
                            <Upload className="w-5 h-5" />
                            Upload Existing Scan
                        </Button>
                    </Link>
                    <Link href="/c">
                        <Button
                            variant="outline"
                            className="px-8 py-6 text-lg border-neutral-700 text-neutral-300 hover:bg-neutral-800/30 flex items-center gap-2 backdrop-blur-sm rounded-xl"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Chat with AI Assistant
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CtaSection;
