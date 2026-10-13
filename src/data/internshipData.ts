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
      'Fill out the verified registration form. Share your portfolio or LinkedIn profile and pick one of the 13 specialized technical and professional tracks.',
    icon: 'FileCheck',
  },
  {
    step: '02',
    title: 'Onboard',
    tagline: 'Structured path & environment',
    description:
      'Get approved, enter the portal, and begin with a clear plan for your chosen field.',
    detail:
      'Receive your candidate welcome packet, batch workspace credentials, weekly milestones roadmap, and direct access to dedicated engineering leads.',
    icon: 'Sparkles',
  },
  {
    step: '03',
    title: 'Build',
    tagline: 'Real code, real architecture',
    description:
      'Complete practical track work and turn what you learn into a portfolio-ready capstone.',
    detail:
      'Develop production-grade capstone projects with automated CI/CD checks, rigorous architectural benchmarks, and real-world deliverables.',
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
    openings: 12,
    badge: 'Critical Defense',
  },
  {
    id: 'grant-writing-fundraising-intern',
    slug: '/GRANTS',
    title: 'Grant Writing & Fundraising Intern',
    category: 'Strategy & Grants',
    tagline: 'Prospect research, compelling narrative development, grant application pipelines & investor decks.',
    description:
      'Conduct institutional funding research, craft data-backed grant proposals, structure donor outreach pipelines, and build impact measurement reports for technical, research, and non-profit initiatives.',
    skills: ['Grant Proposal Writing', 'Prospect Research', 'Budget Modeling', 'Impact Assessment', 'Stewardship Cadences', 'Case Statements'],
    topFitProjects: [
      {
        title: 'Institutional Research & Innovation Grant Proposal',
        description: 'Comprehensive funding proposal including project rationale, budget breakdown, measurable milestone targets, and risk mitigation matrices.',
        tech: ['Grant Frameworks', 'Budgeting Models', 'Impact KPIs', 'Compliance Documentation'],
        deliverable: '15-page ready-to-submit institutional grant proposal package + executive summary deck',
      },
      {
        title: 'Strategic Donor Pipeline & Capital Campaign Architecture',
        description: 'Systematic donor prospecting directory tracking funding cycles, philanthropic criteria, alignment scorecards, and stewardship communications.',
        tech: ['Pipeline Tracking', 'Prospect Scoring', 'Stewardship Blueprints', 'Financial Modeling'],
        deliverable: 'Automated grant tracking tracker with 50+ prospect profiles and customized letter of inquiry (LOI) templates',
      },
    ],
    duration: '4-6 Weeks (Self-paced)',
    processingFee: 199,
    openings: 10,
    badge: 'New Track',
  },
  {
    id: 'curation-archival-intern',
    slug: '/ARCHIVE',
    title: 'Curation & Archival Intern',
    category: 'Knowledge & Archival',
    tagline: 'Digital preservation, metadata taxonomy, collection cataloging & archival retrieval architectures.',
    description:
      'Design structured metadata schemas, curate digital repository collections, implement archival preservation standards (Dublin Core, OAIS), and build digital exhibitions with search indexing.',
    skills: ['Digital Preservation', 'Dublin Core / Metadata', 'Taxonomy & Ontologies', 'Archival Finding Aids', 'Collection Cataloging', 'Search Indexing'],
    topFitProjects: [
      {
        title: 'Enterprise Digital Repository & Dublin Core Taxonomy System',
        description: 'Structured archival cataloging architecture for digital artifacts with Dublin Core metadata tagging, provenance audit logs, and versioned asset preservation.',
        tech: ['Dublin Core', 'JSON-LD Metadata', 'Open Archives (OAIS)', 'Taxonomy Standards'],
        deliverable: 'Complete digital repository schema, 100-item curated collection catalog, and preservation guide',
      },
      {
        title: 'Interactive Digital Exhibition & Archival Retrieval Portal',
        description: 'Searchable digital archive showcase with faceted filtering, interactive narrative curation, document transcription, and provenance tracking.',
        tech: ['Digital Curation', 'Search Indexing', 'Faceted Search', 'Provenance Audits'],
        deliverable: 'Interactive digital archive showcase portal with curated themes, source citations, and archival finding aid',
      },
    ],
    duration: '4-6 Weeks (Self-paced)',
    processingFee: 199,
    openings: 10,
    badge: 'New Track',
  },
  {
    id: 'sde-intern',
    slug: '/SDE',
    title: 'SDE Intern',
    category: 'Engineering',
    tagline: 'Full-stack software engineering, scalable architectures, algorithms & distributed systems.',
    description:
      'Develop full-stack web and cloud systems, implement efficient data structures and algorithms, engineer robust REST/GraphQL APIs, and write production unit & integration test suites.',
    skills: ['Data Structures & Algorithms', 'TypeScript / Python / Java', 'System Design Basics', 'REST & GraphQL APIs', 'SQL / NoSQL Databases', 'CI/CD Pipelines'],
    topFitProjects: [
      {
        title: 'Distributed Task Scheduling & Job Queue System',
        description: 'High-reliability background job processor with worker concurrency, task retry exponential backoff, and distributed locking with Redis.',
        tech: ['TypeScript / Go', 'Redis', 'PostgreSQL', 'Docker', 'Jest'],
        deliverable: 'Containerized distributed task worker service with comprehensive test coverage and performance benchmarks',
      },
      {
        title: 'Full-Stack Collaborative Workspace with Real-Time Sync',
        description: 'Multi-user document collaboration engine with operational transformation / CRDT sync, WebSocket event streaming, and optimistic UI updates.',
        tech: ['React', 'Node.js', 'WebSockets', 'Tailwind', 'Redis Pub/Sub'],
        deliverable: 'Production-ready full-stack web app with load testing reports and CI/CD workflow',
      },
    ],
    duration: '6-8 Weeks (Self-paced)',
    processingFee: 199,
    openings: 20,
    badge: 'Popular',
  },
  {
    id: 'gen-ai-intern',
    slug: '/GENAI',
    title: 'Gen AI Intern',
    category: 'AI & Machine Learning',
    tagline: 'Foundation models, multimodal generation, RAG architectures & autonomous agents.',
    description:
      'Build cutting-edge generative AI applications, implement Retrieval-Augmented Generation (RAG) with vector databases, orchestrate multi-agent workflows, and evaluate model performance.',
    skills: ['Gemini / Claude / OpenAI APIs', 'LangChain / LlamaIndex', 'Vector DBs (Pinecone/Qdrant)', 'RAG Architectures', 'Multimodal GenAI', 'Agent Tool-Calling'],
    topFitProjects: [
      {
        title: 'Multi-Modal Autonomous Research & Synthesis Copilot',
        description: 'End-to-end agentic workflow processing PDFs, images, and audio, generating structured technical briefs with citations and grounding checks.',
        tech: ['Gemini Multimodal API', 'Python', 'Qdrant', 'FastAPI', 'Streamlit'],
        deliverable: 'Live deployed multimodal research agent with benchmark evaluation dataset and hallucination guardrails',
      },
      {
        title: 'Enterprise Hybrid RAG System with Semantic Caching',
        description: 'Production RAG pipeline featuring hybrid dense/sparse search, reranking with Cross-Encoders, and Redis semantic caching for 80% latency reduction.',
        tech: ['Python', 'LangChain', 'Redis Semantic Cache', 'FastAPI', 'Docker'],
        deliverable: 'Dockerized production RAG API with automated evaluation suite (Ragas) and latency analysis',
      },
    ],
    duration: '6-8 Weeks (Self-paced)',
    processingFee: 199,
    openings: 18,
    badge: 'High Demand',
  },
  {
    id: 'applied-ai-intern',
    slug: '/APPLIED-AI',
    title: 'Applied AI Intern',
    category: 'AI & Machine Learning',
    tagline: 'Production AI pipelines, ML inference optimization, edge deployment & domain-specific AI solutions.',
    description:
      'Bridge research and production by deploying AI models to real-world products. Learn model serving, quantized inference (ONNX, TensorRT), latency optimization, and continuous evaluation.',
    skills: ['Model Serving & Inference', 'ONNX / TensorRT Quantization', 'FastAPI / Triton Server', 'Computer Vision / NLP', 'MLOps & Monitoring', 'Evaluation Benchmarks'],
    topFitProjects: [
      {
        title: 'Low-Latency Edge AI Inference Gateway',
        description: 'Quantized transformer and vision inference service optimized with ONNX Runtime, achieving sub-20ms P99 latency on CPU/GPU endpoints.',
        tech: ['Python', 'ONNX Runtime', 'FastAPI', 'Docker', 'Prometheus'],
        deliverable: 'Production inference server with stress-test benchmarks, Grafana telemetry, and load testing scripts',
      },
      {
        title: 'Automated Document Understanding & Extraction Engine',
        description: 'Domain-tailored computer vision and NLP pipeline for automated parsing of unstructured invoices, clinical notes, and legal filings.',
        tech: ['LayoutLM / Vision Transformers', 'Python', 'PyTorch', 'FastAPI'],
        deliverable: 'Ready-to-deploy document understanding API with 97%+ accuracy and automated schema validation',
      },
    ],
    duration: '6-8 Weeks (Self-paced)',
    processingFee: 199,
    openings: 15,
    badge: 'Core Track',
  },
];

export const INTERNSHIP_FAQS = [
  {
    q: 'What is the ₹199 Enrollment / Onboarding Fee for Internships?',
    a: 'The ₹199 enrollment fee is a nominal, one-time fee that covers student verification, automated credentials setup, access to our candidate portal, and administrative batch onboarding. It guarantees serious applicants and dedicated engineering resource allocation.',
  },
  {
    q: 'What capstone projects do interns work on?',
    a: 'Interns receive and build production-grade capstone projects tailored to their chosen technical track. Each capstone includes clear architecture specifications, automated CI/CD checks, and portfolio deliverables to showcase real-world proof of competence.',
  },
  {
    q: 'Is this an online / remote internship?',
    a: 'The internship is 100% remote and self-paced, allowing students and working professionals from anywhere globally to participate with flexible hours and milestone deadlines.',
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
