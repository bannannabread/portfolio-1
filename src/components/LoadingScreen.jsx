import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import TypewriterText from './TypewriterText'

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('loading')  // 'loading' | 'revealing' | 'done'

  useEffect(() => {
    // After 2.6s, begin exit
    const t1 = setTimeout(() => setPhase('revealing'), 2600)
    // After exit animation, unmount
    const t2 = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, 3300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Gooey container — blur+contrast applied here */}
          <div className="loader-gooey-wrap">
            <div className="loader-blob loader-blob-1" />
            <div className="loader-blob loader-blob-2" />
            <div className="loader-blob loader-blob-3" />
          </div>

          {/* Text below the blobs — outside gooey filter */}
          <div className="loader-text-block">
            <p className="loader-tag">
              <TypewriterText
                text="✦ UI/UX Designer & CS Student"
                speed={30}
                delay={300}
                triggerOnView={false}
                cursor={false}
              />
            </p>

            <p className="loader-name">
              megan mae jacob
            </p>

            {/* Progress bar */}
            <div className="loader-bar-track">
              <motion.div
                className="loader-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, delay: 0.3, ease: 'easeInOut' }}
              />
            </div>

            <motion.p
              className="loader-entering"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.4 }}
            >
              entering portfolio →
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
