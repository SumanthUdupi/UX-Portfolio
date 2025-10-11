import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IconCopy = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const Footer = () => {
    const [copied, setCopied] = useState(false);
    const email = "sumanth.udupi@example.com";
    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <footer className="text-center py-8 text-gray-500">
            <div className="relative inline-flex items-center gap-2 mb-4">
                <span className="text-gray-400">{email}</span>
                <button onClick={handleCopy} className="text-gray-400 hover:text-cyan-400">
                    <IconCopy />
                </button>
                <AnimatePresence>
                {copied && <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}} className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm rounded-md py-1 px-3">Copied!</motion.div>}
                </AnimatePresence>
            </div>
            <p>&copy; {new Date().getFullYear()} Sumanth Udupi. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
