import React from "react";
import HorizontalGallery from "./HorizontalGallery";

const ProjectShowcase = ({ className }) => {
  return (
    <section className={`py-20 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Projects
      </h2>
      <HorizontalGallery />
    </section>
  );
};

export default ProjectShowcase;
