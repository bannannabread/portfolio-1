// Footer.jsx — Full sitemap footer
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github as GitHubIcon, Linkedin as LinkedInIcon, Dribbble as DribbbleIcon } from 'lucide-react';
import RollingText from './RollingText';
import LiveStatus from './LiveStatus';
import NowPlaying from './NowPlaying';

const BehanceIcon = ({ size }) => (
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: size }}>B</span>
);

const footerLinks = {
  General: [
    { label: 'Home',       to: '/' },
    { label: 'Projects',   to: '/projects' },
    { label: 'Skills',     to: '/skills' },
    { label: 'Guestbook',  to: '/guestbook' },
    { label: 'Uses',       to: '/uses' },
  ],
  About: [
    { label: 'About Me',   to: '/about' },
    { label: 'Contact',    href: 'mailto:meganmae.jacob@gmail.com' },
    { label: 'Resume',     href: '/resume.pdf',  download: true },
  ],
  Connect: [
    { label: 'LinkedIn',   href: 'https://linkedin.com/in/meganmaejacob', external: true },
    { label: 'GitHub',     href: 'https://github.com/', external: true },
    { label: 'Dribbble',   href: '#', external: true },
    { label: 'Behance',    href: '#', external: true },
  ],
  Legal: [
    { label: 'Privacy Policy',    href: '#' },
    { label: 'Terms & Conditions', href: '#' },
  ],
};

const socialIcons = [
  { label: 'GitHub',   href: 'https://github.com/',                      icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/meganmaejacob',    icon: LinkedInIcon },
  { label: 'Dribbble', href: '#',                                         icon: DribbbleIcon },
  { label: 'Behance',  href: '#',                                         icon: BehanceIcon },
];

export default function Footer() {
  return (
    <footer className="footer-root">
      {/* ── Top card ── */}
      <div className="footer-card glass-2">
        <div className="footer-brand">
          {/* Large display name — same font as hero */}
          <span className="footer-logo">MEGAN</span>
          <p className="footer-tagline">
            Designing things that feel human, then building them.
            Every interaction tells a story. Every pixel has a purpose.
          </p>
          <LiveStatus showClock={false} className="footer-status" />
        </div>

        <nav className="footer-columns">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div className="footer-col" key={category}>
              <h4 className="footer-col-heading">{category}</h4>
              <ul className="footer-col-list">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.div initial="rest" whileHover="hover" animate="rest" style={{ display: 'inline-block' }}>
                      {link.to ? (
                        <Link to={link.to} className="footer-link">
                          <RollingText label={link.label} />
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="footer-link"
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                        >
                          <RollingText label={link.label} />
                        </a>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <NowPlaying />
          <p className="footer-copyright">
            © {new Date().getFullYear()} MEGAN MAE JACOB. ALL RIGHTS RESERVED.
          </p>
        </div>
        <div className="footer-socials">
          {socialIcons.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              whileHover={{ scale: 1.15, color: 'var(--color-blush)' }}
              whileTap={{ scale: 0.92 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
