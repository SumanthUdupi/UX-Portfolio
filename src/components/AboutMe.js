import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutMe = () => {
    const skills = ["React", "JavaScript", "Figma", "UI/UX", "Prototyping", "HTML5", "CSS3", "TailwindCSS", "Framer Motion", "Data Viz"];
    const textRef = useRef(null);
    const isInView = useInView(textRef, { once: true, amount: 0.5 });
    const sentence = "I am a passionate developer and designer with a keen eye for detail, dedicated to building solutions that are not only functional but also delightful to use.".split(" ");
    return (
        <section id="about" className="container mx-auto px-4 py-16 text-center">
            <motion.p ref={textRef} className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ staggerChildren: 0.02 }}>
              {sentence.map((word, i) => <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="inline-block mr-1.5">{word}</motion.span>)}
            </motion.p>
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-8">My Skillset</h3>
                <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
                    {skills.map((skill, i) => <motion.div key={skill} className="bg-gray-800/50 dark:bg-gray-200/80 rounded-full py-2 px-5 text-lg cursor-pointer" initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.3, delay: i * 0.05 }} whileHover={{ scale: 1.15, y: -5, boxShadow: "0px 10px 20px rgba(0, 199, 255, 0.3)" }}>{skill}</motion.div>)}
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
