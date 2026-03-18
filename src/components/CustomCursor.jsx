import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // DOT — follows cursor with very minimal lag (almost instant)
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 50, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 50, mass: 0.3 })

  // RING — follows with elegant, small lag (not bouncy, just slightly behind)
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 38, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 38, mass: 0.6 })

  const isHoveringLink = useRef(false)
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    // Only enable on pointer devices — not touch
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mediaQuery.matches) return

    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleEnter = (e) => {
      const target = e.target.closest('a, button, [data-cursor="hover"]')
      if (target && !isHoveringLink.current) {
        isHoveringLink.current = true
        ringRef.current?.classList.add('cursor-ring--hover')
        dotRef.current?.classList.add('cursor-dot--hover')
      }
    }

    const handleLeave = (e) => {
      const target = e.target.closest('a, button, [data-cursor="hover"]')
      if (target) {
        isHoveringLink.current = false
        ringRef.current?.classList.remove('cursor-ring--hover')
        dotRef.current?.classList.remove('cursor-dot--hover')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', handleEnter)
    document.addEventListener('mouseout', handleLeave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleEnter)
      document.removeEventListener('mouseout', handleLeave)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer ring — slightly behind */}
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Inner dot — nearly instant */}
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
