import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollRevealText from '../components/ScrollRevealText'
import ReadingProgress from '../components/ReadingProgress'
import { caseStudies } from '../data/caseStudies'

export default function CaseStudy() {
  const { slug } = useParams()
  const study = caseStudies.find(s => s.slug === slug)
  if (!study) return <Navigate to="/projects" replace />

  return (
    <div className="page-wrapper case-study-page">
      <ReadingProgress />

      {/* ── Hero ── */}
      <section className="cs-hero">
        <span className="cs-category">{study.category}</span>
        <h1 className="cs-title">{study.title}</h1>
        <p className="cs-subtitle">{study.subtitle}</p>

        <div className="cs-meta-row">
          {study.meta.map(({ label, value }) => (
            <div key={label} className="cs-meta-item">
              <span className="cs-meta-label">{label}</span>
              <span className="cs-meta-value">{value}</span>
            </div>
          ))}
        </div>

        {/* Hero image/mockup placeholder */}
        <div
          className="cs-hero-visual"
          style={{ background: `linear-gradient(135deg, ${study.accentColor}33, ${study.accentColor}11)` }}
        >
          <div className="cs-hero-device-placeholder" />
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="cs-section">
        <span className="cs-section-label">01 — Overview</span>
        <ScrollRevealText
          as="h2"
          className="srv-statement cs-statement"
          text={study.overview.headline}
          threshold={0.12}
        />
        <p className="cs-body">{study.overview.body}</p>
      </section>

      {/* ── Problem ── */}
      <section className="cs-section">
        <span className="cs-section-label">02 — The Problem</span>
        <div className="cs-problem-grid">
          {study.problems.map((p, i) => (
            <div key={i} className="cs-problem-card glass-2">
              <span className="cs-problem-number">0{i + 1}</span>
              <h3 className="cs-problem-title">{p.title}</h3>
              <p className="cs-problem-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="cs-section">
        <span className="cs-section-label">03 — Process</span>
        <div className="cs-process-steps">
          {study.process.map((step, i) => (
            <motion.div
              key={i}
              className="cs-process-step"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="cs-process-dot" style={{ background: study.accentColor }} />
              <div className="cs-process-content">
                <h3 className="cs-process-title">{step.phase}</h3>
                <p className="cs-process-desc">{step.desc}</p>
                <div className="cs-process-tools">
                  {step.tools.map(t => (
                    <span key={t} className="pcard-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Before / After ── */}
      {study.beforeAfter && (
        <section className="cs-section">
          <span className="cs-section-label">04 — Before & After</span>
          <div className="cs-ba-grid">
            <div className="cs-ba-panel glass-2">
              <span className="cs-ba-label cs-ba-label--before">Before</span>
              <div className="cs-ba-visual" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="cs-ba-note">{study.beforeAfter.before}</p>
              </div>
            </div>
            <div className="cs-ba-panel glass-2" style={{ borderColor: `${study.accentColor}44` }}>
              <span className="cs-ba-label cs-ba-label--after" style={{ color: study.accentColor }}>After</span>
              <div className="cs-ba-visual" style={{ background: `${study.accentColor}11` }}>
                <p className="cs-ba-note">{study.beforeAfter.after}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Outcome ── */}
      <section className="cs-section">
        <span className="cs-section-label">05 — Outcome</span>
        <div className="cs-outcome-row">
          {study.outcomes.map((o, i) => (
            <div key={i} className="cs-outcome-stat glass-1">
              <span className="cs-outcome-number" style={{ color: study.accentColor }}>{o.stat}</span>
              <span className="cs-outcome-desc">{o.desc}</span>
            </div>
          ))}
        </div>
        <ScrollRevealText
          as="p"
          className="srv-body-large cs-outcome-reflection"
          text={study.reflection}
          threshold={0.15}
        />
      </section>

      {/* ── Nav: prev / next ── */}
      <section className="cs-nav-row">
        <a href="/projects" className="btn-ghost">← All Projects</a>
        {study.nextSlug && (
          <a href={`/projects/${study.nextSlug}`} className="btn-primary">
            Next Case Study →
          </a>
        )}
      </section>

    </div>
  )
}
