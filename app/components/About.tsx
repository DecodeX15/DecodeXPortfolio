"use client"

import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Code, Trophy, Cpu, Database, Network, ArrowUpRight } from "lucide-react"
import AnimatedCounter from "./AnimatedCounter"
import ScrollReveal from "./ScrollReveal"

const RESUME_URL = "https://drive.google.com/file/d/1HClIeg18U1AmLGtT7Jh5yrisnpFLZ0f3/view?usp=sharing"

export default function About() {
  const coursework = [
    "Data Structures & Algorithms",
    "Object Oriented Programming (C++)",
    "Operating Systems",
    "Database Management Systems",
    "Computer Networks",
    "System Design Fundamentals",
  ]

  const highlights = [
    {
      icon: Cpu,
      title: "Backend & Systems Architecture",
      desc: "Architecting microservices with Kotlin, Spring Boot, Node.js, and implementing mutual TLS (mTLS) for zero-trust security.",
    },
    {
      icon: Network,
      title: "Real-Time Collaborative Engines",
      desc: "Building conflict-free collaborative tools with CRDTs (Yjs) and WebSockets achieving 100-150ms sync latency.",
    },
    {
      icon: Code,
      title: "Algorithmic Precision",
      desc: "Solved 750+ algorithmic challenges across Codeforces and AtCoder under handle DecodeX.",
    },
    {
      icon: Trophy,
      title: "Competitive Podium Finishes",
      desc: "Secured Rank 4 in HaXplore (IIT BHU), Rank 2 in HackFest (IIT Dhanbad), and 9th in Inter-IIT Tech Meet (ISRO GeoNLI).",
    },
  ]

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#080b12] border-t border-white/[0.06] shadow-[0_-40px_80px_rgba(0,0,0,0.85)] z-20">
      <ScrollReveal depth="medium" direction="perspective" className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <span>01 // BACKGROUND & ORIGIN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Education & Core Engineering Focus
          </h2>
          <p className="text-slate-400 max-w-2xl text-base leading-relaxed">
            Focused on building robust, high-throughput software and advancing core computer science principles through competitive programming and open-source systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Education Card */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl bg-[#0d121f] border border-white/[0.1] p-6 sm:p-8 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-bl-full pointer-events-none blur-3xl" />

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">IIT (ISM) Dhanbad</h3>
                  <p className="text-xs font-mono text-slate-400">Dhanbad, Jharkhand</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Degree & Major</p>
                  <p className="font-semibold text-slate-200 mt-0.5">
                    Bachelor of Technology in Mining Engineering
                  </p>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">Expected Graduation: June 2027</p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-slate-400">Cumulative GPA</span>
                  <span className="text-sm font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    7.72 / 10.0
                  </span>
                </div>
              </div>

              {/* Coursework */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Relevant Coursework
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 font-mono"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Resume Link Button */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 font-medium text-xs font-mono transition-all group cursor-pointer"
                >
                  <span>View Full Verified Resume PDF</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Focus Areas */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.45)" }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-[#0b0f19] border border-white/[0.07] p-6 transition-all group shadow-xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/15 group-hover:border-blue-500/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
