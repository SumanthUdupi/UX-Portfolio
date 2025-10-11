import React from "react";
import { motion } from "framer-motion";

const AboutMe = () => {
  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true, amount: 0.5 },
      };

  return (
    <section className="py-20">
      <motion.div
        className="container mx-auto text-center"
        {...animationProps}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
        <p className="text-lg max-w-3xl mx-auto">
          I am a passionate UX/UI designer and developer with a love for
          creating beautiful and intuitive user experiences. I have experience
          in both design and development, allowing me to bridge the gap between
          the two disciplines and create products that are both visually
          appealing and highly functional.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutMe;
