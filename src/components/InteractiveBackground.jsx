import { useEffect, useRef } from 'react'

const BLOB_DEFS = [
  { color: 'var(--color-blush)',     size: 420, homeX: 15,  homeY: 20  },
  { color: 'var(--color-coral)',     size: 350, homeX: 75,  homeY: 65  },
  { color: 'var(--color-peach)',     size: 300, homeX: 50,  homeY: 10  },
  { color: 'var(--color-amber)',     size: 280, homeX: 85,  homeY: 30  },
  { color: 'var(--color-rose-deep)', size: 200, homeX: 25,  homeY: 75  },
  { color: 'var(--color-blush)',     size: 180, homeX: 60,  homeY: 85  },
]

export default function InteractiveBackground() {
  const blobRefs = useRef([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })  // normalized 0–1
  const posRef   = useRef(BLOB_DEFS.map(b => ({ x: b.homeX, y: b.homeY })))
  const frameRef = useRef(null)

  useEffect(() => {
    // Check if device has hover capability before attaching listener
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    
    const handleMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouse)
    }

    const animate = () => {
      const mouse = mouseRef.current

      BLOB_DEFS.forEach((def, i) => {
        const el = blobRefs.current[i]
        if (!el) return

        const pos = posRef.current[i]

        // Distance from mouse to blob home (in % units)
        const dx = (mouse.x * 100) - def.homeX
        const dy = (mouse.y * 100) - def.homeY
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Repulsion: only kicks in within 35% radius
        const REPEL_RADIUS = 35
        const REPEL_STRENGTH = 4.5   // max offset in % units — keep small
        const RETURN_SPEED = 0.035   // how fast blob returns home (lerp factor)

        let targetX = def.homeX
        let targetY = def.homeY

        if (dist < REPEL_RADIUS && dist > 0 && !isTouchDevice) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          // Push blob AWAY from cursor
          targetX = def.homeX - (dx / dist) * force
          targetY = def.homeY - (dy / dist) * force
        }

        // Smooth lerp toward target
        pos.x += (targetX - pos.x) * RETURN_SPEED
        pos.y += (targetY - pos.y) * RETURN_SPEED

        el.style.left = `${pos.x}%`
        el.style.top  = `${pos.y}%`
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener('mousemove', handleMouse)
      }
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      className="interactive-bg-wrapper"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {BLOB_DEFS.map((def, i) => (
        <div
          key={i}
          ref={el => blobRefs.current[i] = el}
          style={{
            position: 'absolute',
            width: def.size,
            height: def.size,
            left: `${def.homeX}%`,
            top: `${def.homeY}%`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: def.color,
            opacity: 'var(--blob-opacity)',
            filter: `blur(var(--blob-blur))`,
            animation: `bgBlobFloat ${8 + i * 1.5}s ease-in-out ${i * 0.8}s infinite alternate`,
            willChange: 'left, top',
          }}
        />
      ))}
    </div>
  )
}
