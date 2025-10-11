import React from 'react';
import { motion } from 'framer-motion';
import MouseTrail from './MouseTrail';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Introduction = () => {
  const title = 'UI/UX Designer & Developer';
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      color: 'var(--primary-color)',
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <section className="introduction hero-section">
      <MouseTrail />
      <div className="background-animation">
        {/* You can use CSS animations or a library like particles.js here */}
      </div>
      <motion.h1
        className="kinetic-title"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        {title.split('').map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <div className="social-icons">
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          variants={socialIconVariants}
          whileHover="hover"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          variants={socialIconVariants}
          whileHover="hover"
        >
          <FaLinkedin />
        </motion.a>
      </div>
      <motion.div
        className="scroll-down-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>↓</span>
      </motion.div>
    </section>
  );
};

export default Introduction;
