import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

const IMAGES = [
  'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400'
]

export default function PhysicsShowcase() {
  const containerRef = useRef(null)
  const engineRef    = useRef(null)
  const renderRef    = useRef(null)
  const runnerRef    = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Setup Engine & Render
    const winW = container.clientWidth
    const winH = 400 // Fixed height for the showcase section

    const engine = Matter.Engine.create()
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width: winW,
        height: winH,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    })

    // Boundaries — hidden walls, floor, and a slightly open ceiling so they don't bounce out completely but keep falling
    const floor = Matter.Bodies.rectangle(winW / 2, winH + 25, winW, 50, { isStatic: true, render: { visible: false } })
    const wallL = Matter.Bodies.rectangle(-25, winH / 2, 50, winH, { isStatic: true, render: { visible: false } })
    const wallR = Matter.Bodies.rectangle(winW + 25, winH / 2, 50, winH, { isStatic: true, render: { visible: false } })

    // Create cards (compound bodies or rectangles rounded via texturing)
    const cardScale = winW < 600 ? 0.6 : 1
    const cards = IMAGES.map((src, i) => {
      const w = 240 * cardScale
      const h = 320 * cardScale
      const x = (winW / 5) * (i + 1) + (Math.random() * 40 - 20)
      const y = -100 - (i * 150) // staggered fall

      return Matter.Bodies.rectangle(x, y, w, h, {
        restitution: 0.7,
        friction: 0.1,
        angle: (Math.random() - 0.5) * 0.4,
        render: {
          sprite: {
            texture: src,
            xScale: (w / 400) * 1.05, // Approximation scaling
            yScale: (h / 400) * 0.8
          }
        }
      })
    })

    Matter.World.add(engine.world, [floor, wallL, wallR, ...cards])

    // Interaction
    const mouse = Matter.Mouse.create(render.canvas)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })
    Matter.World.add(engine.world, mouseConstraint)
    render.mouse = mouse

    // Start
    Matter.Render.run(render)
    const runner = Matter.Runner.create()
    Matter.Runner.run(runner, engine)

    // Save refs
    engineRef.current = engine
    renderRef.current = render
    runnerRef.current = runner

    // Resize handling
    const handleResize = () => {
      render.canvas.width = container.clientWidth
      render.options.width = container.clientWidth
      Matter.Body.setPosition(floor, { x: container.clientWidth / 2, y: winH + 25 })
      Matter.Body.setPosition(wallR, { x: container.clientWidth + 25, y: winH / 2 })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
      if (render.canvas) {
        render.canvas.remove()
      }
      Matter.World.clear(engine.world)
      Matter.Engine.clear(engine)
    }
  }, [])

  return (
    <div className="physics-showcase-wrapper">
      <div className="physics-shocase-header">
        <span className="mono" style={{ color: 'var(--color-blush)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>/ interactable</span>
        <h3 style={{ margin: 0, marginTop: '0.2rem' }}>Drag. Drop. Discard.</h3>
        <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Physics-based case study cards built with Matter.js</p>
      </div>
      <div ref={containerRef} className="physics-canvas-container" style={{ width: '100%', minHeight: '400px', cursor: 'grab' }} />
    </div>
  )
}
