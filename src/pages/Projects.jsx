import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import TypewriterText from '../components/TypewriterText';
import ProjectCard from '../components/ProjectCard';
import DeviceReveal from '../components/DeviceReveal';
import PhysicsShowcase from '../components/PhysicsShowcase';
import { projects } from '../data/projects';
import './Projects.css';

const categories = ['All', 'Web', 'Mobile'];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const featuredProject = projects.find(p => p.id === 2);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    const toggleModal = (project) => {
        setSelectedProject(project);
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <PageTransition>
            <div className="projects-page page-wrapper">
                <header className="page-header">
                    <ScrollReveal>
                        <h1 className="page-title">
                            <TypewriterText text="Selected Works_" speed={80} delay={100} cursorChar="" />
                        </h1>
                        <p className="page-subtitle">A collection of digital experiences designed with purpose.</p>
                    </ScrollReveal>
                </header>

                <DeviceReveal 
                    project={featuredProject} 
                    frameType={featuredProject?.id === 3 ? 'browser' : 'phone'} 
                />

                {/* Filter Bar */}
                <ScrollReveal delay={0.2}>
                    <div className="filter-bar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn mono ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                                {filter === cat && (
                                    <motion.div
                                        layoutId="filter-indicator"
                                        className="filter-indicator"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Physics WebGL Interactive */}
                <ScrollReveal delay={0.3}>
                    <PhysicsShowcase />
                </ScrollReveal>

                {/* Project Grid */}
                <div className="projects-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className={`grid-item ${index % 2 === 0 ? 'large' : 'small'}`}
                                onClick={() => toggleModal(project)}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Project Modal View */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            className="project-modal-wrapper"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            <div className="modal-header">
                                <button className="close-btn hoverable" onClick={() => toggleModal(null)}>✕</button>
                            </div>

                            <div className="modal-content glass-3" style={{ borderRadius: '24px 24px 0 0' }}>
                                <div
                                    className="modal-hero"
                                    style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor}, var(--color-bg))` }}
                                >
                                    <h2 className="modal-title">{selectedProject.title}</h2>
                                </div>

                                <div className="modal-details">
                                    <div className="role-badges" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                        {selectedProject.role.split(' & ').map(r => (
                                            <span key={r} style={{ background: 'var(--color-bg-surface)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', color: 'var(--color-text-primary)', border: `1px solid ${selectedProject.accentColor}` }}>
                                                {r}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="learned-blurb" style={{ borderLeft: `3px solid var(--color-blush)`, paddingLeft: '1rem', fontStyle: 'italic', marginBottom: '2rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                                        "This project taught me that enterprise users aren't intimidated by complexity — they're frustrated by inconsistency. Unifying the system was the real design challenge."
                                    </div>

                                    <div className="meta-grid">
                                        <div className="meta-item">
                                            <span className="meta-label mono">Timeline</span>
                                            <span className="meta-value">{selectedProject.year}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label mono">Tools Used</span>
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                                                {selectedProject.tools.map(tool => (
                                                    <span key={tool} style={{ background: `${selectedProject.accentColor}20`, color: selectedProject.accentColor, padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="case-study-section">
                                        <h3>Highlights</h3>
                                        <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
                                            {selectedProject.highlights.map((item, idx) => (
                                                <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
                                            ))}
                                        </ul>

                                        <h3>The Outcome</h3>
                                        <p className="highlight-text">{selectedProject.outcome}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};

export default Projects;
