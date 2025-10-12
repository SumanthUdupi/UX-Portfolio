import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Introduction from './components/Introduction';
import AboutMe from './components/AboutMe';
import ProjectShowcase from './components/ProjectShowcase';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackToTopButton from './components/BackToTopButton';
import ThemeProvider from './components/ThemeProvider';
import experienceData from './experienceData';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="animated-logo"
        >
          {/* Your SVG Logo or Initials Here */}
          <svg width="100" height="100" viewBox="0 0 100 100">
            <motion.path
              d="M 20,50 L 50,80 L 80,50"
              fill="transparent"
              stroke="var(--text-color)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <CustomCursor />
      <div className="App">
        <Header />
        <main>
          <AnimatePresence>
            <Introduction key="introduction" />
            <AboutMe key="about" />
            <ProjectShowcase key="projects" />
            <Experience key="experience" experienceData={undefined} />
            <Contact key="contact" />
          </AnimatePresence>
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
