import type { ImageMetadata } from 'astro';
import iStudyCover from '../assets/work/i-study/device-mockup.png';
import catInspectCover from '../assets/work/cat-inspect/device-mockup.png';

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
    image: iStudyCover,
    imageAlt: 'iPhone showing the I-Study match profile screen, with an 87% schedule overlap and shared classes with a study partner',
  },
  {
    slug: 'cat-inspect',
    title: 'Cat Inspect',
    caption:
      'I rebuilt my own earlier equipment-inspection app concept with AI-assisted, glove-friendly workflows for field technicians.',
    tags: ['Industrial UX', 'AI-Integrated Design', 'HackIllinois 2026', 'Figma'],
    gradient: 'coral',
    image: catInspectCover,
    imageAlt: 'iPhone showing the Cat Inspect pre-inspection checklist for a CAT D8T Dozer, with required fields and a Start Inspection button',
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
