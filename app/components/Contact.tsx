"use client"

import { useState } from "react"
import { Mail, MapPin, Send, CheckCircle2, Github, Linkedin, Code2, ArrowUpRight } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const GITHUB_URL = "https://github.com/decodex15"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    }, 800)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[#06080d] border-t border-white/[0.04] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] z-30">
      <ScrollReveal depth="medium" direction="perspective" className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <span>06 // CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            Get In Touch
          </h2>
          <p className="text-slate-400 max-w-xl text-base">
            Open for software engineering opportunities, open-source collaborations, and systems discussions.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#0b0f19] border border-white/[0.08] p-6 sm:p-8 space-y-5 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Direct Communication Channels</h3>

              <a
                href="mailto:23je1055@iitism.ac.in"
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/70 border border-white/[0.06] hover:border-blue-500/50 hover:bg-slate-900 transition-all group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <p className="text-[11px] font-mono text-slate-400 uppercase">Academic / Work Email</p>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors truncate">
                    23je1055@iitism.ac.in
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/70 border border-white/[0.06]">
                <div className="p-3 rounded-lg bg-white/[0.05] text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase">Campus Location</p>
                  <p className="text-sm font-semibold text-slate-200">
                    IIT (ISM) Dhanbad, Jharkhand, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Matrix */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0b0f19] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0f1422] transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <Github className="w-5 h-5 text-slate-300 group-hover:text-white mb-1.5 transition-colors" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/vaibhav-aryan-00650b287/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0b0f19] border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#0f1422] transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-blue-300 mb-1.5 transition-colors" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200">LinkedIn</span>
              </a>

              <a
                href="https://codeforces.com/profile/decodex_it_is"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0b0f19] border border-white/[0.08] hover:border-amber-500/40 hover:bg-[#0f1422] transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <Code2 className="w-5 h-5 text-amber-400 group-hover:text-amber-300 mb-1.5 transition-colors" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200">DecodeX</span>
              </a>
            </div>
          </div>

          {/* Right Column: Fast Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0b0f19] border border-white/[0.08] p-6 sm:p-8 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Send an Immediate Message</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the message details below to get in touch directly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">Message Sent Successfully</h4>
                  <p className="text-xs text-slate-300">
                    Thank you! I will review your note and get back to you promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Vaibhav, I'd like to discuss an opportunity or collaboration..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-blue-600/25"
                  >
                    {loading ? (
                      <span className="text-xs font-mono">Transmitting...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
