"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { ArrowRight, Download, Terminal, MapPin, GraduationCap, Code2, Sparkles, Trophy, ExternalLink } from "lucide-react"
import Image from "next/image"
import InteractiveCanvas from "./InteractiveCanvas"
import HeroTerminal from "./HeroTerminal"
import AnimatedCounter from "./AnimatedCounter"

const RESUME_URL = "https://drive.google.com/file/d/1HClIeg18U1AmLGtT7Jh5yrisnpFLZ0f3/view?usp=sharing"
const GSOC_URL = "https://summerofcode.withgoogle.com/archive/2026/projects/GS2OzCEu"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Deep parallax layer transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2])

  // 3D Tilt & Specular Spotlight on Profile Card
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spotlightX = useMotionValue(150)
  const spotlightY = useMotionValue(150)

  const springConfig = { stiffness: 220, damping: 22, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    spotlightX.set(mouseXPos)
    spotlightY.set(mouseYPos)
    x.set(mouseXPos / rect.width - 0.5)
    y.set(mouseYPos / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[96vh] pt-28 pb-16 sm:pt-36 sm:pb-24 flex items-center justify-center overflow-hidden bg-grid-pattern [perspective:1200px]"
    >
      {/* Interactive Neural Constellation Canvas with Parallax */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <InteractiveCanvas />
      </motion.div>

      {/* Ambient Pulsing Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/[0.12] blur-[140px] rounded-full pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[350px] bg-indigo-600/[0.08] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[350px] h-[250px] bg-emerald-500/[0.06] blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Content with Receding Depth on Scroll */}
      <motion.div
        style={{
          y: contentY,
          scale: contentScale,
          opacity: contentOpacity,
        }}
        className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          {/* Left Column: Hero Headline & Summary */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Live Role Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/[0.1] text-xs font-mono text-slate-300 mb-6 shadow-lg shadow-black/40 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-200">SDE Intern @ Money Forward</span>
              <span className="text-slate-600">•</span>
              <a
                href={GSOC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                GSoC '26 @ AOSSIE
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.12]">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 animate-gradient">high-performance</span> systems & distributed software.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
              Hi, I'm <strong className="text-white font-semibold">Vaibhav Aryan</strong> (aka{" "}
              <span className="text-blue-400 font-mono font-semibold">DecodeX</span>). Software Engineer and
              B.Tech student at <span className="text-slate-200 font-semibold">IIT (ISM) Dhanbad</span>. Passionate
              about scalable backend infrastructure, real-time sync with CRDTs, and algorithmic problem-solving.
            </p>

            {/* Key Meta Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8 text-xs font-mono text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] shadow-sm backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                IIT (ISM) Dhanbad '27
              </span>
              <a
                href="https://codeforces.com/profile/decodex_it_is"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/40 text-emerald-300 transition-colors shadow-sm backdrop-blur-md"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                Codeforces DecodeX (1246)
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] shadow-sm backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                India
              </span>
            </div>

            {/* Action Buttons with Magnetic Feel */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/[0.12] hover:border-blue-500/40 font-medium text-sm transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Animated Counters Bar */}
            <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/[0.08] w-full max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  <AnimatedCounter value={750} suffix="+" />
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Problems Solved</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-blue-400">
                  <span className="font-sans font-bold">GSoC</span> '26
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Contributor @ AOSSIE</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                  <AnimatedCounter value={9} prefix="Top " />
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Inter-IIT Tech (ISRO)</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Tilt Profile Card with Dynamic Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center [perspective:1000px]"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-sm rounded-2xl p-1 group cursor-pointer"
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-emerald-500/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Card Frame */}
              <div className="relative rounded-2xl bg-[#0c101a] border border-white/[0.12] p-3.5 shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Header status bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">decodex.engineer</span>
                </div>

                {/* Profile Image with Modern Framing */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-white/[0.06]">
                  <Image
                    src="/profile.jpg"
                    alt="Vaibhav Aryan"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-transparent to-transparent opacity-85" />

                  {/* Micro overlay tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/[0.1] shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white flex items-center gap-1">
                          Vaibhav Aryan
                          <Sparkles className="w-3 h-3 text-amber-400" />
                        </p>
                        <p className="text-[10px] font-mono text-emerald-400">IIT (ISM) Dhanbad • B.Tech</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold">
                        CGPA 7.72
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer specs inside card */}
                <div className="mt-3 pt-2 px-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Stack: Kotlin • Go • React • Yjs</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Ready
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Embedded Interactive Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          <HeroTerminal />
        </motion.div>
      </motion.div>
    </section>
  )
}
