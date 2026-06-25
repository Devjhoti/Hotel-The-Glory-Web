import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_IMAGES = [
  { src: '/images/room-hero.jpg',    label: 'The Grand Lobby'          },
  { src: '/images/room-2.jpg',       label: 'Executive Suite'          },
  { src: '/images/room-3.jpg',       label: 'Deluxe Twin Room'         },
  { src: '/images/room-4.jpg',       label: 'Glory Royal Suite'        },
  { src: '/images/room-5.jpg',       label: 'Presidential Suite'       },
  { src: '/images/room-6.jpg',       label: 'Luxury Family Suite'      },
  { src: '/creative/creative-4.jpg', label: 'Fine Dining Experience'   },
  { src: '/creative/creative-5.jpg', label: 'Poolside Retreat'         },
  { src: '/creative/creative-6.jpg', label: 'Spa & Wellness'           },
  { src: '/creative/creative-7.jpg', label: 'Sylhet Tour — Jaflong'    },
  { src: '/creative/creative-8.jpg', label: 'Tea Garden Excursion'     },
]

function GalleryCard({ img, index }) {
  return (
    <div
      className="gallery-card-wrapper"
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 'clamp(280px, 30vw, 500px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* ── Main Image Frame ── */}
      <div
        className="gallery-image-frame"
        style={{
          width: '100%',
          height: 'clamp(340px, 55vh, 620px)',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(212,175,55,0.20)',
          boxShadow: '0 28px 70px rgba(0,0,0,0.7)',
          flexShrink: 0,
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', // Initially hidden flat line
          willChange: 'clip-path'
        }}
      >
        <img
          src={img.src}
          alt={img.label}
          loading="lazy"
          className="gallery-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: 'scale(1.25)',
            willChange: 'transform'
          }}
        />

        {/* Gold corner accents */}
        <div style={{ position:'absolute', top:10, left:10, width:18, height:18,
          borderLeft:'2px solid rgba(212,175,55,0.65)', borderTop:'2px solid rgba(212,175,55,0.65)' }}/>
        <div style={{ position:'absolute', bottom:10, right:10, width:18, height:18,
          borderRight:'2px solid rgba(212,175,55,0.65)', borderBottom:'2px solid rgba(212,175,55,0.65)' }}/>

        {/* Bottom gradient for label readability */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(6,8,6,0.88) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}/>

        {/* Label */}
        <div
          className="gallery-label"
          style={{
            position: 'absolute', bottom: 22, left: 22,
            fontFamily: 'var(--font-serif)',
            fontSize: '17px', fontWeight: 400, letterSpacing: '1px',
            color: 'rgba(255,255,255,0.94)',
            opacity: 0,
            transform: 'translateY(15px)',
            willChange: 'transform, opacity'
          }}
        >
          {img.label}
        </div>

        {/* Index badge */}
        <div
          className="gallery-index-badge"
          style={{
            position: 'absolute', top: 16, right: 16,
            fontFamily: 'var(--font-sans)',
            fontSize: '11px', letterSpacing: '2px',
            color: 'var(--brand-gold)',
            opacity: 0,
            transform: 'translateY(15px)',
            willChange: 'transform, opacity'
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* ── Reflection ── */}
      <div
        aria-hidden="true"
        className="gallery-reflection"
        style={{
          width: '100%',
          height: 'clamp(50px, 10vh, 120px)',
          overflow: 'hidden',
          flexShrink: 0,
          transform: 'scaleY(-1)',
          borderRadius: '0 0 4px 4px',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 15%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.40) 80%, rgba(0,0,0,0.65) 100%)',
          maskImage:       'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 15%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.40) 80%, rgba(0,0,0,0.65) 100%)',
          opacity: 0, // initially hidden, fades in in sync
          willChange: 'opacity'
        }}
      >
        <img
          src={img.src}
          alt=""
          loading="lazy"
          style={{
            width: '100%',
            height: 'clamp(340px, 55vh, 620px)',
            objectFit: 'cover',
            objectPosition: 'bottom',
            display: 'block',
            filter: 'blur(2px) brightness(0.95)',
          }}
        />
      </div>

      {/* Thin gold divider line between image and reflection */}
      <div
        className="gallery-line"
        style={{
          width: '0%', // starts at 0% and expands
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)',
          marginTop: '-4px',
          flexShrink: 0,
          willChange: 'width'
        }}
      />
    </div>
  )
}

export default function Gallery() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollDist = () => track.scrollWidth - window.innerWidth

      // Main Pinning Timeline
      const horizTween = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + (getScrollDist() * 1.15),
          pin: true,
          scrub: 1.0,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      })

      // Staggered Title reveal
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      titleTl.fromTo('.gallery-title-sub',
        { opacity: 0, y: 15, letterSpacing: '2px' },
        { opacity: 1, y: 0, letterSpacing: '4px', duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.gallery-title-main',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )

      // Individual Card Reveals (triggered as they scroll horizontally into viewport)
      const cards = gsap.utils.toArray('.gallery-card-wrapper')
      cards.forEach((card) => {
        const frame = card.querySelector('.gallery-image-frame')
        const img = card.querySelector('.gallery-img')
        const label = card.querySelector('.gallery-label')
        const indexBadge = card.querySelector('.gallery-index-badge')
        const reflection = card.querySelector('.gallery-reflection')
        const line = card.querySelector('.gallery-line')

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizTween,
            start: 'left 90%',
            toggleActions: 'play none none reverse'
          }
        })

        // Diagonal reveal sweep
        cardTl.fromTo(frame,
          { clipPath: 'polygon(0% 100%, 100% 88%, 100% 100%, 0% 100%)' }, // subtle diagonal start wedge
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.6,
            ease: 'power3.inOut'
          }
        )
        // Image zoom out parallax
        .fromTo(img,
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'power2.out'
          },
          '0'
        )
        // Reflection fade in
        .to(reflection, {
          opacity: 0.35,
          duration: 1.4,
          ease: 'power2.out'
        }, '0.2')
        // Gold highlight line widening
        .to(line, {
          width: '75%',
          duration: 1.4,
          ease: 'power2.out'
        }, '0.2')
        // Heading details fade-up
        .fromTo([label, indexBadge],
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
          },
          '-=1.0'
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        background: '#080a08',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 4,
      }}
    >
      {/* ── Section heading ── */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 52,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <span
          className="gallery-title-sub"
          style={{
            display: 'inline-block',
            padding: '5px 16px',
            border: '1px solid rgba(212,175,55,0.4)',
            borderRadius: '40px',
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--brand-gold)',
            fontFamily: 'var(--font-sans)',
            willChange: 'transform, opacity, letter-spacing'
          }}
        >
          Visual Journey
        </span>
        <h2
          className="gallery-title-main font-serif"
          style={{
            marginTop: 18,
            fontSize: 'clamp(34px, 4.5vw, 60px)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '3px',
            color: 'var(--text-light)',
            willChange: 'transform, opacity'
          }}
        >
          Our <span className="text-gold" style={{ fontWeight: 600 }}>Gallery</span>
        </h2>
      </div>

      {/* ── Horizontal scroll track ── */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          height: '100vh',
          width: 'max-content',
          paddingLeft: '52px',
          paddingRight: '80px',
          willChange: 'transform',
        }}
      >
        {/* Leading spacer so heading doesn't overlap first card */}
        <div style={{ minWidth: '440px', flexShrink: 0 }} />

        {GALLERY_IMAGES.map((img, i) => (
          <GalleryCard key={i} img={img} index={i} />
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 34,
          right: 52,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: 'rgba(255,255,255,0.30)',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-sans)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        Scroll to explore
        <svg width="44" height="12" viewBox="0 0 44 12" fill="none">
          <line x1="0" y1="6" x2="36" y2="6" stroke="currentColor" strokeWidth="1"/>
          <path d="M33 2l7 4-7 4" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      <style>{`
        .gallery-img {
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) !important;
        }
        .gallery-card-wrapper:hover .gallery-img {
          transform: scale(1.08) !important;
        }
      `}</style>
    </section>
  )
}
