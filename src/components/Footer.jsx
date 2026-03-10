import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 5%' }}>
            <div className="footer-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                    <div className="footer-left">
                        <p>Made with ♥ in Champaign, IL</p>
                        <p style={{ color: 'var(--color-text-subtle)' }}>Megan Mae Jacob &copy; {new Date().getFullYear()}</p>
                    </div>
                    
                    <div className="footer-right" style={{ textAlign: 'right' }}>
                        <a href="mailto:meganmae.jacob@gmail.com" className="email-cta" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                            <span className="email-text">meganmae.jacob@gmail.com</span>
                            <span className="email-arrow">→</span>
                        </a>
                        <div className="social-links mono" style={{ justifyContent: 'flex-end' }}>
                            <a href="https://github.com" target="_blank" rel="noreferrer">[GitHub]</a>
                            <a href="https://linkedin.com/in/meganmaejacob" target="_blank" rel="noreferrer">[LinkedIn]</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom" style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        // designed in figma · built in react · vibes: immaculate
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
