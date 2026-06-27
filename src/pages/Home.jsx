import { useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Rooms from '../components/Rooms'
import Facilities from '../components/Facilities'
import TourPackages from '../components/TourPackages'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import VirtualTour from '../components/VirtualTour'
import Contact from '../components/Contact'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home({ isLoading }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (isLoading) return

    // Refresh ScrollTrigger to calculate offsets correctly after preloader exits
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    const ctx = gsap.context(() => {
      // Pin Hero and let About overlap it
      ScrollTrigger.create({
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        id: 'hero-pin'
      })

      // Scale down and dim Hero as we scroll down
      gsap.fromTo('#home', 
        { scale: 1, opacity: 1 },
        {
          scale: 0.95,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // Automatic Snapping to About Section (Snaps when 20% entered, i.e., top is at 80% viewport height)
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 80%',
        onEnter: () => {
          if (window.lenis) {
            window.lenis.scrollTo('#about', {
              duration: 3.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
          }
        }
      })

      // Automatic Snapping back to Hero (Snaps when scrolling back up)
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 95%',
        onLeaveBack: () => {
          if (window.lenis) {
            window.lenis.scrollTo('#home', {
              duration: 3.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
          }
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isLoading])

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden', background: '#080a08' }}>
      {/* ── Drifting Ambient Glow Backlights ── */}
      <div className="ambient-glows-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <div className="ambient-glow glow-1" />
        <div className="ambient-glow glow-2" />
        <div className="ambient-glow glow-3" />
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Hero isLoading={isLoading} />
        <About isLoading={isLoading} />
        <VirtualTour isLoading={isLoading} />
        <Rooms isLoading={isLoading} />
        <Facilities isLoading={isLoading} />
        <TourPackages isLoading={isLoading} />
        <Gallery isLoading={isLoading} />
        <Reviews isLoading={isLoading} />
        <Contact isLoading={isLoading} />
      </div>

      <style>{`
        .ambient-glows-container {
          opacity: 0.85;
        }
        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(150px);
          will-change: transform, opacity;
        }
        .glow-1 {
          width: 55vw;
          height: 55vw;
          background: radial-gradient(circle, rgba(2, 147, 68, 0.05) 0%, transparent 70%);
          top: 10%;
          left: -10%;
          animation: glow-float-1 30s infinite alternate ease-in-out;
        }
        .glow-2 {
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%);
          top: 40%;
          right: -15%;
          animation: glow-float-2 40s infinite alternate ease-in-out;
        }
        .glow-3 {
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(2, 147, 68, 0.04) 0%, transparent 70%);
          bottom: 15%;
          left: 10%;
          animation: glow-float-3 35s infinite alternate ease-in-out;
        }

        @keyframes glow-float-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(80px, 120px) scale(1.1); opacity: 1; }
          100% { transform: translate(-50px, 200px) scale(0.95); opacity: 0.7; }
        }
        @keyframes glow-float-2 {
          0% { transform: translate(0, 0) scale(1.1); opacity: 0.7; }
          50% { transform: translate(-120px, 90px) scale(0.9); opacity: 0.95; }
          100% { transform: translate(60px, -150px) scale(1.05); opacity: 0.6; }
        }
        @keyframes glow-float-3 {
          0% { transform: translate(0, 0) scale(0.95); opacity: 0.9; }
          50% { transform: translate(150px, -100px) scale(1.08); opacity: 0.7; }
          100% { transform: translate(-70px, 80px) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
