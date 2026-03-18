import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ScrollRevealText from '../components/ScrollRevealText';
import MagneticDotGrid from '../components/MagneticDotGrid';
import MetricsStrip from '../components/MetricsStrip';
import KineticName from '../components/KineticName';
import TypewriterText from '../components/TypewriterText';
import SectionDivider from '../components/SectionDivider';
import RollingText from '../components/RollingText';
import ProjectCard from '../components/ProjectCard';
import CopyEmail from '../components/CopyEmail';
import { projects } from '../data/projects';
import './Landing.css';

const Landing = () => {
    const { scrollYProgress } = useScroll();
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const marqueeText = "UI/UX DESIGN · INTERACTION DESIGN · PROTOTYPING · FIGMA · USER RESEARCH · BRANDING · ";

    return (
        <PageTransition>
            <div className="landing page-wrapper">
                {/* Section 1: Hero */}
                <section className="hero hero-section" style={{ position: 'relative' }}>
                    <MagneticDotGrid />
                    <div className="hero-mesh"></div>
                    
                    <div className="hero-mesh"></div>

                    <div className="hero-content">
                        {/* 1. Tag */}
                        <p className="hero-tag">
                            <TypewriterText
                                text="✦ CS Student · UI/UX Designer · Community Builder"
                                speed={35}
                                delay={200}
                                triggerOnView={false}
                            />
                        </p>

                        {/* 2. Name — FULL display */}
                        <h1 className="hero-name">
                            <span className="hero-name-plain">hi, i'm</span>
                            <KineticName text="Megan." />
                        </h1>

                        {/* 3. Sub-headline */}
                        <p className="hero-sub">
                            <TypewriterText
                                text="I design things that feel human — then build them. Currently studying CS at UIUC and designing at the intersection of empathy and engineering."
                                speed={30}
                                delay={1800}
                                triggerOnView={false}
                            />
                        </p>

                        {/* 4. CTAs — their own row */}
                        <div className="hero-ctas">
                            <motion.div initial="rest" whileHover="hover" animate="rest" style={{ display: 'inline-block' }}>
                                <Link to="/projects" className="btn-primary">
                                    <RollingText label="→ See My Work" />
                                </Link>
                            </motion.div>
                            <motion.div initial="rest" whileHover="hover" animate="rest" style={{ display: 'inline-block' }}>
                                <Link to="/about" className="btn-ghost" style={{ padding: 0 }}>
                                    <CopyEmail />
                                </Link>
                            </motion.div>
                        </div>

                        {/* 5. Status pills — their own row, below CTAs */}
                        <div className="hero-status-row">
                            <div className="hero-status-pill glass-1">
                                <span className="status-dot" />
                                <span className="status-text">Open to Internships</span>
                            </div>
                            <div className="hero-status-pill glass-1">
                                <span className="status-icon">📍</span>
                                <span className="status-text">Champaign, IL</span>
                            </div>
                            <div className="hero-status-pill glass-1">
                                <span className="status-icon">🎓</span>
                                <span className="status-text">UIUC '28</span>
                            </div>
                        </div>

                        {/* 6. Easter egg — its own row */}
                        <code className="easter-egg">
                            <TypewriterText
                                text="// fun fact: i had a youtube channel at 11. design instincts run deep."
                                speed={28}
                                delay={0}
                                cursorChar="_"
                            />
                        </code>
                    </div>

                    <div className="scroll-indicator">
                        <div className="scroll-dot"></div>
                    </div>
                </section>

                <SectionDivider label="SELECTED WORK" />

                <MetricsStrip />

                {/* Section 2: Selected Work Teaser */}
                <section id="work-teaser" className="landing-works-section">
                    <ScrollReveal yOffset={50}>
                        <div className="section-header">
                            <h2>Selected Works</h2>
                            <Link to="/projects" className="view-all mono">View All →</Link>
                        </div>
                    </ScrollReveal>

                    <ScrollRevealText
                      as="p"
                      className="srv-body-large"
                      text="A selection of projects where design met engineering — and neither compromised."
                      threshold={0.18}
                    />

                    <div className="projects-showcase-grid">
                        {projects.map((project, i) => (
                            <ScrollReveal key={project.id} delay={i * 0.2} className="teaser-card-wrapper">
                                <Link to="/projects" style={{ textDecoration: 'none', display: 'block' }}>
                                    <ProjectCard project={project} />
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                <SectionDivider label="PHILOSOPHY" />

                {/* Section 3: Statement */}
                <section className="landing-statement-section">
                  <div className="landing-statement-inner">
                    <ScrollRevealText
                      as="h2"
                      className="srv-statement"
                      text="I design for real people. Then I build it so it actually works."
                      threshold={0.12}
                    />
                    <ScrollRevealText
                      as="p"
                      className="srv-body-large"
                      text="Currently studying Computer Science at UIUC and designing at the intersection of empathy and engineering."
                      threshold={0.15}
                    />
                  </div>
                </section>

                {/* Section 4: Marquee */}
                <div className="marquee-container">
                    <div className="marquee">
                        <span className="marquee-text mono">{marqueeText}{marqueeText}{marqueeText}</span>
                    </div>
                </div>

                <SectionDivider label="SKILLS & EXPERTISE" />

                {/* Section 5: Skills Teaser */}
                <section className="skills-teaser">
                    <ScrollReveal>
                        <div className="skills-pill-container">
                            <Link to="/skills" className="skill-pill hoverable">
                                <span className="pill-title">Design</span>
                                <span className="pill-hidden">UX Research, UI, Systems</span>
                            </Link>
                            <Link to="/skills" className="skill-pill hoverable">
                                <span className="pill-title">Development</span>
                                <span className="pill-hidden">React, CSS, HTML</span>
                            </Link>
                            <Link to="/skills" className="skill-pill hoverable">
                                <span className="pill-title">Tools</span>
                                <span className="pill-hidden">Figma, Adobe, ProtoPie</span>
                            </Link>
                        </div>
                    </ScrollReveal>
                </section>
            </div>
        </PageTransition>
    );
};

export default Landing;
