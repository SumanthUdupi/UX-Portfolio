import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const IconArrowRight = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const ProjectCard = ({ project }) => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    return (
        <motion.div ref={ref} className="w-full md:w-1/2 lg:w-1/3 p-4" style={{ perspective: 1000 }} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <motion.div className="bg-gray-800/50 dark:bg-gray-200/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg h-full flex flex-col" whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <div className="overflow-hidden"><motion.img src={project.imageUrl} alt={project.title} style={{ y }} className="w-full h-48 object-cover" /></div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 dark:text-gray-600 mb-4 flex-grow">{project.description}</p>
                    <div className="mb-4">{project.tags.map(tag => <span key={tag} className="inline-block bg-cyan-800/50 text-cyan-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{tag}</span>)}</div>
                    <motion.a href={project.link} target="_blank" rel="noopener noreferrer" className="group mt-auto self-start bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center" whileHover="hover">
                       <span className="mr-2">View Project</span><motion.div variants={{ hover: { x: 5 } }}><IconArrowRight /></motion.div>
                    </motion.a>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ProjectShowcase = ({ projectsData }) => (
    <section id="projects" className="container mx-auto px-4 py-16"><div className="flex flex-wrap -m-4">{projectsData.map(p => <ProjectCard key={p.id} project={p} />)}</div></section>
);

export default ProjectShowcase;
