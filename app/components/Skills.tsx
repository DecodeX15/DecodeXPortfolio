"use client"

import { Code2, Server, Database, Brain, Trophy, ExternalLink, Cpu } from "lucide-react"
import { motion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"

const marqueeTech = [
  "C++", "Kotlin", "Spring Boot", "React.js", "Next.js", "Python", "Flutter",
  "Dart", "FastAPI", "Node.js", "Yjs (CRDT)", "Socket.io", "MongoDB",
  "PostgreSQL", "SQLite", "Docker", "Kubernetes", "ONNX Runtime", "mTLS", "Karate"
]

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      skills: ["C", "C++", "JavaScript", "TypeScript", "Python", "Kotlin", "Dart", "SQL", "HTML/CSS"],
    },
    {
      title: "Frameworks & Backend",
      icon: Server,
      skills: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "Spring Boot",
        "Flutter",
        "FastAPI",
        "Flask",
        "Yjs (CRDT)",
        "Socket.io",
      ],
    },
    {
      title: "Databases & Infrastructure",
      icon: Database,
      skills: [
        "PostgreSQL",
        "MongoDB",
        "SQLite",
        "Firebase",
        "Docker",
        "Kubernetes",
        "Git/GitHub",
        "SonarQube",
        "ONNX Runtime",
      ],
    },
    {
      title: "Core CS Principles",
      icon: Brain,
      skills: [
        "Data Structures & Algorithms",
        "Object Oriented Programming (C++)",
        "Operating Systems",
        "Database Management Systems",
        "RESTful API Design",
        "mTLS & Authentication",
      ],
    },
  ]

  const competitiveProgramming = [
    {
      platform: "Codeforces",
      handle: "DecodeX",
      profileUrl: "https://codeforces.com/profile/decodex_it_is",
      maxRating: "1246",
      tier: "Pupil",
      solved: "650+ Problems",
      badgeColor: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    },
    {
      platform: "AtCoder",
      handle: "DecodeX",
      profileUrl: "https://atcoder.jp/users/xdecodex",
      maxRating: "429",
      tier: "Rated",
      solved: "100+ Problems",
      badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    },
  ]

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#06080d] border-t border-white/[0.04] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] z-30">
      <ScrollReveal depth="medium" direction="perspective" className="max-w-6xl mx-auto relative z-10">
        {/* Infinite Tech Marquee Strip */}
        <div className="mb-14 overflow-hidden py-3 -mx-4 sm:-mx-6 relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#06080d] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06080d] to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 whitespace-nowrap animate-marquee">
            {[...marqueeTech, ...marqueeTech].map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono text-slate-500 hover:text-blue-400 transition-colors duration-200 select-none px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.04]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <span>04 // CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            Technical Proficiencies & Systems Matrix
          </h2>
          <p className="text-slate-400 max-w-xl text-base">
            Core technologies, programming languages, and tooling utilized in production environments and competitive problem solving.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, borderColor: "rgba(59, 130, 246, 0.4)" }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-[#0b0f19] border border-white/[0.08] p-6 transition-all flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-slate-300 font-mono group-hover:border-white/[0.12] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Competitive Programming Cards */}
        <div className="rounded-2xl bg-[#0c101b] border border-white/[0.08] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-bl-full pointer-events-none blur-2xl" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Competitive Programming Track Record</h3>
                <p className="text-xs text-slate-400 font-mono">750+ algorithmic problems solved across platforms</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {competitiveProgramming.map((cp, idx) => (
              <a
                key={idx}
                href={cp.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-blue-500/40 hover:bg-slate-900/90 transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {cp.platform}
                    </span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${cp.badgeColor}`}>
                      {cp.tier}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">Handle: {cp.handle}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs font-mono text-slate-300">
                    <span>Max Rating: <strong className="text-white">{cp.maxRating}</strong></span>
                    <span>Solved: <strong className="text-white">{cp.solved}</strong></span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.04] text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
