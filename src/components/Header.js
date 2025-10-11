import React, { useState, useEffect, useContext } from 'react';
import { motion, useScroll } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => scrollY.on("change", (latest) => setScrolled(latest > 50)), [scrollY]);

    const logoVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };
    const letterVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
    };

    return (
        <motion.header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-4 md:px-8 py-4" animate={{ backgroundColor: scrolled ? "rgba(17, 17, 17, 0.8)" : "rgba(17, 17, 17, 0)", backdropFilter: scrolled ? "blur(10px)" : "blur(0px)", paddingTop: scrolled ? '1rem' : '1.5rem', paddingBottom: scrolled ? '1rem' : '1.5rem' }}>
            <motion.div className="text-2xl font-bold text-white flex overflow-hidden" variants={logoVariants} initial="hidden" animate="visible">
                {"SU.".split("").map((char, i) => <motion.span key={i} variants={letterVariants}>{char}</motion.span>)}
            </motion.div>
            <nav className="flex items-center space-x-4">
                {["About", "Projects", "Contact"].map((link, i) => <motion.a key={link} href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-cyan-400" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i + 0.5 }}>{link}</motion.a>)}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}><ThemeToggle /></motion.div>
            </nav>
        </motion.header>
    );
};

export default Header;
