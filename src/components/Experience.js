import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

import fallbackExperience from '../experienceData';

const Experience = ({ experienceData }) => {
    const data = experienceData || fallbackExperience;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
    return (
        <section id="experience" ref={ref} className="container mx-auto px-4 py-16">
            <div className="relative max-w-2xl mx-auto">
                <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-4 md:left-1/2 top-0 w-0.5 h-full bg-cyan-500 origin-top" />
                <div className="space-y-12">
                    {experienceData.map((item, index) => (
                        <motion.div key={index} className="pl-12 md:pl-0 flex" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
                            <div className="md:w-1/2 md:text-right md:pr-8">
                                <p className="font-bold">{item.year}</p>
                            </div>
                            <div className="absolute left-[14px] md:left-1/2 w-3 h-3 bg-cyan-500 rounded-full mt-1.5 -translate-x-1/2 border-4 border-[var(--background)]"></div>
                            <div className="md:w-1/2 md:pl-8">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className="text-cyan-400 mb-2">{item.company}</p>
                                <p className="text-gray-400 dark:text-gray-600">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
