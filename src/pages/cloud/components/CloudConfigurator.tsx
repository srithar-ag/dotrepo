import React, { useState } from 'react';
import { ArrowRight, Check, Sliders, Cpu, HardDrive, Database, Server, Shield } from 'lucide-react';

export interface CloudConfiguration {
  workload: string;
  region: string;
  vCPUs: number;
  ramGB: number;
  storageGB: number;
  database: string;
  enableKubernetes: boolean;
  enableGpu: boolean;
  recommendedTier: string;
  recommendedServices: string[];
}

interface CloudConfiguratorProps {
  onConfigureQuote: (config: CloudConfiguration) => void;
}

const WORKLOADS = [
  { id: 'saas', name: 'Web & Enterprise SaaS', desc: 'Microservices & high-concurrency API workloads' },
  { id: 'data', name: 'Data & Analytics', desc: 'ETL pipelines, real-time telemetry & sharded stores' },
  { id: 'ai', name: 'AI & Machine Learning', desc: 'Tensor model training, vector indexing & RAG' },
  { id: 'gaming', name: 'Multiplayer Gaming', desc: 'Sub-20ms UDP match servers & state orchestration' },
];

const REGIONS = [
  { id: 'in-mum', name: 'Mumbai (BOM-01 Core)', flag: 'IN' },
  { id: 'in-blr', name: 'Bangalore (BLR-01 HQ Core)', flag: 'IN' },
  { id: 'in-hyd', name: 'Hyderabad (HYD-01 Core)', flag: 'IN' },
  { id: 'sg-sin', name: 'Singapore (SIN-01 Asia Hub)', flag: 'SG' },
  { id: 'de-fra', name: 'Frankfurt (FRA-01 EU Core)', flag: 'EU' },
  { id: 'us-iad', name: 'N. Virginia (IAD-01 US Core)', flag: 'US' },
];

const DATABASES = [
  { id: 'distributed-sql', name: 'Distributed SQL', desc: 'Multi-region Raft ACID relational engine' },
  { id: 'in-memory', name: 'High-Throughput In-Memory', desc: 'Sub-millisecond key-value and cache store' },
  { id: 'vector', name: 'Vector Lakehouse', desc: 'High-dimension cosine similarity indexes' },
  { id: 'none', name: 'External / Unmanaged', desc: 'Self-hosted or external storage cluster' },
];

export const CloudConfigurator: React.FC<CloudConfiguratorProps> = ({ onConfigureQuote }) => {
  const [workload, setWorkload] = useState('saas');
  const [region, setRegion] = useState('in-mum');
  const [vCPUs, setVCPUs] = useState(32);
  const [ramGB, setRamGB] = useState(128);
  const [storageGB, setStorageGB] = useState(2000);
  const [database, setDatabase] = useState('distributed-sql');
  const [enableKubernetes, setEnableKubernetes] = useState(true);
  const [enableGpu, setEnableGpu] = useState(false);

  // Derive recommended tier & services
  let tier = 'Standard Enterprise Tier';
  if (vCPUs >= 64 || ramGB >= 512 || enableGpu) {
    tier = 'High-Performance Accelerated Tier';
  } else if (vCPUs <= 8 && ramGB <= 32) {
    tier = 'Foundation Micro-Cluster Tier';
  }

  const recommendedServices: string[] = ['Bare Metal MicroVMs', '100GbE Private Interconnect'];
  if (enableKubernetes) recommendedServices.push('Managed Kubernetes Control Plane');
  if (database !== 'none') {
    const dbName = DATABASES.find((d) => d.id === database)?.name || 'Distributed Database';
    recommendedServices.push(dbName);
  }
  if (enableGpu) recommendedServices.push('Dedicated RoCE v2 GPU Fabric');
  if (storageGB > 5000) recommendedServices.push('Direct NVMe-oF High-IOPS Parity Array');

  const currentConfig: CloudConfiguration = {
    workload,
    region,
    vCPUs,
    ramGB,
    storageGB,
    database,
    enableKubernetes,
    enableGpu,
    recommendedTier: tier,
    recommendedServices,
  };

  const handleRequestQuote = () => {
    onConfigureQuote(currentConfig);
    const element = document.getElementById('next-steps');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="configure" className="bg-[#FFFFFF] text-neutral-900 py-20 lg:py-28 border-b border-neutral-200">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#16A34A] font-mono font-semibold mb-2">
            INFRASTRUCTURE SPECIFICATION TOOL
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Configure your environment.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Select your target compute density, memory ratios, and database replication requirements. Our sizing engine maps requirements to physical DotRepo node topologies.
          </p>
        </div>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 7 Columns: Interactive Controls */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Workload Type */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3 font-semibold">
                01. Select Workload Profile
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WORKLOADS.map((item) => {
                  const isSelected = workload === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setWorkload(item.id)}
                      className={`text-left p-4 rounded-[2px] border transition-all duration-150 ${
                        isSelected
                          ? 'border-[#22C55E] bg-[#F4F4F4] ring-1 ring-[#22C55E]'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-neutral-900">{item.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#16A34A]" />}
                      </div>
                      <p className="text-xs text-neutral-500 mt-1.5 leading-snug">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Target Region */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3 font-semibold">
                02. Target Primary Core Region
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {REGIONS.map((item) => {
                  const isSelected = region === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRegion(item.id)}
                      className={`text-left p-3 rounded-[2px] border text-xs transition-all ${
                        isSelected
                          ? 'border-[#22C55E] bg-[#F4F4F4] font-semibold text-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-700 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1 py-0.5 bg-neutral-200 text-neutral-800 rounded-[2px]">
                          {item.flag}
                        </span>
                        <span className="truncate">{item.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Sliders: vCPU, RAM, Storage */}
            <div className="space-y-6 pt-4 border-t border-neutral-200">
              {/* vCPU Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                      Dedicated vCPUs
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-neutral-950 bg-neutral-100 px-2 py-0.5 border border-neutral-200 rounded-[2px]">
                    {vCPUs} vCPUs
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="128"
                  step="2"
                  value={vCPUs}
                  onChange={(e) => setVCPUs(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-none appearance-none cursor-pointer accent-[#22C55E]"
                />
                <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-1">
                  <span>2 vCPUs (Micro)</span>
                  <span>64 vCPUs</span>
                  <span>128 vCPUs (Max Physical Node)</span>
                </div>
              </div>

              {/* RAM Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                      System Memory (ECC DDR5)
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-neutral-950 bg-neutral-100 px-2 py-0.5 border border-neutral-200 rounded-[2px]">
                    {ramGB} GB RAM
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="1024"
                  step="8"
                  value={ramGB}
                  onChange={(e) => setRamGB(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-none appearance-none cursor-pointer accent-[#22C55E]"
                />
                <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-1">
                  <span>4 GB</span>
                  <span>256 GB</span>
                  <span>1024 GB (1 TB Bare Metal)</span>
                </div>
              </div>

              {/* Storage Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-neutral-500" />
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold">
                      Direct NVMe Block Storage
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-neutral-950 bg-neutral-100 px-2 py-0.5 border border-neutral-200 rounded-[2px]">
                    {storageGB >= 1000 ? `${(storageGB / 1000).toFixed(1)} TB` : `${storageGB} GB`}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="50000"
                  step="250"
                  value={storageGB}
                  onChange={(e) => setStorageGB(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-none appearance-none cursor-pointer accent-[#22C55E]"
                />
                <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-1">
                  <span>50 GB NVMe</span>
                  <span>10 TB</span>
                  <span>50 TB High-IOPS Parity</span>
                </div>
              </div>
            </div>

            {/* 4. Database Type */}
            <div className="pt-4 border-t border-neutral-200">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3 font-semibold">
                04. Database Storage Engine
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DATABASES.map((db) => {
                  const isSelected = database === db.id;
                  return (
                    <button
                      key={db.id}
                      type="button"
                      onClick={() => setDatabase(db.id)}
                      className={`text-left p-3.5 rounded-[2px] border transition-all ${
                        isSelected
                          ? 'border-[#22C55E] bg-[#F4F4F4] ring-1 ring-[#22C55E]'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">{db.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#16A34A]" />}
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">{db.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Enterprise Feature Toggles */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2 font-semibold">
                05. Architecture Add-Ons
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-3 p-3.5 border border-neutral-200 hover:border-neutral-400 rounded-[2px] cursor-pointer flex-1 bg-white">
                  <input
                    type="checkbox"
                    checked={enableKubernetes}
                    onChange={(e) => setEnableKubernetes(e.target.checked)}
                    className="w-4 h-4 rounded-none accent-[#22C55E]"
                  />
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">Managed Kubernetes (CNCF)</span>
                    <span className="text-[11px] text-neutral-500">Automated control plane & etcd clustering</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 border border-neutral-200 hover:border-neutral-400 rounded-[2px] cursor-pointer flex-1 bg-white">
                  <input
                    type="checkbox"
                    checked={enableGpu}
                    onChange={(e) => setEnableGpu(e.target.checked)}
                    className="w-4 h-4 rounded-none accent-[#22C55E]"
                  />
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">GPU Tensor Accelerators</span>
                    <span className="text-[11px] text-neutral-500">Dedicated RoCE v2 low-latency optical fabric</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Live Summary Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 border border-neutral-200 bg-[#F4F4F4] p-6 sm:p-8 rounded-[2px]">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
                <span className="text-xs font-mono uppercase tracking-widest text-[#16A34A] font-semibold">
                  LIVE CLUSTER BLUEPRINT
                </span>
                <span className="text-[11px] font-mono text-neutral-500">CUSTOM SIZING</span>
              </div>

              {/* Tier Name */}
              <div className="mt-6 mb-6">
                <span className="text-xs text-neutral-500 uppercase tracking-wide block font-mono">
                  CLASSIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mt-1">
                  {tier}
                </h3>
              </div>

              {/* Hardware Spec Summary */}
              <div className="space-y-3 py-4 border-y border-neutral-200 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">PRIMARY REGION:</span>
                  <span className="font-semibold text-neutral-900">
                    {REGIONS.find((r) => r.id === region)?.name.split(' ')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">DEDICATED COMPUTE:</span>
                  <span className="font-semibold text-neutral-900">{vCPUs} Physical vCPUs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">DDR5 SYSTEM MEMORY:</span>
                  <span className="font-semibold text-neutral-900">{ramGB} GB RAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">NVMe BLOCK POOL:</span>
                  <span className="font-semibold text-neutral-900">
                    {storageGB >= 1000 ? `${(storageGB / 1000).toFixed(1)} TB` : `${storageGB} GB`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">DATA ENGINE:</span>
                  <span className="font-semibold text-neutral-900">
                    {DATABASES.find((d) => d.id === database)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">CNCF KUBERNETES:</span>
                  <span className="font-semibold text-neutral-900">{enableKubernetes ? 'ENABLED' : 'DISABLED'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">GPU ACCELERATOR FABRIC:</span>
                  <span className="font-semibold text-neutral-900">{enableGpu ? 'ENABLED (RoCE)' : 'NONE'}</span>
                </div>
              </div>

              {/* Recommended Components */}
              <div className="mt-6">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3 font-semibold">
                  RECOMMENDED DOTREPO SERVICES
                </span>
                <ul className="space-y-2">
                  {recommendedServices.map((svc, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-neutral-800">
                      <span className="w-1.5 h-1.5 bg-[#22C55E]" />
                      <span>{svc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: Request a Quote */}
              <div className="mt-8 pt-6 border-t border-neutral-300">
                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#22C55E] text-black font-semibold text-sm rounded-[2px] hover:bg-[#16A34A] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
                >
                  <span>Request a Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-neutral-500 mt-2.5">
                  Pre-fills Section 16 contact form with this configuration. Enterprise SLAs guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
