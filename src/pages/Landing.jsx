import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import TypewriterText from '../components/TypewriterText';
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
            <div className="landing page-wrapper">
                {/* Section 1: Hero */}
                <section className="hero" style={{ position: 'relative' }}>
                    <div className="hero-mesh"></div>
                    
                    {/* Status Badge */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        transition={{ delay: 3, duration: 0.5 }}
                        className="status-badge"
                        style={{
                            position: 'absolute',
                            top: '10%',
                            right: '5%',
                            background: 'var(--color-text-primary)',
                            color: 'var(--color-bg)',
                            padding: '1rem',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            border: '1px solid rgba(0,0,0,0.1)',
                            boxShadow: '4px 4px 15px rgba(0,0,0,0.2)',
                            zIndex: 10,
                            maxWidth: '200px'
                        }}
                    >
                        <strong>📍 Champaign, IL</strong><br/>
                        🎓 UIUC '28<br/>
                        <span style={{ color: 'var(--color-rose-deep)' }}>✦ Open to internships</span>
                    </motion.div>

                    <div className="hero-content">
                        <p className="hero-label mono">
                            <TypewriterText
                                text="✦ CS Student · UI/UX Designer · Community Builder"
                                speed={35}
                                delay={200}
                                triggerOnView={false}
                            />
                        </p>
                        <h1 className="hero-title" ref={titleRef}>
                            <div className="word-wrap" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900 }}><span className="word italic">hi, i'm</span></div>
                            <div className="word-wrap" style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', fontWeight: 900 }}><span className="word italic text-gradient">Megan.</span></div>
                        </h1>
                        <p className="hero-subtitle" style={{ maxWidth: '480px', margin: '0 auto 2rem', color: 'var(--color-text-muted)' }}>
                            <TypewriterText
                                text="I design things that feel human — then build them. Currently studying CS at UIUC and designing at the intersection of empathy and engineering."
                                speed={30}
                                delay={1800}
                                triggerOnView={false}
                            />
                        </p>
                        <div className="hero-ctas">
                            <Link to="/projects" className="cta-button">→ See My Work</Link>
                            <Link to="/about" className="cta-button secondary">↓ Read My Story</Link>
                        </div>
                    </div>

                    <div className="scroll-indicator">
                        <div className="scroll-dot"></div>
                    </div>
                </section>

                {/* Fun Fact Easter Egg */}
                <div style={{ textAlign: 'center', width: '100%', marginBottom: '4rem' }}>
                    <p className="mono" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                        <TypewriterText
                            text="// fun fact: i had a youtube channel at 11. design instincts run deep."
                            speed={28}
                            delay={0}
                            cursorChar="_"
                        />
                    </p>
                </div>

                {/* Section 2: Selected Work Teaser */}
                <section id="work-teaser" className="work-teaser">
                    <ScrollReveal yOffset={50}>
                        <div className="section-header">
                            <h2>Selected Works</h2>
                            <Link to="/projects" className="view-all mono">View All →</Link>
                        </div>
                    </ScrollReveal>

                    <div className="teaser-grid">
                        {projects.map((project, i) => (
                            <ScrollReveal key={project.id} delay={i * 0.2} className="teaser-card-wrapper">
                                <Link to="/projects" className="project-card hoverable">
                                    <div className="card-thumb" style={{ background: `linear-gradient(135deg, ${project.accentColor}, var(--color-bg))` }}></div>
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
