import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const EXPERIENCES = [
  { year: '2025', role: 'UX Design Intern', company: 'Tech Corp', desc: 'Redesigned enterprise dashboard reducing task time by 15%.' },
  { year: '2024', role: 'Product Studio Lead', company: 'UIUC Design', desc: 'Managed 3 client projects and mentored 12 junior designers.' },
  { year: '2023', role: 'Freelance Designer', company: 'Self-Employed', desc: 'Built brand identities and Webflow sites for local businesses.' },
  { year: '2022', role: 'Started UIUC', company: 'Education', desc: 'Began B.S. in Computer Science with focus on HCI.' }
]

export default function AnimatedTimeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  })

  // Smooth out the scroll progress
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  const [pathHeight, setPathHeight] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    // Calculate how tall the SVG line needs to be based on the container
    const observer = new ResizeObserver(entries => {
      setPathHeight(entries[0].contentRect.height)
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="animated-timeline-wrapper" ref={containerRef}>
      {/* The SVG Line */}
      <div className="timeline-svg-container" aria-hidden="true">
        <svg viewBox={`0 0 100 ${pathHeight}`} className="timeline-svg" preserveAspectRatio="none">
          {/* Background track */}
          <line
            x1="50" y1="0" x2="50" y2={pathHeight}
            className="timeline-track"
          />
          {/* Animated drawing line */}
          <motion.line
            x1="50" y1="0" x2="50" y2={pathHeight}
            className="timeline-fill"
            style={{
              pathLength: pathLength,
              strokeDasharray: "1 1"
            }}
          />
        </svg>
      </div>

      <div className="timeline-content">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* The dot on the timeline */}
            <div className="timeline-dot" />

            <div className="timeline-card glass-1 hoverable">
              <span className="timeline-year mono">{exp.year}</span>
              <h3 className="timeline-role">{exp.role}</h3>
              <span className="timeline-company">{exp.company}</span>
              <p className="timeline-desc">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
