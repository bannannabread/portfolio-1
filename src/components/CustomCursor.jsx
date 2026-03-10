import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [isDesktop, setIsDesktop] = useState(true);

    // Use spring physics for smooth trailing effect
    const cursorX = useSpring(0, { stiffness: 150, damping: 15 });
    const cursorY = useSpring(0, { stiffness: 150, damping: 15 });
    const dotX = useSpring(0, { stiffness: 1000, damping: 30 });
    const dotY = useSpring(0, { stiffness: 1000, damping: 30 });

    useEffect(() => {
        // Only show custom cursor on fine pointers (desktop)
        const checkIsDesktop = () => {
            setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
        };
        checkIsDesktop();
        window.addEventListener('resize', checkIsDesktop);

        if (!isDesktop) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX - 20); // offset by half width of the ring (40/2)
            cursorY.set(e.clientY - 20);
            dotX.set(e.clientX - 4);   // offset by half width of dot (8/2)
            dotY.set(e.clientY - 4);
        };

        window.addEventListener('mousemove', moveCursor);

        const handleMouseOver = (e) => {
            // Check for interactive elements
            const target = e.target.closest('a, button, .project-card, .hoverable');
            if (target) {
                setIsHovered(true);
                if (target.classList.contains('project-card')) {
                    setHoverText('View →');
                } else {
                    setHoverText('');
                }
            } else {
                setIsHovered(false);
                setHoverText('');
            }
        };

        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('resize', checkIsDesktop);
        };
    }, [cursorX, cursorY, dotX, dotY, isDesktop]);

    if (!isDesktop) return null;

    return (
        <>
            <motion.div
                className={`cursor-ring ${isHovered ? 'hovered' : ''}`}
                style={{
                    x: cursorX,
                    y: cursorY
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {hoverText && <span className="cursor-text mono">{hoverText}</span>}
            </motion.div>

            <motion.div
                className={`cursor-dot ${isHovered ? 'hidden' : ''}`}
                style={{
                    x: dotX,
                    y: dotY
                }}
            />
        </>
    );
};

export default CustomCursor;
