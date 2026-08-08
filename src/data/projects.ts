import type { ImageMetadata } from 'astro';
import iStudyHomepage from '../assets/work/i-study/homepage-hifi.png';

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
  { slug: 'project-two', title: '', caption: '', tags: [], gradient: 'rose', comingSoon: true },
  { slug: 'project-three', title: '', caption: '', tags: [], gradient: 'peach', comingSoon: true },
];
