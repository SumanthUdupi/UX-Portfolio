import React from 'react';
import { motion } from 'framer-motion';

const BackToTopButton = () => {
    const { scrollY } = useScroll();
    const [showButton, setShowButton] = useState(false);
    useEffect(() => scrollY.on("change", (latest) => setShowButton(latest > 200)), [scrollY]);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    return (
        <AnimatePresence>
            {showButton && <motion.button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-cyan-600 text-white p-3 rounded-full shadow-lg z-40" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} whileHover={{ scale: 1.1, rotate: -15 }} whileTap={{ scale: 0.9 }}> <IconArrowUp /> </motion.button>}
        </AnimatePresence>
    );
};

export default BackToTopButton;
