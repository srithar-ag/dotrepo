import {
  ProductItem,
  EcosystemPillar,
  IndustrySolution,
  AICapability,
  CloudFeature,
  CareerPosition,
  ResourceItem,
} from '../types';

export const BRAND_INFO = {
  name: 'DotRepo Corp.',
  tagline: 'Enterprise Corporate Platform Built for Global Workloads.',
  supportingLine: 'Cloud. Software. Data. AI. Built for the future.',
  vision:
    'To build accessible, intelligent, and scalable technology that enables organizations around the world to operate better, innovate faster, and grow further.',
  foundedYear: '2026',
};

// Configurable placeholder data for global reach
export const GLOBAL_SCALE_STATS = [
  {
    value: '100+',
    label: 'Products & Services',
    detail: 'Full-spectrum enterprise ecosystem',
    isPlaceholder: true,
  },
  {
    value: '50+',
    label: 'Markets',
    detail: 'Global compliance and local data sovereignty',
    isPlaceholder: true,
  },
  {
    value: '24/7',
    label: 'Cloud Infrastructure',
    detail: '99.999% SLA across multi-region clusters',
    isPlaceholder: true,
  },
  {
    value: 'Millions',
    label: 'of Users',
    detail: 'From high-growth teams to Fortune 500 enterprises',
    isPlaceholder: true,
  },
];

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  {
    title: 'Cloud',
    tagline: 'Scalable infrastructure designed for modern workloads.',
    description:
      'Elastic compute, managed relational and vector databases, global CDN edge networks, and carrier-grade networking with 99.999% availability.',
    features: ['Multi-region compute', 'Serverless execution', 'Low-latency global edge', 'Zero-trust network architecture'],
    icon: 'Cloud',
  },
  {
    title: 'Software',
    tagline: 'Business applications that simplify complex operations.',
    description:
      'Unified enterprise suites spanning CRM, automated financial ledgers, operational supply chains, multi-channel support, and workforce talent systems.',
    features: ['Modular micro-apps', 'Unified data model', 'Cross-app automated flows', 'Native mobile & desktop clients'],
    icon: 'Layers',
  },
  {
    title: 'Data',
    tagline: 'Secure platforms for managing and understanding business data.',
    description:
      'High-throughput distributed storage, real-time analytics streaming, unified data mesh governance, and automated pipeline orchestration.',
    features: ['Distributed SQL & NoSQL', 'Real-time streaming pipeline', 'Automated data lineage', 'Field-level tokenization'],
    icon: 'Database',
  },
  {
    title: 'AI',
    tagline: 'Intelligent systems that automate workflows and accelerate decisions.',
    description:
      'Context-aware autonomous agents, enterprise RAG engines, predictive decision models, and natural language interfaces built into daily operations.',
    features: ['Self-orchestrating agents', 'Private enterprise RAG', 'Predictive modeling', 'Strict private model governance'],
    icon: 'Sparkles',
  },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  // Business Applications
  {
    id: 'crm',
    name: 'DotRepo Corp. CRM',
    category: 'business',
    tagline: 'Unified customer relationships, sales pipelines, and revenue intelligence.',
    description:
      'Manage customer relationships, sales pipelines, leads, and revenue with automated stage progression, call transcription, and deal velocity analytics.',
    capabilities: ['Dynamic Pipeline Automation', 'AI-assisted Deal Scoring', 'Unified Omnichannel Inbox', 'Revenue Forecasting'],
    metrics: '+38% Faster Sales Velocity',
    iconName: 'Users',
    featured: true,
  },
  {
    id: 'finance',
    name: 'DotRepo Corp. Finance',
    category: 'business',
    tagline: 'Modern financial management, automated reconciliation, and business accounting.',
    description:
      'Modern financial management and business accounting. Automate accounts payable, multi-currency ledgers, revenue recognition, and global tax compliance.',
    capabilities: ['Continuous Ledger Reconciliation', 'Multi-entity Consolidation', 'Automated Invoicing & Collections', 'Audit-ready Reporting'],
    metrics: '99.4% Automated Reconciliation',
    iconName: 'CreditCard',
    featured: true,
  },
  {
    id: 'operations',
    name: 'DotRepo Corp. Operations',
    category: 'business',
    tagline: 'Connect workflows, teams, processes, and distributed operations.',
    description:
      'Connect workflows, teams, processes, and business operations. Orchestrate logistics, procurement, asset tracking, and vendor management in real time.',
    capabilities: ['End-to-end Process Orchestration', 'Vendor Lifecycle Portal', 'Inventory & Fulfillment Tracking', 'SLA Monitoring'],
    metrics: '4.2x Faster Fulfillment Cycle',
    iconName: 'Cpu',
    featured: true,
  },
  {
    id: 'support',
    name: 'DotRepo Corp. Support',
    category: 'business',
    tagline: 'Deliver intelligent, high-velocity customer service across every channel.',
    description:
      'Deliver intelligent customer service across every channel. Coordinate email, chat, voice, and social tickets with context-grounded AI agent resolution.',
    capabilities: ['Autonomous First-touch Resolution', 'Live Agent Copilot', 'SLA Risk Prediction', 'Global Knowledge Base Sync'],
    metrics: '62% Autonomous Issue Resolution',
    iconName: 'Headphones',
    featured: true,
  },
  {
    id: 'people',
    name: 'DotRepo Corp. People',
    category: 'business',
    tagline: 'Comprehensive human capital management, talent pipelines, and organizational workflows.',
    description:
      'Manage employees, talent, and organizational workflows. From compliant global payroll and benefits to performance reviews and talent development.',
    capabilities: ['Global Payroll & Contractor Settlement', 'Org Chart & Succession Planning', 'Automated Onboarding Workflows', 'Performance Calibration'],
    metrics: '70% Reduction in HR Overhead',
    iconName: 'UserCheck',
    featured: true,
  },

  // Data & Cloud
  {
    id: 'database',
    name: 'DotRepo Corp. Database',
    category: 'data-cloud',
    tagline: 'Globally distributed, ACID-compliant multi-model database engine.',
    description:
      'High-performance distributed database combining transactional relational integrity with native vector search and graph query capabilities.',
    capabilities: ['Sub-millisecond Global Read Latency', 'Native HNSW Vector Indexing', 'Automatic Partition Sharding', 'Continuous Point-in-Time Recovery'],
    metrics: 'Sub-5ms Query Latency at Scale',
    iconName: 'Server',
    featured: true,
  },
  {
    id: 'cloud',
    name: 'DotRepo Corp. Cloud',
    category: 'data-cloud',
    tagline: 'Elastic infrastructure, container orchestration, and serverless compute.',
    description:
      'Carrier-grade enterprise cloud with bare-metal performance, auto-scaling Kubernetes clusters, programmable edge proxies, and isolated VPC networks.',
    capabilities: ['Multi-region VPC Peering', 'Zero-downtime Rolling Deployments', 'Bare-metal Dedicated Compute', 'Automatic DDoS Scrubbing'],
    metrics: '99.999% Guaranteed SLA',
    iconName: 'CloudRain',
    featured: true,
  },
  {
    id: 'analytics',
    name: 'DotRepo Corp. Analytics',
    category: 'data-cloud',
    tagline: 'Turn enterprise business data into actionable real-time insights.',
    description:
      'Turn business data into actionable insights with self-service exploratory dashboards, natural-language SQL queries, and automated anomaly alerts.',
    capabilities: ['Direct Query on Data Lakehouse', 'Natural Language to SQL', 'Automated Metric Anomaly Detection', 'Granular Role-based Dashboards'],
    metrics: '10x Faster Dashboard Queries',
    iconName: 'BarChart3',
    featured: true,
  },
  {
    id: 'data-platform',
    name: 'DotRepo Corp. Data Platform',
    category: 'data-cloud',
    tagline: 'Unified data ingestion, transformation pipeline, and governance mesh.',
    description:
      'Connect over 300 data sources with streaming ETL, automated schema migration, data quality validation, and enterprise governance lineage tracking.',
    capabilities: ['Real-time Event Streaming (Kafka/Pulsar)', 'Zero-code Pipeline Builder', 'Automated PII Masking', 'Cross-system Lineage Graph'],
    metrics: 'Peta-scale Daily Throughput',
    iconName: 'HardDrive',
  },

  // AI & Automation
  {
    id: 'ai',
    name: 'DotRepo Corp. AI',
    category: 'ai-automation',
    tagline: 'Foundational enterprise models and private cognitive infrastructure.',
    description:
      'Deploy enterprise-grade foundation models fine-tuned on corporate taxonomy with strict tenant isolation, zero customer data training, and full audit logs.',
    capabilities: ['Isolated Private Inference Clusters', 'Zero-data Retention Policy', 'Model Alignment & Toxicity Filters', 'Low-latency Quantized Serving'],
    metrics: 'Zero Training Leakage Guarantee',
    iconName: 'Sparkles',
    featured: true,
  },
  {
    id: 'agents',
    name: 'DotRepo Corp. Agents',
    category: 'ai-automation',
    tagline: 'Autonomous AI agents that execute complex multi-step business workflows.',
    description:
      'Deploy multi-agent task forces capable of browsing databases, invoking REST APIs, generating reports, resolving support tickets, and reconciling ledgers.',
    capabilities: ['Multi-agent Tool Calling', 'Human-in-the-Loop Safeguards', 'Stateful Memory Scratchpads', 'Determinism Validation Engine'],
    metrics: '94% Task Completion Accuracy',
    iconName: 'Bot',
    featured: true,
  },
  {
    id: 'automation',
    name: 'DotRepo Corp. Automation',
    category: 'ai-automation',
    tagline: 'Visual enterprise workflow engine with deep cross-system triggers.',
    description:
      'Design, simulate, and execute mission-critical automations across cloud services, legacy mainframes, ERPs, and external partner endpoints without code.',
    capabilities: ['Event-driven Trigger Mesh', 'Visual DAG Flow Canvas', 'Automatic Error Retry & Rollback', 'Granular Audit Traceability'],
    metrics: '1.2B Actions Executed / Month',
    iconName: 'Workflow',
  },
  {
    id: 'intelligence',
    name: 'DotRepo Corp. Intelligence',
    category: 'ai-automation',
    tagline: 'Document understanding, OCR, and multimodal cognitive extraction.',
    description:
      'Extract structured entities from unstructured contracts, invoices, balance sheets, emails, and technical schematics with 99.8% precision.',
    capabilities: ['Complex Table & Layout Extraction', 'Multilingual Entity Recognition', 'Signature & Tamper Detection', 'Automated Schema Mapping'],
    metrics: '99.8% Entity Extraction Precision',
    iconName: 'BrainCircuit',
  },

  // Developer Platform
  {
    id: 'api',
    name: 'DotRepo Corp. API',
    category: 'developer',
    tagline: 'Standardized REST and GraphQL interfaces for every DotRepo Corp. service.',
    description:
      'Complete programmatic access to all DotRepo Corp. software, databases, AI models, and infrastructure with OpenAPI 3.1 specifications and typed responses.',
    capabilities: ['Universal Rate-limiting & Quotas', 'Sub-15ms Global Gateway Latency', 'Granular Token Permissions', 'Interactive Documentation Sandbox'],
    metrics: 'Sub-15ms Edge Gateway Response',
    iconName: 'Code',
    featured: true,
  },
  {
    id: 'developer-platform',
    name: 'DotRepo Corp. Developer Platform',
    category: 'developer',
    tagline: 'CLI tools, client SDKs, testing environments, and CI/CD integrations.',
    description:
      'Everything engineers need to build on DotRepo Corp.: official SDKs for TypeScript, Python, Go, Java, and C#, plus local emulators and automated testing sandboxes.',
    capabilities: ['Official Typed SDKs for 6 Languages', 'Local Mock CLI Sandbox', 'Automated Webhook Signatures', 'Dev / Staging / Prod Environments'],
    metrics: 'Instant Sandbox Provisioning',
    iconName: 'Terminal',
    featured: true,
  },
  {
    id: 'integrations',
    name: 'DotRepo Corp. Integrations',
    category: 'developer',
    tagline: 'Pre-built connectors for over 500 enterprise legacy and modern applications.',
    description:
      'Plug DotRepo Corp. into existing enterprise architectures with certified bi-directional sync for SAP, Oracle, Salesforce, Microsoft 365, Snowflake, and AWS.',
    capabilities: ['Bi-directional Change Data Capture', 'Guaranteed At-least-once Delivery', 'Automatic Data Normalization', 'Custom Webhook Relay'],
    metrics: '500+ Certified Connectors',
    iconName: 'Share2',
  },
];

export const AI_CAPABILITIES: AICapability[] = [
  {
    id: 'assistants',
    title: 'AI Assistants',
    description: 'Context-aware workspace copilots that summarize threads, draft proposals, and extract insights on demand.',
    technicalDetail: 'Powered by contextual attention caches and real-time enterprise permissions enforcement.',
    iconName: 'MessageSquareText',
    enterpriseReady: true,
  },
  {
    id: 'agents',
    title: 'AI Agents',
    description: 'Autonomous goal-driven systems that plan, invoke business tools, verify outputs, and execute end-to-end tasks.',
    technicalDetail: 'Hierarchical planner-executor state machines with human-in-the-loop escalation switches.',
    iconName: 'Bot',
    enterpriseReady: true,
  },
  {
    id: 'generative',
    title: 'Generative AI',
    description: 'Private generative text, structured data, and code generation tuned to domain corporate terminology.',
    technicalDetail: 'Dedicated VPC inference containers with deterministic JSON-schema validation.',
    iconName: 'Wand2',
    enterpriseReady: true,
  },
  {
    id: 'predictive',
    title: 'Predictive Analytics',
    description: 'Continuous machine learning models that forecast customer churn, inventory demand, and financial cashflow.',
    technicalDetail: 'Automated feature store retraining on live operational events without model drift.',
    iconName: 'TrendingUp',
    enterpriseReady: true,
  },
  {
    id: 'automation',
    title: 'Intelligent Automation',
    description: 'Adaptive process automations that self-heal when external schemas change and handle edge-case exceptions.',
    technicalDetail: 'Probabilistic exception routing combined with deterministic transactional rollbacks.',
    iconName: 'Zap',
    enterpriseReady: true,
  },
  {
    id: 'nl-interface',
    title: 'Natural Language Interfaces',
    description: 'Query enterprise databases, trigger builds, or generate financial reports using everyday conversational language.',
    technicalDetail: 'Semantic parser translates intent into parameterized ASTs verified against schema rules.',
    iconName: 'Terminal',
    enterpriseReady: true,
  },
  {
    id: 'doc-intelligence',
    title: 'Document Intelligence',
    description: 'High-speed ingestion and semantic entity extraction from complex contracts, invoices, and blueprints.',
    technicalDetail: 'Multimodal vision-language models capable of parsing multi-column tables and cursive stamps.',
    iconName: 'FileText',
    enterpriseReady: true,
  },
  {
    id: 'enterprise-rag',
    title: 'Enterprise RAG',
    description: 'Private retrieval augmented generation that indexes internal wikis, codebases, and customer files securely.',
    technicalDetail: 'Hybrid dense-sparse vector indexing with instant ACL (access control list) filtering.',
    iconName: 'Search',
    enterpriseReady: true,
  },
];

export const CLOUD_FEATURES: CloudFeature[] = [
  {
    id: 'compute',
    title: 'Compute',
    description: 'Serverless containers, managed Kubernetes (k8s), and high-memory bare-metal instances with instant scale-up.',
    spec: 'Up to 128 vCPUs / 1TB RAM per node',
    iconName: 'Cpu',
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Multi-region distributed SQL with zero-downtime automated failover, native sharding, and vector indexes.',
    spec: 'Sub-5ms global p99 query latency',
    iconName: 'Database',
  },
  {
    id: 'storage',
    title: 'Storage',
    description: 'Infinite blob storage with tiered archival, geo-replication, and automated object lifecycle encryption.',
    spec: '99.999999999% (11 9s) durability',
    iconName: 'HardDrive',
  },
  {
    id: 'apis',
    title: 'APIs & Gateways',
    description: 'Global programmable API gateway with intelligent routing, rate-limiting, and distributed token verification.',
    spec: 'Edge routing across 180+ PoPs',
    iconName: 'Globe',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Hardware security modules (HSM), automated TLS renewal, DDoS mitigation, and continuous vulnerability scans.',
    spec: 'SOC 2 Type II & ISO 27001 certified',
    iconName: 'ShieldCheck',
  },
  {
    id: 'observability',
    title: 'Observability',
    description: 'Unified distributed tracing, high-cardinality metrics, structured log search, and predictive alerting.',
    spec: '100% trace capture at 100k req/sec',
    iconName: 'Activity',
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    description: 'Preview environments per branch, container registries, automated secrets management, and instant CI/CD.',
    spec: 'Sub-3s container boot times',
    iconName: 'Terminal',
  },
  {
    id: 'ai-infra',
    title: 'AI Infrastructure',
    description: 'High-density GPU accelerators for training and low-latency inference clusters with NVLink interconnects.',
    spec: 'H100 & B200 GPU clusters available',
    iconName: 'Sparkles',
  },
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'finance',
    name: 'Financial Services',
    iconName: 'Landmark',
    headline: 'Secure, compliant core infrastructure for banking, trading, and fintech.',
    description:
      'Deliver low-latency transactional integrity, real-time fraud mitigation, automated regulatory reporting, and encrypted client vaults.',
    benefits: ['Sub-millisecond trade reconciliation', 'Automated AML & KYC checks', 'Zero-trust perimeter security'],
    impactMetric: '99.999% SLA during peak volume',
    productsUsed: ['DotRepo Corp. Database', 'DotRepo Corp. Finance', 'DotRepo Corp. Intelligence'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    iconName: 'HeartPulse',
    headline: 'HIPAA-compliant data pipelines and patient management platforms.',
    description:
      'Accelerate clinical trials, unify electronic health record pipelines, and deploy private AI assistants that protect patient privacy.',
    benefits: ['Encrypted patient telemetry', 'Automated clinical documentation', 'Full audit trail compliance'],
    impactMetric: '45% reduction in charting backlog',
    productsUsed: ['DotRepo Corp. People', 'DotRepo Corp. Operations', 'DotRepo Corp. Cloud'],
  },
  {
    id: 'retail',
    name: 'Retail & Commerce',
    iconName: 'ShoppingBag',
    headline: 'Omnichannel inventory synchronization and intelligent personalized checkout.',
    description:
      'Unify in-store POS and e-commerce transactions, forecast seasonal demand with predictive AI, and automate supplier replenishment.',
    benefits: ['Real-time inventory across stores', 'Dynamic promotional pricing', 'Personalized conversational search'],
    impactMetric: '+24% average basket size',
    productsUsed: ['DotRepo Corp. CRM', 'DotRepo Corp. Analytics', 'DotRepo Corp. AI'],
  },
  {
    id: 'education',
    name: 'Higher Education & Research',
    iconName: 'GraduationCap',
    headline: 'Scalable campus management and high-performance computing clusters.',
    description:
      'Streamline admissions, coordinate faculty research data sets, and provide students with intelligent 24/7 academic advising assistants.',
    benefits: ['Unified student portal & billing', 'Research compute clusters on demand', 'Campus-wide identity federation'],
    impactMetric: '3.5x faster grant proposal processing',
    productsUsed: ['DotRepo Corp. Cloud', 'DotRepo Corp. Support', 'DotRepo Corp. Database'],
  },
  {
    id: 'manufacturing',
    name: 'Advanced Manufacturing',
    iconName: 'Factory',
    headline: 'Smart factory telematics, predictive maintenance, and supply chain visibility.',
    description:
      'Connect industrial IoT sensors, prevent unpredicted downtime on assembly lines, and optimize procurement lead times.',
    benefits: ['Predictive equipment diagnostics', 'Real-time supply chain digital twin', 'Automated quality defect detection'],
    impactMetric: '-31% unplanned machine downtime',
    productsUsed: ['DotRepo Corp. Operations', 'DotRepo Corp. AI', 'DotRepo Corp. Data Platform'],
  },
  {
    id: 'technology',
    name: 'Technology & SaaS',
    iconName: 'Laptop',
    headline: 'Carrier-grade cloud infrastructure and developer APIs to scale high-growth apps.',
    description:
      'Eliminate infrastructure overhead with autoscaling compute, distributed SQL, built-in multi-tenant auth, and unified analytics.',
    benefits: ['One-click global multi-region rollout', 'Integrated billing & subscription metrics', 'Pre-built SOC 2 compliance readiness'],
    impactMetric: '60% faster engineering time-to-market',
    productsUsed: ['DotRepo Corp. Developer Platform', 'DotRepo Corp. Cloud', 'DotRepo Corp. API'],
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    iconName: 'Briefcase',
    headline: 'Streamlined resource scheduling, project billing, and client collaboration.',
    description:
      'Enable legal, accounting, and consulting firms to forecast team utilization, automate retainers, and deliver transparent client portals.',
    benefits: ['Automated time-tracking & invoices', 'Secure document sharing vaults', 'Capacity planning forecasting'],
    impactMetric: '+18% billable realization rate',
    productsUsed: ['DotRepo Corp. Operations', 'DotRepo Corp. Finance', 'DotRepo Corp. CRM'],
  },
  {
    id: 'startups',
    name: 'Startups & Scaleups',
    iconName: 'Rocket',
    headline: 'The complete software and cloud stack to launch fast and scale without re-architecting.',
    description:
      'Get enterprise-grade databases, auth, billing, and AI APIs on day one with generous scale credits and startup developer tools.',
    benefits: ['Zero-devops serverless foundations', 'Integrated product analytics', 'Dedicated technical architect advisory'],
    impactMetric: 'Launch MVP in under 14 days',
    productsUsed: ['DotRepo Corp. Cloud', 'DotRepo Corp. API', 'DotRepo Corp. Database'],
  },
];

export const SECURITY_PILLARS = [
  {
    title: 'Security',
    tagline: 'Defense-in-depth infrastructure',
    description: 'Hardware-level encryption at rest (AES-256-GCM) and in transit (TLS 1.3), automated vulnerability scanning, and 24/7 dedicated SOC.',
  },
  {
    title: 'Privacy',
    tagline: 'Strict customer data sovereignty',
    description: 'You own your data. We never train public AI models on customer inputs, nor do we sell, inspect, or share proprietary business records.',
  },
  {
    title: 'Compliance',
    tagline: 'Certified to global industry standards',
    description: 'Continuous audit readiness for SOC 2 Type II, ISO/IEC 27001, GDPR, HIPAA, PCI-DSS Level 1, and regional data protection frameworks.',
  },
  {
    title: 'Reliability',
    tagline: '99.999% uptime operational architecture',
    description: 'Active-active multi-region failover, automated point-in-time state recovery, and chaos-tested distributed systems.',
  },
  {
    title: 'Identity',
    tagline: 'Enterprise Single Sign-On (SSO)',
    description: 'SAML 2.0, OIDC, SCIM auto-provisioning, FIDO2 WebAuthn hardware keys, and context-based adaptive MFA policies.',
  },
  {
    title: 'Access Management',
    tagline: 'Granular Role-Based Access Control',
    description: 'Fine-grained policy engines defining least-privilege permissions across organizations, workspaces, projects, and field-level entities.',
  },
];

export const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: 'staff-distributed-systems',
    title: 'Staff Distributed Systems Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    experience: '8+ years',
    description: 'Architect and scale our globally distributed database engine and consensus layer processing billions of queries daily.',
    responsibilities: [
      'Design fault-tolerant consensus algorithms (Raft/Paxos) for DotRepo Corp. Database.',
      'Optimize low-level C++ and Rust storage engines for sub-millisecond p99 latencies.',
      'Partner with cloud infrastructure teams on zero-downtime cross-region replication.',
    ],
    requirements: [
      'Demonstrated expertise in distributed consensus, LSM-trees, or distributed transactions.',
      'Proficiency in Rust, Go, or modern C++.',
      'Deep understanding of Linux kernel I/O, eBPF, and network sockets.',
    ],
  },
  {
    id: 'principal-ai-researcher',
    title: 'Principal AI & Reasoning Scientist',
    department: 'AI & Machine Learning',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    experience: '7+ years',
    description: 'Lead research on autonomous multi-agent orchestration, verifiable planning, and private domain-specific fine-tuning.',
    responsibilities: [
      'Invent novel reasoning paradigms for DotRepo Corp. Agents operating on enterprise relational graphs.',
      'Develop hallucination suppression benchmarks and deterministic tool-calling constraints.',
      'Publish state-of-the-art findings in top venues (NeurIPS, ICML, ICLR).',
    ],
    requirements: [
      'PhD in Computer Science, Machine Learning, or related quantitative field.',
      'Track record of foundational model training and agentic evaluation.',
      'Hands-on experience with PyTorch, vLLM, and distributed GPU training clusters.',
    ],
  },
  {
    id: 'cloud-infrastructure-architect',
    title: 'Principal Cloud Infrastructure Architect',
    department: 'Cloud',
    location: 'Seattle, WA / London, UK',
    type: 'Full-time',
    experience: '10+ years',
    description: 'Shape the next generation of DotRepo Corp. Cloud hypervisor and software-defined networking across global points of presence.',
    responsibilities: [
      'Design multi-tenant hypervisor isolation and smartNIC acceleration.',
      'Ensure 99.999% SLA across 40+ global cloud regions and edge clusters.',
      'Direct capacity planning, global fiber routing, and cost efficiency initiatives.',
    ],
    requirements: [
      'Extensive experience managing massive-scale Kubernetes and BGP networking.',
      'Deep knowledge of VPC isolation, WireGuard, and hardware acceleration.',
      'Proven leadership scaling mission-critical tier-0 cloud services.',
    ],
  },
  {
    id: 'vp-product-business-apps',
    title: 'Group Product Manager, Enterprise Suite',
    department: 'Product',
    location: 'San Francisco, CA / Hybrid',
    type: 'Full-time',
    experience: '6+ years',
    description: 'Define the product roadmap for DotRepo Corp. CRM, Finance, and Operations, unifying them into an intuitive suite.',
    responsibilities: [
      'Drive customer discovery with Fortune 500 CIOs and operational leaders.',
      'Define unified cross-application workflow primitives and design language.',
      'Partner closely with engineering and GTM on positioning, pricing, and adoption.',
    ],
    requirements: [
      'Track record of building and scaling B2B SaaS or enterprise ERP applications.',
      'Exceptional analytical rigor and customer empathy.',
      'Ability to translate complex business needs into elegant software experiences.',
    ],
  },
  {
    id: 'design-systems-lead',
    title: 'Staff Product Designer, Design Systems',
    department: 'Design',
    location: 'Remote (Worldwide)',
    type: 'Full-time',
    experience: '6+ years',
    description: 'Craft the foundational design system and visual component architecture used across the entire DotRepo Corp. product family.',
    responsibilities: [
      'Maintain and elevate the DotRepo Corp. enterprise design tokens, components, and interaction patterns.',
      'Ensure accessible, high-contrast, beautiful data visualization and micro-interactions.',
      'Collaborate with frontend engineers to uphold rigorous implementation fidelity.',
    ],
    requirements: [
      'World-class portfolio demonstrating complex enterprise tool design.',
      'Deep fluency in Figma variables, tokens, and React/Tailwind implementation.',
      'Relentless attention to typographic hierarchy and spatial harmony.',
    ],
  },
  {
    id: 'enterprise-account-executive',
    title: 'Enterprise Strategic Account Executive',
    department: 'Sales',
    location: 'Chicago, IL / New York, NY',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead commercial engagements with enterprise accounts exploring digital transformation and infrastructure modernization.',
    responsibilities: [
      'Manage multi-million dollar annual contract opportunities across global enterprises.',
      'Navigate multi-stakeholder procurement, security reviews, and executive sponsorships.',
      'Partner with Solutions Architects to demonstrate concrete business ROI.',
    ],
    requirements: [
      'Consistent quota over-achievement selling cloud infrastructure or enterprise SaaS.',
      'Deep understanding of corporate IT procurement and enterprise security evaluations.',
      'Consultative sales approach and high integrity.',
    ],
  },
  {
    id: 'solutions-architect-operations',
    title: 'Senior Enterprise Solutions Architect',
    department: 'Operations',
    location: 'Singapore / Tokyo / Remote',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Guide enterprise customers through large-scale migration from legacy stacks onto DotRepo Corp. Cloud and Business Applications.',
    responsibilities: [
      'Develop reference migration architectures for high-throughput transactional systems.',
      'Conduct proof-of-concept benchmarks and technical enablement for customer engineering teams.',
      'Synthesize customer feedback to influence product engineering roadmaps.',
    ],
    requirements: [
      'Hands-on experience with database migration, hybrid cloud networking, and enterprise ERPs.',
      'Excellent verbal and written technical communication skills.',
      'Experience working directly with enterprise CTOs and lead architects.',
    ],
  },
  {
    id: 'research-engineer-compilers',
    title: 'Research Engineer, Query Optimizers',
    department: 'Research',
    location: 'Boston, MA / Remote',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Push the frontiers of relational and vector query compilation, adaptive plan caching, and GPU-accelerated joins.',
    responsibilities: [
      'Research cost-based query optimization techniques using machine learning heuristics.',
      'Implement JIT expression compilation targeting LLVM and WebAssembly.',
      'Benchmark query latency against industry standard TPC-H and TPC-DS suites.',
    ],
    requirements: [
      'Strong background in database internals, compiler design, or runtime systems.',
      'Proficiency in C++, Rust, and assembly-level profiling.',
      'Passion for squeezing maximum memory bandwidth and CPU cache locality.',
    ],
  },
];

export const RESOURCES_CATALOG: ResourceItem[] = [
  {
    id: 'whitepaper-multi-cloud',
    title: 'Architecting Resilient Multi-Region Applications with DotRepo Corp. Database',
    category: 'Architecture',
    publishDate: 'September 2026',
    readTime: '18 min read',
    summary:
      'A deep dive into distributed consensus, deterministic transaction sequencing, and zero-loss disaster recovery across three continents.',
    downloadSize: '2.4 MB PDF',
  },
  {
    id: 'whitepaper-enterprise-rag',
    title: 'Enterprise RAG Blueprint: Security, Lineage, and Zero-Data Retention',
    category: 'Whitepaper',
    publishDate: 'August 2026',
    readTime: '24 min read',
    summary:
      'Technical design patterns for deploying retrieval-augmented generation inside strictly audited enterprise networks without data leakage.',
    downloadSize: '3.8 MB PDF',
  },
  {
    id: 'case-study-global-logistics',
    title: 'How GlobalFreight Coordinated 400,000 Containers Daily with DotRepo Corp. Operations',
    category: 'Case Study',
    publishDate: 'July 2026',
    readTime: '12 min read',
    summary:
      'Replacing five disconnected legacy systems with DotRepo Corp. unified workflows to decrease port dwell time by 32% in under nine months.',
    downloadSize: '1.9 MB PDF',
  },
  {
    id: 'guide-soc2-compliance',
    title: 'The Continuous Compliance Handbook: From Zero to SOC 2 Type II',
    category: 'Guide',
    publishDate: 'June 2026',
    readTime: '15 min read',
    summary:
      'Step-by-step guidance for engineering leaders implementing automated infrastructure controls, audit logs, and IAM enforcement.',
    downloadSize: '2.1 MB PDF',
  },
  {
    id: 'report-enterprise-ai-index',
    title: '2026 State of Enterprise AI & Autonomous Workflow Adoption',
    category: 'Report',
    publishDate: 'May 2026',
    readTime: '30 min read',
    summary:
      'Survey data from 1,200 CIOs and technical executives exploring real-world ROI, governance challenges, and agent integration metrics.',
    downloadSize: '5.2 MB PDF',
  },
];

export const CODE_SNIPPETS = {
  nodejs: `import { DotRepoClient } from '@dotrepo/sdk';

// Initialize with unified enterprise credentials
const client = new DotRepoClient({
  apiKey: process.env.DOTREPO_API_KEY,
  environment: 'production',
});

// Deploy an autonomous workflow agent
const agent = await client.agents.create({
  name: 'Revenue Reconciliation Agent',
  model: 'dotrepo-reasoning-v2',
  tools: ['database.query', 'finance.reconcile', 'crm.sync'],
  permissions: {
    dataAccess: 'restricted_ledger',
    humanApprovalRequired: true,
  },
});

// Trigger intelligent invoice matching
const result = await agent.run({
  prompt: 'Reconcile Q3 unpaid international invoices against SWIFT receipts',
  ledgerId: 'led_9941a82',
});

console.log('Reconciliation Status:', result.status);
console.log('Confidence Score:', result.confidence);`,

  python: `from dotrepo import DotRepoClient, AgentConfig

# Authenticate client
client = DotRepoClient(
    api_key="dr_sec_8f99c27b0104e76a",
    region="us-east-1"
)

# Stream vector search & structured intelligence
query_stream = client.intelligence.query(
    collection="enterprise_contracts_2026",
    natural_language="Find liability indemnification caps over $10M",
    top_k=5,
    verify_signatures=True
)

for match in query_stream:
    print(f"Contract: {match.document_id} | Liability: \${match.liability_cap:,}")
    print(f"Confidence: {match.score * 100:.1f}% | Excerpt: {match.excerpt}")`,

  go: `package main

import (
	"context"
	"fmt"
	"log"

	"github.com/dotrepo/dotrepo-go/client"
	"github.com/dotrepo/dotrepo-go/database"
)

func main() {
	ctx := context.Background()
	dr, err := client.New(client.WithAPIKey("dr_prod_token_392"))
	if err != nil {
		log.Fatal(err)
	}

	// Distributed ACID transaction with automatic failover
	tx, err := dr.Database.Begin(ctx, database.IsolationSerializable)
	if err != nil {
		log.Fatal(err)
	}
	defer tx.Rollback()

	// Update customer balance & emit event to pipeline
	_, err = tx.Exec(ctx, "UPDATE accounts SET balance = balance - $1 WHERE id = $2", 50000, "act_882")
	if err != nil {
		log.Fatal(err)
	}

	if err := tx.Commit(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Transaction committed across 3 global regions in 4.2ms")
}`,

  curl: `curl -X POST https://api.dotrepo.com/v1/ai/agents/execute \\
  -H "Authorization: Bearer dr_live_token_77a92" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "ag_ops_reconciliation_491",
    "parameters": {
      "timeframe": "last_30_days",
      "discrepancy_threshold_usd": 500,
      "notify_channel": "#finance-alerts"
    },
    "dry_run": false
  }'`,
};

export const FAQS = [
  {
    q: 'How does DotRepo Corp. differ from legacy enterprise software platforms?',
    a: 'Unlike traditional ERP and CRM suites that grew through fragmented acquisitions and incompatible databases, DotRepo Corp. was architected from the ground up as a single unified ecosystem. All business apps, databases, and AI models share a standardized data mesh, single-tenant or dedicated VPC isolation, and universal APIs.',
  },
  {
    q: 'Can DotRepo Corp. integrate with our existing SAP, Oracle, or Salesforce systems?',
    a: 'Yes. DotRepo Corp. Integrations includes over 500 pre-built, bi-directional connectors with Change Data Capture (CDC). You can run DotRepo Corp. applications alongside legacy systems without costly rip-and-replace projects.',
  },
  {
    q: 'Where is customer data stored, and how does DotRepo Corp. handle AI privacy?',
    a: 'Customer data is hosted in the region of your choice with data sovereignty guarantees. DotRepo Corp. operates with a strict Zero-Data Retention policy for AI inference: customer prompts, documents, and business records are NEVER used to train shared foundation models.',
  },
  {
    q: 'What is the uptime SLA and disaster recovery guarantee?',
    a: 'DotRepo Corp. Cloud offers a 99.999% availability SLA backed by contractually guaranteed financial credits. Our multi-region database infrastructure features active-active geo-replication with sub-second RPO (Recovery Point Objective) and near-instant RTO.',
  },
  {
    q: 'How do enterprise procurement and pilot programs work?',
    a: 'We offer dedicated Enterprise Proof of Concept (PoC) sandboxes with solutions architect pairing. Reach out via Talk to Sales to configure a tailored pilot within 48 hours.',
  },
];

export const FAQ_ITEMS = FAQS.map((f, i) => ({
  id: 'faq-' + i,
  question: f.q,
  answer: f.a,
}));

