import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const METRICS = [
  { value: 2,    suffix: '',    label: 'Projects Shipped'        },
  { value: 300,  suffix: '+',   label: 'Questions Designed'      },
  { value: 150,  suffix: '+',   label: 'Event Attendees Reached' },
  { value: 1000, suffix: '+',   label: 'Annual Website Users'    },
  { value: 10,   suffix: '',    label: 'Developers Led'          },
]

function CountUp({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const startRef = useRef(null)
  const rafRef   = useRef(null)

  useEffect(() => {
    if (!inView) return
    startRef.current = performance.now()

    const animate = (now) => {
      const elapsed  = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
      else setCount(target)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, target, duration])

  return (
    <span ref={ref} className="metric-value">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function MetricsStrip() {
  return (
    <div className="metrics-strip glass-1">
      {METRICS.map((m, i) => (
        <div key={i} className="metric-item">
          <CountUp target={m.value} suffix={m.suffix} />
          <span className="metric-label">{m.label}</span>
        </div>
      ))}
    </div>
  )
}
