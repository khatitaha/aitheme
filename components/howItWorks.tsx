import React from "react";
import { motion } from "framer-motion";
import { Brain, Clock, Stethoscope } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1, duration: 0.5 }
    })
};

const HowItWorks = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-800/20 backdrop-blur-[100px]"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    custom={0}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Our AI-powered system makes pneumonia detection simple and accurate
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        className="bg-neutral-800 backdrop-blur-lg p-6 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-neutral-800/20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        custom={1}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-neutral-700 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">1. Schedule Your Scan</h3>
                        </div>
                        <p className="text-neutral-400">
                            Book an appointment at our state-of-the-art facility for your chest scan
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-neutral-800 backdrop-blur-lg p-6 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-neutral-800/20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        custom={2}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-neutral-700 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">2. AI Analysis</h3>
                        </div>
                        <p className="text-neutral-400">
                            Our advanced AI system analyzes your scan with precision and speed
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-neutral-800 backdrop-blur-lg p-6 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-neutral-800/20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        custom={3}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-neutral-700 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">3. Get Results</h3>
                        </div>
                        <p className="text-neutral-400">
                            Receive your detailed analysis report within minutes
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
