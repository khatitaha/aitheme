
import React from "react";
import { motion } from "framer-motion";
import { Brain, Clock, Shield, Stethoscope, MessageCircle } from "lucide-react";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1, duration: 0.5 }
    })
};

const Benefits = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={0}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Experience the future of medical diagnostics with our cutting-edge technology
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
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-700 rounded-lg mt-1">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Advanced AI Technology</h3>
                                <p className="text-neutral-400">
                                    Our system uses state-of-the-art machine learning algorithms trained on millions of medical images for unparalleled accuracy.
                                </p>
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
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-700 rounded-lg mt-1">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">AI Chatbot Assistant</h3>
                                <p className="text-neutral-400">
                                    Get instant answers to any questions about pneumonia through our specialized medical AI chatbot available 24/7.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-neutral-800 backdrop-blur-lg p-8 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-neutral-800/20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        custom={3}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-700 rounded-lg mt-1">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
                                <p className="text-neutral-400">
                                    Your medical data is protected with enterprise-grade security and strict privacy protocols.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-neutral-800 backdrop-blur-lg p-8 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-neutral-800/20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        custom={4}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-neutral-700 rounded-lg mt-1">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Expert Support</h3>
                                <p className="text-neutral-400">
                                    Our team of medical professionals is available to help interpret results and guide next steps.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
