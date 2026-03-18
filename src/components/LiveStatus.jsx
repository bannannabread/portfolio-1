import { useState, useEffect } from 'react'

// ── Status logic — updates based on hour in Champaign ──
const getStatus = (hour) => {
  if (hour >= 0  && hour < 7)  return { text: '(Probably sleeping 😴)',   dot: '#94A3B8' }
  if (hour >= 7  && hour < 9)  return { text: '(Morning coffee ☕)',       dot: '#FFD166' }
  if (hour >= 9  && hour < 12) return { text: '(In class 📚)',             dot: '#FFAB76' }
  if (hour >= 12 && hour < 13) return { text: '(Lunch break 🍜)',          dot: '#FF8C69' }
  if (hour >= 13 && hour < 17) return { text: '(Designing / coding 💻)',   dot: '#FF6B9D' }
  if (hour >= 17 && hour < 19) return { text: '(Studio hours 🎨)',         dot: '#FF6B9D' }
  if (hour >= 19 && hour < 22) return { text: '(Open to connect 🌐)',      dot: '#4ADE80' }
  return                               { text: '(Late-night commits 🌙)',   dot: '#C9184A' }
}

export default function LiveStatus({ showClock = true, className = '' }) {
  const [time,   setTime  ] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const tick = () => {
      // Get current time in Champaign, IL (America/Chicago)
      const now = new Date()
      const champaignTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'America/Chicago' })
      )

      const h   = champaignTime.getHours()
      const m   = String(champaignTime.getMinutes()).padStart(2, '0')
      const s   = String(champaignTime.getSeconds()).padStart(2, '0')
      const ampm = h >= 12 ? 'PM' : 'AM'
      const h12  = h % 12 || 12

      setTime(`${h12}:${m}:${s} ${ampm} CT`)
      setStatus(getStatus(h))
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time || !status) return null

  return (
    <div className={`live-status ${className}`}>
      <div className="live-status-row">
        {/* Status dot */}
        <span
          className="live-status-dot"
          style={{ background: status.dot }}
        />
        {/* Status text */}
        <span className="live-status-text">{status.text}</span>
      </div>

      {showClock && (
        <div className="live-status-clock">
          <span className="live-status-location">Now, </span>
          <span className="live-status-time">{time}</span>
          <span className="live-status-location"> in Champaign, IL</span>
        </div>
      )}
    </div>
  )
}
