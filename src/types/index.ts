export type PageId =
  | 'home'
  | 'products'
  | 'solutions'
  | 'ai'
  | 'cloud'
  | 'developers'
  | 'resources'
  | 'about'
  | 'careers'
  | 'contact'
  | 'internship'
  | 'admin';

export interface InternshipTrack {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  skills: string[];
  topFitProjects: {
    title: string;
    description: string;
    tech: string[];
    deliverable: string;
  }[];
  duration: string;
  processingFee: number;
  openings: number;
  badge: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'business' | 'data-cloud' | 'ai-automation' | 'developer';
  tagline: string;
  description: string;
  capabilities: string[];
  metrics: string;
  iconName: string;
  featured?: boolean;
}

export interface EcosystemPillar {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
}

export interface IndustrySolution {
  id: string;
  name: string;
  iconName: string;
  headline: string;
  description: string;
  benefits: string[];
  impactMetric: string;
  productsUsed: string[];
}

export interface AICapability {
  id: string;
  title: string;
  description: string;
  technicalDetail: string;
  iconName: string;
  enterpriseReady: boolean;
}

export interface CloudFeature {
  id: string;
  title: string;
  description: string;
  spec: string;
  iconName: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department:
    | 'Engineering'
    | 'AI & Machine Learning'
    | 'Cloud'
    | 'Product'
    | 'Design'
    | 'Sales'
    | 'Operations'
    | 'Research';
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Whitepaper' | 'Architecture' | 'Case Study' | 'Guide' | 'Report';
  publishDate: string;
  readTime: string;
  summary: string;
  downloadSize?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  topic: 'sales' | 'partner' | 'developer' | 'general' | 'careers';
  message: string;
}
