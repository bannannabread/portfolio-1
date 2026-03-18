import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DeviceReveal({ project, frameType = 'phone' }) {
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
          <span className="pcard-link hoverable" style={{ color: project?.accentColor || 'var(--color-blush)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Live Demo ↗</span>
          <span className="pcard-link hoverable" style={{ color: project?.accentColor || 'var(--color-blush)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>View Case Study ↗</span>
        </div>
      </div>

      <div className="device-reveal-stage">
        <div ref={deviceRef} className={`device-3d ${frameType === 'browser' ? 'device-browser-3d' : 'device-phone-3d'}`}>
          {/* Frame */}
          <div className={frameType === 'browser' ? 'browser-frame' : 'phone-frame'} style={frameType === 'browser' ? {
              width: '100%',
              aspectRatio: '16/10',
              background: 'var(--color-bg-surface)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column'
          } : undefined}>
            
            {frameType === 'phone' && <div className="phone-notch" />}
            
            {frameType === 'browser' && (
              <div className="browser-chrome" style={{ height: '32px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
              </div>
            )}
            
            {/* Screen — project color fill or screenshot */}
            <div
              ref={screenRef}
              className={frameType === 'browser' ? 'browser-screen' : 'phone-screen'}
              style={frameType === 'browser' ? {
                  flex: 1,
                  background: project?.accentColor
                    ? `linear-gradient(160deg, ${project.accentColor}88, ${project.accentColor}22)`
                    : 'linear-gradient(160deg, #FF6B9D44, #FFD16622)',
                  position: 'relative',
                  overflow: 'hidden'
              } : {
                background: project?.accentColor
                  ? `linear-gradient(160deg, ${project.accentColor}88, ${project.accentColor}22)`
                  : 'linear-gradient(160deg, #FF6B9D44, #FFD16622)',
              }}
            >
              {/* App UI placeholder — grid of rounded rects */}
              <div className="phone-ui-mockup" style={frameType === 'browser' ? { padding: '24px', gap: '16px' } : undefined}>
                <div className="phone-ui-bar" style={frameType === 'browser' ? { height: '16px', marginBottom: '16px', borderRadius: '8px' } : undefined} />
                <div className="phone-ui-bar phone-ui-bar--short" style={frameType === 'browser' ? { height: '16px', width: '30%', marginBottom: '24px', borderRadius: '8px' } : undefined} />
                <div style={frameType === 'browser' ? { display: 'flex', gap: '16px', height: '120px' } : undefined}>
                  <div className="phone-ui-card" style={frameType === 'browser' ? { flex: 1, height: '100%', marginBottom: 0 } : undefined} />
                  <div className="phone-ui-card" style={frameType === 'browser' ? { flex: 1, height: '100%', marginBottom: 0 } : undefined} />
                  {frameType === 'browser' && <div className="phone-ui-card" style={{ flex: 1, height: '100%', marginBottom: 0 }} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
