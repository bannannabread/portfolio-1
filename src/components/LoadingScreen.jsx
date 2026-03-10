import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

const blobs = [
  // MEGA blob — slow anchor behind everything
  { color: "#FFAB76", size: 320, top: "30%", left: "30%",  duration: 4.5, delay: 0,   opacity: 0.6 },

  // MID blobs — main lava movement
  { color: "#FF6B9D", size: 220, top: "8%",  left: "10%",  duration: 2.8, delay: 0,   opacity: 0.9 },
  { color: "#FF8C69", size: 190, top: "65%", left: "8%",   duration: 3.2, delay: 0.6, opacity: 0.85 },
  { color: "#FF6B9D", size: 200, top: "15%", left: "65%",  duration: 2.5, delay: 0.3, opacity: 0.9 },
  { color: "#FFD166", size: 160, top: "72%", left: "70%",  duration: 3.8, delay: 1.0, opacity: 0.8 },
  { color: "#C9184A", size: 140, top: "42%", left: "50%",  duration: 2.2, delay: 0.7, opacity: 0.75 },

  // MICRO blobs — fast darting accents
  { color: "#FF6B9D", size: 65,  top: "20%", left: "50%",  duration: 1.8, delay: 0.2, opacity: 0.95 },
  { color: "#FFD166", size: 50,  top: "78%", left: "35%",  duration: 1.5, delay: 1.1, opacity: 0.9  },
  { color: "#FF8C69", size: 70,  top: "55%", left: "80%",  duration: 2.0, delay: 0.5, opacity: 0.85 },
];

const LoadingScreen = () => {
  const nameLetters = "megan mae jacob".split("");

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFF5EE',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Lava Blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {blobs.map((blob, i) => (
          <div
            key={i}
            className={`lava-blob ${blob.size <= 70 ? 'lava-blob-micro' : ''}`}
            style={{
              width: blob.size,
              height: blob.size,
              top: blob.top,
              left: blob.left,
              backgroundColor: blob.color,
              opacity: blob.opacity,
              animationDelay: `${blob.delay}s`,
              animationDuration: `${blob.duration}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Step 1: Small Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            color: '#C9184A',
            marginBottom: '1rem',
            letterSpacing: '0.05em'
          }}
        >
          ✦ UI/UX Designer &amp; CS Student
        </motion.div>

        {/* Step 2: Name Letters */}
        <div style={{ display: 'flex', gap: '0.1rem', marginBottom: '2rem' }}>
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.5 + index * 0.06,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                color: '#1A0A1E',
                display: 'inline-block',
                whiteSpace: letter === ' ' ? 'pre' : 'normal'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Step 3: Progress Bar */}
        <div style={{ width: '200px', height: '3px', backgroundColor: 'rgba(26, 10, 30, 0.1)', borderRadius: '99px', overflow: 'hidden', marginBottom: '1rem' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 1.6, ease: "easeInOut" }}
            style={{
              height: '100%',
              background: 'linear-gradient(to right, #FF6B9D, #FFD166)',
              borderRadius: '99px'
            }}
          />
        </div>

        {/* Step 4: Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.4 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: '#888',
            fontStyle: 'italic'
          }}
        >
          <TypewriterText
            text="entering portfolio →"
            speed={55}
            delay={1800}
            triggerOnView={false}
            cursor={false}
          />
        </motion.div>

      </div>
    </motion.div>
  );
};

export default LoadingScreen;
