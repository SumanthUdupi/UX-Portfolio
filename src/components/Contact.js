import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [status, setStatus] = useState("idle");
    const [errors, setErrors] = useState({});
    const validate = (formData) => {
        const newErrors = {};
        if (!formData.get("name")) newErrors.name = "Name is required.";
        if (!/\S+@\S+\.\S+/.test(formData.get("email"))) newErrors.email = "Email is invalid.";
        if (!formData.get("message")) newErrors.message = "Message is required.";
        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); setStatus("sending");
        const formData = new FormData(e.target);
        const formErrors = validate(formData);
        if (Object.keys(formErrors).length > 0) { setErrors(formErrors); setStatus("error"); return; }
        setErrors({});
        await new Promise(r => setTimeout(r, 2000));
        setStatus("success"); e.target.reset(); setTimeout(() => setStatus("idle"), 3000);
    };
    const shakeVariants = { shake: { rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } }, idle: { rotate: 0 } };
    return (
        <section id="contact" className="container mx-auto px-4 py-16">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <motion.div className="mb-4" animate={errors.name ? 'shake' : 'idle'} variants={shakeVariants}>
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input type="text" name="name" id="name" className={`w-full p-3 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 border-2 ${errors.name ? 'border-red-500' : 'border-transparent focus:border-cyan-500'}`} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </motion.div>
                <motion.div className="mb-4" animate={errors.email ? 'shake' : 'idle'} variants={shakeVariants}>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input type="email" name="email" id="email" className={`w-full p-3 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 border-2 ${errors.email ? 'border-red-500' : 'border-transparent focus:border-cyan-500'}`} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </motion.div>
                <motion.div className="mb-6" animate={errors.message ? 'shake' : 'idle'} variants={shakeVariants}>
                    <label htmlFor="message" className="block mb-2">Message</label>
                    <textarea name="message" id="message" rows="5" className={`w-full p-3 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 border-2 ${errors.message ? 'border-red-500' : 'border-transparent focus:border-cyan-500'}`}></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </motion.div>
                <button type="submit" disabled={status === 'sending'} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center h-14">
                    <AnimatePresence mode="wait">
                        {status === "idle" && <motion.span key="idle" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Send Message</motion.span>}
                        {status === "sending" && <motion.div key="sending" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></motion.div>}
                        {status === "success" && <motion.span key="success" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Message Sent! ✔</motion.span>}
                        {status === "error" && <motion.span key="error" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Please fix errors</motion.span>}
                    </AnimatePresence>
                </button>
            </form>
        </section>
    );
};

export default Contact;
