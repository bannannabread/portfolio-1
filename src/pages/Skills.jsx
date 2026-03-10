import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { designSkills, devSkills, toolsSkills, softSkills } from '../data/skills';
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
            <div className="skills-page">
                <header className="page-header">
                    <ScrollReveal>
                        <h1 className="page-title">My <span className="italic text-gradient">Craft</span></h1>
                        <p className="page-subtitle">The tools and disciplines I use to bring ideas to life.</p>
                    </ScrollReveal>
                </header>

                <div className="skills-columns">
                    <ScrollReveal delay={0.1} className="skills-column">
                        <h2>Design</h2>
                        {designSkills.map((v, i) => <SkillBar key={v.name} skill={v} index={i} />)}
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} className="skills-column">
                        <h2>Tools</h2>
                        {toolsSkills.map((v, i) => <SkillBar key={v.name} skill={v} index={i} />)}
                    </ScrollReveal>

                    <ScrollReveal delay={0.3} className="skills-column">
                        <h2>Dev Literacy</h2>
                        {devSkills.map((v, i) => <SkillBar key={v.name} skill={v} index={i} />)}
                    </ScrollReveal>
                </div>

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
