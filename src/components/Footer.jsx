import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="footer-container">
                <h2 className="footer-heading">Let's build something<br />beautiful together.</h2>

                <a href="mailto:hello@designer.com" className="email-cta">
                    <span className="email-text">hello@designer.com</span>
                    <span className="email-arrow">→</span>
                </a>

                <div className="footer-bottom">
                    <div className="social-links mono">
                        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                        <a href="https://dribbble.com" target="_blank" rel="noreferrer">Dribbble</a>
                        <a href="https://behance.net" target="_blank" rel="noreferrer">Behance</a>
                    </div>

                    <p className="copyright mono">
                        &copy; {new Date().getFullYear()} Designer Name. Built with React.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
