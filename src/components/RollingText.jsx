import { motion } from 'framer-motion'

/**
 * RollingText
 * Wraps any nav label. On hover of the parent,
 * current text rolls up and new text rolls in from below.
 *
 * The parent element must have a Framer Motion whileHover state,
 * or manage hover state manually.
 */
export default function RollingText({ label, className = '' }) {
  return (
    <span
      className={`rolling-text-root ${className}`}
      aria-label={label}
    >
      {/* Layer 1 — visible at rest, exits upward on hover */}
      <motion.span
        className="rolling-text-layer rolling-text-top"
        variants={{
          rest:  { y: '0%',    opacity: 1 },
          hover: { y: '-105%', opacity: 0 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>

      {/* Layer 2 — starts below, enters on hover */}
      <motion.span
        className="rolling-text-layer rolling-text-bottom"
        variants={{
          rest:  { y: '105%',  opacity: 0 },
          hover: { y: '0%',    opacity: 1 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
    </span>
  )
}
