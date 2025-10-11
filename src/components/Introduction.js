import React from 'react';
import { motion } from 'framer-motion';
import MouseTrail from './MouseTrail';

const IconGithub = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const IconLinkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const IconMail = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const IconArrowDown = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>
    </svg>
);

const Introduction = () => {
    const title = "UI/UX Designer & Developer".split(" ");
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const wordVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center p-4 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-gradient"></div>
            <MouseTrail />
            <div className="z-20">
                <motion.h1 className="text-5xl md:text-8xl font-extrabold text-white mb-4" variants={containerVariants} initial="hidden" animate="visible">
                    {title.map((word, i) => <motion.span key={i} variants={wordVariants} className="inline-block mr-3">{word} </motion.span>)}
                </motion.h1>
                <motion.p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>Crafting intuitive and beautiful digital experiences from concept to code.</motion.p>
                <motion.div className="flex justify-center space-x-6 mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
                    <motion.a href="#" whileHover={{ scale: 1.2, color: '#00c7ff' }} className="text-gray-300"><IconGithub /></motion.a>
                    <motion.a href="#" whileHover={{ scale: 1.2, color: '#00c7ff' }} className="text-gray-300"><IconLinkedin /></motion.a>
                    <motion.a href="#contact" whileHover={{ scale: 1.2, color: '#00c7ff' }} className="text-gray-300"><IconMail /></motion.a>
                </motion.div>
            </div>
            <motion.div className="absolute bottom-10 z-20" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <a href="#about"><IconArrowDown className="text-white"/></a>
            </motion.div>
        </section>
    );
};

export default Introduction;
