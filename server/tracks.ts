// Server-authoritative list of 13 official internship tracks
// Kept in exact synchronization with src/data/internshipData.ts

export interface ServerTrack {
  id: string;
  title: string;
  category: string;
  processingFee: number;
}

export const SERVER_TRACKS: Record<string, ServerTrack> = {
  'frontend-intern': {
    id: 'frontend-intern',
    title: 'Frontend Intern',
    category: 'Engineering',
    processingFee: 199,
  },
  'data-analyst-intern': {
    id: 'data-analyst-intern',
    title: 'Data Analyst Intern',
    category: 'Data & Analytics',
    processingFee: 199,
  },
  'backend-intern': {
    id: 'backend-intern',
    title: 'Backend Intern',
    category: 'Engineering',
    processingFee: 199,
  },
  'full-stack-intern': {
    id: 'full-stack-intern',
    title: 'Full Stack Intern',
    category: 'Engineering',
    processingFee: 199,
  },
  'ui-ux-intern': {
    id: 'ui-ux-intern',
    title: 'UI/UX Design Intern',
    category: 'Design & Experience',
    processingFee: 199,
  },
  'product-management-intern': {
    id: 'product-management-intern',
    title: 'Product Management Intern',
    category: 'Product & Growth',
    processingFee: 199,
  },
  'devops-cloud-intern': {
    id: 'devops-cloud-intern',
    title: 'DevOps & Cloud Intern',
    category: 'Cloud & Infrastructure',
    processingFee: 199,
  },
  'machine-learning-intern': {
    id: 'machine-learning-intern',
    title: 'Machine Learning Intern',
    category: 'AI & Data Science',
    processingFee: 199,
  },
  'sde-intern': {
    id: 'sde-intern',
    title: 'SDE Intern',
    category: 'Core Engineering',
    processingFee: 199,
  },
  'gen-ai-intern': {
    id: 'gen-ai-intern',
    title: 'Gen AI Intern',
    category: 'AI & Machine Learning',
    processingFee: 199,
  },
  'applied-ai-intern': {
    id: 'applied-ai-intern',
    title: 'Applied AI Intern',
    category: 'AI & Machine Learning',
    processingFee: 199,
  },
  'grant-writing-intern': {
    id: 'grant-writing-intern',
    title: 'Grant Writing & Fundraising Intern',
    category: 'Strategy & Grants',
    processingFee: 199,
  },
  'curation-archival-intern': {
    id: 'curation-archival-intern',
    title: 'Curation & Archival Intern',
    category: 'Knowledge & Archival',
    processingFee: 199,
  },
};

export function getTrack(trackId: string): ServerTrack | null {
  return SERVER_TRACKS[trackId] || null;
}
