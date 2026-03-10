import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import TypewriterText from '../components/TypewriterText';
import { designSkills, devSkills, toolSkills, softSkills } from '../data/skills';
import { experience } from '../data/experience';
import './Skills.css';

const SkillBar = ({ skill, index }) => (
    <div className="skill-row">
        <div className="skill-labels">
            <span>{skill.name}</span>
            <span className="mono skill-percent">{skill.level}%</span>
        </div>
        <div className="skill-bar-bg">
            <motion.div
                className="skill-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 + (index * 0.05), ease: "easeOut" }}
            />
        </div>
    </div>
);

const Skills = () => {
    return (
        <PageTransition>
            <div className="skills-page page-wrapper">
                <header className="page-header">
                    <ScrollReveal>
                        <h1 className="page-title" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
                            <TypewriterText text={`"I design it.`} speed={60} delay={0} cursor={false} />
                            <br />
                            <TypewriterText text={` Then I build it."`} speed={60} delay={900} />
                        </h1>
                    </ScrollReveal>
                </header>

                <div className="skills-columns">
                    <ScrollReveal delay={0.1} className="skills-column">
                        <h2>Design</h2>
                        {designSkills.map((v, i) => <SkillBar key={v.name} skill={v} index={i} />)}
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} className="skills-column">
                        <h2>Tools</h2>
                        {toolSkills.map((v, i) => <SkillBar key={v} skill={{name: v, level: 100}} index={i} />)}
                    </ScrollReveal>

                    <ScrollReveal delay={0.3} className="skills-column">
                        <h2>Dev Literacy</h2>
                        {devSkills.map((v, i) => <SkillBar key={v.name} skill={v} index={i} />)}
                    </ScrollReveal>
                </div>

                {/* Dev + Design Crossover Section */}
                <ScrollReveal>
                    <div style={{
                        marginTop: '4rem',
                        padding: '2rem',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-blush)',
                        borderRadius: '12px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-primary)'
                    }}>
                        <p style={{ color: 'var(--color-coral)', fontWeight: 600, marginBottom: '1rem' }}>╔══════════════════════════════════════════════════╗</p>
                        <p>║  The intersection is where I live.               ║</p>
                        <p>║                                                  ║</p>
                        <p>║  Most designers can't read a PR.                 ║</p>
                        <p>║  Most devs don't care about kerning.             ║</p>
                        <p>║  I do both.                                      ║</p>
                        <p>║                                                  ║</p>
                        <p>║  <span style={{ background: 'var(--gradient-sunset)', color: 'var(--color-bg)', padding: '2px 8px', borderRadius: '99px' }}>[ Figma → Code → Ship ]</span>                     ║</p>
                        <p style={{ color: 'var(--color-coral)', fontWeight: 600, marginTop: '1rem' }}>╚══════════════════════════════════════════════════╝</p>
                    </div>
                </ScrollReveal>

                {/* Experience & Leadership */}
                <section className="experience-section" style={{ marginTop: '6rem' }}>
                    <ScrollReveal>
                        <h2 className="section-title">Leadership & Experience</h2>
                    </ScrollReveal>
                    
                    <div className="experience-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {experience.flatMap(exp => exp.roles.map((role, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1}>
                                <div className="experience-card" style={{
                                    background: 'var(--color-bg)',
                                    padding: '1.5rem',
                                    borderRadius: '8px',
                                    borderLeft: `4px solid var(--color-blush)`
                                }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{role.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-peach)' }}>{exp.org}</p>
                                    <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{role.period}</p>
                                    
                                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                                        {role.bullets.map((b, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{b}</li>)}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        )))}
                    </div>
                </section>

                <section className="soft-skills-section">
                    <ScrollReveal>
                        <h3 className="section-title text-center">Beyond the screen</h3>
                        <div className="soft-skills-strip">
                            {softSkills.map((skill, index) => (
                                <div
                                    key={skill}
                                    className="soft-skill-badge"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </section>
            </div>
        </PageTransition>
    );
};

export default Skills;
