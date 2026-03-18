import React from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import MagneticDotGrid from '../components/MagneticDotGrid'
import TypewriterText from '../components/TypewriterText'
import KineticName from '../components/KineticName'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="not-found-page page-wrapper" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
        <MagneticDotGrid />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', margin: 0, lineHeight: 1 }}>
            <KineticName text="404." />
          </h1>
          <p className="srv-body-large" style={{ margin: '1rem auto 2.5rem', maxWidth: '400px' }}>
            <TypewriterText text="This page doesn't exist, but you found a cool kinetic text interaction instead." speed={40} delay={100} />
          </p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block' }}>
            Take Me Home
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
