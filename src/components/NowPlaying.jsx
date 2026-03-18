import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NowPlaying() {
  const [track,   setTrack  ] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        // In production, this hits your Vercel /api/spotify endpoint
        // In dev, you can mock this or run a local proxy
        const res  = await fetch('/api/spotify')
        const data = await res.json()
        setTrack(data)
      } catch {
        setTrack(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTrack()
    // Refresh every 30 seconds
    const interval = setInterval(fetchTrack, 30_000)
    return () => clearInterval(interval)
  }, [])

  if (loading || !track) return null

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="now-playing"
      aria-label={`${track.isPlaying ? 'Now playing' : 'Recently played'}: ${track.title} by ${track.artist}`}
    >
      {/* Album art */}
      {track.albumArt && (
        <div className="now-playing-art">
          <img src={track.albumArt} alt={track.album} />
          {track.isPlaying && (
            <div className="now-playing-bars" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          )}
        </div>
      )}

      {/* Text */}
      <div className="now-playing-info">
        <span className="now-playing-status">
          {track.isPlaying ? '▶ Now Playing' : '⏸ Recently Played'}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={track.title}
            className="now-playing-title"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {track.title}
          </motion.span>
        </AnimatePresence>
        <span className="now-playing-artist">{track.artist}</span>
      </div>

      {/* Spotify logo */}
      <svg className="now-playing-logo" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    </a>
  )
}
