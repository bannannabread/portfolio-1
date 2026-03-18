import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './CommandPalette.css';

const CommandPalette = ({ isOpen, setIsOpen }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { toggle } = useTheme();

  const allItems = [
    { type: 'heading', label: 'NAVIGATE' },
    { id: 'nav-home', icon: '🏠', label: 'Home', action: () => navigate('/') },
    { id: 'nav-work', icon: '💼', label: 'Projects', action: () => navigate('/projects') },
    { id: 'nav-skills', icon: '🛠', label: 'Skills', action: () => navigate('/skills') },
    { id: 'nav-about', icon: '👤', label: 'About', action: () => navigate('/about') },
    { id: 'nav-uses', icon: '♡', label: 'Uses', action: () => navigate('/uses') },
    { id: 'nav-guest', icon: '✉️', label: 'Guestbook', action: () => navigate('/guestbook') },
    
    { type: 'heading', label: 'ACTIONS' },
    { id: 'act-resume', icon: '📄', label: 'Download Resume', action: () => window.open('/resume.pdf', '_blank') },
    { id: 'act-email', icon: '✉️', label: 'Send an Email', action: () => window.location.href = 'mailto:meganmae.jacob@gmail.com' },
    { id: 'act-theme', icon: '🌙', label: 'Toggle Dark/Light Mode', action: () => toggle() },
    
    { type: 'heading', label: 'LINKS' },
    { id: 'lnk-linkedin', icon: '🔗', label: 'LinkedIn', action: () => window.open('https://linkedin.com', '_blank') },
    { id: 'lnk-github', icon: '🐙', label: 'GitHub', action: () => window.open('https://github.com', '_blank') },
  ];

  const filteredItems = allItems.filter(item => 
    item.type === 'heading' || item.label.toLowerCase().includes(search.toLowerCase())
  );

  // Clean out empty headings
  const displayItems = [];
  filteredItems.forEach((item, i) => {
    if (item.type === 'heading') {
      const nextItem = filteredItems[i+1];
      if (nextItem && nextItem.type !== 'heading') {
        displayItems.push(item);
      }
    } else {
      displayItems.push(item);
    }
  });

  const selectableItems = displayItems.filter(i => i.type !== 'heading');

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, selectableItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectableItems[selectedIndex]) {
          selectableItems[selectedIndex].action();
          setIsOpen(false);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, selectableItems, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div 
        className="cmd-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={() => setIsOpen(false)}
      >
        <motion.div 
          className="cmd-palette glass-3"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={e => e.stopPropagation()}
        >
          <div className="cmd-header">
            <span className="cmd-search-icon">🔍</span>
            <input 
              ref={inputRef}
              className="cmd-input mono"
              placeholder="Search or jump to..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <div className="cmd-body">
            {displayItems.length === 0 && <div className="cmd-empty mono">No results found.</div>}
            
            {displayItems.map((item, i) => {
              if (item.type === 'heading') {
                return <div key={`h-${i}`} className="cmd-heading mono">{item.label}</div>;
              }
              
              const isSelected = selectableItems.indexOf(item) === selectedIndex;
              return (
                <div 
                  key={item.id} 
                  className={`cmd-item ${isSelected ? 'selected' : ''}`}
                  onMouseEnter={() => setSelectedIndex(selectableItems.indexOf(item))}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  <span className="cmd-icon">{item.icon}</span>
                  <span className="cmd-label">{item.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CommandPalette;
