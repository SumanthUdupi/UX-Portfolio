import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import projects from '../projects'; // Assuming you have a projects data file

const ProjectShowcase = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="project-showcase">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <motion.div
            key={`project-${project.id}`}
            className="project-card"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              rotateX: 10,
              rotateY: -10,
              boxShadow: '0px 15px 30px rgba(0,0,0,0.2)',
            }}
          >
            <div className="project-image-parallax">
              <motion.img
                src={project.imageUrl}
                alt={project.title}
                style={{ y: '-20%' }}
              />
            </div>
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
                whileHover={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--background-color)',
                }}
              >
                View Project{' '}
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;
