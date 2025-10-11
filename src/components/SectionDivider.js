import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SectionDivider = ({ title }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    return (
        <div ref={ref} className="flex items-center justify-center my-16 md:my-24">
            <svg width="100%" height="50" className="max-w-lg">
                <motion.line x1="0" y1="25" x2="40%" y2="25" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: isInView ? 1 : 0 }} transition={{ duration: 1 }} />
                <text x="50%" y="30" textAnchor="middle" className="font-semibold text-xl fill-current">{title}</text>
                <motion.line x1="60%" y1="25" x2="100%" y2="25" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: isInView ? 1 : 0 }} transition={{ duration: 1 }} />
            </svg>
        </div>
    );
};

export default SectionDivider;
