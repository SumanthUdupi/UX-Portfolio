import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from './ThemeContext';
import useMousePosition from './useMousePosition';

function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, ms);
    };
}

const CustomCursor = () => {
    const { theme } = useContext(ThemeContext);
    const { x, y } = useMousePosition();
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    useEffect(() => {
        const handleMouseEnter = debounce(() => setIsHoveringLink(true), 20);
        const handleMouseLeave = debounce(() => setIsHoveringLink(false), 20);

        const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
        return () => {
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);
    const cursorVariants = {
        default: { x: x - 16, y: y - 16, scale: 1, backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)", border: theme === 'dark' ? "1px solid #fff" : "1px solid #000" },
        linkHover: { x: x - 24, y: y - 24, height: 48, width: 48, scale: 1.5, backgroundColor: theme === 'dark' ? "rgba(0, 199, 255, 0.2)" : "rgba(0, 199, 255, 0.3)", border: "none" }
    };
    return <motion.div className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 hidden md:block" variants={cursorVariants} animate={isHoveringLink ? "linkHover" : "default"} transition={{ type: "spring", stiffness: 500, damping: 30 }} />;
};

export default CustomCursor;
