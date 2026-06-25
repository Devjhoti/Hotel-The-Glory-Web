import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [cursorText, setCursorText] = useState('')
  const [isHoveringText, setIsHoveringText] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window)
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)

    if (isMobile) return () => window.removeEventListener('resize', checkDevice)

    // Hide default cursor globally
    document.body.style.cursor = 'none'

    // GSAP quickTo for smooth spring translations
    const xToDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power3.out' })
    const yToDot = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power3.out' })
    
    const xToRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.45, ease: 'power2.out' })
    const yToRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.45, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      xToDot(e.clientX)
      yToDot(e.clientY)
      xToRing(e.clientX)
      yToRing(e.clientY)

      // Detect hover target elements
      const target = e.target
      if (!target) return

      const isVirtualTour = target.closest('#virtual-tour .video-frame-container')
      const isGallery = target.closest('#gallery .gallery-item')
      const isClickable = target.closest('a, button, .gold-btn, input, select, textarea, [role="button"]')

      if (isVirtualTour) {
        setCursorText('PLAY')
        setIsHoveringText(true)
        gsap.to(ringRef.current, {
          width: 70,
          height: 70,
          backgroundColor: 'rgba(212, 175, 55, 0.15)',
          borderColor: 'var(--brand-gold)',
          duration: 0.3
        })
        gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2 })
      } else if (isGallery) {
        setCursorText('VIEW')
        setIsHoveringText(true)
        gsap.to(ringRef.current, {
          width: 70,
          height: 70,
          backgroundColor: 'rgba(2, 147, 68, 0.15)',
          borderColor: 'var(--brand-emerald)',
          duration: 0.3
        })
        gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2 })
      } else if (isClickable) {
        setCursorText('')
        setIsHoveringText(false)
        gsap.to(ringRef.current, {
          width: 45,
          height: 45,
          backgroundColor: 'rgba(212, 175, 55, 0.08)',
          borderColor: 'var(--brand-gold)',
          duration: 0.3
        })
        gsap.to(dotRef.current, { scale: 1.5, opacity: 1, backgroundColor: 'var(--brand-gold)', duration: 0.2 })
      } else {
        setCursorText('')
        setIsHoveringText(false)
        gsap.to(ringRef.current, {
          width: 28,
          height: 28,
          backgroundColor: 'transparent',
          borderColor: 'rgba(212, 175, 55, 0.45)',
          duration: 0.3
        })
        gsap.to(dotRef.current, { scale: 1, opacity: 1, backgroundColor: 'var(--brand-gold)', duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkDevice)
      document.body.style.cursor = 'auto'
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--brand-gold)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      />

      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          border: '1px solid rgba(212, 175, 55, 0.45)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
          willChange: 'transform'
        }}
      >
        <span
          style={{
            fontSize: '9px',
            fontWeight: '700',
            letterSpacing: '1.2px',
            color: cursorText === 'VIEW' ? 'var(--text-light)' : 'var(--brand-gold)',
            opacity: isHoveringText ? 1 : 0,
            transform: isHoveringText ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            fontFamily: 'var(--font-sans)',
            pointerEvents: 'none'
          }}
        >
          {cursorText}
        </span>
      </div>
    </>
  )
}
