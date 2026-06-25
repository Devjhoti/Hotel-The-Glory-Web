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
    <div ref={containerRef}>
      <Hero isLoading={isLoading} />
      <About isLoading={isLoading} />
      <VirtualTour />
      <Rooms />
      <Facilities />
      <TourPackages />
      <Gallery />
      <Reviews />
      <Contact />
    </div>
  )
}
