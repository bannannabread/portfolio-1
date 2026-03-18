export const caseStudies = [
  {
    slug:        'discrete-study-game',
    title:       'Discrete Structures Study Game',
    subtitle:    'Turning abstract CS theory into an engaging, retention-driven learning experience.',
    category:    'Web · Game Design',
    accentColor: '#FF6B9D',
    nextSlug:    'cat-inspect',
    meta: [
      { label: 'Role',      value: 'Designer & Developer' },
      { label: 'Timeline',  value: 'May 2025 – Present'   },
      { label: 'Tools',     value: 'Figma, C++, SQL'      },
      { label: 'Outcome',   value: '+20% session retention'},
    ],
    overview: {
      headline: 'Students were failing not because the content was hard, but because studying it was boring.',
      body: 'Discrete Structures is one of the most failed courses at UIUC. The existing study tools were static flashcard sets with no feedback loops, no progression, and nothing to keep students coming back. I set out to design a system that felt more like a game than a grind.',
    },
    problems: [
      { title: 'No feedback loop',     desc: 'Static flashcards gave no sense of progress or mastery — students had no reason to return.' },
      { title: 'Topic overwhelm',      desc: 'All 300+ concepts lumped together with no difficulty curve or topic filtering.' },
      { title: 'Zero retention hooks', desc: 'No rewards, streaks, or achievements to encourage repeated sessions.' },
    ],
    process: [
      { phase: 'Research',   desc: 'Surveyed 12 CS students about their current study habits and pain points. Found that 83% abandoned study sessions within 15 minutes.', tools: ['Miro', 'User Surveys'] },
      { phase: 'Design',     desc: 'Designed a UX flow with topic selection, difficulty ramping, and a reward system. Wireframed 8 screens in Figma before moving to code.', tools: ['Figma', 'FigJam'] },
      { phase: 'Build',      desc: 'Implemented a SQL-backed question engine that randomizes problems by topic and difficulty. Built the reward system to track streaks.', tools: ['C++', 'SQL'] },
      { phase: 'Test',       desc: 'Ran usability sessions with 5 students. Iterated on the onboarding flow after discovering users skipped topic selection.', tools: ['Usability Testing', 'Think-Aloud Protocol'] },
    ],
    beforeAfter: {
      before: 'Static text list of 300+ theorems with no interactivity. Average session time: 8 minutes. Students reported feeling overwhelmed and directionless.',
      after:  'Topic-filtered interactive quiz system with difficulty progression and rewards. Average session time: 24 minutes. Students reported feeling a sense of accomplishment.',
    },
    outcomes: [
      { stat: '+20%',  desc: 'Session retention increase' },
      { stat: '300+',  desc: 'Question prompts designed'  },
      { stat: '8 min → 24 min', desc: 'Average session length' },
    ],
    reflection: 'This project taught me that the UX of learning tools is almost more important than the content itself. A well-designed feedback loop can transform how students relate to difficult material.',
  },
  {
    slug:        'cat-inspect',
    title:       'CAT Inspect — Caterpillar Technician App',
    subtitle:    'Redesigning an enterprise inspection tool with AI-integrated experiences for field technicians.',
    category:    'Mobile · Enterprise UX',
    accentColor: '#FF8C69',
    nextSlug:    null,
    meta: [
      { label: 'Role',      value: 'UX Designer'             },
      { label: 'Timeline',  value: 'March 2026'              },
      { label: 'Tools',     value: 'Figma, JavaScript'       },
      { label: 'Outcome',   value: '6 screens, 1 design system'},
    ],
    overview: {
      headline: 'Enterprise tools fail field workers because they are designed by people who have never been in the field.',
      body: 'CAT Inspect is used by Caterpillar technicians to document equipment inspections. The existing tool had feature gaps, inconsistent UI patterns, and no AI capabilities despite technicians spending significant time on manual documentation. My task was to identify these gaps and design a new direction.',
    },
    problems: [
      { title: 'Inconsistent UI patterns', desc: 'Six different screen surfaces all used different interaction models, creating a steep learning curve for new technicians.' },
      { title: 'Manual documentation burden', desc: 'Technicians spent 40% of inspection time on text input — a prime candidate for AI voice transcription.' },
      { title: 'No competitive positioning', desc: 'Competitor apps had features CAT Inspect lacked, creating product roadmap blindspots.' },
    ],
    process: [
      { phase: 'Competitive Research', desc: 'Conducted heuristic evaluation of CAT Inspect against 3 competitor apps. Documented 23 specific UX gaps mapped to user impact.', tools: ['Heuristic Evaluation', 'Competitive Analysis'] },
      { phase: 'System Audit',         desc: 'Mapped all 6 screen surfaces and documented every inconsistent pattern. Created a component inventory in Figma.', tools: ['Figma', 'Component Library'] },
      { phase: 'AI UX Design',         desc: 'Designed voice note pipeline: technician speaks → AI transcribes → review sheet → payload submission. Designed AI overview placeholder architecture.', tools: ['Figma', 'ProtoPie'] },
      { phase: 'Design System',        desc: 'Enforced a unified component system across all 6 surfaces. Documented usage rules for each component.', tools: ['Figma', 'Zeplin'] },
    ],
    beforeAfter: {
      before: 'Six screens with six different visual languages. Text-heavy input forms. No AI features. Technicians described the tool as "slow and frustrating."',
      after:  'Unified design system applied across all surfaces. Voice-to-text transcription flow. AI overview pipeline for automated inspection summaries.',
    },
    outcomes: [
      { stat: '6',   desc: 'Screen surfaces unified'          },
      { stat: '23',  desc: 'UX gaps identified and addressed' },
      { stat: '3',   desc: 'AI features designed and specced' },
    ],
    reflection: 'Enterprise UX design taught me that consistency is a form of respect for the user\'s time. Every inconsistency in an interface is a micro-tax on the person using it.',
  },
]
