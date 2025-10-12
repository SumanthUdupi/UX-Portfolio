import React, { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import projects from '../projects';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start 80%', 'end 40%'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 200, damping: 18 });
  const springY = useSpring(tiltY, { stiffness: 200, damping: 18 });
  const shadow = useTransform(springY, [-15, 15], [
    '0px 25px 45px rgba(14, 165, 233, 0.25)',
    '0px 15px 25px rgba(14, 165, 233, 0.12)',
  ]);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateRange = 18;
    const tiltYValue = ((x / rect.width) - 0.5) * rotateRange;
    const tiltXValue = (0.5 - (y / rect.height)) * rotateRange;
    tiltX.set(tiltXValue);
    tiltY.set(tiltYValue);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      style={{ rotateX: springX, rotateY: springY, boxShadow: shadow }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <motion.div className="project-image-parallax">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="project-image"
          style={{ y: parallaxY }}
        />
      </motion.div>
      <div className="project-info">
        <div className="project-header">
          <h3>{project.title}</h3>
          {project.lottieIconUrl && (
            <Player
              key={`lottie-${project.id}`}
              autoplay
              loop
              src={project.lottieIconUrl}
              style={{ height: '50px', width: '50px' }}
            />
          )}
        </div>
        <p>{project.description}</p>
        <motion.a
          href={project.link}
          className="view-project-button"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="button-text">View Project</span>
          <motion.span
            className="arrow-icon"
            initial={{ x: 0 }}
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            →
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
};

const ProjectShowcase = () => (
  <section className="project-showcase">
    <motion.h2
      className="project-showcase-title"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      Projects
    </motion.h2>
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={`project-${project.id}`} project={project} />
      ))}
    </div>
  </section>
);

export default ProjectShowcase;
