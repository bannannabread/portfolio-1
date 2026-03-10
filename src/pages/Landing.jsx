import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { projects } from '../data/projects';
import './Landing.css';

const Landing = () => {
    const { scrollYProgress } = useScroll();
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const titleRef = useRef(null);

    useEffect(() => {
        // GSAP text reveal
        const words = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(words,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            }
        );
    }, []);

    const marqueeText = "UI/UX DESIGN · INTERACTION DESIGN · PROTOTYPING · FIGMA · USER RESEARCH · BRANDING · ";

    return (
        <PageTransition>
            <div className="landing">
                {/* Section 1: Hero */}
                <section className="hero">
                    <div className="hero-mesh"></div>
                    <div className="hero-content">
                        <p className="hero-label mono">
                            <span className="star">✦</span> UI/UX Designer & Creative Thinker
                        </p>
                        <h1 className="hero-title" ref={titleRef}>
                            <div className="word-wrap"><span className="word">Jane</span></div>
                            <div className="word-wrap"><span className="word italic text-gradient">Doe</span></div>
                        </h1>
                        <p className="hero-subtitle">
                            Crafting digital experiences that feel<br />as beautiful as they function.
                        </p>
                        <div className="hero-ctas">
                            <Link to="/projects" className="cta-button">View My Work →</Link>
                            <a href="#work-teaser" className="cta-button secondary">Scroll to Explore ↓</a>
                        </div>
                    </div>

                    <div className="scroll-indicator">
                        <div className="scroll-dot"></div>
                    </div>
                </section>

                {/* Section 2: Selected Work Teaser */}
                <section id="work-teaser" className="work-teaser">
                    <ScrollReveal yOffset={50}>
                        <div className="section-header">
                            <h2>Selected Works</h2>
                            <Link to="/projects" className="view-all mono">View All →</Link>
                        </div>
                    </ScrollReveal>

                    <div className="teaser-grid">
                        {projects.slice(0, 3).map((project, i) => (
                            <ScrollReveal key={project.id} delay={i * 0.2} className="teaser-card-wrapper">
                                <Link to="/projects" className="project-card hoverable">
                                    <div className="card-thumb" style={{ background: `linear-gradient(135deg, ${project.accentColor}, var(--color-midnight))` }}></div>
                                    <div className="card-info">
                                        <span className="card-tag mono">{project.category}</span>
                                        <h3 className="card-title">{project.title}</h3>
                                        <span className="card-arrow">→</span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* Section 3: Statement */}
                <section className="statement">
                    <ScrollReveal>
                        <h2 className="statement-text">
                            "I design for humans,<br />
                            <span className="italic text-gradient">not for screens.</span>"
                        </h2>
                        <div className="statement-bottom">
                            <p>Believing in empathy-driven, heavily aesthetics-focused digital environments.</p>
                            <Link to="/about" className="cta-button secondary">More About Me →</Link>
                        </div>
                    </ScrollReveal>
                </section>

                {/* Section 4: Marquee */}
                <div className="marquee-container">
                    <div className="marquee">
                        <span className="marquee-text mono">{marqueeText}{marqueeText}{marqueeText}</span>
                    </div>
                </div>

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
