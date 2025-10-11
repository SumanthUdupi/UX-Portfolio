import React from "react";
import { motion } from "framer-motion";

const Contact = ({ className }) => {
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
    <section className={`py-20 ${className}`}>
      <motion.div
        className="container mx-auto text-center"
        {...animationProps}
      >
        <h2 className="text-4xl md-text-5xl font-bold mb-8">Contact</h2>
        <p className="text-lg mb-4">
          I'm currently available for freelance work. If you have a project that
          you think I'd be a good fit for, please get in touch!
        </p>
        <div className="mt-8">
          <a
            href="mailto:sumanthudupi@example.com"
            className="connect-button bg-blue-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300"
          >
            Let's Connect
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
