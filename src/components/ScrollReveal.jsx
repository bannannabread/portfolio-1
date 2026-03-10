import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0.1, yOffset = 30, className = '' }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: yOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
