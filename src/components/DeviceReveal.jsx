import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DeviceReveal({ project }) {
  const sectionRef = useRef(null)
  const deviceRef  = useRef(null)
  const screenRef  = useRef(null)
  const labelRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const device  = deviceRef.current
    const screen  = screenRef.current
    const label   = labelRef.current
    if (!section || !device) return

    // Initial tilted state
    gsap.set(device, {
      rotateX: 52,
      rotateY: -18,
      rotateZ:  8,
      scale: 0.85,
      transformPerspective: 900,
      transformOrigin: 'center center',
    })

    gsap.set(screen,  { opacity: 0 })
    gsap.set(label,   { opacity: 0, y: 20 })

    // Timeline scrubbed by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:   'top 80%',
        end:     'bottom 30%',
        scrub:   1.2,         // smooth scrub — higher = more lag/smoothness
        // pin: true,         // uncomment to pin the section during animation
      }
    })

    tl
      // Phase 1: rotate to face-on
      .to(device, {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      })
      // Phase 2: screen fades in
      .to(screen, {
        opacity: 1,
        duration: 0.5,
        ease: 'power1.in',
      }, '-=0.3')
      // Phase 3: label slides up
      .to(label, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.2')

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={sectionRef} className="device-reveal-section">

      {/* Left: project info */}
      <div ref={labelRef} className="device-reveal-info">
        <span className="device-reveal-tag">{project?.tags?.[0] || 'App Design'}</span>
        <h3 className="device-reveal-title">{project?.title}</h3>
        <p className="device-reveal-desc">{project?.description}</p>
        <div className="device-reveal-links">
          <span className="pcard-link hoverable" style={{ color: 'var(--color-blush)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Live Demo ↗</span>
          <span className="pcard-link hoverable" style={{ color: 'var(--color-blush)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>View Case Study ↗</span>
        </div>
      </div>

      {/* Right: 3D phone */}
      <div className="device-reveal-stage">
        <div ref={deviceRef} className="device-phone-3d">
          {/* Phone frame */}
          <div className="phone-frame">
            {/* Notch */}
            <div className="phone-notch" />
            {/* Screen — project color fill or screenshot */}
            <div
              ref={screenRef}
              className="phone-screen"
              style={{
                background: project?.accentColor
                  ? `linear-gradient(160deg, ${project.accentColor}88, ${project.accentColor}22)`
                  : 'linear-gradient(160deg, #FF6B9D44, #FFD16622)',
              }}
            >
              {/* App UI placeholder — grid of rounded rects */}
              <div className="phone-ui-mockup">
                <div className="phone-ui-bar" />
                <div className="phone-ui-bar phone-ui-bar--short" />
                <div className="phone-ui-card" />
                <div className="phone-ui-card" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
