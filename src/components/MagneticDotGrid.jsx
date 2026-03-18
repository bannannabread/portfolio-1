import { useEffect, useRef } from 'react'

const SETTINGS = {
  dotSpacing:   32,      // px between dots (grid density)
  dotRadius:    2,       // dot size in px
  repelRadius:  110,     // cursor influence radius in px
  maxRepel:     28,      // max px a dot can be pushed
  returnSpeed:  0.08,    // lerp factor toward home (0.01=slow, 0.2=fast)
  dotOpacity:   0.18,    // subtle — never distracting
  dotColor:     null,    // null = read from CSS variable at runtime
}

export default function MagneticDotGrid() {
  const canvasRef = useRef(null)
  const dotsRef   = useRef([])
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ── Build dot grid ──────────────────────────────
    const buildGrid = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      canvas.width  = W
      canvas.height = H

      dotsRef.current = []
      const cols = Math.ceil(W / SETTINGS.dotSpacing) + 1
      const rows = Math.ceil(H / SETTINGS.dotSpacing) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = c * SETTINGS.dotSpacing
          const hy = r * SETTINGS.dotSpacing
          dotsRef.current.push({
            hx, hy,         // home position
            x: hx, y: hy,  // current position
            vx: 0, vy: 0,  // velocity (for spring return)
          })
        }
      }
    }

    // ── Resolve dot color from CSS variables ────────
    const resolveColor = () => {
      const style = getComputedStyle(document.documentElement)
      // Try to get --color-blush; fallback to pink
      return style.getPropertyValue('--color-blush').trim() || '#FF6B9D'
    }

    // ── Animation loop ───────────────────────────────
    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const color = resolveColor()
      ctx.fillStyle = color

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const R  = SETTINGS.repelRadius
      const R2 = R * R

      dotsRef.current.forEach(dot => {
        // Distance from cursor to dot home
        const dx = dot.hx - mx
        const dy = dot.hy - my
        const d2 = dx * dx + dy * dy

        let targetX = dot.hx
        let targetY = dot.hy

        if (d2 < R2 && d2 > 0) {
          const d     = Math.sqrt(d2)
          const force = (1 - d / R) * SETTINGS.maxRepel
          // Push dot away from cursor
          targetX = dot.hx + (dx / d) * force
          targetY = dot.hy + (dy / d) * force
        }

        // Lerp current position toward target (spring-like return)
        dot.x += (targetX - dot.x) * SETTINGS.returnSpeed
        dot.y += (targetY - dot.y) * SETTINGS.returnSpeed

        // Draw dot
        ctx.globalAlpha = SETTINGS.dotOpacity
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, SETTINGS.dotRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    // ── Mouse tracking ──────────────────────────────
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    // ── Resize handling ─────────────────────────────
    const onResize = () => {
      buildGrid()
    }

    buildGrid()
    draw()

    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="magnetic-dot-grid"
      aria-hidden="true"
    />
  )
}
