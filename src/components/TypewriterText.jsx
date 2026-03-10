import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * TypewriterText
 * Animates text as if being typed character by character.
 *
 * Props:
 *   text        — string to type
 *   speed       — ms per character (default: 45)
 *   delay       — ms before typing starts (default: 0)
 *   cursor      — show blinking cursor (default: true)
 *   cursorChar  — character to use as cursor (default: '|')
 *   className   — CSS class for the wrapper span
 *   triggerOnView — only start when element enters viewport (default: true)
 *   onComplete  — callback fired when typing finishes
 */
export default function TypewriterText({
  text,
  speed = 45,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  className = '',
  triggerOnView = true,
  onComplete,
}) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(!triggerOnView)
  const indexRef = useRef(0)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Start when in view (if triggerOnView)
  useEffect(() => {
    if (inView && triggerOnView) setStarted(true)
  }, [inView, triggerOnView])

  // Typing effect
  useEffect(() => {
    if (!started) return
    setDisplayed('')
    indexRef.current = 0
    setDone(false)

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        const next = indexRef.current + 1
        setDisplayed(text.slice(0, next))
        indexRef.current = next
        if (next >= text.length) {
          clearInterval(interval)
          setDone(true)
          onComplete?.()
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [started, text, speed, delay, onComplete])

  return (
    <span ref={ref} className={`typewriter-wrapper ${className}`}>
      {displayed}
      {cursor && (
        <span
          className="typewriter-cursor"
          style={{
            opacity: done ? 0 : 1,
            animation: done ? 'none' : 'cursorBlink 0.8s step-end infinite',
            color: 'var(--color-blush)',
            fontWeight: 400,
            marginLeft: '1px',
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  )
}
