import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
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
        <h2 className="text-4xl md-text-5xl font-bold mb-8">Contact</h2>
        <p className="text-lg mb-4">
          I'm currently available for freelance work. If you have a project that
          you think I'd be a good fit for, please get in touch!
        </p>
        <a
          href="mailto:sumanthudupi@example.com"
          className="text-lg md:text-2xl mt-4 text-blue-400 hover:underline"
        >
          sumanthudupi@example.com
        </a>
      </motion.div>
    </section>
  );
};

export default Contact;
