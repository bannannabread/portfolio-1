import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const isDark = theme === 'dark';
  
    return (
      <motion.button
        onClick={toggle}
        aria-label="Toggle theme"
        whileTap={{ scale: 0.92 }}
        style={{
          width: 52,
          height: 28,
          borderRadius: 99,
          background: isDark
            ? 'rgba(255,107,157,0.15)'
            : 'linear-gradient(135deg, #FF6B9D, #FFD166)',
          border: '1.5px solid var(--color-blush)',
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '3px',
          transition: 'background 0.4s ease',
        }}
      >
        <motion.div
          animate={{ x: isDark ? 0 : 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: isDark ? '#FF6B9D' : '#FFF5EE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
          }}
        >
          {isDark ? '🌙' : '☀️'}
        </motion.div>
      </motion.button>
    );
}

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { theme, toggle } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Close menu when route changes
        setMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Work', path: '/projects' },
        { name: 'Skills', path: '/skills' },
        { name: 'About', path: '/about' },
    ];

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <NavLink to="/" className="nav-logo">
                    <div className="logo-badge">
                        <span className="logo-initials">M</span>
                    </div>
                </NavLink>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => (isActive ? 'nav-link active mono' : 'nav-link mono')}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <ThemeToggle />
                        <a href="#contact" className="cta-button">
                            Let's Talk
                        </a>
                    </div>
                </nav>

                {/* Mobile Hamburger Icon */}
                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        className="mobile-nav"
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ul className="mobile-nav-links">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <NavLink to={link.path} className="mobile-nav-link mono">
                                        {link.name}
                                    </NavLink>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <a href="#contact" className="mobile-cta-button" onClick={() => setMenuOpen(false)}>
                                    Contact Me
                                </a>
                            </motion.li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
