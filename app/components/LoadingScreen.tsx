"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useCallback } from "react"

const BRAND_NAME = "DECODEX"

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const glowPulse = {
  animate: {
    textShadow: [
      "0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(59,130,246,0.1)",
      "0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(59,130,246,0.3)",
      "0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(59,130,246,0.1)",
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Ease-out feel: slows down as it approaches 100
        const remaining = 100 - prev
        const increment = Math.max(0.5, Math.random() * Math.min(15, remaining * 0.3))
        return Math.min(100, prev + increment)
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setIsComplete(true), 600)
      return () => clearTimeout(timeout)
    }
  }, [progress])

  const displayProgress = Math.floor(progress)

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950 overflow-hidden"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* ── Ambient background effects ── */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-violet-400/40"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}

          {/* ── Split-screen exit panels ── */}
          <motion.div
            className="absolute inset-0 bg-gray-950 origin-left"
            style={{ width: "50%", left: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-0 bg-gray-950 origin-right"
            style={{ width: "50%", right: 0, left: "50%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />

          {/* ── Main content ── */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Brand name — staggered letter reveal */}
            <motion.div className="flex items-center gap-1 perspective-[1000px]">
              {BRAND_NAME.split("").map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent select-none"
                  style={{ display: "inline-block" }}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    {...glowPulse}
                  >
                    {letter}
                  </motion.span>
                </motion.span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-sm md:text-base text-gray-500 tracking-[0.3em] uppercase font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Portfolio Loading
            </motion.p>

            {/* Progress bar container */}
            <motion.div
              className="w-64 md:w-80 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {/* Progress bar track */}
              <div className="relative w-full h-[3px] bg-gray-800/60 rounded-full overflow-hidden">
                {/* Animated fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #8b5cf6, #7c3aed, #6366f1, #3b82f6)",
                    backgroundSize: "200% 100%",
                  }}
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${displayProgress}%`,
                    backgroundPosition: ["0% 0%", "100% 0%"],
                  }}
                  transition={{
                    width: { duration: 0.3, ease: "easeOut" },
                    backgroundPosition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                />
                {/* Glow effect on leading edge */}
                <motion.div
                  className="absolute inset-y-0 w-8 rounded-full"
                  style={{
                    left: `calc(${displayProgress}% - 32px)`,
                    background:
                      "linear-gradient(90deg, transparent, rgba(139,92,246,0.6))",
                    filter: "blur(4px)",
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>

              {/* Percentage counter */}
              <div className="flex items-baseline gap-1">
                <motion.span
                  className="text-3xl md:text-4xl font-mono font-bold bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent tabular-nums"
                  key={displayProgress}
                  initial={{ opacity: 0.6, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {displayProgress}
                </motion.span>
                <span className="text-lg md:text-xl font-mono text-gray-500 font-semibold">
                  %
                </span>
              </div>
            </motion.div>

            {/* Bottom decorative dots */}
            <motion.div
              className="flex items-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="w-1.5 h-1.5 rounded-full bg-violet-500/50"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
