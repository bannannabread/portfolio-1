import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import TypewriterText from '../components/TypewriterText';
import ScrollReveal from '../components/ScrollReveal';

const Guestbook = () => {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('guestbook_entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    } else {
      // Pre-populate
      const initial = [
        { id: 1, name: "Megan", location: "Chicago, IL", message: "Love the portfolio! The lava lamp loading screen made me smile :)", time: "just now" },
        { id: 2, name: "Design Enthusiast", location: "New York", message: "The typography and spacing on the project case studies is extremely well executed. Great job.", time: "2 hours ago" },
      ];
      setEntries(initial);
      localStorage.setItem('guestbook_entries', JSON.stringify(initial));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;

    const newEntry = {
      id: Date.now(),
      name,
      location: location || "Earth",
      message,
      time: "just now"
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('guestbook_entries', JSON.stringify(updated));
    setName('');
    setLocation('');
    setMessage('');
  };

  return (
    <PageTransition>
      <div className="page-wrapper" style={{ padding: '8rem 2rem max(6rem, 10vh) 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <header className="page-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <ScrollReveal>
            <h1 className="page-title" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
              Leave a note.
            </h1>
            <p className="page-subtitle" style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
              <TypewriterText text="Say hi, leave a thought, sign the wall." speed={40} />
            </p>
          </ScrollReveal>
        </header>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="glass-2" style={{ padding: '2rem', borderRadius: '20px', marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input 
                className="glass-input" 
                placeholder="Name *" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input 
                className="glass-input" 
                placeholder="Where you're from" 
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <textarea 
              className="glass-input" 
              placeholder="Your message *" 
              rows="4"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              style={{ resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="cta-button" style={{ marginTop: '1rem' }}>
                Leave your mark →
              </button>
            </div>
          </form>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AnimatePresence>
            {entries.map((entry, idx) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-2" 
                style={{ padding: '1.5rem', borderRadius: '16px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                    {entry.name} <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>({entry.location})</span>
                  </div>
                  <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{entry.time}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{entry.message}"
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Guestbook;
