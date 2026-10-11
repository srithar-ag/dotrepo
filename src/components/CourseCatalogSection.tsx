import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  Star,
  Award,
  ArrowRight,
  Filter,
  CheckCircle2,
  Cpu,
  Cloud,
  Database,
  Shield,
  Layers,
} from 'lucide-react';

interface CourseItem {
  id: string;
  title: string;
  partner: string;
  category: 'AI & Machine Learning' | 'Cloud Computing' | 'Data Systems' | 'Cybersecurity';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  reviewsCount: number;
  description: string;
  projectsCount: number;
  isFeatured?: boolean;
}

const COURSES_CATALOG: CourseItem[] = [
  {
    id: 'ai-claude',
    title: 'AI Engineering with Claude',
    partner: 'Anthropic & Accenture',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '3 Months (10 hrs/wk)',
    rating: 4.9,
    reviewsCount: 3410,
    description:
      'Ship 13 real projects with Claude, master Model Context Protocol (MCP), prompt caching, and multi-agent systems with personalized mentor feedback.',
    projectsCount: 13,
    isFeatured: true,
  },
  {
    id: 'gen-ai-agents',
    title: 'Generative AI & Autonomous Agent Systems',
    partner: 'Google Cloud & DotRepo',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '4 Months (10 hrs/wk)',
    rating: 4.85,
    reviewsCount: 2180,
    description:
      'Design stateful multi-agent systems with hierarchical planning, tool synthesis, memory graphs, and production evaluations.',
    projectsCount: 8,
    isFeatured: true,
  },
  {
    id: 'cloud-devops',
    title: 'Cloud DevOps & Distributed Systems Architect',
    partner: 'AWS & Kubernetes Foundation',
    category: 'Cloud Computing',
    level: 'Intermediate',
    duration: '3 Months (8 hrs/wk)',
    rating: 4.88,
    reviewsCount: 5120,
    description:
      'Deploy mission-critical cloud microservices, author Terraform infrastructure, and configure multi-region Kubernetes clusters.',
    projectsCount: 6,
  },
  {
    id: 'data-engineering',
    title: 'Modern Data Engineering & Vector Platforms',
    partner: 'Snowflake & Kafka',
    category: 'Data Systems',
    level: 'Intermediate',
    duration: '3 Months (10 hrs/wk)',
    rating: 4.82,
    reviewsCount: 3940,
    description:
      'Build scalable streaming data pipelines with Apache Kafka, dbt, Spark, and hybrid vector storage for AI knowledge retrieval.',
    projectsCount: 5,
  },
  {
    id: 'ai-red-teaming',
    title: 'AI Safety, Alignment & Red Teaming',
    partner: 'Accenture Cyber Defense',
    category: 'Cybersecurity',
    level: 'Advanced',
    duration: '2 Months (8 hrs/wk)',
    rating: 4.92,
    reviewsCount: 1420,
    description:
      'Identify and neutralize adversarial prompt injections, model extraction exploits, and implement dual-boundary runtime safety filters.',
    projectsCount: 4,
  },
  {
    id: 'fullstack-ai',
    title: 'Full Stack AI Product Engineer',
    partner: 'DotRepo Enterprise Platform',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '4 Months (12 hrs/wk)',
    rating: 4.87,
    reviewsCount: 4200,
    description:
      'Build full-stack intelligent web applications from scratch with Next.js, FastAPI, vector search, and responsive streaming interfaces.',
    projectsCount: 7,
  },
];

interface CourseCatalogSectionProps {
  onSelectCourse: (course: CourseItem) => void;
}

export const CourseCatalogSection: React.FC<CourseCatalogSectionProps> = ({
  onSelectCourse,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'AI & Machine Learning', label: 'AI & Machine Learning' },
    { id: 'Cloud Computing', label: 'Cloud Computing' },
    { id: 'Data Systems', label: 'Data Systems' },
    { id: 'Cybersecurity', label: 'Cybersecurity' },
  ];

  const filteredCourses = COURSES_CATALOG.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || c.level === selectedLevel;
    return matchesCat && matchesLevel;
  });

  return (
    <section id="course-catalog" className="py-20 md:py-28 bg-[#090b14] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
              Enterprise Course Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">
              Explore Nanodegree Programs
            </h2>
            <p className="mt-2 text-neutral-300 text-sm sm:text-base max-w-2xl font-normal">
              Industry-standard curricula co-created with Anthropic, Google, and Accenture. Build real skills validated by senior engineering mentors.
            </p>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 bg-[#121424] p-1 rounded-xl border border-neutral-800">
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0066FF] text-white shadow-md'
                  : 'bg-[#101322] text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between p-6 shadow-xl ${
                course.isFeatured
                  ? 'bg-[#101426] border-blue-500/40 hover:border-blue-400'
                  : 'bg-[#0e101d] border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                {/* Header Tag & Partner */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {course.partner}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {course.title}
                </h3>

                <p className="mt-2.5 text-xs text-neutral-300 leading-relaxed font-normal">
                  {course.description}
                </p>

                {/* Rating & Duration */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-white">{course.rating}</span>
                    <span className="text-neutral-500 text-[11px]">
                      ({course.reviewsCount.toLocaleString()})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {course.projectsCount} Real Projects
                </span>

                <button
                  onClick={() => onSelectCourse(course)}
                  className="px-4 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>View Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
