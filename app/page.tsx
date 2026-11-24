"use client"

import SmoothScroll from "./components/SmoothScroll"
import Navigation from "./components/Navigation"
import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Achievements from "./components/Achievements"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import CustomCursor from "./components/CustomCursor"
import ScrollProgress from "./components/ScrollProgress"

export default function Portfolio() {
  return (
    <SmoothScroll>
      <main className="bg-[#06080d] text-slate-100 min-h-screen relative selection:bg-blue-500/20 selection:text-white">
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
