export const projects = [
  {
    id: 1,
    title: "Discrete Structures Study Game",
    category: "Web",
    tags: ["UX Design", "C++", "SQL", "Game Design"],
    description: "An interactive learning interface with 300+ question prompts to help students conquer logic, sets, proofs, and combinatorics through structured UX flows.",
    accentColor: "#FF6B9D",
    year: "2025–Present",
    role: "Designer & Developer",
    tools: ["C++", "SQL", "Figma"],
    outcome: "20% increase in session retention via reward-driven progression system",
    highlights: [
      "300+ question prompts across logic, sets, proofs, combinatorics",
      "SQL-backed question system with dynamic randomization by topic & difficulty",
      "Reward-driven progression system built on user engagement patterns"
    ],
    iconPath: "M6 12H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 8h.01M10 8h.01M12 16v4m-4 0h8"
  },
  {
    id: 2,
    title: "CAT Inspect — Caterpillar Technician App",
    category: "Mobile",
    tags: ["Heuristic Evaluation", "AI UX", "Design Systems", "Enterprise"],
    description: "UX overhaul of an enterprise inspection app for Caterpillar technicians — translating competitive research into a prioritized AI-integrated product roadmap.",
    accentColor: "#FF8C69",
    year: "March 2026",
    role: "UX Designer",
    tools: ["Figma", "JavaScript", "Component Libraries"],
    outcome: "Cohesive design system applied across 6 screen surfaces",
    highlights: [
      "Heuristic evaluation + usability review of existing CAT Inspect app",
      "Designed AI overview pipeline, voice note compilation architecture, real-time transcription review",
      "Enforced design system consistency across 6 distinct screen surfaces"
    ],
    outcomes: [
      { stat: '6',   desc: 'Screen surfaces unified'          },
      { stat: '23',  desc: 'UX gaps identified and addressed' },
      { stat: '3',   desc: 'AI features designed and specced' },
    ],
    reflection: 'Enterprise UX design taught me that consistency is a form of respect for the user\'s time. Every inconsistency in an interface is a micro-tax on the person using it.',
  },
  {
    id: 3,
    title: "Studymon — Gamified Study Tracker",
    category: "Full-Stack",
    tags: ["React", "Python", "FastAPI", "Game Design", "API Integration"],
    accentColor: "#FFD166",
    year: "2025",
    role: "Designer & Full-Stack Developer",
    tools: ["React", "Python", "FastAPI", "SQLite", "PokéAPI"],
    outcome: "50 EXP/min system with evolution detection across 100+ Pokémon",
    highlights: [
      "Safari Zone random encounter mechanic",
      "Real-time study timer with pause/resume",
      "Animated evolution sequences (3-stage)",
      "Statistics dashboard with 7-day trend charts",
    ],
    description: "A full-stack productivity app that pairs each study subject with a Pokémon companion — the more you study, the stronger your Pokémon becomes.",
    iconPath: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20",
    slug: "studymon",
  }
];
