import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import RollingText from './RollingText';
import './Navbar.css';

export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const isDark = theme === 'dark';
  
    return (
      <motion.button
        onClick={toggle}
        aria-label="Toggle theme"
        whileTap={{ scale: 0.92 }}
        className="glass-1 glass-interactive"
        style={{
          width: 52,
          height: 28,
          borderRadius: 99,
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
    const [moreOpen, setMoreOpen] = useState(false);
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
        <header className={`navbar glass-1 glass-shimmer ${scrolled ? 'scrolled' : ''}`} style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
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
                                <motion.div initial="rest" whileHover="hover" animate="rest" style={{ display: 'inline-block' }}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) => (isActive ? 'nav-link active mono' : 'nav-link mono')}
                                    >
                                        <RollingText label={link.name} />
                                    </NavLink>
                                </motion.div>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="nav-more-wrapper"
                        onMouseEnter={() => setMoreOpen(true)}
                        onMouseLeave={() => setMoreOpen(false)}
                    >
                        <motion.div initial="rest" whileHover="hover" animate="rest" style={{ display: 'inline-block' }}>
                            <span className="nav-link mono" style={{ cursor: 'pointer' }}>
                                <RollingText label="More ▾" />
                            </span>
                        </motion.div>
                        <AnimatePresence>
                            {moreOpen && (
                                <motion.div
                                    className="more-dropdown glass-2"
                                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.div initial="rest" whileHover="hover" animate="rest">
                                        <Link to="/labs" className="dropdown-item">
                                            <span className="dropdown-icon">✦</span>
                                            <div className="dropdown-text">
                                                <RollingText label="Labs" className="dropdown-label" />
                                                <span className="dropdown-desc">Experiments & micro-projects</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                    <motion.div initial="rest" whileHover="hover" animate="rest">
                                        <Link to="/uses" className="dropdown-item">
                                            <span className="dropdown-icon">♡</span>
                                            <div className="dropdown-text">
                                                <RollingText label="Uses" className="dropdown-label" />
                                                <span className="dropdown-desc">My tools & setup</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                    <motion.div initial="rest" whileHover="hover" animate="rest">
                                        <Link to="/guestbook" className="dropdown-item">
                                            <span className="dropdown-icon">✉</span>
                                            <div className="dropdown-text">
                                                <RollingText label="Guestbook" className="dropdown-label" />
                                                <span className="dropdown-desc">Leave a note</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                    <motion.div initial="rest" whileHover="hover" animate="rest">
                                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                                            <span className="dropdown-icon">📄</span>
                                            <div className="dropdown-text">
                                                <RollingText label="Resume" className="dropdown-label" />
                                                <span className="dropdown-desc">Download PDF</span>
                                            </div>
                                        </a>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
                        <ThemeToggle />
                        <div className="cmd-k-hint glass-1 mono">⌘K</div>
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
