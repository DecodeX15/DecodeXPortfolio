"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Check, Copy, Play } from "lucide-react"

export default function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<"whoami" | "gsoc" | "skills" | "awards">("whoami")
  const [copied, setCopied] = useState(false)

  const commands = {
    whoami: {
      cmd: "decodex --whoami",
      output: [
        "{",
        '  "name": "Vaibhav Aryan",',
        '  "role": "Software Engineer Intern @ Money Forward",',
        '  "education": "IIT (ISM) Dhanbad (B.Tech, 2023 - 2027)",',
        '  "focus": ["Distributed Systems", "CRDT Realtime Sync", "Cloud & Backend"],',
        '  "status": "Available for Software Engineering Roles"',
        "}",
      ],
    },
    gsoc: {
      cmd: "gsoc --status --org=AOSSIE",
      output: [
        "Google Summer of Code (GSoC) 2026 Contributor @ AOSSIE",
        "▹ Project: On-Device Workout Engine & Voice Command Comparison",
        "▹ Optimizations: Reduced boot from 30s -> ~2s with pre-gen SQLite pipeline",
        "▹ Core Stack: Flutter, Dart, SQLite, ONNX Runtime, Semantic Embeddings",
        "▹ Verification: https://summerofcode.withgoogle.com/archive/2026/projects/GS2OzCEu",
      ],
    },
    skills: {
      cmd: "cat /etc/core-tech.json",
      output: [
        "{",
        '  "languages": ["C", "C++", "Kotlin", "Python", "JavaScript", "Dart", "SQL"],',
        '  "backend": ["Spring Boot", "Node.js", "Express.js", "FastAPI", "Flask", "mTLS"],',
        '  "realtime": ["Yjs (CRDT)", "WebSockets", "Monaco Editor"],',
        '  "devops": ["Docker", "Kubernetes", "GitHub Actions", "SonarQube"]',
        "}",
      ],
    },
    awards: {
      cmd: "decodex --rankings",
      output: [
        "🏆 Inter-IIT Tech Meet '25: Rank 9 / 23+ IITs (ISRO GeoNLI)",
        "⚡ HaXplore - CodeFest '25 (IIT BHU): Rank 4 / 350+ Teams",
        "🥈 HackFest '25 (IIT Dhanbad): Rank 2 / 50+ Teams (36hr Sprint)",
        "🎯 Codeforces (DecodeX): 1246 Max Rating (650+ Problems Solved)",
        "🌐 AtCoder (DecodeX): 429 Rating (100+ Problems Solved)",
      ],
    },
  }

  const current = commands[activeTab]

  const handleCopy = () => {
    navigator.clipboard.writeText(current.output.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full rounded-2xl bg-[#090d16] border border-white/[0.1] shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Bar with clickable tabs */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d121e] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            bash ~ vaibhav@decodex
          </span>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1">
          {(["whoami", "gsoc", "skills", "awards"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all ${
                activeTab === tab
                  ? "bg-blue-600/25 text-blue-300 border border-blue-500/40"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={handleCopy}
            title="Copy command output"
            className="p-1.5 ml-1 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[170px] select-text">
        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <span className="text-slate-500">$</span>
          <span className="text-blue-400 font-semibold">{current.cmd}</span>
          <span className="w-2 h-4 bg-blue-400/80 animate-pulse ml-0.5 inline-block" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-slate-300 space-y-1"
          >
            {current.output.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.includes("https://")
                    ? "text-blue-400 underline underline-offset-2 break-all"
                    : line.includes("🏆") || line.includes("🥈") || line.includes("⚡")
                    ? "text-amber-300"
                    : line.includes("▹")
                    ? "text-slate-300 pl-2"
                    : "text-slate-300"
                }
              >
                {line}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
