import { useEffect, useRef, useCallback } from 'react'

export default function ScrollRevealText({
  text,
  className = '',
  as: Tag = 'p',
  threshold = 0.15,
}) {
  const containerRef = useRef(null)
  const wordRefs     = useRef([])

  // Split text preserving spaces — each word is a span
  const words = text.split(' ').filter(Boolean)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('srv-word--visible')
            entry.target.classList.remove('srv-word--hidden')
          } else {
            entry.target.classList.add('srv-word--hidden')
            entry.target.classList.remove('srv-word--visible')
          }
        })
      },
      {
        rootMargin: '-15% 0px -15% 0px',  // trigger zone: middle 70% of viewport
        threshold: 0,
      }
    )
  
    wordRefs.current.forEach(el => el && observer.observe(el))
  
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={containerRef} className={`srv-container ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={el => wordRefs.current[i] = el}
          className="srv-word srv-word--hidden"
          // Stagger the transition-delay so words near viewport illuminate in sequence
          style={{ transitionDelay: `${i * 12}ms` }}
        >
          {word}
          {/* Space after each word */}
          {i < words.length - 1 && <span className="srv-space"> </span>}
        </span>
      ))}
    </Tag>
  )
}
