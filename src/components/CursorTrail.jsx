import { useEffect, useRef } from 'react'

const TRAIL_LENGTH  = 12    // number of trailing dots
const DOT_MAX_SIZE  = 5     // px — largest dot (closest to cursor)
const DOT_MIN_SIZE  = 1.5   // px — smallest dot (tail end)
const TRAIL_COLORS  = [
  '#FF6B9D', '#FF7BA8', '#FF8CB4',
  '#FF8C69', '#FF9D7A', '#FFAB76',
  '#FFD166', '#FFD97A', '#FFE28E',
  '#FFC857', '#FFB347', '#FFA040',
]

export default function CursorTrail() {
  const canvasRef   = useRef(null)
  const historyRef  = useRef([])  // ring buffer of mouse positions
  const mouseRef    = useRef({ x: -100, y: -100 })
  const rafRef      = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      historyRef.current.push({ ...mouseRef.current })
      if (historyRef.current.length > TRAIL_LENGTH) {
        historyRef.current.shift()
      }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pts = historyRef.current
      pts.forEach((pt, i) => {
        const progress = i / TRAIL_LENGTH   // 0 = oldest, 1 = newest
        const size  = DOT_MIN_SIZE + (DOT_MAX_SIZE - DOT_MIN_SIZE) * progress
        const alpha = progress * 0.55       // fade toward tail
        const color = TRAIL_COLORS[i % TRAIL_COLORS.length]

        ctx.globalAlpha = alpha
        ctx.fillStyle   = color
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-canvas"
      aria-hidden="true"
    />
  )
}
