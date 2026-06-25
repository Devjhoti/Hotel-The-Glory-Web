import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, useScroll, useTransform } from 'framer-motion'
import BookingWidget from './BookingWidget'

export default function Hero({ isLoading }) {
  const textRef = useRef(null)
  const videoContainerRef = useRef(null)
  const videoRef = useRef(null)
  const { scrollY } = useScroll()

  // Parallax transform for video background container
  const videoY = useTransform(scrollY, [0, 800], [0, 150])

  useEffect(() => {
    // Only animate if loading is finished
    if (isLoading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // 1. Reveal video background (lens focus effect)
      tl.to(videoRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.2,
        ease: 'power3.inOut',
      })
        // 2. Reveal text components with staggered delay
        .to('.hero-welcome', {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
        }, '-=1.2')
        .to('.hero-title-char', {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 1.2,
          ease: 'power4.out',
        }, '-=0.9')
        .to('.hero-subtitle', {
          y: 0,
          opacity: 0.9,
          duration: 1.0,
          ease: 'power3.out',
        }, '-=1.0')
        .to('.hero-cta', {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.8')
        .to('.scroll-indicator', {
          y: 0,
          opacity: 0.7,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6')

    }, textRef)

    return () => ctx.revert()
  }, [isLoading])

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="hero-title-char"
        style={{
          display: 'inline-block',
          opacity: 0,
          transform: char === ' ' ? 'none' : 'translateY(80px)',
          whiteSpace: char === ' ' ? 'pre' : 'normal',
          willChange: 'transform, opacity'
        }}
      >
        {char}
      </span>
    ))
  }

  return (
    <section
      id="home"
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080a08',
      }}
    >
      {/* 1. Parallax Video Background Container */}
      <motion.div
        ref={videoContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          y: videoY,
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dtctcaxxr/video/upload/v1782336795/Hotel_The_Glory_promotional_video_202606250332_q98zes.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0, // Animates to 1
            scale: 1.18, // Animates to 1 (lens reveal)
            filter: 'blur(10px)', // Animates to 0px (lens focus)
            transition: 'none',
          }}
        />
      </motion.div>

      {/* 2. Dark Green-Black Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(8, 10, 8, 0.45) 0%, rgba(8, 10, 8, 0.75) 60%, rgba(8, 10, 8, 1) 100%)',
          zIndex: 1,
        }}
      />

      {/* 3. Text Content (Centered) */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '1000px',
          margin: '0 auto',
          transform: 'translateY(-40px)', // Shift up slightly to balance booking widget
        }}
      >
        <span
          className="hero-welcome font-serif text-gold"
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            marginBottom: '18px',
            opacity: 0, // Animates to 1
            transform: 'translateY(30px)',
          }}
        >
          Welcome To
        </span>

        <h1
          className="hero-main-title font-serif"
          style={{
            fontSize: 'clamp(44px, 7.5vw, 100px)',
            fontWeight: '800',
            letterSpacing: 'clamp(6px, 1.2vw, 12px)',
            lineHeight: '1.15',
            color: 'var(--text-light)',
            textTransform: 'uppercase',
            overflow: 'hidden',
            display: 'inline-flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {splitText("HOTEL THE GLORY")}
        </h1>

        <p
          className="hero-subtitle text-champagne"
          style={{
            marginTop: '28px',
            fontSize: 'clamp(14px, 2vw, 18px)',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            fontWeight: '400',
            opacity: 0, // Animates to 0.9
            transform: 'translateY(30px)',
          }}
        >
          Experience Luxury Redefined in Sylhet
        </p>

        {/* Small Explore CTA */}
        <div className="hero-cta" style={{ marginTop: '40px', opacity: 0, scale: 0.9 }}>
          <a href="#rooms" className="gold-btn" style={{ fontSize: '12px', padding: '14px 36px' }}>
            Explore Our Rooms
          </a>
        </div>
      </div>

      {/* 4. Booking Widget */}
      <div style={{
        position: 'absolute',
        bottom: '75px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10,
      }}>
        <BookingWidget isHeroLoading={isLoading} />
      </div>

      {/* 5. Scroll Down Indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%) translateY(-15px)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0, // Animates to 0.7
        }}
      >
        <div
          style={{
            width: '20px',
            height: '32px',
            borderRadius: '10px',
            border: '1.5px solid rgba(212, 175, 55, 0.35)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '4px',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '2px',
              height: '6px',
              borderRadius: '1px',
              backgroundColor: 'var(--brand-gold)',
            }}
          />
        </div>
        <span
          style={{
            fontSize: '8px',
            fontWeight: '500',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--brand-gold)',
            opacity: 0.7,
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
