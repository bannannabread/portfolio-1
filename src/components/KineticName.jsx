import { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

const REPEL_RADIUS = 140   // px — cursor influence zone
const MAX_PUSH     = 22    // px — max letter displacement

function KineticLetter({ char, index, mousePos, containerRef }) {
  const letterRef = useRef(null)

  const rawX = useSpring(0, { stiffness: 180, damping: 22, mass: 0.8 })
  const rawY = useSpring(0, { stiffness: 180, damping: 22, mass: 0.8 })

  useEffect(() => {
    const updatePos = () => {
      const el   = letterRef.current
      const cont = containerRef.current
      if (!el || !cont) return

      const elRect = el.getBoundingClientRect()
      const elCx   = elRect.left + elRect.width  / 2
      const elCy   = elRect.top  + elRect.height / 2

      const dx = elCx - mousePos.x
      const dy = elCy - mousePos.y
      const d  = Math.sqrt(dx * dx + dy * dy)

      if (d < REPEL_RADIUS && d > 0) {
        const force = (1 - d / REPEL_RADIUS) * MAX_PUSH
        rawX.set((dx / d) * force)
        rawY.set((dy / d) * force)
      } else {
        rawX.set(0)
        rawY.set(0)
      }
    }

    updatePos()
  }, [mousePos, rawX, rawY])

  // Space character — render without effect
  if (char === ' ') {
    return <span style={{ display: 'inline-block', width: '0.25em' }} />
  }

  return (
    <motion.span
      ref={letterRef}
      className="kinetic-letter"
      style={{
        display: 'inline-block',
        x: rawX,
        y: rawY,
        // Slight rotation based on displacement — adds physicality
        rotate: useTransform(rawX, [-MAX_PUSH, 0, MAX_PUSH], [-4, 0, 4]),
      }}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  )
}

export default function KineticName({ text = 'Megan.' }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    const onLeave = () => setMousePos({ x: -9999, y: -9999 })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <span
      ref={containerRef}
      className="kinetic-name"
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <KineticLetter
          key={i}
          char={char}
          index={i}
          mousePos={mousePos}
          containerRef={containerRef}
        />
      ))}
    </span>
  )
}
