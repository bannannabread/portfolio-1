import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <div className="pcard">

      {/* ── Icon badge (top-left) ── */}
      <span className="pcard-icon">
        {/* Use a relevant emoji-as-fallback or inline SVG per project */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Default: generic layers icon — override per project via project.iconPath */}
          {project.iconPath ? (
            <path d={project.iconPath} />
          ) : (
            <>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </>
          )}
        </svg>
      </span>

      {/* ── Card meta — category label ── */}
      <span className="pcard-category">{project.category}</span>

      {/* ── Title ── */}
      <h4 className="pcard-title">{project.title}</h4>

      {/* ── Description ── */}
      <p className="pcard-desc">{project.description}</p>

      {/* ── Tags ── */}
      <div className="pcard-tags">
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag} className="pcard-tag">{tag}</span>
        ))}
        {project.tags.length > 4 && (
          <span className="pcard-tag pcard-tag-more">+{project.tags.length - 4} more</span>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="pcard-footer">
        <span className="pcard-year">{project.year}</span>
        <div className="pcard-links">
          <span className="pcard-link">Live Demo ↗</span>
          <span className="pcard-link">Code ↗</span>
        </div>
      </div>

      {/* ── Shine layer — conic gradient glow ── */}
      <div className="pcard-shine" />

      {/* ── Background — tiles + lines ── */}
      <div className="pcard-background">

        {/* Tile grid — 10 rectangles that flash in staggered sequence */}
        <div className="pcard-tiles">
          <div className="pcard-tile pcard-tile-1" />
          <div className="pcard-tile pcard-tile-2" />
          <div className="pcard-tile pcard-tile-3" />
          <div className="pcard-tile pcard-tile-4" />
          <div className="pcard-tile pcard-tile-5" />
          <div className="pcard-tile pcard-tile-6" />
          <div className="pcard-tile pcard-tile-7" />
          <div className="pcard-tile pcard-tile-8" />
          <div className="pcard-tile pcard-tile-9" />
          <div className="pcard-tile pcard-tile-10" />
        </div>

        {/* Grid lines — draw themselves on hover */}
        <div className="pcard-line pcard-line-1" />
        <div className="pcard-line pcard-line-2" />
        <div className="pcard-line pcard-line-3" />
      </div>

    </div>
  )
}
