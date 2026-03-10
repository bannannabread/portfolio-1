import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
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

    const timelineData = [
        { year: '2023 - Present', role: 'Lead UI/UX Designer', entity: 'Studio Freight', desc: 'Leading design systems and brand identity projects.' },
        { year: '2021 - 2023', role: 'Product Designer', entity: 'Fintech Startup XYZ', desc: 'Redesigned the core mobile application, improving SUS by 20%.' },
        { year: '2019 - 2021', role: 'UX/UI Designer', entity: 'Creative Agency', desc: 'Delivered web experiences for e-commerce and lifestyle brands.' },
        { year: '2018', role: 'BDes Interaction Design', entity: 'Design University', desc: 'Graduated with honors. Thesis on emotive micro-interactions.' },
    ];

    return (
        <PageTransition>
            <div className="about-page">
                {/* Section 1: Introduction */}
                <section className="about-intro">
                    <div className="intro-text">
                        <ScrollReveal>
                            <h1 className="intro-title">
                                Hi, I'm<br />
                                <span className="italic text-gradient">Jane Doe</span> ✦
                            </h1>
                            <h2 className="intro-subtitle">
                                A UI/UX designer obsessed with<br />
                                the space where beauty meets function.
                            </h2>
                            <p className="intro-bio">
                                I believe that digital products should feel alive. With a background in both rigid systems
                                and fluid interaction design, I bridge the gap between aesthetics and usability.
                                My work is driven by empathy, prototyping, and a slight perfectionism when it comes to typography.
                            </p>
                            <div className="intro-ctas">
                                <a href="#resume" className="cta-button">Download Resume ↓</a>
                                <a href="#contact" className="cta-button secondary">Let's Talk →</a>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="intro-visual">
                        <ScrollReveal delay={0.3} className="visual-wrapper">
                            <div className="portrait-placeholder">
                                <span className="portrait-initials">JD</span>
                            </div>
                            <div className="status-badge">
                                <div className="status-dot"></div>
                                <span className="mono">Open to Work</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Section 2: My Story (Timeline) */}
                <section className="about-timeline">
                    <ScrollReveal>
                        <h2 className="section-title">My Story</h2>
                    </ScrollReveal>

                    <div className="timeline-container">
                        {timelineData.map((item, index) => (
                            <ScrollReveal key={index} delay={index * 0.15} className="timeline-item">
                                <div className="timeline-year mono">{item.year}</div>
                                <div className="timeline-divider">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-line"></div>
                                </div>
                                <div className="timeline-content">
                                    <h3 className="timeline-role">{item.role}</h3>
                                    <h4 className="timeline-entity">{item.entity}</h4>
                                    <p className="timeline-desc">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* Section 3: What I Value */}
                <section className="about-values">
                    <ScrollReveal>
                        <h2 className="section-title text-center">Design Philosophy</h2>
                    </ScrollReveal>

                    <div className="values-grid">
                        <ScrollReveal delay={0.1} className="value-card hoverable">
                            <div className="value-icon">👁️</div>
                            <h3 className="value-title">Empathy First</h3>
                            <p className="value-desc">"Design is listening before it's drawing." Understanding the human behavior behind the screen is paramount.</p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} className="value-card hoverable">
                            <div className="value-icon">✂️</div>
                            <h3 className="value-title">Clarity Over Clutter</h3>
                            <p className="value-desc">"Every element must earn its place." Reducing cognitive load makes for elegant, effortless experiences.</p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3} className="value-card hoverable">
                            <div className="value-icon">✨</div>
                            <h3 className="value-title">Delight in Details</h3>
                            <p className="value-desc">"The micro-moments are where trust is built." Small animations and curated typography define premium.</p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Section 4: Currently / Interests */}
                <section className="about-currently">
                    <ScrollReveal>
                        <div className="currently-grid">
                            <dl className="info-list">
                                <div className="info-row">
                                    <dt className="mono">Currently listening to:</dt>
                                    <dd>Fred again.. - Actual Life 3</dd>
                                </div>
                                <div className="info-row">
                                    <dt className="mono">Currently reading:</dt>
                                    <dd>The Creative Act: A Way of Being</dd>
                                </div>
                                <div className="info-row">
                                    <dt className="mono">Obsessed with:</dt>
                                    <dd>Baking perfect sourdough</dd>
                                </div>
                                <div className="info-row">
                                    <dt className="mono">Based in:</dt>
                                    <dd>London, UK</dd>
                                </div>
                                <div className="info-row">
                                    <dt className="mono">Available for:</dt>
                                    <dd className="text-gradient">Freelance & Full-time roles</dd>
                                </div>
                            </dl>
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
