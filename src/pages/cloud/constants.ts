/**
 * DotRepo Corp. Cloud Platform - Centralized Content & Configuration
 * Visual Language: NVIDIA Enterprise & DGX Cloud Design System
 * All copy and technical specifications are editable from this file.
 */

export interface CloudTabItem {
  id: string;
  category: string;
  title: string;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  specLabel: string;
  specValue: string;
}

export const HERO_TABS: CloudTabItem[] = [
  {
    id: 'compute',
    category: 'ACCELERATED COMPUTE',
    title: 'Bare Metal & Container Infrastructure',
    headline: 'High-Density Compute Clusters Engineered for Throughput',
    subtext: 'From micro-VM serverless containers to high-memory bare metal nodes with up to 128 vCPUs and 1TB RAM per physical instance.',
    ctaText: 'Deploy Compute Nodes',
    ctaLink: '#configure',
    specLabel: 'NODE SPECIFICATION',
    specValue: '128 vCPUs · 1024 GB RAM · Dual 100GbE NICs',
  },
  {
    id: 'database',
    category: 'DISTRIBUTED DATA',
    title: 'Multi-Region Distributed SQL Engine',
    headline: 'Sub-5ms Global p99 Query Latency Across Sharded Clusters',
    subtext: 'Zero-downtime automated failover, native horizontal sharding, transactional consistency, and integrated vector search indexes.',
    ctaText: 'Explore Database Engine',
    ctaLink: '#configure',
    specLabel: 'TRANSACTION CONSISTENCY',
    specValue: 'Raft Consensus · ACID · Sub-5ms Global p99',
  },
  {
    id: 'storage',
    category: 'UNIFIED STORAGE',
    title: 'High-Durability Object & Block Volumes',
    headline: '99.999999999% Durability With Multi-Zone Replication',
    subtext: 'Limitless hot and cold blob storage, automatic lifecycle encryption, tiered archiving, and sub-millisecond NVMe block storage.',
    ctaText: 'Configure Storage Tiers',
    ctaLink: '#configure',
    specLabel: 'OBJECT DURABILITY',
    specValue: '11 Nines (99.999999999%) · NVMe Direct Attached',
  },
  {
    id: 'gateways',
    category: 'EDGE FABRIC',
    title: 'Global API Gateway & Anycast Routing',
    headline: 'Intelligent Edge Traffic Control Across 180+ Global PoPs',
    subtext: 'Distributed token verification, rate limiting, low-latency TLS termination, and programmable edge worker routing.',
    ctaText: 'Inspect Edge Network',
    ctaLink: '#regions',
    specLabel: 'NETWORK FABRIC',
    specValue: '180+ Global Points of Presence · Anycast BGP',
  },
  {
    id: 'ai-infra',
    category: 'ACCELERATED INTELLIGENCE',
    title: 'Enterprise AI & GPU Training Fabrics',
    headline: 'High-Bandwidth Interconnected GPU Clusters for Foundation Models',
    subtext: 'Dedicated accelerator fabrics, RDMA over Converged Ethernet (RoCE), and zero-jitter inference endpoints ready for enterprise production.',
    ctaText: 'Request Accelerator Quota',
    ctaLink: '#next-steps',
    specLabel: 'CLUSTER INTERCONNECT',
    specValue: '3.2 Tbps Bisection Bandwidth · NVLink Fabric',
  },
  {
    id: 'security',
    category: 'ZERO-TRUST ARCHITECTURE',
    title: 'Hardware-Enforced Cryptographic Isolation',
    headline: 'Multi-Tenant Microsegmentation & Quantum-Resistant Encryption',
    subtext: 'Continuous hardware attestation, automated DDoS mitigation at the edge, encrypted memory enclaves, and sovereign compliance boundaries.',
    ctaText: 'Review Security Architecture',
    ctaLink: '#how-it-works',
    specLabel: 'ISOLATION LEVEL',
    specValue: 'Hardware HSM · AES-256-GCM · Confidential Compute',
  },
];

export const SUB_NAV_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'services', label: 'Services' },
  { id: 'performance', label: 'Performance' },
  { id: 'configure', label: 'Configure' },
  { id: 'regions', label: 'Regions' },
  { id: 'developers', label: 'Developers' },
  { id: 'next-steps', label: 'Quote Now' },
];

export interface ArchitectureLayer {
  id: string;
  name: string;
  code: string;
  summary: string;
  description: string;
  metrics: { label: string; value: string }[];
  components: string[];
}

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'edge',
    name: 'Edge & Gateways',
    code: 'LAYER 01 // INGRESS & ANYCAST',
    summary: 'Global traffic ingress, Anycast routing, and distributed edge SSL termination.',
    description: 'Incoming connections terminate at the nearest of 180+ global edge locations. Traffic is authenticated via decentralized token caches and routed over private optical backbones directly to core compute fabrics.',
    metrics: [
      { label: 'Ingress Capacity', value: '45 Tbps' },
      { label: 'Edge Handshake', value: '<2.1 ms' },
      { label: 'DDoS Scrubbing', value: 'Instant / Wire-Speed' },
    ],
    components: ['Anycast BGP', 'Hardware TLS Offload', 'Web Application Firewall', 'Rate Limiter'],
  },
  {
    id: 'compute',
    name: 'Compute Fabric',
    code: 'LAYER 02 // VIRTUALIZATION & CONTAINERS',
    summary: 'Kernel-isolated microVMs, managed Kubernetes control planes, and bare metal nodes.',
    description: 'Hardware virtualization utilizing lightweight Type-1 hypervisors with sub-millisecond cold starts. Supports multi-tenant container density alongside physically isolated single-tenant bare-metal clusters.',
    metrics: [
      { label: 'Max Density', value: '128 vCPUs / Node' },
      { label: 'Cold Start', value: '<12 ms' },
      { label: 'Virtualization Overhead', value: '<1.2%' },
    ],
    components: ['KVM / Firecracker', 'Managed Kubelet Engine', 'Direct NUMA Pinning', 'SR-IOV Networking'],
  },
  {
    id: 'database',
    name: 'Distributed Database',
    code: 'LAYER 03 // MULTI-REGION CONSENSUS',
    summary: 'Global multi-master distributed SQL with Raft consensus and native vector indexing.',
    description: 'Enterprise data layer designed for zero-downtime topology. Shards scale independently across geographic zones with automated read-replica dispatching and snapshot isolation.',
    metrics: [
      { label: 'p99 Query Latency', value: '<4.8 ms' },
      { label: 'Replication Lag', value: '<15 ms Global' },
      { label: 'Failover Window', value: 'Zero-Data-Loss RPO=0' },
    ],
    components: ['Raft State Machine', 'Distributed MVCC Engine', 'Vector HNSW Indexes', 'Automatic Sharder'],
  },
  {
    id: 'storage',
    name: 'Storage Subsystem',
    code: 'LAYER 04 // OBJECT & PERSISTENT DISKS',
    summary: 'High-durability distributed object storage and ultra-low latency NVMe block volumes.',
    description: 'Reed-Solomon erasure coding distributes chunks across independent failure domains and power zones. Direct kernel bypass (SPDK) delivers up to 1.2M random read IOPS for database volumes.',
    metrics: [
      { label: 'Data Durability', value: '99.999999999%' },
      { label: 'Max NVMe IOPS', value: '1,200,000 IOPS' },
      { label: 'Erasure Code', value: '8+4 Chunk Parity' },
    ],
    components: ['Erasure Coding Fabric', 'Direct NVMe over Fabrics', 'Object Lifecycle Manager', 'KMS Key Rotation'],
  },
  {
    id: 'observability',
    name: 'Observability & Telemetry',
    code: 'LAYER 05 // REAL-TIME METRICS & EBPF',
    summary: 'Kernel-level eBPF tracing, high-frequency metrics pipelines, and centralized audit trails.',
    description: 'Continuous non-intrusive runtime introspection captures syscalls, network latency, and memory footprints without application instrument overhead. Emits high-frequency telemetry into dedicated timeseries lakehouses.',
    metrics: [
      { label: 'Metrics Ingestion', value: '10M metrics / sec' },
      { label: 'Tracing Overhead', value: '<0.4% CPU' },
      { label: 'Log Retention', value: 'Up to 7 Years' },
    ],
    components: ['eBPF Kernel Probes', 'Distributed OpenTelemetry', 'Prometheus / VictoriaMetrics', 'Automated Anomaly Correlator'],
  },
  {
    id: 'security',
    name: 'Security & Microsegmentation',
    code: 'LAYER 06 // CONFIDENTIAL ENCLAVES',
    summary: 'Hardware root of trust, cryptographic memory isolation, and automated zero-trust IAM.',
    description: 'Physical hardware security modules (HSMs) anchor all node boots. Tenant networks are isolated through private VXLAN / Geneve overlays with default-deny policies enforced directly at the smartNIC boundary.',
    metrics: [
      { label: 'Cipher Standard', value: 'AES-256-GCM / ChaCha20' },
      { label: 'Key Attestation', value: 'Hardware TPM 2.0' },
      { label: 'Network Isolation', value: 'Hardware SmartNIC Overlays' },
    ],
    components: ['Hardware TPM 2.0', 'WireGuard Mesh Peering', 'Micro-Firewall Engine', 'Identity-Aware Proxy'],
  },
];

export interface CloudServiceBlock {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  specChip: string;
  bullets: string[];
  docsAnchor: string;
}

export const SERVICES_CATALOG: CloudServiceBlock[] = [
  {
    id: 'compute',
    name: 'Compute',
    category: 'VIRTUALIZATION & BARE METAL',
    summary: 'High-density instances with dedicated CPU allocation and instantaneous elastic provisioning.',
    description: 'Deploy serverless micro-containers, production-grade managed Kubernetes worker nodes, or raw bare-metal instances with direct hardware access. Guaranteed clock speeds with zero noisy-neighbor degradation.',
    specChip: 'UP TO 128 vCPUs · 1TB RAM · 100Gbps FABRIC',
    bullets: [
      'Serverless container execution with sub-millisecond cold boots',
      'Fully managed upstream Kubernetes clusters with automated control plane upgrades',
      'Dedicated bare-metal instances with zero virtualization overhead for high-memory workloads',
    ],
    docsAnchor: '#configure',
  },
  {
    id: 'database',
    name: 'Database',
    category: 'DISTRIBUTED SQL & VECTOR',
    summary: 'Multi-region transactional database with horizontal autoscaling and integrated vector search.',
    description: 'A cloud-native relational engine built for global availability. Combines familiar SQL semantics with automated sharding, distributed consensus, and native cosine-similarity vector embeddings.',
    specChip: 'SUB-5MS GLOBAL p99 · RAFT CONSENSUS · ACID',
    bullets: [
      'Multi-region distributed SQL with zero-downtime cross-zone automated failover',
      'Native horizontal sharding supporting petabyte-scale transactional tables',
      'High-dimension vector index indexing for low-latency retrieval-augmented generation (RAG)',
    ],
    docsAnchor: '#configure',
  },
  {
    id: 'storage',
    name: 'Storage',
    category: 'OBJECT, BLOCK & FILE',
    summary: 'Resilient object storage and ultra-low latency NVMe block volumes engineered for high IOPS.',
    description: 'Store multi-terabyte assets with continuous checksum validation, tiered archiving from hot to deep cold storage, and hardware-accelerated encryption at rest.',
    specChip: '99.999999999% DURABILITY · ENCRYPTED AT REST',
    bullets: [
      'Infinite scale S3-compatible blob storage with automatic lifecycle archiving',
      'High-performance NVMe persistent block volumes delivering up to 1.2M IOPS',
      'Automated geo-replication across independent power and fault domains',
    ],
    docsAnchor: '#configure',
  },
  {
    id: 'gateways',
    name: 'APIs & Gateways',
    category: 'INGRESS & ANYCAST',
    summary: 'Global traffic management, low-latency API gateway routing, and edge token verification.',
    description: 'Route incoming API calls through an intelligent Anycast backbone. Verify authentication tokens at the edge before requests reach core application servers, reducing compute load by up to 40%.',
    specChip: '180+ GLOBAL PoPs · ANYCAST BGP · WAF',
    bullets: [
      'High-throughput global API gateway with sub-millisecond route resolution',
      'Distributed cryptographic token and JWT validation executed at the edge',
      'Layer 7 rate limiting, bot protection, and programmable edge routing rules',
    ],
    docsAnchor: '#regions',
  },
  {
    id: 'security',
    name: 'Security & IAM',
    category: 'ZERO-TRUST & ENCRYPTION',
    summary: 'Enterprise identity governance, hardware-backed key vaults, and automated network policies.',
    description: 'Every interaction across DotRepo Cloud is authenticated, authorized, and logged. Enforce fine-grained attribute-based access controls (ABAC) and isolate customer tenants at the physical hardware layer.',
    specChip: 'AES-256-GCM · HARDWARE HSM · FIPS COMPLIANT',
    bullets: [
      'Zero-trust identity and role-based access management with strict principle of least privilege',
      'Dedicated Hardware Security Modules (HSM) for automated cryptographic key rotation',
      'Autonomous edge DDoS scrubbing with zero-latency traffic inspection',
    ],
    docsAnchor: '#next-steps',
  },
  {
    id: 'observability',
    name: 'Observability',
    category: 'METRICS, TRACES & LOGS',
    summary: 'Unified telemetry platform delivering deep visibility into microservices and cloud workloads.',
    description: 'Capture millions of metrics and distributed traces without performance degradation. Automated anomaly detection alerts engineering teams to latency spikes and memory leaks before impact occurs.',
    specChip: 'EBPF NATIVE · OPENTELEMETRY · NANOSECOND CLOCK',
    bullets: [
      'Kernel-level eBPF tracing providing non-invasive performance instrumentation',
      'Centralized high-ingestion log lake with sub-second full-text queries',
      'Real-time automated alerting with integration into PagerDuty, Slack, and webhooks',
    ],
    docsAnchor: '#next-steps',
  },
  {
    id: 'devtools',
    name: 'Developer Tools',
    category: 'INFRASTRUCTURE AS CODE',
    summary: 'Command-line utilities, official language SDKs, and declarative cloud blueprint engines.',
    description: 'Manage every infrastructure component through code. From local preview environments to global production rollouts, our CLI and SDKs integrate seamlessly into GitOps workflows.',
    specChip: 'TERRAFORM PROVIDER · NODE / PYTHON SDK · REST',
    bullets: [
      'Modern DotRepo CLI with one-command container and database deployment',
      'Typed official client libraries for TypeScript, Python, Go, and Rust',
      'Native Terraform and OpenTofu providers for declarative environment provisioning',
    ],
    docsAnchor: '#developers',
  },
  {
    id: 'ai-infra',
    name: 'AI Infrastructure',
    category: 'ACCELERATED TRAINING & INFERENCE',
    summary: 'Dedicated GPU clusters with high-bandwidth interconnects and optimized model runtimes.',
    description: 'Purpose-built hardware clusters designed for distributed machine learning training and high-throughput LLM inference. Interconnected through non-blocking optical networks for linear scaling.',
    specChip: '3.2 TBPS BISECTION · ROCE V2 · ZERO-JITTER',
    bullets: [
      'High-bandwidth GPU clusters interconnected via RoCE v2 low-latency optical fabrics',
      'Managed inference serving with dynamic batching and sub-25ms response windows',
      'Distributed storage cache streaming datasets at up to 100 GB/sec into compute nodes',
    ],
    docsAnchor: '#configure',
  },
];

export const PERFORMANCE_METRICS = [
  {
    id: 'vcpu',
    value: 128,
    suffix: ' vCPUs',
    label: 'MAXIMUM COMPUTE DENSITY',
    detail: 'Per physical node compute ceiling with zero noisy neighbor contention',
  },
  {
    id: 'latency',
    value: 5,
    prefix: '<',
    suffix: 'ms',
    label: 'GLOBAL p99 QUERY LATENCY',
    detail: 'Distributed SQL query execution across regional replica clusters',
  },
  {
    id: 'durability',
    value: 11,
    suffix: ' NINES',
    label: 'STORAGE DURABILITY RATING',
    detail: '99.999999999% object resilience backed by multi-zone Reed-Solomon parity',
  },
  {
    id: 'pops',
    value: 180,
    prefix: '',
    suffix: '+ PoPs',
    label: 'ACTIVE EDGE LOCATIONS',
    detail: 'Global Points of Presence with Anycast BGP routing and low-latency peering',
  },
];

export interface RegionData {
  id: string;
  name: string;
  country: string;
  type: 'Core Data Center' | 'Edge Point of Presence';
  status: 'Operational' | 'Expanding';
  latency: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 on map
}

export const REGIONS_CONFIG: RegionData[] = [
  // India Primary Core Hubs & Edge
  { id: 'in-mum', name: 'Mumbai (BOM-01)', country: 'India', type: 'Core Data Center', status: 'Operational', latency: '1.2 ms', coordinates: { x: 67.2, y: 53.4 } },
  { id: 'in-blr', name: 'Bangalore (BLR-01 HQ)', country: 'India', type: 'Core Data Center', status: 'Operational', latency: '0.8 ms', coordinates: { x: 68.4, y: 56.8 } },
  { id: 'in-hyd', name: 'Hyderabad (HYD-01)', country: 'India', type: 'Core Data Center', status: 'Operational', latency: '1.9 ms', coordinates: { x: 68.6, y: 54.6 } },
  { id: 'in-del', name: 'New Delhi (DEL-01)', country: 'India', type: 'Edge Point of Presence', status: 'Operational', latency: '2.4 ms', coordinates: { x: 68.0, y: 48.2 } },
  { id: 'in-che', name: 'Chennai (MAA-01)', country: 'India', type: 'Edge Point of Presence', status: 'Operational', latency: '2.1 ms', coordinates: { x: 69.4, y: 57.2 } },
  { id: 'in-ccu', name: 'Kolkata (CCU-01)', country: 'India', type: 'Edge Point of Presence', status: 'Operational', latency: '3.1 ms', coordinates: { x: 71.0, y: 51.5 } },

  // Global Strategic Hubs
  { id: 'sg-sin', name: 'Singapore (SIN-01)', country: 'Singapore', type: 'Core Data Center', status: 'Operational', latency: '28 ms', coordinates: { x: 75.8, y: 61.2 } },
  { id: 'de-fra', name: 'Frankfurt (FRA-01)', country: 'Germany', type: 'Core Data Center', status: 'Operational', latency: '82 ms', coordinates: { x: 50.8, y: 35.4 } },
  { id: 'us-iad', name: 'N. Virginia (IAD-01)', country: 'United States', type: 'Core Data Center', status: 'Operational', latency: '118 ms', coordinates: { x: 26.5, y: 40.8 } },
  { id: 'jp-tyo', name: 'Tokyo (NRT-01)', country: 'Japan', type: 'Core Data Center', status: 'Operational', latency: '76 ms', coordinates: { x: 86.4, y: 43.8 } },
  { id: 'ae-dxb', name: 'Dubai (DXB-01)', country: 'UAE', type: 'Edge Point of Presence', status: 'Operational', latency: '34 ms', coordinates: { x: 60.5, y: 49.5 } },
  { id: 'uk-lon', name: 'London (LHR-01)', country: 'United Kingdom', type: 'Edge Point of Presence', status: 'Operational', latency: '86 ms', coordinates: { x: 47.6, y: 34.2 } },
];

export const INDUSTRY_SOLUTIONS = [
  {
    id: 'startups',
    category: 'HIGH-GROWTH SCALE',
    title: 'Startups & SaaS Platforms',
    copy: 'Accelerate time-to-market with zero-overhead serverless micro-VMs and managed databases. Built-in Anycast edge routing eliminates infrastructure management so your team focuses strictly on product iteration.',
    link: '#configure',
  },
  {
    id: 'fintech',
    category: 'HIGH-INTEGRITY TRANSACTIONS',
    title: 'Fintech & Digital Banking',
    copy: 'Strict ACID transactional guarantees, zero-data-loss cross-zone failovers, and hardware-attested encryption enclaves engineered for payment processing, ledger compliance, and high-frequency settlement.',
    link: '#configure',
  },
  {
    id: 'gaming',
    category: 'ULTRA-LOW LATENCY',
    title: 'Gaming & Interactive Worlds',
    copy: 'Run dedicated 64Hz and 128Hz multiplayer match instances within 20 milliseconds of players across India and Asia. Predictable UDP packet flow with zero noisy-neighbor frame jitter.',
    link: '#configure',
  },
  {
    id: 'ai-platforms',
    category: 'FOUNDATION SCALE',
    title: 'AI & Data Platforms',
    copy: 'High-throughput optical interconnects and parallel object storage streams engineered to saturate GPU tensor cores during distributed model training, fine-tuning, and low-latency inference serving.',
    link: '#configure',
  },
];

export const CODE_SAMPLES = {
  cli: {
    language: 'bash',
    filename: 'terminal.sh',
    code: `# 1. Authenticate with DotRepo Cloud Fabric
dotrepo auth login --enterprise

# 2. Initialize enterprise microservice cluster
dotrepo init --type compute-cluster --region ap-south-1 --tier c4.xlarge

# 3. Deploy declarative service with Anycast routing
dotrepo deploy ./service.yaml \\
  --replicas 6 \\
  --min-vcpu 8 \\
  --max-vcpu 64 \\
  --database dotrepo-sql-primary \\
  --env production

# Output: Service deployed to 180+ PoPs in 1.4s
# Ingress URL: https://api.enterprise.dotrepo.in [HEALTHY 100%]`,
  },
  node: {
    language: 'typescript',
    filename: 'deploy-service.ts',
    code: `import { DotRepoCloud, ClusterConfig } from '@dotrepo/cloud-sdk';

const cloud = new DotRepoCloud({
  apiKey: process.env.DOTREPO_API_KEY,
  region: 'ap-south-1', // Mumbai Core Hub
});

// Deploy an elastic container service with hardware-isolated nodes
const service = await cloud.compute.deployService({
  name: 'enterprise-core-api',
  image: 'registry.dotrepo.in/enterprise/core:v2.4',
  scaling: {
    minReplicas: 3,
    maxReplicas: 48,
    targetCpuUtilization: 75,
  },
  database: {
    type: 'distributed-sql',
    shards: 4,
    readReplicas: ['ap-south-1', 'sg-sin-01'],
  },
  security: {
    encryptionAtRest: true,
    isolatedVpc: true,
  },
});

console.log('Deployed cluster instance:', service.clusterId, service.ingressDomain);`,
  },
  python: {
    language: 'python',
    filename: 'orchestrate.py',
    code: `import os
from dotrepo_cloud import CloudClient, NodeConfiguration

client = CloudClient(api_key=os.getenv("DOTREPO_SECRET_KEY"))

# Provision high-memory bare-metal compute node with NVMe volumes
node = client.compute.provision_node(
    region="in-blr-01",
    spec=NodeConfiguration(
        vcpus=64,
        ram_gb=512,
        storage_type="nvme-direct",
        storage_size_gb=4000,
        network_speed="100Gbps"
    ),
    tags={"workload": "analytics-pipeline", "env": "production"}
)

print(f"Provisioned node: {node.id} | Status: {node.status} | IP: {node.private_ip}")`,
  },
  rest: {
    language: 'bash',
    filename: 'curl-api.sh',
    code: `curl -X POST https://api.cloud.dotrepo.in/v1/compute/instances \\
  -H "Authorization: Bearer dtr_live_99182371a8f9c0" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "payment-settlement-worker",
    "region": "ap-south-1",
    "tier": "c4.32xlarge",
    "vcpus": 128,
    "memory_gb": 1024,
    "storage": {
      "type": "nvme_direct",
      "capacity_gb": 10000
    },
    "high_availability": {
      "multi_az": true,
      "auto_healing": true
    }
  }'`,
  },
};

export const SECURITY_CAPABILITIES = [
  {
    id: 'encryption',
    title: 'Hardware-Enforced Encryption',
    code: 'CRYPTOGRAPHIC BOUNDARY',
    desc: 'All customer data at rest is encrypted with customer-managed keys via AES-256-GCM. All inter-node traffic travels through WireGuard kernel tunnels with ChaCha20-Poly1305 encryption.',
  },
  {
    id: 'iam',
    title: 'Zero-Trust IAM & ABAC',
    code: 'IDENTITY GOVERNANCE',
    desc: 'Granular attribute-based access control with short-lived cryptographic certificates. Enforces strict zero-trust boundaries with hardware-backed WebAuthn authentication.',
  },
  {
    id: 'audit',
    title: 'Immutable Audit Logging',
    code: 'COMPLIANCE AUDITING',
    desc: 'Every administrative mutation, API invocation, and network flow emits tamper-evident cryptographically signed audit logs stored in append-only write-once-read-many (WORM) storage.',
  },
  {
    id: 'ddos',
    title: 'Autonomous Edge DDoS Shield',
    code: 'PERIMETER DEFENSE',
    desc: 'Always-on Layer 3, 4, and 7 scrubbing network capable of mitigating volumetric attacks exceeding 40 Tbps at wire speed across 180+ Points of Presence.',
  },
  {
    id: 'isolation',
    title: 'Micro-VPC Network Isolation',
    code: 'TENANT SEGMENTATION',
    desc: 'Tenant traffic is encapsulated in hardware-enforced VXLAN/Geneve tunnels. Outbound and inbound traffic policies are enforced at the smartNIC level before reaching the host OS.',
  },
  {
    id: 'attestation',
    title: 'Cryptographic Boot Attestation',
    code: 'HARDWARE ROOT OF TRUST',
    desc: 'TPM 2.0 chips verify kernel integrity and boot firmware measurements before any node is admitted into the DotRepo Cloud fabric cluster.',
  },
];

export const COMPLIANCE_BADGES = [
  { id: 'soc2', name: 'SOC 2 TYPE II', status: 'Audit Ready / Architecture Aligned' },
  { id: 'iso', name: 'ISO 27001', status: 'Information Security Management' },
  { id: 'hipaa', name: 'HIPAA READY', status: 'Healthcare Safeguards Configured' },
  { id: 'gdpr', name: 'GDPR / DPDP', status: 'India & EU Sovereign Data Resident' },
  { id: 'pci', name: 'PCI-DSS LEVEL 1', status: 'Payment Architecture Hardened' },
];

export const NEWS_ARTICLES = [
  {
    id: '1',
    category: 'INFRASTRUCTURE EXPANSION',
    title: 'Expanding Sovereign Cloud Infrastructure: Launching Tier-4 Bangalore & Hyderabad Core Zones',
    date: 'OCTOBER 18, 2026',
    readTime: '4 MIN READ',
  },
  {
    id: '2',
    category: 'PERFORMANCE BENCHMARK',
    title: 'Distributed SQL Consensus at Scale: Achieving Sub-5ms Global p99 Query Latency on DotRepo Engine',
    date: 'OCTOBER 12, 2026',
    readTime: '7 MIN READ',
  },
  {
    id: '3',
    category: 'SECURITY ADVISORY',
    title: 'Implementing Quantum-Resistant Cryptography Across 180+ Global Edge Ingress Gateways',
    date: 'SEPTEMBER 29, 2026',
    readTime: '5 MIN READ',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How does DotRepo Cloud compare to legacy hyperscalers?',
    answer: 'DotRepo Cloud is purpose-built for enterprise throughput and predictable pricing. We eliminate noisy-neighbor virtualization by utilizing Type-1 microVM hypervisors and dedicated bare-metal allocations. Inter-region bandwidth between our core Indian data centers (Mumbai, Bangalore, Hyderabad) travels over private dedicated dark fiber, yielding sub-5ms latency and zero unpredictable egress transfer surcharges.',
  },
  {
    question: 'What are the hardware limits for single-node compute instances?',
    answer: 'Standard instances scale from 2 vCPUs and 4GB RAM up to high-density bare metal nodes offering 128 physical vCPUs and 1024 GB of ECC DDR5 memory per server. Storage attachments support direct NVMe over Fabrics delivering up to 1,200,000 IOPS per volume with dual 100Gbps redundant network interface cards.',
  },
  {
    question: 'Where is customer data physically stored and replicated?',
    answer: 'All data resides within our Tier-4 enterprise facilities in India (Mumbai, Bangalore, Hyderabad) or selected global sovereign regions (Singapore, Frankfurt, Virginia). You have granular control over replication topologies to guarantee strict compliance with the Indian Digital Personal Data Protection (DPDP) Act and international data sovereignty mandates.',
  },
  {
    question: 'How does the Distributed SQL database handle cross-region failovers?',
    answer: 'Our database engine utilizes a Multi-Raft consensus algorithm with pipelined transaction commits. In the event of a total availability zone disruption, the cluster performs an autonomous quorum election within 1.2 seconds with an RPO of 0 (zero committed data loss) and uninterrupted read-replica routing.',
  },
  {
    question: 'Can we migrate existing Kubernetes and Docker workloads to DotRepo Cloud?',
    answer: 'Yes. DotRepo Cloud provides full conformance with upstream CNCF Kubernetes standards. You can migrate your Helm charts, Kustomize manifests, and container images directly into our managed Kubernetes engine with zero proprietary vendor lock-in.',
  },
  {
    question: 'What enterprise service level agreements (SLAs) are provided?',
    answer: 'Enterprise contracts include a 99.99% service availability guarantee backed by financial credits, 24/7/365 dedicated technical account engineering, direct escalation into our core infrastructure engineering team in Bangalore, and sub-15 minute response times for Severity-1 incidents.',
  },
];

export const MEGA_MENU_DATA = {
  solutions: [
    { name: 'Enterprise Cloud Migration', desc: 'Zero-downtime lift-and-shift with dedicated migration architects' },
    { name: 'High-Throughput Fintech', desc: 'Sub-millisecond transaction execution and ledger durability' },
    { name: 'Multiplayer Game Backends', desc: '64Hz and 128Hz dedicated game server fleet orchestration' },
    { name: 'Sovereign Data Storage', desc: 'India DPDP-compliant local storage and processing boundaries' },
  ],
  products: [
    { name: 'MicroVM Container Engine', desc: 'Sub-millisecond cold start serverless compute instances' },
    { name: 'Distributed SQL Lakehouse', desc: 'High-concurrency relational data engine with vector indexes' },
    { name: 'Direct NVMe Block Storage', desc: 'Ultra-low latency block volumes with up to 1.2M IOPS' },
    { name: 'Anycast API Gateway', desc: 'Intelligent traffic routing and edge token validation' },
  ],
  software: [
    { name: 'DotRepo Cloud CLI', desc: 'Full declarative control from terminal or CI/CD pipelines' },
    { name: 'Kubernetes Operator', desc: 'Custom resource definitions for native K8s orchestration' },
    { name: 'Terraform & OpenTofu Provider', desc: 'Declarative infrastructure as code repository templates' },
    { name: 'eBPF Observability Agent', desc: 'Zero-overhead kernel level telemetry and distributed tracing' },
  ],
  architectures: [
    { name: 'Active-Active Multi-Region', desc: 'Zero-data-loss cross-zone failover reference architectures' },
    { name: 'Microservices Mesh Blueprint', desc: 'High-density service communication with mTLS encryption' },
    { name: 'LLM Inference Gateway', desc: 'Dynamic batching and model cache architecture for AI workloads' },
    { name: 'Private Interconnect Fabric', desc: 'Dedicated direct connects into on-premise data centers' },
  ],
  technologies: [
    { name: 'Firecracker & KVM', desc: 'Secure micro-virtualization engineered for high density' },
    { name: 'Multi-Raft Consensus', desc: 'Pipelined distributed transactions and consensus replication' },
    { name: 'NVMe-oF Over Converged Ethernet', desc: 'Direct kernel bypass storage networking fabric' },
    { name: 'WireGuard Kernel Tunnels', desc: 'Hardware-accelerated mesh encryption across all node links' },
  ],
};
