import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const TRANSITION_BALLS = [
  { color: "var(--color-blush)", size: 110, y: "15vh",  delay: 0,    duration: 0.72 },
  { color: "var(--color-coral)", size: 90,  y: "38vh",  delay: 0.06, duration: 0.68 },
  { color: "var(--color-peach)", size: 130, y: "58vh",  delay: 0.03, duration: 0.80 },
  { color: "var(--color-amber)", size: 75,  y: "75vh",  delay: 0.09, duration: 0.65 },
  { color: "var(--color-rose-deep)", size: 95,  y: "28vh",  delay: 0.12, duration: 0.75 },
  { color: "var(--color-blush)", size: 60,  y: "85vh",  delay: 0.05, duration: 0.60 },
  { color: "var(--color-coral)", size: 150, y: "50vh",  delay: 0.01, duration: 0.88 },
]

export default function PageTransition({ children }) {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const prevPath = useRef(location.pathname)
  const directionRef = useRef(1) // 1 = left→right, -1 = right→left

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      // Alternate direction each navigation
      directionRef.current *= -1
      setIsTransitioning(true)

      // After balls fully pass (~900ms), swap content
      const swapTimer = setTimeout(() => {
        setDisplayChildren(children)
      }, 500)

      // After balls fully exit, end transition
      const endTimer = setTimeout(() => {
        setIsTransitioning(false)
        prevPath.current = location.pathname
      }, 950)

      return () => { clearTimeout(swapTimer); clearTimeout(endTimer) }
    } else {
      setDisplayChildren(children)
    }
  }, [location.pathname, children])

  const dir = directionRef.current
  const startX = dir === 1 ? '-160px' : 'calc(100vw + 160px)'
  const endX   = dir === 1 ? 'calc(100vw + 160px)' : '-160px'

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {displayChildren}

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 99999,
            }}
          >
            {TRANSITION_BALLS.map((ball, i) => (
              <motion.div
                key={i}
                initial={{ x: startX, y: 0 }}
                animate={{
                  x: endX,
                  // Subtle bounce: y oscillates up and down as ball rolls
                  y: [0, -18, 0, -10, 0, -6, 0],
                }}
                transition={{
                  x: {
                    duration: ball.duration,
                    delay: ball.delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                  y: {
                    duration: ball.duration,
                    delay: ball.delay,
                    times: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1],
                    ease: 'easeInOut',
                  },
                }}
                style={{
                  position: 'absolute',
                  top: ball.y,
                  left: 0,
                  width: ball.size,
                  height: ball.size,
                  borderRadius: '50%',
                  background: ball.color,
                  filter: 'blur(8px)',
                  // Rotation gives a rolling feel
                  rotate: dir === 1 ? 360 : -360,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
