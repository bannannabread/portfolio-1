import type { ImageMetadata } from 'astro';
import iStudyHomepage from '../assets/work/i-study/homepage-hifi.png';
import catInspectWalkaround from '../assets/work/cat-inspect/walkaround-hifi.png';

export interface Project {
  slug: string;
  title: string;
  caption: string;
  tags: string[];
  gradient: 'peach' | 'coral' | 'rose' | 'violet';
  comingSoon?: boolean;
  image?: ImageMetadata;
  imageAlt?: string;
}

// Remaining placeholder slots stay honest — no invented clients, metrics, or
// outcomes — until real case studies replace them. See PRODUCT.md.
export const projects: Project[] = [
  {
    slug: 'i-study',
    title: 'I-Study',
    caption:
      'I designed a peer study matchmaking platform to eliminate social friction and level the academic playing field for college students.',
    tags: ['EdTech', 'UI/UX Design', 'Mobile App', 'Figma'],
    gradient: 'violet',
    image: iStudyHomepage,
    imageAlt: 'I-Study home screen showing a quick-match action and suggested study partners',
  },
  {
    slug: 'cat-inspect',
    title: 'Cat Inspect',
    caption:
      'I rebuilt my own earlier equipment-inspection app concept with AI-assisted, glove-friendly workflows for field technicians.',
    tags: ['Industrial UX', 'AI-Integrated Design', 'HackIllinois 2026', 'Figma'],
    gradient: 'coral',
    image: catInspectWalkaround,
    imageAlt: 'Guided walk-around inspection step for a CAT D8T Dozer with a color-coded status selector',
  },
  {
    slug: 'fact-conference',
    title: 'FACT Conference Website',
    caption: '',
    tags: [],
    gradient: 'peach',
    comingSoon: true,
  },
];
