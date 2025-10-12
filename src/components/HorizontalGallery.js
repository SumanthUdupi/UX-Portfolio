import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import projectsData from '../projects.js';

const HorizontalGallery = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);
    return (
        <section ref={targetRef} className="relative h-[300vh]">
          <motion.div className="horizontal-progress" style={{ scaleX: scrollYProgress }} />
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <div className="w-full flex flex-col">
              <motion.div style={{ x }} className="flex gap-4 px-4">
                  {[...projectsData, ...projectsData].map((project, index) => (
                      <div key={`gallery-${project.id}-${index}`} className="w-80 md:w-96 flex-shrink-0">
                          <div className="bg-gray-700/60 rounded-lg overflow-hidden h-96 shadow-xl">
                              <img src={project.imageUrl} alt={project.title} className="w-full h-1/2 object-cover"/>
                              <div className="p-4"><h3 className="font-bold text-lg">{project.title}</h3><p className="text-sm text-gray-300 mt-2">{project.description.substring(0, 100)}...</p></div>
                          </div>
                      </div>
                  ))}
              </motion.div>
            </div>
          </div>
          <motion.div style={{ scaleX: scrollYProgress }} className="sticky bottom-0 left-0 right-0 h-1 bg-cyan-500 origin-left" />
        </section>
    );
};

export default HorizontalGallery;
