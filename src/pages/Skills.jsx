import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ScrollRevealText from '../components/ScrollRevealText';
import SkillConstellation from '../components/SkillConstellation';
import { softSkills } from '../data/skills';
import { experience } from '../data/experience';
import './Skills.css';

// ── Skill data — icon is an emoji or inline SVG path name ──
const skillPills = [
  // Design
  { label: 'Figma',              icon: '🎨', category: 'design'  },
  { label: 'Prototyping',        icon: '⚡', category: 'design'  },
  { label: 'User Research',      icon: '🔍', category: 'design'  },
  { label: 'Usability Testing',  icon: '🧪', category: 'design'  },
  { label: 'Design Systems',     icon: '🧩', category: 'design'  },
  { label: 'Accessibility',      icon: '♿', category: 'design'  },
  { label: 'Wireframing',        icon: '✏️', category: 'design'  },
  { label: 'Heuristic Eval',     icon: '📐', category: 'design'  },

  // Dev
  { label: 'React.js',           icon: '⚛️', category: 'dev'     },
  { label: 'TypeScript',         icon: '🔷', category: 'dev'     },
  { label: 'JavaScript',         icon: '🟡', category: 'dev'     },
  { label: 'Python',             icon: '🐍', category: 'dev'     },
  { label: 'C++',                icon: '⚙️', category: 'dev'     },
  { label: 'React Native',       icon: '📱', category: 'dev'     },
  { label: 'Node.js',            icon: '🟢', category: 'dev'     },
  { label: 'SQL',                icon: '🗄️', category: 'dev'     },
  { label: 'HTML / CSS',         icon: '🌐', category: 'dev'     },
  { label: 'Kotlin',             icon: '🎯', category: 'dev'     },

  // Tools
  { label: 'Git & GitHub',       icon: '🐙', category: 'tools'   },
  { label: 'VS Code',            icon: '💻', category: 'tools'   },
  { label: 'Docker',             icon: '🐳', category: 'tools'   },
  { label: 'Expo Router',        icon: '🚀', category: 'tools'   },
  { label: 'Android Studio',     icon: '🤖', category: 'tools'   },
  { label: 'Jupyter',            icon: '📓', category: 'tools'   },
  { label: 'Gemini Antigravity', icon: '✨', category: 'tools'   },
  { label: 'ProtoPie',           icon: '🔮', category: 'tools'   },
  { label: 'Miro',               icon: '🗂️', category: 'tools'   },
]

// Category filter tabs
const categories = [
  { id: 'all',    label: 'All'    },
  { id: 'design', label: 'Design' },
  { id: 'dev',    label: 'Dev'    },
  { id: 'tools',  label: 'Tools'  },
]

export default function Skills() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? skillPills
    : skillPills.filter(s => s.category === active)

  return (
    <PageTransition>
    <div className="page-wrapper skills-page">

      {/* ── Section header ── */}
      <section className="skills-hero">
        <p className="skills-eyebrow">MY SKILLSET</p>
        <h1 className="skills-headline">
          <span className="skills-headline-plain">The Magic </span>
          <span className="skills-headline-italic">Behind</span>
        </h1>
      </section>

      <SkillConstellation />

      {/* ── Category filter tabs ── */}
      <div className="skills-filter-row">
        {categories.map(cat => (
          <motion.button
            key={cat.id}
            className={`skills-filter-btn ${active === cat.id ? 'active' : ''}`}
            onClick={() => setActive(cat.id)}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* ── Pill grid ── */}
      <motion.div
        className="skills-pill-grid"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.label}
              className="skill-pill glass-2 glass-interactive"
              layout
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.85, y: -10 }}
              transition={{
                duration: 0.25,
                delay: i * 0.015,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.06, y: -3 }}
            >
              <span className="skill-pill-icon">{skill.icon}</span>
              <span className="skill-pill-label">{skill.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Dev + Design Crossover Section ── */}
      <ScrollReveal>
        <div style={{
            marginTop: '4rem',
            padding: '4rem 2rem',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            textAlign: 'center'
        }}>
            <ScrollRevealText
              as="p"
              className="srv-body-large"
              text="Most designers can't read a PR. Most devs don't care about kerning. I do both. The intersection is where I live."
              threshold={0.15}
            />
            <div style={{ marginTop: '2rem' }}>
              <span className="mono" style={{ background: 'var(--color-blush)', color: 'var(--color-bg)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.85rem' }}>
                [ Figma → Code → Ship ]
              </span>
            </div>
        </div>
      </ScrollReveal>

      {/* ── Experience & Leadership (kept from previous) ── */}
      <section className="experience-section" style={{ marginTop: '6rem' }}>
          <ScrollReveal>
              <h2 className="section-title">Leadership & Experience</h2>
          </ScrollReveal>
          
          <div className="experience-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              {experience.flatMap(exp => exp.roles.map((role, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                      <div className="experience-card glass-2 glass-interactive" style={{
                          padding: '2rem',
                          borderRadius: '16px',
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

      {/* ── Soft skills strip (kept from previous) ── */}
      <section className="soft-skills-section">
          <ScrollReveal>
              <h3 className="section-title text-center">Beyond the screen</h3>
              <div className="soft-skills-strip">
                  {softSkills.map((skill, index) => (
                      <div
                          key={skill}
                          className="soft-skill-badge glass-1"
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
  )
}

