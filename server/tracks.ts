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
  'backend-optimised-intern': {
    id: 'backend-optimised-intern',
    title: 'Backend (Optimised) Intern',
    category: 'Systems & Cloud',
    processingFee: 199,
  },
  'ai-fluency-intern': {
    id: 'ai-fluency-intern',
    title: 'AI Fluency Intern',
    category: 'AI & Operations',
    processingFee: 199,
  },
  'prompt-engineering-intern': {
    id: 'prompt-engineering-intern',
    title: 'Prompt Engineering Intern',
    category: 'AI Engineering',
    processingFee: 199,
  },
  'machine-learning-intern': {
    id: 'machine-learning-intern',
    title: 'Machine Learning Intern',
    category: 'AI & Data Science',
    processingFee: 199,
  },
  'seo-intern': {
    id: 'seo-intern',
    title: 'SEO Intern',
    category: 'Growth & Marketing',
    processingFee: 199,
  },
  'cybersecurity-intern': {
    id: 'cybersecurity-intern',
    title: 'Cybersecurity Intern',
    category: 'Security & Infrastructure',
    processingFee: 199,
  },
  'grant-writing-fundraising-intern': {
    id: 'grant-writing-fundraising-intern',
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
};

// Backward-compatible alias mappings
const TRACK_ALIASES: Record<string, string> = {
  'backend-intern': 'backend-optimised-intern',
  'grant-writing-intern': 'grant-writing-fundraising-intern',
  'full-stack-intern': 'sde-intern',
  'devops-cloud-intern': 'backend-optimised-intern',
  'ui-ux-intern': 'frontend-intern',
  'product-management-intern': 'ai-fluency-intern',
};

export function getTrack(trackId: string): ServerTrack | null {
  if (!trackId || typeof trackId !== 'string') return null;
  const direct = SERVER_TRACKS[trackId];
  if (direct) return direct;
  const aliased = TRACK_ALIASES[trackId];
  if (aliased && SERVER_TRACKS[aliased]) return SERVER_TRACKS[aliased];
  return null;
}
