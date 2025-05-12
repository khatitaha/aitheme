import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import PulseBlob from "./pulseBolb";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1, duration: 0.5 }
    })
};

const Testimonials = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-800/20 backdrop-blur-[100px]"></div>
            <PulseBlob />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={0}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Patients Say</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Hear from those who have experienced the benefits of our service
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-neutral-800 backdrop-blur-lg p-8 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-neutral-800/20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        custom={1}
                    >
                        <MessageSquare className="w-8 h-8 text-neutral-400 mb-4" />
                        <p className="text-neutral-300 italic mb-4 text-lg">
                            "The process was incredibly fast and accurate. Getting the results within minutes was a game-changer for my peace of mind."
                        </p>
                        <div className="flex items-center mt-6">
                            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-white font-semibold">JD</div>
                            <div className="ml-4">
                                <p className="text-white font-semibold">John Doe</p>
                                <p className="text-neutral-400 text-sm">Patient</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-neutral-800 backdrop-blur-lg p-8 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-neutral-800/20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        custom={2}
                    >
                        <MessageSquare className="w-8 h-8 text-neutral-400 mb-4" />
                        <p className="text-neutral-300 italic mb-4 text-lg">
                            "I was amazed by the technology. It was simple, efficient, and the support team was very helpful in explaining the report."
                        </p>
                        <div className="flex items-center mt-6">
                            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-white font-semibold">JS</div>
                            <div className="ml-4">
                                <p className="text-white font-semibold">Jane Smith</p>
                                <p className="text-neutral-400 text-sm">Patient</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
