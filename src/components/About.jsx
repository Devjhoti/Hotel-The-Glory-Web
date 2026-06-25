import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const usps = [
  {
    title: '3-Star Luxury',
    desc: 'Uncompromising hospitality standards with elegant interiors, premium amenities, and personalized guest services.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6M21 20H3M5 14h14M12 9V3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m10 6 2-3 2 3M12 18v-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Bespoke Tours',
    desc: 'Tailored travel desks and daily excursions to Hazrat Shahjalal Shrine, Srimangal tea estates, and Ratargul swamp forest.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Strategic Location',
    desc: 'Conveniently located near Hazrat Shahjalal International Airport (Osmani Airport) and railway links for seamless transport.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Executive Halls',
    desc: 'Fully-equipped modern event and business centers for corporate seminars, group conferences, and banquets.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 20h10M12 16v4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
]

function USPCard({ title, desc, icon, index }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    glowRef.current.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(2, 147, 68, 0.3) 0%, transparent 65%)`
    glowRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className="usp-card glass-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '40px 32px',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        '--translate-y': index % 2 === 1 ? '40px' : '0px',
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity 0.15s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        className="usp-icon-wrapper"
        style={{
          padding: '12px',
          background: 'rgba(212, 175, 55, 0.08)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '6px',
          color: 'var(--brand-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {icon}
      </div>
      <h3
        className="font-serif"
        style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-light)', letterSpacing: '1px', zIndex: 1 }}
      >
        {title}
      </h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)', zIndex: 1 }}>
        {desc}
      </p>
      <div
        style={{
          position: 'absolute', top: 0, right: 0, width: '10px', height: '10px',
          borderRight: '1px solid rgba(212, 175, 55, 0.3)',
          borderTop: '1px solid rgba(212, 175, 55, 0.3)',
          transition: 'opacity 0.4s ease'
        }}
      />
    </div>
  )
}

export default function About({ isLoading }) {
  const sectionRef = useRef(null)
  const imageColRef = useRef(null)
  const textColRef = useRef(null)
  const imageRef = useRef(null)
  const imageContainerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  const handleCardMouseMove = (e) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x - rect.width / 2) / (rect.width / 2)
    const py = (y - rect.height / 2) / (rect.height / 2)
    imageContainerRef.current.style.transform = `perspective(1000px) rotateX(${-py * 12}deg) rotateY(${px * 12}deg) scale3d(1.025, 1.025, 1)`
    imageContainerRef.current.style.boxShadow = '0 30px 70px rgba(0,0,0,0.75), 0 0 35px rgba(212,175,55,0.15)'
    const glare = imageContainerRef.current.querySelector('.card-glare')
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
      glare.style.opacity = '1'
    }
  }

  const handleCardMouseLeave = () => {
    if (!imageContainerRef.current) return
    imageContainerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    imageContainerRef.current.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)'
    const glare = imageContainerRef.current.querySelector('.card-glare')
    if (glare) glare.style.opacity = '0'
  }

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {

      // ── Main columns: repeatable fly-in using fromTo() ────────────────────
      // fromTo() always knows exact start & end, so tl.restart() is safe
      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        imageColRef.current,
        { x: -200, opacity: 0, rotateY: -20 },   // always starts from LEFT
        { x: 0, opacity: 1, rotateY: 0, duration: 1.4, ease: 'power3.out' }
      )
      .fromTo(
        textColRef.current,
        { x: 200, opacity: 0, rotateY: 20 },      // always starts from RIGHT
        { x: 0, opacity: 1, rotateY: 0, duration: 1.4, ease: 'power3.out' },
        '-=1.1'
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        // Scroll down into section → play from beginning every time
        onEnter: () => tl.restart(),
        // Scroll back up past trigger → instantly snap to hidden start position
        onLeaveBack: () => tl.pause(0),
      })

      // ── USP Cards: 4-Direction Fly-in + Y-axis Float ─────────────────────
      // Each card comes from a different side, eases to its grid position,
      // then gently floats up and down (Y-axis only — no tilt/rotation).
      const cards = gsap.utils.toArray('.usp-card')
      if (cards.length > 0) {
        // Starting offsets per card — 4 distinct directions
        const startFrom = [
          { x: -350, y: 0 },    // Card 0 ← from LEFT
          { x: 0, y: -280 },    // Card 1 ↑ from TOP
          { x: 0, y: 280 },     // Card 2 ↓ from BOTTOM
          { x: 350, y: 0 },     // Card 3 → from RIGHT
        ]

        // Float amplitude and speed — different per card for organic feel
        const floatParams = [
          { y: 14, dur: 2.4 },
          { y: 10, dur: 2.9 },
          { y: 16, dur: 2.1 },
          { y: 12, dur: 2.6 },
        ]

        let floatTweens = []

        const setupHidden = () => {
          cards.forEach((card, i) => {
            gsap.set(card, {
              x:         startFrom[i].x,
              y:         startFrom[i].y,
              opacity:   0,
              rotationZ: 0,
              scale:     1,
            })
          })
        }

        const revealCards = () => {
          floatTweens.forEach(t => t.kill())
          floatTweens = []
          setupHidden()

          const tl = gsap.timeline({
            onComplete: () => {
              // Pure Y-axis float only — no tilt, no rotation
              cards.forEach((card, i) => {
                const p = floatParams[i]
                const ft = gsap.to(card, {
                  y:        `+=${p.y}`,   // oscillates relative to settled position
                  duration:  p.dur,
                  ease:     'sine.inOut',
                  repeat:   -1,
                  yoyo:     true,
                  delay:    i * 0.5,      // phase offset per card
                })
                floatTweens.push(ft)
              })
            }
          })

          // Fly each card from its start position to grid position
          cards.forEach((card, i) => {
            tl.to(card, {
              x:       0,
              y:       0,
              opacity: 1,
              duration: 1.0,
              ease:    'power3.out',
            }, i * 0.14)            // 0.14s stagger between cards
          })
        }

        const resetCards = () => {
          floatTweens.forEach(t => t.kill())
          floatTweens = []
          setupHidden()
        }

        ScrollTrigger.create({
          trigger:     '.usp-grid-container',
          start:       'top 80%',
          onEnter:     revealCards,
          onLeaveBack: resetCards,
        })
      }


    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '140px 48px',
        background: 'linear-gradient(to bottom, #080a08 0%, #0d0f0d 100%)',
        position: 'relative',
        zIndex: 5,
      }}
    >
      {/* Split Narrative Block */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '80px',
          maxWidth: '1200px',
          margin: '0 auto 120px auto',
          alignItems: 'center',
          perspective: '1200px',
        }}
      >
        {/* LEFT: Image Column � flies from left */}
        <div
          ref={imageColRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            ref={imageContainerRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              aspectRatio: '3/4',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              padding: '16px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.01)',
              transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.8s ease',
            }}
          >
            {/* Specular glare */}
            <div
              className="card-glare"
              style={{
                position: 'absolute', inset: 0, opacity: 0,
                transition: 'opacity 0.4s ease', pointerEvents: 'none', zIndex: 2,
              }}
            />
            {/* Parallax image */}
            <div
              style={{
                width: '100%', height: '100%', overflow: 'hidden',
                borderRadius: '4px', position: 'relative',
                transform: 'translateZ(25px) scale(1.08)', transformStyle: 'preserve-3d',
              }}
            >
              <motion.img
                ref={imageRef}
                src="/images/room-2.jpg"
                alt="Hotel The Glory Interiors"
                style={{
                  width: '100%', height: '120%', objectFit: 'cover',
                  position: 'absolute', top: '-10%', left: 0, y: imgY,
                }}
              />
            </div>
            {/* Gold corners */}
            <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderLeft: '2px solid var(--brand-gold)', borderTop: '2px solid var(--brand-gold)', transform: 'translateZ(10px)' }} />
            <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderRight: '2px solid var(--brand-gold)', borderBottom: '2px solid var(--brand-gold)', transform: 'translateZ(10px)' }} />
          </div>
        </div>

        {/* RIGHT: Text Column � flies from right */}
        <div
          ref={textColRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '24px',
            transformStyle: 'preserve-3d',
          }}
        >
          <span className="emerald-badge">The Glory Story</span>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: '300', lineHeight: '1.25',
              letterSpacing: '2px', color: 'var(--text-light)',
            }}
          >
            Where Nature Meets{' '}
            <span className="text-gold" style={{ fontWeight: '600' }}>Unparalleled Luxury</span>
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-muted)', marginTop: '8px' }}>
            Nestled in the lush valleys of Sylhet, Bangladesh�famed for its rolling green tea gardens and rich cultural heritage�Hotel The Glory defines 3-star luxury hospitality. We welcome travelers with refined accommodations designed to rejuvenate the body and inspire the soul.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            Whether visiting to seek spiritual peace at the Hazrat Shahjalal Shrine, explore the wetlands of Ratargul, or host critical business negotiations, our services are optimized to ensure complete reliability, prestige, and class. Let us curate your ultimate Sylhet residency.
          </p>
        </div>
      </div>

      {/* USP Grid */}
      <div className="usp-grid-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3
          className="font-serif text-gold"
          style={{
            fontSize: '14px', fontWeight: '600', letterSpacing: '6px',
            textTransform: 'uppercase', textAlign: 'center', marginBottom: '60px',
          }}
        >
          Our Signature Experiences
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px 30px',
            paddingBottom: '40px',
            perspective: '1200px',       // 3D depth for the floating cards
            perspectiveOrigin: 'center center',
          }}
          className="usp-staggered-grid"
        >
          {usps.map((usp, index) => (
            <USPCard key={usp.title} title={usp.title} desc={usp.desc} icon={usp.icon} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .usp-card {
          /* GSAP owns the transform; we only style borders & shadows here */
          will-change: transform;
          transition: border-color 0.4s ease, box-shadow 0.4s ease !important;
        }
        .usp-card:hover {
          border-color: rgba(212, 175, 55, 0.45) !important;
          box-shadow: 0 16px 36px rgba(2, 147, 68, 0.08) !important;
        }
        .usp-card:hover .usp-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
    </section>
  )
}
