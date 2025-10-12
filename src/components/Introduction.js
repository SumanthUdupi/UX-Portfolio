import React from 'react';
import { motion } from 'framer-motion';
import MouseTrail from './MouseTrail';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import StarField from './StarField';

const Introduction = () => {
  const title = 'UI/UX Designer & Developer';
  const words = title.split(' ');

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 28, rotateX: 35 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const iconVariants = {
    initial: { opacity: 0, y: 12 },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.4 + index * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
    hover: {
      scale: 1.15,
      color: 'var(--text)',
      textShadow: '0 0 12px rgba(94, 234, 212, 0.65)',
      transition: { type: 'spring', stiffness: 260, damping: 16 },
    },
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <StarField />
      </div>
      <MouseTrail />
      <div className="hero-content">
        <motion.h1
          className="kinetic-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="inline-block"
              variants={wordVariants}
            >
              {index === words.length - 1 ? word : `${word} `}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
        >
          Crafting immersive digital journeys that balance design precision with interactive motion.
        </motion.p>
        <div className="hero-actions">
          {[{ icon: <FaGithub />, href: 'https://github.com', label: 'GitHub' }, { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' }].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              custom={index}
              whileHover="hover"
              className="text-2xl text-gray-300 transition-colors duration-300 hover:text-cyan-300"
              aria-label={item.label}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </div>
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 0.7, y: [0, 12, 0] }}
        transition={{ delay: 1, duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
};

export default Introduction;
