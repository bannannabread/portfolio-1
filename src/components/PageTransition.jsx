import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

// Number of bars and their stagger
const BAR_COUNT   = 7
const STAGGER     = 0.055    // seconds between each bar's start
const BAR_DURATION = 0.38    // seconds for one bar to travel across

// Each bar gets a slightly different color — gradient across the set
// Goes from left (deep rose) to right (amber) — sunset sweep
const BAR_COLORS = [
  'rgba(201,  24,  74, 0.95)',   // deep rose
  'rgba(255, 107, 157, 0.95)',   // blush
  'rgba(255, 107, 157, 0.90)',   // blush lighter
  'rgba(255, 140, 105, 0.92)',   // coral
  'rgba(255, 171, 118, 0.92)',   // peach
  'rgba(255, 209, 102, 0.90)',   // amber
  'rgba(255, 209, 102, 0.85)',   // amber lighter
]

// Total time until screen fully covered:
// last bar starts at (BAR_COUNT-1) * STAGGER = 6 * 0.055 = 0.33s
// last bar finishes: 0.33 + BAR_DURATION = 0.71s
// Swap content at 0.55s (screen is fully black, before bars start leaving)
// Bars exit: start at 0.60s, finish at 0.60 + 0.33 + 0.38 = 1.31s

const CONTENT_SWAP_MS = 550
const TRANSITION_END_MS = 1350

export default function PageTransition({ children }) {
  const location  = useLocation()
  const [phase, setPhase] = useState('idle')   // 'idle' | 'enter' | 'exit'
  const [displayChildren, setDisplayChildren] = useState(children)
  const prevPath  = useRef(location.pathname)
  const timers    = useRef([])

  const clearTimers = () => timers.current.forEach(clearTimeout)

  useEffect(() => {
    if (location.pathname === prevPath.current) {
      setDisplayChildren(children)
      return
    }

    clearTimers()

    // Phase 1: bars slide IN (cover screen)
    setPhase('enter')

    // Phase 2: swap content (bars covering — invisible)
    timers.current[0] = setTimeout(() => {
      setDisplayChildren(children)
      window.scrollTo({ top: 0, behavior: 'instant' })
      // Phase 3: bars slide OUT (reveal new page)
      setPhase('exit')
    }, CONTENT_SWAP_MS)

    // Phase 4: done
    timers.current[1] = setTimeout(() => {
      setPhase('idle')
      prevPath.current = location.pathname
    }, TRANSITION_END_MS)

    return clearTimers
  }, [location.pathname])

  return (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {displayChildren}
      </div>

      {/* Bars overlay */}
      <AnimatePresence>
        {phase !== 'idle' && (
          <div
            key="bars-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            {Array.from({ length: BAR_COUNT }).map((_, i) => {
              const isEnter = phase === 'enter'

              return (
                <motion.div
                  key={i}
                  style={{
                    flex: 1,
                    height: '100%',
                    background: BAR_COLORS[i] ?? BAR_COLORS[BAR_COLORS.length - 1],
                    transformOrigin: 'left center',
                    willChange: 'transform',
                  }}
                  initial={{
                    scaleX: isEnter ? 0 : 1,
                    opacity: isEnter ? 0.6 : 1,
                  }}
                  animate={{
                    scaleX: isEnter ? 1 : 0,
                    opacity: isEnter ? 1 : 0,
                  }}
                  transition={{
                    scaleX: {
                      duration: BAR_DURATION,
                      // Entering bars stagger left → right (i=0 first)
                      // Exiting bars stagger left → right too (curtain opens L→R)
                      delay: i * STAGGER,
                      ease: isEnter
                        ? [0.4, 0, 0.2, 1]    // ease in-out for coverage
                        : [0.16, 1, 0.3, 1],  // spring-ease out for reveal
                    },
                    opacity: {
                      duration: isEnter ? 0.15 : 0.25,
                      delay: isEnter ? i * STAGGER : i * STAGGER + BAR_DURATION * 0.6,
                    },
                  }}
                />
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
