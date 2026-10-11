import { InternshipTrack } from '../types';

export const INTERNSHIP_FORM_URL = 'https://rzbfxytr.formester.com/f/2dwWQiXyG';

export const INTERNSHIP_STEPS = [
  {
    step: '01',
    title: 'Apply',
    tagline: 'Simple, direct registration',
    description:
      'Apply with LinkedIn, choose your track, and tell us what you want to build.',
    detail:
      'Fill out the verified registration form. Share your portfolio or LinkedIn profile and pick one of the 8 specialized technical tracks.',
    icon: 'FileCheck',
  },
  {
    step: '02',
    title: 'Onboard',
    tagline: 'Structured path & environment',
    description:
      'Get approved, enter the portal, and begin with a clear plan for your chosen field.',
    detail:
      'Receive your candidate welcome packet, batch workspace credentials, weekly milestones roadmap, and direct access to Bangalore engineering leads.',
    icon: 'Sparkles',
  },
  {
    step: '03',
    title: 'Build',
    tagline: 'Real code, real architecture',
    description:
      'Complete practical track work and turn what you learn into a portfolio-ready capstone.',
    detail:
      'Develop production-grade projects. Opt for 1-on-1 mentor code reviews (₹399/project) with automated CI/CD checks, PR feedback, and performance benchmarks.',
    icon: 'Code2',
  },
  {
    step: '04',
    title: 'Graduate',
    tagline: 'Proof of work you can show',
    description:
      'Finish with work you can show, a credential others can verify, and recommendation letter eligibility.',
    detail:
      'Receive a cryptographically verifiable internship certificate, public portfolio credential badge, and official Letter of Recommendation (LOR) from DotRepo Corp.',
    icon: 'Award',
  },
];

export const INTERNSHIP_TRACKS: InternshipTrack[] = [
  {
    id: 'frontend-intern',
    slug: '/FE',
    title: 'Frontend Intern',
    category: 'Engineering',
    tagline: 'Build high-performance web applications, modern design systems & responsive UIs.',
    description:
      'Develop modern enterprise web interfaces, responsive dashboards, and client-ready pages using React, Next.js, TypeScript, and Tailwind CSS with AI pair-programming.',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js', 'State Management', 'Web Performance'],
    topFitProjects: [
      {
        title: 'Enterprise Analytics Dashboard with Live Telemetry',
        description: 'Multi-tenant responsive dashboard with real-time WebSocket feeds, chart caching, and dark/light mode.',
        tech: ['React', 'TypeScript', 'Tailwind', 'ChartJS'],
        deliverable: 'Live hosted web app + GitHub PR artifact with 98+ Lighthouse score',
      },
      {
        title: 'Collaborative Component Design System',
        description: 'Accessible, tokenized UI component library built for scale with Storybook and automated visual regression tests.',
        tech: ['TypeScript', 'Tailwind CSS', 'Radix UI', 'Storybook'],
        deliverable: 'NPM package preview + documentation portal',
      },
    ],
    duration: '6-8 Weeks (Self-paced)',
    processingFee: 199,
    projectMentorshipFee: 399,
    openings: 18,
    badge: 'Popular',
  },
  {
    id: 'data-analyst-intern',
    slug: '/DATA',
    title: 'Data Analyst Intern',
    category: 'Data & Analytics',
    tagline: 'Turn raw telemetry, business metrics & user activity into actionable enterprise insights.',
    description:
      'Analyze real-world business datasets, design SQL aggregation pipelines, build interactive BI reporting boards, and conduct statistical exploratory data analysis.',
    skills: ['SQL (Postgres/BigQuery)', 'Python (Pandas/NumPy)', 'PowerBI / Tableau', 'Statistical Testing', 'ETL Cleanups'],
    topFitProjects: [
      {
        title: 'Customer Churn & Enterprise LTV Forecasting',
        description: 'Multi-cohort survival analysis and retention prediction model with feature importance dashboards.',
        tech: ['Python', 'Pandas', 'PostgreSQL', 'Streamlit'],
        deliverable: 'Interactive executive reporting dashboard + Jupyter notebook',
      },
      {
        title: 'Cloud Infrastructure Cost & Latency Audit Engine',
        description: 'Automated data pipeline digesting server telemetry logs and generating cost-optimization anomalies.',
        tech: ['SQL', 'Python', 'DuckDB', 'Metabase'],
        deliverable: 'SQL warehouse model + executive KPI summary deck',
      },
    ],
    duration: '6-8 Weeks (Self-paced)',
    processingFee: 199,
    projectMentorshipFee: 399,
    openings: 14,
    badge: 'High Demand',
  },
  {
    id: 'backend-optimised-intern',
    slug: '/BE',
    title: 'Backend (Optimised) Intern',
    category: 'Systems & Cloud',
    tagline: 'High-throughput microservices, database transactions & sub-millisecond edge APIs.',
    description:
      'Engineer fault-tolerant backend architectures, optimized relational databases, Redis caching layers, REST/gRPC endpoints, and async worker queues.',
    skills: ['Node.js / Go', 'PostgreSQL / ACID', 'Redis Caching', 'Docker', 'REST / gRPC', 'Kafka / Queues'],
    topFitProjects: [
      {
        title: 'High-Concurrency Rate Limiter & Token Bucket Gateway',
        description: 'Distributed rate limiting microservice in Go/Node.js handling 25,000 req/sec with Redis sliding-window algorithm.',
        tech: ['Go / Node.js', 'Redis', 'Docker', 'k6 Load Testing'],
        deliverable: 'Stress-tested microservice + benchmarking report',
      },
      {
        title: 'Event-Driven Distributed Payment Ledger',
        description: 'ACID-compliant double-entry accounting ledger with idempotent Webhooks and replayable audit logs.',
        tech: ['PostgreSQL', 'Node.js/TypeScript', 'BullMQ', 'Docker'],
        deliverable: 'Production API with unit & integration test suite (>95% coverage)',
      },
    ],
    duration: '6-8 Weeks (Self-paced)',
    processingFee: 199,
    projectMentorshipFee: 399,
    openings: 15,
    badge: 'Core Track',
  },
  {
    id: 'ai-fluency-intern',
    slug: '/FLUENCY',
    title: 'AI Fluency Intern',
    category: 'AI & Operations',
    tagline: 'Master generative AI, autonomous agent tooling & AI collaboration across every role.',
    description:
      'Learn to work with frontier AI as an autonomous partner across research, rapid prototyping, workflow automation, and multimodal business solutions.',
    skills: ['LLM Orchestration', 'Context Engineering', 'AI Workflows', 'Tool Integration', 'Multimodal GenAI'],
    topFitProjects: [
      {
        title: 'Autonomous Research & Synthesis Agent',
        description: 'Multi-source document summarizer extracting key corporate data points, citation tracking, and tabular outputs.',
        tech: ['Gemini / Claude API', 'Python', 'Markdown parser', 'Vector embeddings'],
        deliverable: 'Functional CLI / Web tool with structured JSON evaluation',
      },
      {
        title: 'Enterprise Workflow Automation Copilot',
        description: 'Natural language agent that drafts compliant customer communications, translates schemas, and verifies formatting.',
        tech: ['OpenAI / Gemini SDK', 'JSON Schema', 'TypeScript', 'Node.js'],
        deliverable: 'Tested agent pipeline with zero-shot validation benchmarks',
      },
    ],
    duration: '4-6 Weeks (Self-paced)',
    processingFee: 199,
    projectMentorshipFee: 399,
    openings: 20,
    badge: 'Trending',
  },
  {
    id: 'prompt-engineering-intern',
    slug: '/PROMPT',
    title: 'Prompt Engineering Intern',
    category: 'AI Engineering',
    tagline: 'Deterministic system instructions, few-shot reasoning, structured outputs & guardrails.',
    description:
      'Design production-ready prompts, structured output schemas, jailbreak evaluations, chain-of-thought protocols, and deterministic validation pipelines for LLM apps.',
    skills: ['Structured JSON Schemas', 'Chain-of-Thought (CoT)', 'Adversarial Red-Teaming', 'Prompt Versioning', 'RAG Guardrails'],
    topFitProjects: [
      {
        title: 'Production LLM Guardrail & Red-Teaming Suite',
        description: 'Systematic prompt security test suite detecting prompt injections, system prompt leaks, and toxic content.',
        tech: ['Python', 'JSON Schema', 'Langfuse / Arize', 'Automated Evals'],
        deliverable: 'Robust system prompt playbook + evaluation harness benchmark',
      },
      {
        title: 'Deterministic Financial Document Extractor',
        description: 'Few-shot structured reasoning prompt extracting balance sheet line items into validated Pydantic models.',
        tech: ['TypeScript / Python', 'Pydantic / Zod', 'Claude / Gemini API'],
        deliverable: 'Extensible schema extraction suite with 99%+ schema conformance',
      },
    ],
    duration: '4-6 Weeks (Self-paced)',
    processingFee: 199,
    projectMentorshipFee: 399,
    openings: 12,
    badge: 'Specialized',
  },
  {
    id: 'machine-learning-intern',
    slug: '/ML',
    title: 'Machine Learning Intern',
    category: 'AI & Data Science',
    tagline: 'Predictive modeling, embedding vectors, classification & model deployment.',
    description:
      'Build, train, and deploy practical machine learning models. Learn feature engineering, vector indexing, evaluation metrics, and containerized model inference.',
    skills: ['Scikit-Learn', 'PyTorch / TensorFlow', 'Vector DBs (Qdrant/FAISS)', 'Feature Engineering', 'FastAPI'],
    topFitProjects: [
      {
        title: 'Semantic Search & Hybrid RAG Engine',
        description: 'Dense vector retrieval combined with BM25 sparse lexical search over 100k enterprise documents.',
        tech: ['Python', 'FastAPI', 'FAISS / Qdrant', 'HuggingFace Embeddings'],
        deliverable: 'Containerized search API with precision@k evaluation metrics',
      },
      {
        title: 'Real-Time Fraud & Anomaly Detection Service',
        description: 'Gradient boosting model (XGBoost/LightGBM) scoring incoming transaction events under 15ms.',
        tech: ['Python', 'XGBoost', 'Docker', 'FastAPI'],
        deliverable: 'Dockerized inference server with ROC-AUC & PR curve verification',
      },
    ],
    duration: '6-8 Weeks (Self-paced)',
    processingFee: 199,
    projectMentorshipFee: 399,
    openings: 16,
    badge: 'Advanced',
  },
  {
    id: 'seo-intern',
    slug: '/SEO',
    title: 'SEO Intern',
    category: 'Growth & Marketing',
    tagline: 'Technical SEO audits, semantic search indexing, programmatic content & rank optimization.',
    description:
      'Drive organic discoverability through technical SEO architectures, Core Web Vitals optimization, schema markup, search intent analysis, and automated indexing.',
    skills: ['Technical SEO Audits', 'Structured Data / Schema.org', 'Core Web Vitals', 'Search Console', 'Keyword Clustering'],
    topFitProjects: [
      {
        title: 'Full-Stack Technical SEO Audit & Core Web Vitals Overhaul',
        description: 'Comprehensive crawl of 1,000+ pages, resolving crawl budgets, canonicalization errors, and LCP bottlenecks.',
        tech: ['Screaming Frog', 'Lighthouse CLI', 'Google Search Console API', 'Schema JSON-LD'],
        deliverable: 'Executive audit report + pull request fixing technical SEO issues',
      },
      {
        title: 'Programmatic Semantic Topic Cluster Architecture',
        description: 'Keyword research and structured taxonomy plan mapping 50+ enterprise search intents to dynamic pages.',
        tech: ['Python', 'Google Trends', 'Ahrefs/SEMrush data', 'Markdown templates'],
        deliverable: 'Ready-to-deploy programmatic content roadmap & schema blueprint',
      },
    ],
    duration: '4-6 Weeks (Self-paced)',
    processingFee: 199,
    projectMentorshipFee: 399,
    openings: 10,
    badge: 'Growth',
  },
  {
    id: 'cybersecurity-intern',
    slug: '/SECURITY',
    title: 'Cybersecurity Intern',
    category: 'Security & Infrastructure',
    tagline: 'Defensive engineering, vulnerability assessment, cloud hardening & zero-trust posture.',
    description:
      'Identify vulnerabilities, audit web application security (OWASP Top 10), implement JWT/OAuth2 authentication safeguards, and write automated security tests.',
    skills: ['OWASP Top 10', 'Penetration Testing Basics', 'Cloud Security (IAM/VPC)', 'TLS / Encryption', 'Burp Suite / Zap'],
    topFitProjects: [
      {
        title: 'Web Application Penetration Test & Security Hardening Report',
        description: 'Systematic vulnerability assessment covering injection, broken authentication, SSRF, and CORS misconfigurations.',
        tech: ['OWASP ZAP', 'Burp Suite', 'Python Scanners', 'Bash'],
        deliverable: 'Comprehensive bug-bounty style vulnerability disclosure and fix patch',
      },
      {
        title: 'Zero-Trust API Authentication & Security Gateway',
        description: 'Cryptographic token validation gateway with HMAC request signing, replay attack protection, and IP reputation checks.',
        tech: ['Node.js / Go', 'JWT / WebCrypto', 'Redis', 'Docker'],
        deliverable: 'Production-ready security middleware package with test suite',
      },
    ],
    duration: '6-8 Weeks (Self-paced)',
    processingFee: 199,
    projectMentorshipFee: 399,
    openings: 12,
    badge: 'Critical Defense',
  },
];

export const INTERNSHIP_FAQS = [
  {
    q: 'What is the ₹199 Enrollment / Onboarding Fee for Internships?',
    a: 'The ₹199 enrollment fee is a nominal, one-time fee that covers student verification, automated credentials setup, access to our candidate portal, and administrative batch onboarding. It guarantees serious applicants and dedicated engineering resource allocation.',
  },
  {
    q: 'How does the ₹399 Project Mentorship fee work?',
    a: 'For each practical capstone project you build, you can opt for 1-on-1 industry mentorship for ₹399 per project. An experienced DotRepo Corp. engineer conducts line-by-line GitHub pull request code reviews, provides architectural feedback, and gives constructive suggestions to make your work production-grade.',
  },
  {
    q: 'Is this an online / remote internship, and where is DotRepo Corp. located?',
    a: 'The internship is 100% remote and self-paced, allowing students and working professionals from anywhere in India and globally to participate. DotRepo Corp. is headquartered in Bangalore (Bengaluru), Karnataka, India, with global cloud engineering clusters.',
  },
  {
    q: 'Do I get a verified certificate and Letter of Recommendation (LOR)?',
    a: 'Yes! Upon completing your chosen track milestones and capstone project, you receive a cryptographically verifiable Certificate of Completion with a unique verification link and credential ID. High-performing interns who complete their capstones are eligible for an official Letter of Recommendation (LOR) from our engineering leadership.',
  },
  {
    q: 'Can I apply for more than one track?',
    a: 'We recommend focusing on one primary track to build a standout, in-depth portfolio piece. However, you can indicate secondary interests in the official application form at https://rzbfxytr.formester.com/f/2dwWQiXyG.',
  },
  {
    q: 'How do I register and start?',
    a: 'Simply click "Apply Now" to open our official application form at https://rzbfxytr.formester.com/f/2dwWQiXyG. Enter your details, choose your track, submit, and our team will review your application within 24-48 hours.',
  },
];
