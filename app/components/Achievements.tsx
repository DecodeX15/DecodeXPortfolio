"use client"

import { Award, Trophy, Star, Users, ExternalLink, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"

const GSOC_URL = "https://summerofcode.withgoogle.com/archive/2026/projects/GS2OzCEu"

interface Achievement {
  title: string
  organization: string
  metric: string
  period: string
  description: string
  tag: string
  link?: string
}

const achievements: Achievement[] = [
  {
    title: "Google Summer of Code 2026 Selection",
    organization: "Google / AOSSIE",
    metric: "Global Selection",
    period: "2026",
    description:
      "Selected as one of the few contributors globally to architect personalized recommendation pipelines and on-device offline voice algorithms with AOSSIE.",
    tag: "Open Source",
    link: GSOC_URL,
  },
  {
    title: "9th Position — Inter IIT Tech Meet '25",
    organization: "ISRO Problem Statement (GeoNLI) • IIT Patna",
    metric: "Rank 9 / 23+ IITs",
    period: "2025",
    description:
      "Represented IIT (ISM) Dhanbad in solving ISRO's GeoNLI challenge, competing against premier engineering institutions across India.",
    tag: "National Competition",
  },
  {
    title: "Rank 4 — HaXplore, CodeFest '25",
    organization: "IIT (BHU) Varanasi",
    metric: "Rank 4 / 350+ Teams",
    period: "2025",
    description:
      "Secured 4th rank in the flagship national hackathon, building an innovative engineering solution under high time pressure.",
    tag: "National Hackathon",
  },
  {
    title: "Rank 2 — HackFest '25",
    organization: "IIT (ISM) Dhanbad",
    metric: "Rank 2 / 50+ Teams",
    period: "2025",
    description:
      "Won 2nd place in the prestigious 36-hour hackathon, designing and shipping a full-stack product under rapid sprint deadlines.",
    tag: "Campus Hackathon",
  },
  {
    title: "Top 11 — Winter of Code 6.0",
    organization: "Cyberlabs • IIT (ISM) Dhanbad",
    metric: "Top 11 / 300+ Devs",
    period: "2024",
    description:
      "Ranked in the top 11 web developers out of 300+ participants for executing complex full-stack web development challenges.",
    tag: "Open Source Contest",
  },
]

const engagements = [
  {
    role: "Core Club Member & Mentor",
    org: "CYBERLABS — IIT (ISM) Dhanbad",
    desc: "Official Programming and Development Club of IIT (ISM) Dhanbad. Mentored 50+ students in modern web foundations, JavaScript, and React.",
  },
  {
    role: "Tech Team Lead / Member",
    org: "Parakram '25 — Annual Sports Fest",
    desc: "Maintained and deployed the official sports portal, ensuring zero downtime and high availability during high-traffic festival registration spikes.",
  },
  {
    role: "Technical Organizer & Infrastructure",
    org: "HackFest '25 — 36-Hour Hackathon",
    desc: "Coordinated technical resources, platform scoring workflows, and event systems for 50+ participating hackathon teams.",
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#080b12] border-t border-white/[0.04] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] z-30">
      <ScrollReveal depth="medium" direction="perspective" className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <span>05 // HONORS & RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            Competitions, Hackathons & Leadership
          </h2>
          <p className="text-slate-400 max-w-xl text-base">
            Verified competitive outcomes, hackathon podium finishes, and campus technical leadership.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, borderColor: "rgba(59, 130, 246, 0.45)" }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl bg-[#0b0f19] border border-white/[0.08] p-6 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  {item.title}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Official Verification"
                      className="text-blue-400 hover:text-blue-300 inline-block cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-3">{item.organization}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{item.tag}</span>
                <span>{item.period}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leadership & Engagements Subsection */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Campus Engineering & Community Engagements</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {engagements.map((eng, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#090d16] border border-white/[0.06] p-5 hover:border-white/[0.12] transition-colors shadow-md"
              >
                <p className="text-sm font-semibold text-white mb-1">{eng.role}</p>
                <p className="text-xs font-mono text-blue-400 mb-2">{eng.org}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{eng.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
