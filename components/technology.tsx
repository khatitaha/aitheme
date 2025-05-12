import React from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "./backgrounGrid";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1, duration: 0.5 }
    })
};

const Technology = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <BackgroundGrid />
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={0}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Behind the Technology</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Built on cutting-edge research and validated by medical experts
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        custom={1}
                        className="bg-neutral-800 backdrop-blur-lg p-4 rounded-xl border border-neutral-700"
                    >
                        <div className="bg-neutral-800 rounded-lg p-6 flex items-center justify-center h-[300px]">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🧠</div>
                                <p className="text-neutral-300">AI Model Visualization</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        custom={2}
                    >
                        <h3 className="text-2xl font-semibold text-white mb-4">Our AI Model</h3>
                        <p className="text-neutral-300 mb-6">
                            Our deep learning model is trained on a massive dataset of chest X-rays,
                            allowing it to identify patterns indicative of pneumonia with high sensitivity and specificity.
                            We continuously update and validate our models to ensure peak performance.
                        </p>
                        <h3 className="text-2xl font-semibold text-white mb-4">Medical Validation</h3>
                        <p className="text-neutral-300">
                            The AI results are reviewed and validated by a team of experienced radiologists
                            to ensure accuracy and provide comprehensive reports. We adhere to strict medical standards and regulations.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Technology;
