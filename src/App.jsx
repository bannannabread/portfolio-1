import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import WebGLBackground from './components/WebGLBackground';
import CursorTrail from './components/CursorTrail';

import Landing from './pages/Landing';
import Projects from './pages/Projects';
import CaseStudy from './pages/CaseStudy';
import Skills from './pages/Skills';
import About from './pages/About';
import Uses from './pages/Uses';
import Guestbook from './pages/Guestbook';
import NotFound from './pages/NotFound';
import CommandPalette from './components/CommandPalette';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(!sessionStorage.getItem('visited'));
  const [commandOpen, setCommandOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Command Palette Listener
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Loading Screen Timer
  useEffect(() => {
    if (isLoading) {
      const t = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('visited', 'true');
      }, 2800);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <AnimatePresence mode="wait">
          <div className="app-container" key="app-content">
            <WebGLBackground />
            <CursorTrail />
            <motion.div 
              style={{ 
                scaleX, 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                height: '2px', 
                transformOrigin: '0%', 
                background: 'var(--gradient-sunset)', 
                zIndex: 9999 
              }} 
            />
            <CustomCursor />
            <Navbar />
            <CommandPalette isOpen={commandOpen} setIsOpen={setCommandOpen} />

            <main className="main-content">
              <PageTransition>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<CaseStudy />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/uses" element={<Uses />} />
                  <Route path="/guestbook" element={<Guestbook />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </main>

            <Footer />
          </div>
        </AnimatePresence>
      )}
    </>
  );
}

export default App;
