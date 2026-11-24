"use client"

import { useRef, useState } from "react"
import { ExternalLink, Github, ArrowUpRight, Zap, Users, Shield, Cpu } from "lucide-react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import ScrollReveal from "./ScrollReveal"

const GITHUB_PROFILE = "https://github.com/decodex15"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  metrics: { label: string; value: string }[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  image: string
}

const projects: Project[] = [
  {
    id: "codefusion",
    title: "CodeFusion",
    subtitle: "CRDT-Based Real-Time Collaborative Code Editor",
    description:
      "A real-time collaborative development environment leveraging conflict-free replicated data types (CRDTs) and Monaco Editor to allow concurrent multi-user editing with seamless delta synchronization and live awareness protocols.",
    metrics: [
      { label: "Sync Latency", value: "100–150ms" },
      { label: "Concurrency", value: "20+ Users" },
      { label: "Consistency", value: "Conflict-Free" },
    ],
    technologies: ["React.js", "Node.js", "Express.js", "Yjs", "Socket.io", "Monaco Editor", "MongoDB", "JWT"],
    liveUrl: "https://code-fusion-code-collab.vercel.app/",
    githubUrl: "https://github.com/decodex15/CodeFusion",
    image: "/collaborative-code-editor-monaco-ui.jpg",
  },
  {
    id: "financebrain",
    title: "FinanceBrain AI",
    subtitle: "Voice & NLP Enterprise Financial Query System",
    description:
      "Real-time enterprise financial query platform enabling users to retrieve complex financial metrics and insights using natural language via voice or text queries, backed by optimized Flask/Node APIs.",
    metrics: [
      { label: "Query Accuracy", value: "85%+" },
      { label: "Response Time", value: "< 1.0s" },
      { label: "Modality", value: "Voice & Text" },
    ],
    technologies: ["Python", "Flask", "React.js", "Node.js", "MongoDB", "WebSockets", "NLP"],
    liveUrl: "https://hackfest2025.vercel.app/",
    githubUrl: "https://github.com/decodex15/FinanceBrainAI",
    image: "/financial-dashboard-charts-and-graphs.jpg",
  },
  {
    id: "parakram",
    title: "Parakram'25 Fest Portal",
    subtitle: "High-Traffic Event Management Platform",
    description:
      "Official tournament registration and live match scoring portal for the annual sports festival of IIT (ISM) Dhanbad, featuring Razorpay payment gateways and resilient backend scaling.",
    metrics: [
      { label: "Scale", value: "Campus-Wide" },
      { label: "Payments", value: "Razorpay" },
      { label: "Cloud", value: "AWS Deployed" },
    ],
    technologies: ["React.js", "Node.js", "MongoDB", "Razorpay", "AWS", "Tailwind CSS"],
    liveUrl: "https://parakram25.vercel.app/",
    githubUrl: "https://github.com/decodex15/Parakram-Website",
    image: "/travel-app-hero-ui.jpg",
  },
  {
    id: "jenkins-search",
    title: "Jenkins Contributor Search",
    subtitle: "Memoized Fuzzy Contributor Search Engine",
    description:
      "Client-side search implementation using Fuse.js with memoized indexing and ranking, merged into official Jenkins infrastructure repository alongside a modular component refactor.",
    metrics: [
      { label: "Status", value: "Merged" },
      { label: "Search Index", value: "Memoized" },
      { label: "Impact", value: "Production" },
    ],
    technologies: ["React.js", "Fuse.js", "JavaScript", "GitHub Infra"],
    githubUrl: "https://github.com/jenkins-infra",
    image: "/realtime-pair-programming-editor.jpg",
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // Staggered scroll-driven elevation for each card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  })

  const cardScale = useTransform(scrollYProgress, [0, 1], [0.93, 1])
  const cardY = useTransform(scrollYProgress, [0, 1], [60 + index * 15, 0])
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [8, 0])

  // Specular spotlight gradient transformation
  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([xPos, yPos]) =>
      `radial-gradient(450px circle at ${xPos}px ${yPos}px, rgba(59, 130, 246, 0.18), transparent 70%)`
  )

  return (
    <div ref={cardRef} className="[perspective:1000px] w-full">
      <motion.div
        style={{
          scale: cardScale,
          y: cardY,
          rotateX: cardRotateX,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="group relative rounded-2xl bg-[#0b0f19] border border-white/[0.08] hover:border-blue-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-2xl interactive-card"
      >
        {/* Specular Radial Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
          style={{ background: spotlightBg }}
        />

        {/* Project Image Preview with subtle overlay */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/[0.06]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 550px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-75" />

          {/* Top action links */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub Source Code`}
                className="p-2.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/[0.12] text-slate-300 hover:text-white hover:bg-slate-900 transition-colors shadow-md cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} Live Application`}
                className="p-2.5 rounded-lg bg-blue-600/90 backdrop-blur-md border border-blue-400/40 text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between relative z-20">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 mb-3">{project.subtitle}</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">{project.description}</p>
          </div>

          <div>
            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-slate-950/70 border border-white/[0.06] mb-5">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-xs font-bold font-mono text-white">{m.value}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300 group-hover:border-blue-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#080b12] border-t border-white/[0.04] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] z-30">
      <ScrollReveal depth="medium" direction="perspective" className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
              <span>03 // CODE & SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
              Featured Software Projects
            </h2>
            <p className="text-slate-400 max-w-xl text-base">
              Production systems, real-time collaboration engines, and algorithmic tools engineered with clean architecture.
            </p>
          </div>
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.08] transition-all w-fit shadow-sm cursor-pointer"
          >
            <span>View All GitHub Repositories</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
          </a>
        </div>

        {/* Bento Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
