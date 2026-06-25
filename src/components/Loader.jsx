import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef(null)
  const frameRef = useRef(null)
  const logoRef = useRef(null)
  const glowRef = useRef(null)
  const counterRef = useRef(null)
  const topPanelRef = useRef(null)
  const bottomPanelRef = useRef(null)

  useEffect(() => {
    // 1. Progress Counter ticking animation
    const counterObj = { value: 0 }
    const progressTween = gsap.to(counterObj, {
      value: 100,
      duration: 2.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        setProgress(Math.floor(counterObj.value))
      },
    })

    // 2. Cinematic GSAP Timeline for Loader entry and exit
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete()
        },
      })

      // Set initial states
      gsap.set(frameRef.current, { scaleX: 0, height: '2px', opacity: 1 })
      gsap.set(logoRef.current, { opacity: 0, scale: 0.9 })
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 })

      // Animate frame expanding horizontally
      tl.to(frameRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.2,
      })
      // Expand height to reveal the logo frame
      .to(frameRef.current, {
        height: '110px',
        padding: '16px 32px',
        borderColor: 'rgba(212, 175, 55, 0.4)',
        duration: 0.6,
        ease: 'power3.inOut',
      })
      // Fade in logo and gold aura backlight
      .to([logoRef.current, glowRef.current], {
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.2')
      // Pulse animation for gold backlight aura
      .to(glowRef.current, {
        scale: 1.15,
        opacity: 0.8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      }, '-=0.2')

      // Exit transition (runs when progress hits 100%)
      // We will queue this after the progress completes
      progressTween.then(() => {
        // Stop pulsing and trigger exit
        const exitTl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })

        exitTl.to(counterRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        })
        .to(frameRef.current, {
          scale: 1.05,
          borderColor: 'rgba(212, 175, 55, 0.8)',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        })
        .to([frameRef.current, logoRef.current, glowRef.current], {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: 'power3.in',
        })
        // Split panels slide out of the screen
        .to(topPanelRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: 'power4.inOut',
        }, '-=0.2')
        .to(bottomPanelRef.current, {
          yPercent: 100,
          duration: 1.0,
          ease: 'power4.inOut',
        }, '<')
        .set(containerRef.current, { display: 'none' })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top Panel */}
      <div
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: '#080a08',
          borderBottom: '1px solid rgba(212, 175, 55, 0.05)',
        }}
      />

      {/* Bottom Panel */}
      <div
        ref={bottomPanelRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: '#080a08',
          borderTop: '1px solid rgba(212, 175, 55, 0.05)',
        }}
      />

      {/* Loader Content Wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Pulsing Golden Aura Backlight */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            width: '320px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(2, 147, 68, 0.03) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        {/* Expanding Gold Frame */}
        <div
          ref={frameRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            borderRadius: '4px',
            background: 'rgba(8, 10, 8, 0.85)',
            backdropFilter: 'blur(10px)',
            width: '300px',
            maxWidth: '90vw',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Logo */}
          <img
            ref={logoRef}
            src="/logo/logo.png"
            alt="Hotel The Glory"
            style={{
              maxHeight: '65px',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Luxury Progress Counter */}
      <div
        ref={counterRef}
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '48px',
          zIndex: 10,
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: '300',
          letterSpacing: '6px',
          color: 'var(--brand-gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '10px', opacity: 0.5 }}>L O A D I N G</span>
        <span style={{ fontWeight: '500', width: '45px', textAlign: 'right' }}>
          {progress.toString().padStart(3, '0')}%
        </span>
      </div>
    </div>
  )
}
