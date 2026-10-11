import React, { useState } from 'react';
import {
  MessageSquareCode,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Star,
  UserCheck,
  Building2,
  Code2,
} from 'lucide-react';

export const MentorReviewsSection: React.FC = () => {
  const [activeReviewTab, setActiveReviewTab] = useState<'review' | 'mentors'>('review');

  const mentors = [
    {
      name: 'Sarah Chen',
      role: 'Staff AI Engineer',
      company: 'Ex-Anthropic / AI Research',
      expertise: 'Claude Tool Use & MCP Architecture',
      reviewsCount: '840+ projects reviewed',
      rating: '4.98',
      quote:
        'I dont just check if tests pass. I push students to think about token quotas, cache hit rates, and real-world failure modes.',
    },
    {
      name: 'Marcus Vance',
      role: 'Principal Cloud Architect',
      company: 'Accenture Applied Intelligence',
      expertise: 'Enterprise Kubernetes & Agent Orchestration',
      reviewsCount: '1,200+ projects reviewed',
      rating: '4.95',
      quote:
        'The difference between a hobby project and enterprise software is resilience. We review code to enterprise production standards.',
    },
    {
      name: 'Priya Sharma',
      role: 'Lead ML Systems Engineer',
      company: 'Ex-Google Cloud',
      expertise: 'Long-Context RAG & Prompt Caching',
      reviewsCount: '950+ projects reviewed',
      rating: '4.97',
      quote:
        'Having an experienced engineer point out memory leaks and cache misalignments saves students months of trial and error.',
    },
  ];

  return (
    <section id="adaptive-experience" className="py-20 md:py-28 bg-[#0b0d17] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-4">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>The Udacity Difference</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Human Feedback from Senior AI Mentors.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            Automated grading only checks if the program compiles. Our experienced engineers inspect your repository, annotate line-by-line, and return actionable feedback in under 24 hours.
          </p>
        </div>

        {/* 3 Metric Value Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#111322] border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">&lt; 24 Hour Turnaround</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Submit your GitHub repo when you’re ready. Receive detailed line-by-line feedback from an assigned senior practitioner the very next day.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111322] border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Unlimited Re-Submissions</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Iterate as many times as needed until your project meets industry specifications. You only pass when your code is truly portfolio-worthy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111322] border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">1-on-1 Mentor Office Hours</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Stuck on an asynchronous agent race condition or FastMCP transport protocol? Book private video office hours with a mentor anytime.
            </p>
          </div>
        </div>

        {/* Simulated Real Mentor Review View */}
        <div className="mt-14 rounded-2xl bg-[#0f111d] border border-neutral-700/80 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span className="font-mono font-bold text-neutral-200">
                PULL REQUEST REVIEW: Project 3 — Enterprise Cached RAG
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
              <span>Reviewed by Sarah Chen</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                APPROVED WITH COMMENDATION
              </span>
            </div>
          </div>

          {/* Interactive Code & Inline Annotation */}
          <div className="mt-6 font-mono text-xs overflow-x-auto">
            <div className="rounded-xl bg-[#07080f] border border-neutral-800 p-4 space-y-3">
              <div className="text-neutral-500 text-[11px]">
                // src/rag/cached_pipeline.py
              </div>

              <div className="text-neutral-300 text-[11px] sm:text-xs leading-relaxed space-y-1">
                <div>
                  <span className="text-neutral-600 mr-4 select-none">42</span>
                  <span className="text-purple-400">async def</span>{' '}
                  <span className="text-blue-400">query_enterprise_corpus</span>
                  (prompt: str, context_docs: list):
                </div>
                <div>
                  <span className="text-neutral-600 mr-4 select-none">43</span>
                  {'    '}# Apply Anthropic Prompt Caching breakpoint
                </div>
                <div className="bg-emerald-950/30 py-0.5 px-1 rounded border-l-2 border-emerald-500 text-emerald-200">
                  <span className="text-neutral-600 mr-4 select-none">44</span>
                  {'    '}messages = [{'{'}"role": "user", "content": [{'{'}"type": "text", "text": context_docs, "cache_control": {'{'}"type": "ephemeral"{'}'}{'}'}]{'}'}]
                </div>
                <div>
                  <span className="text-neutral-600 mr-4 select-none">45</span>
                  {'    '}return await anthropic_client.messages.create(model="claude-3-7-sonnet-20250219", messages=messages)
                </div>
              </div>

              {/* Mentor Comment Card Inline */}
              <div className="mt-4 ml-6 p-4 rounded-xl bg-[#141829] border border-blue-500/40 text-neutral-200 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white">
                      SC
                    </div>
                    <span className="font-bold text-xs text-white">
                      Sarah Chen (Mentor)
                    </span>
                    <span className="text-[10px] text-neutral-400">Staff AI Engineer</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">2 hours ago</span>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Excellent implementation of ephemeral prompt caching! By anchoring your 150k token knowledge corpus with <code className="bg-neutral-900 px-1 py-0.5 rounded text-amber-300 font-mono text-[11px]">cache_control</code>, you cut downstream query latency from 8.2s to 640ms and reduced cost by 90%. In production, remember to add a fallback retry with exponential backoff if the cache expires. Outstanding work!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Roster Cards */}
        <div className="mt-14">
          <h3 className="text-xl font-bold text-white mb-6">
            Learn From Industry Leaders At
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0f111e] border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {m.company}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{m.rating}</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white">{m.name}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{m.role}</p>

                  <p className="text-xs text-neutral-300 mt-4 italic font-normal leading-relaxed">
                    "{m.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
                  {m.reviewsCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
