"use client"

import { useState, useRef } from "react"
import { Briefcase, Calendar, CheckCircle2, ChevronRight, ExternalLink, GitBranch, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import ScrollReveal from "./ScrollReveal"

const GSOC_URL = "https://summerofcode.withgoogle.com/archive/2026/projects/GS2OzCEu"

interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  badge: string
  badgeColor: string
  bullets: string[]
  techStack: string[]
  externalLink?: string
}

const experiences: ExperienceItem[] = [
  {
    id: "money-forward",
    role: "Software Engineer Intern",
    company: "Money Forward Inc.",
    period: "Aug 2026 – Present",
    badge: "Enterprise Fintech",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    bullets: [
      "Implemented mutual TLS (mTLS) for outbound CLM-to-Fenergo API communication and refactored integration to use separate read and write scoped tokens, enforcing secure authentication and least-privilege access.",
      "Developed mock REST APIs for third-party KYC/KYB vendors using Kotlin and Spring Boot, enabling end-to-end QA testing without external vendor dependencies.",
      "Resolved entity re-entry issues across Fenergo and CLM by implementing the reEntry API and adding Karate-based automated regression tests.",
    ],
    techStack: ["Kotlin", "Spring Boot", "SonarQube", "Karate", "mTLS", "Fenergo", "CLM", "YAML"],
  },
  {
    id: "gsoc-aossie",
    role: "GSoC 2026 Contributor",
    company: "Google Summer of Code — AOSSIE",
    period: "May 2026 – Oct 2026",
    badge: "Open Source / Google",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    bullets: [
      "Engineered an on-device personalized workout recommendation engine using user goals, fitness levels, exercise embeddings, safety constraints, session history, and exercise variety logic.",
      "Reduced first-launch initialization time from 30+ seconds to approximately 2 seconds by implementing a pre-generated SQLite database pipeline with automated generation and validation using GitHub Actions.",
      "Developed an offline voice-command pipeline using audio comparison instead of conventional word matching for hands-free workout control.",
    ],
    techStack: ["Flutter", "Dart", "SQLite", "ONNX Runtime", "Embeddings", "Semantic Search", "GitHub Actions"],
    externalLink: GSOC_URL,
  },
  {
    id: "truxt-ai",
    role: "Software Engineering Intern",
    company: "Truxt.ai",
    period: "May 2026 – June 2026",
    badge: "AI Systems",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    bullets: [
      "Engineered software integrations and automated backend API workflows for intelligence platforms.",
      "Collaborated with cross-functional engineering teams to implement clean, resilient API endpoints and data validation pipelines.",
    ],
    techStack: ["Python", "FastAPI", "REST APIs", "Docker", "PostgreSQL"],
  },
  {
    id: "sde-intern",
    role: "SDE Intern",
    company: "Software Engineering Internship",
    period: "Oct 2025 – Dec 2025",
    badge: "Full Stack",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    bullets: [
      "Architected core web service modules and implemented role-based access control (RBAC) to ensure role isolation and secure credential authorization.",
      "Optimized query performance and database indexing to maintain low-latency response times during concurrent session spikes.",
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "React.js", "REST APIs", "JWT"],
  },
  {
    id: "jenkins",
    role: "Open Source Contributor",
    company: "Jenkins (jenkins-infra)",
    period: "2025",
    badge: "Merged PRs",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    bullets: [
      "Implemented client-side contributor search using Fuse.js with relevance ranking and memoized indexing for immediate search results (Merged).",
      "Refactored Contributor Spotlight page into reusable React components to improve code quality and maintainability (Merged).",
    ],
    techStack: ["React.js", "Fuse.js", "JavaScript", "GitHub Workflows"],
  },
]

export default function Experience() {
  const [selectedId, setSelectedId] = useState(experiences[0].id)
  const current = experiences.find((e) => e.id === selectedId) || experiences[0]

  const timelineContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start center", "end center"],
  })

  const rawLaserHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const laserHeight = useSpring(rawLaserHeight, {
    stiffness: 140,
    damping: 25,
  })

  return (
    <section
      ref={timelineContainerRef}
      id="experience"
      className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#06080d] border-t border-white/[0.04] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] z-30"
    >
      <ScrollReveal depth="medium" direction="perspective" className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <span>02 // CAREER TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            Professional Experience & Open Source
          </h2>
          <p className="text-slate-400 max-w-2xl text-base">
            Track record of shipping production code at enterprise fintech, Google Summer of Code, and high-growth engineering teams.
          </p>
        </div>

        {/* Desktop / Tablet Interactive Selector View with Glowing Energy Guide */}
        <div className="grid lg:grid-cols-12 gap-8 items-start relative">
          {/* Vertical Laser Beam (on Desktop) */}
          <div className="hidden lg:block absolute left-[32.5%] top-0 bottom-0 w-[2px] bg-slate-800/60 pointer-events-none">
            <motion.div
              style={{ height: laserHeight }}
              className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_12px_#3b82f6]"
            />
          </div>

          {/* Company Selector Tab List */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto pb-4 lg:pb-0 gap-2.5 scrollbar-none">
            {experiences.map((item) => {
              const isSelected = item.id === selectedId
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`text-left px-4 py-4 rounded-xl border transition-all flex items-center justify-between shrink-0 lg:shrink w-auto lg:w-full cursor-pointer relative ${
                    isSelected
                      ? "bg-[#0f1523] border-blue-500/50 text-white shadow-xl shadow-blue-500/10 translate-x-1"
                      : "bg-[#090d16] border-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-[#0c111d]"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold truncate flex items-center gap-1.5">
                      {item.company}
                      {item.id === "gsoc-aossie" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                      )}
                    </span>
                    <span className="text-xs font-mono text-slate-400 mt-0.5">{item.period}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ml-2 hidden lg:block transition-transform ${
                      isSelected ? "text-blue-400 translate-x-1" : "text-slate-600"
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* Detailed Experience Panel */}
          <div className="lg:col-span-8">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-2xl bg-[#0b0f1a] border border-white/[0.08] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-bl-full pointer-events-none blur-3xl" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    {current.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-semibold text-blue-400">@ {current.company}</p>
                    {current.externalLink && (
                      <a
                        href={current.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                      >
                        <span>Official GSoC Project</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${current.badgeColor}`}>
                    {current.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                    {current.period}
                  </span>
                </div>
              </div>

              {/* Bullet Points with glowing markers */}
              <div className="py-6 space-y-4">
                {current.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    <span className="text-blue-400 mt-1 shrink-0 font-mono text-xs">▹</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="pt-6 border-t border-white/[0.06]">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Technologies & Engineering Methodologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-white/[0.08] text-slate-300 hover:border-blue-500/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
