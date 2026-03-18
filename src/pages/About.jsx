import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ScrollRevealText from '../components/ScrollRevealText';
import TypewriterText from '../components/TypewriterText';
import LiveStatus from '../components/LiveStatus';
import AnimatedTimeline from '../components/AnimatedTimeline';
import './About.css';

const scrambleText = (element, originalText) => {
    const chars = '!<>-_\\\\/[]{}—=+*^?#________';
    let iteration = 0;

    clearInterval(element.dataset.interval);

    element.dataset.interval = setInterval(() => {
        element.innerText = originalText
            .split('')
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration >= originalText.length) {
            clearInterval(element.dataset.interval);
        }

        iteration += 1 / 2;
    }, 30);
};

const About = () => {
    const emailRef = useRef(null);

    const handleEmailHover = () => {
        if (emailRef.current) {
            scrambleText(emailRef.current, 'hello@designer.com');
        }
    };

    return (
        <PageTransition>
            <div className="about-page page-wrapper">
                {/* Section 1: Introduction */}
                <section className="about-intro">
                    <div className="intro-text">
                        <ScrollReveal>
                            <LiveStatus showClock={true} className="about-status" />
                            <h1 className="intro-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.2 }}>
                                <TypewriterText
                                  text="hi, i'm megan."
                                  speed={90}
                                  delay={200}
                                  cursorChar="▌"
                                />
                            </h1>
                            <ScrollRevealText
                                as="p"
                                className="srv-body-large intro-bio"
                                text="I'm Megan — a Computer Science student at UIUC with a deep love for design that actually makes people's lives easier. I care about the space where code meets creativity: where a well-crafted interaction makes someone smile, or a cleaner layout makes something finally make sense."
                                threshold={0.15}
                            />
                            <div className="intro-ctas">
                                <a href="mailto:meganmae.jacob@gmail.com" className="cta-button">Let's Talk →</a>
                            </div>

                            <div className="testimonial-block glass-2">
                                <div className="testimonial-quote-mark">"</div>
                                <blockquote className="testimonial-text">
                                    Megan brings both creative instinct and technical precision to every project.
                                    Her ability to translate user research into clean, buildable interfaces is
                                    rare at any level — let alone as a sophomore.
                                </blockquote>
                                <div className="testimonial-attribution">
                                    <div className="testimonial-avatar">P</div>
                                    <div>
                                        <p className="testimonial-name">Professor / Collaborator Name</p>
                                        <p className="testimonial-role">Course / Organization · UIUC</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="intro-visual">
                        <ScrollReveal delay={0.3} className="visual-wrapper">
                            <div className="education-polaroid" style={{
                                background: 'var(--color-text-primary)',
                                color: 'var(--color-bg)',
                                padding: '1.5rem',
                                borderRadius: '4px',
                                boxShadow: '5px 15px 30px rgba(0,0,0,0.3)',
                                transform: 'rotate(-1.5deg)',
                                maxWidth: '320px',
                                position: 'relative'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: '-10px', right: '15px', color: 'var(--color-text-subtle)' }}>
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                </svg>
                                
                                <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2rem' }}>🎓 University of Illinois</p>
                                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', marginLeft: '1.8rem' }}>Urbana-Champaign</p>
                                
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>B.S. Computer Science</p>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Minor: Information Sciences</p>
                                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Expected: 2028</p>
                                
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>📍 Champaign, IL</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* In Another Life Pill Strip */}
                <section style={{ padding: '2rem 0', overflow: 'hidden' }}>
                    <ScrollReveal>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap', width: '100%', overflowX: 'auto', paddingBottom: '1rem', WebkitOverflowScrolling: 'touch' }}>
                            <span style={{ whiteSpace: 'nowrap' }} className="mono">In another life, I am a:</span>
                            {['event planner', 'youtuber (yes, really)', 'community organizer', 'snack taste-tester'].map(v => (
                                <span key={v} style={{ background: 'rgba(255,107,157,0.1)', color: 'var(--color-blush)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', whiteSpace: 'nowrap' }} className="mono">[{v}]</span>
                            ))}
                        </div>
                    </ScrollReveal>
                </section>

                {/* Section 3: What I Value */}
                <section className="about-values">
                    <ScrollReveal>
                        <ScrollRevealText
                            as="h2"
                            className="srv-statement text-center"
                            text="Design should feel inevitable. Like it could never have been any other way."
                            threshold={0.10}
                        />
                    </ScrollReveal>
                    
                    <AnimatedTimeline />

                    <div className="values-grid">
                        <ScrollReveal delay={0.1} className="value-card glass-2 glass-shimmer glass-interactive hoverable" style={{ borderRadius: 20 }}>
                            <div className="value-icon">👁️</div>
                            <h3 className="value-title">Design for Real People</h3>
                            <p className="value-desc">"The best UX is invisible. I design for the moments when someone just... gets it."</p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} className="value-card glass-2 glass-shimmer glass-interactive hoverable" style={{ borderRadius: 20 }}>
                            <div className="value-icon">🤝</div>
                            <h3 className="value-title">Build With, Not For</h3>
                            <p className="value-desc">"Research isn't a phase — it's the whole foundation. I don't skip the sticky notes."</p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3} className="value-card glass-2 glass-shimmer glass-interactive hoverable" style={{ borderRadius: 20 }}>
                            <div className="value-icon">💻</div>
                            <h3 className="value-title">Code-Literate Design</h3>
                            <p className="value-desc">"I speak developer. That means my handoffs are clean, my components are realistic, and nothing breaks in production."</p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Section 4: Currently / Interests */}
                <section className="about-currently">
                    <ScrollReveal>
                        <div className="currently-section">
                          <span className="currently-label">/ currently</span>
                          <div className="currently-grid">
                            {[
                              { emoji: '📖', category: 'Reading',    value: 'The Design of Everyday Things — Don Norman' },
                              { emoji: '🎨', category: 'Designing',  value: 'CAT Inspect case study deep-dive'           },
                              { emoji: '💻', category: 'Building',   value: 'This portfolio (always iterating)'           },
                              { emoji: '🎵', category: 'Listening',  value: 'whatever the Spotify widget says'            },
                              { emoji: '📍', category: 'Located',    value: 'Champaign, IL — open to relocate'            },
                              { emoji: '🌱', category: 'Learning',   value: 'Three.js + WebGL shaders'                   },
                            ].map(({ emoji, category, value }) => (
                              <div key={category} className="currently-item">
                                <span className="currently-emoji">{emoji}</span>
                                <div>
                                  <span className="currently-category">{category}</span>
                                  <span className="currently-value">{value}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Photo Collage / Mood Board */}
                        <div className="collage-section">
                          <span className="collage-label">life outside the screen</span>
                          <div className="collage-grid">
                            <div className="collage-item collage-item--1">
                              <div className="collage-photo collage-photo--placeholder">
                                <span>PSA Event 📸</span>
                              </div>
                            </div>
                            <div className="collage-item collage-item--2">
                              <div className="collage-photo collage-photo--placeholder">
                                <span>Workspace ✨</span>
                              </div>
                            </div>
                            <div className="collage-item collage-item--3">
                              <div className="collage-photo collage-photo--placeholder">
                                <span>Campus 🌿</span>
                              </div>
                            </div>
                            <div className="collage-item collage-item--4">
                              <div className="collage-photo collage-photo--placeholder">
                                <span>FACT Conf 🎤</span>
                              </div>
                            </div>
                            <div className="collage-item collage-item--5">
                              <div className="collage-photo collage-photo--placeholder">
                                <span>Figma work 🎨</span>
                              </div>
                            </div>
                          </div>
                        </div>
                    </ScrollReveal>
                </section>

                {/* Scramble Email Contact */}
                <section className="about-contact">
                    <ScrollReveal>
                        <a
                            href="mailto:hello@designer.com"
                            className="scramble-email"
                            onMouseEnter={handleEmailHover}
                            ref={emailRef}
                        >
                            hello@designer.com
                        </a>
                    </ScrollReveal>
                </section>
            </div>
        </PageTransition>
    );
};

export default About;
