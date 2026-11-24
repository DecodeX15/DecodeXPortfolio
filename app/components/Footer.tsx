"use client"

import { ArrowUp, Github, Linkedin, Terminal, Mail, Code2 } from "lucide-react"

const GITHUB_URL = "https://github.com/decodex15"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 px-4 sm:px-6 bg-[#04060a] border-t border-white/[0.06] text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand / Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>DecodeX</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400 font-normal">Vaibhav Aryan</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} Vaibhav Aryan. All rights reserved.
          </p>
        </div>

        {/* Middle: Links */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="https://www.linkedin.com/in/vaibhav-aryan-00650b287/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="https://codeforces.com/profile/decodex_it_is"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Codeforces
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="mailto:23je1055@iitism.ac.in"
            className="hover:text-white transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  )
}
