import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(ref, animationConfig = {}) {
  const ctx = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    ctx.current = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 60, opacity: 0, ...animationConfig.from },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          ...animationConfig.to,
        },
      )
    }, ref)

    return () => ctx.current?.revert()
  }, [])
}
