import React from 'react';
import PageTransition from '../components/PageTransition';
import TypewriterText from '../components/TypewriterText';
import ScrollReveal from '../components/ScrollReveal';

const usesData = [
  {
    category: 'Design',
    tools: [
      { name: 'Figma', desc: 'Primary design tool, components, prototyping' },
      { name: 'FigJam', desc: 'Brainstorming, user flows, sticky notes' },
      { name: 'ProtoPie', desc: 'Advanced interaction prototyping' },
      { name: 'Adobe Suite', desc: 'Illustrator for assets, Photoshop for edits' }
    ]
  },
  {
    category: 'Development',
    tools: [
      { name: 'VS Code', desc: 'Daily driver editor' },
      { name: 'Android Studio', desc: 'Mobile development' },
      { name: 'PyCharm', desc: 'Python & data science' },
      { name: 'GitHub', desc: 'Version control & project hosting' },
      { name: 'Docker', desc: 'Containerization' }
    ]
  },
  {
    category: 'Productivity',
    tools: [
      { name: 'Notion', desc: 'Notes, planning, project management' },
      { name: 'Gemini Antigravity', desc: 'AI-assisted development' },
      { name: 'Jupyter', desc: 'Data exploration & ML work' },
      { name: 'Miro', desc: 'Collaborative whiteboards' }
    ]
  },
  {
    category: 'Stack',
    tools: [
      { name: 'React', desc: 'React Native / Expo Router' },
      { name: 'Languages', desc: 'TypeScript, JavaScript' },
      { name: 'Backend', desc: 'Python, Node.js, SQL' },
      { name: 'Mobile', desc: 'C++, Kotlin' }
    ]
  }
];

const Uses = () => {
  return (
    <PageTransition>
      <div className="page-wrapper" style={{ padding: '8rem 2rem max(6rem, 10vh) 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <header className="page-header" style={{ marginBottom: '4rem' }}>
          <ScrollReveal>
            <h1 className="page-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
              What I Use
            </h1>
            <p className="page-subtitle" style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
              <TypewriterText text="The tools behind the work." speed={40} />
            </p>
          </ScrollReveal>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          {usesData.map((section, idx) => (
            <ScrollReveal key={section.category} delay={idx * 0.1}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 className="mono" style={{ fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-blush)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                  {section.category}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {section.tools.map((tool) => (
                    <div className="glass-2" style={{ padding: '1.2rem', borderRadius: '12px' }} key={tool.name}>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                        {tool.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        {tool.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Uses;
