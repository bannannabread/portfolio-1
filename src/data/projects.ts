export interface Project {
  slug: string;
  title: string;
  caption: string;
  tags: string[];
  gradient: 'peach' | 'coral' | 'rose' | 'violet';
  comingSoon?: boolean;
}

// Real project content has not been supplied yet. Per PRODUCT.md, placeholder
// slots must stay honest — no invented clients, metrics, or outcomes — until
// real case studies replace them.
export const projects: Project[] = [
  { slug: 'project-one', title: '', caption: '', tags: [], gradient: 'coral', comingSoon: true },
  { slug: 'project-two', title: '', caption: '', tags: [], gradient: 'rose', comingSoon: true },
  { slug: 'project-three', title: '', caption: '', tags: [], gradient: 'peach', comingSoon: true },
];
