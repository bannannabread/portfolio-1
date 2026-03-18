import { useState } from 'react'

export default function CopyEmail({ email = 'meganmae.jacob@gmail.com' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy} className="copy-email-btn mono">
      <span className="copy-email-icon">{copied ? '✓' : '⧉'}</span>
      <span className="copy-email-text">{copied ? 'Copied!' : email}</span>
    </button>
  )
}
