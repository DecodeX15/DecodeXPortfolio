"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  depth?: "subtle" | "medium" | "deep"
  direction?: "up" | "scale" | "perspective"
}

export default function ScrollReveal({
  children,
  className = "",
  depth = "medium",
  direction = "perspective",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  })

  // Smooth out scroll progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  // Transform definitions according to depth configuration
  const yValues = depth === "deep" ? [120, 0] : depth === "medium" ? [70, 0] : [40, 0]
  const scaleValues = depth === "deep" ? [0.88, 1] : depth === "medium" ? [0.94, 1] : [0.97, 1]
  const rotateXValues = direction === "perspective" ? (depth === "deep" ? [10, 0] : [6, 0]) : [0, 0]

  const y = useTransform(smoothProgress, [0, 1], yValues)
  const scale = useTransform(smoothProgress, [0, 1], scaleValues)
  const rotateX = useTransform(smoothProgress, [0, 1], rotateXValues)
  const opacity = useTransform(smoothProgress, [0, 0.8], [0.35, 1])

  return (
    <div
      ref={containerRef}
      className="[perspective:1200px] w-full"
    >
      <motion.div
        style={{
          y,
          scale,
          rotateX,
          opacity,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
