"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Real-time mouse position
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth lagging spring for trailing aura ring
  const trailX = useSpring(mouseX, { stiffness: 350, damping: 25, mass: 0.6 })
  const trailY = useSpring(mouseY, { stiffness: 350, damping: 25, mass: 0.6 })

  useEffect(() => {
    // Only enable on desktop mouse devices
    const isTouch = () => "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouch() || window.innerWidth < 768) {
      return
    }

    setMounted(true)
    document.body.classList.add("cursor-none-custom")

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    document.documentElement.addEventListener("mouseenter", handleMouseEnter)

    // Detect hoverable targets
    const handleElementHover = () => {
      const hoverables = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .interactive-card, [data-cursor-hover]"
      )
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true))
        el.addEventListener("mouseleave", () => setIsHovered(false))
      })
    }

    handleElementHover()
    const observer = new MutationObserver(handleElementHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.classList.remove("cursor-none-custom")
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter)
      observer.disconnect()
    }
  }, [isVisible, mouseX, mouseY])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* Trailing Soft Ambient Glow Ring (anchored to cursor center) */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : isClicked ? 0.7 : 1,
          opacity: isVisible ? (isHovered ? 0.35 : 0.15) : 0,
        }}
        transition={{ duration: 0.2 }}
        className="w-8 h-8 rounded-full bg-red-500 blur-[8px]"
      />

      {/* Sharp Red Triangle Cursor Pointer */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isClicked ? 0.85 : isHovered ? 1.15 : 1,
          opacity: isVisible ? 1 : 0,
          rotate: isHovered ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="absolute top-0 left-0"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(239,68,68,0.6)]"
        >
          {/* Dark outline back-layer */}
          <path
            d="M2.5 1.5L9.5 21L13.5 13L21.5 9.5L2.5 1.5Z"
            fill="#09090b"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner sharp red triangle pointer */}
          <path
            d="M3 2.5L9.2 19.5L12.8 12.5L19.8 9.2L3 2.5Z"
            fill="url(#redTriangleGradient)"
            stroke="#ff4d4d"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="redTriangleGradient" x1="3" y1="2.5" x2="19.8" y2="19.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff2a2a" />
              <stop offset="0.6" stopColor="#ee1111" />
              <stop offset="1" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic target indicator badge when hovering interactive elements */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute left-5 top-5 px-1.5 py-0.5 rounded bg-red-600/90 text-[9px] font-mono text-white tracking-wider uppercase border border-red-400/40 shadow-lg pointer-events-none"
          >
            view
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
