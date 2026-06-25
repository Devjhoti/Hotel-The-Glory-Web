import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 11 images — room shots + creative graphics
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

// Individual card: image + mirror reflection below
function GalleryCard({ img, index }) {
  return (
    <div
      style={{
        position: 'relative',
        flexShrink: 0,
        // ~30vw so 3 cards fill the viewport
        width: 'clamp(280px, 30vw, 500px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* ── Main Image ── */}
      <div
        style={{
          width: '100%',
          height: 'clamp(340px, 55vh, 620px)',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(212,175,55,0.20)',
          boxShadow: '0 28px 70px rgba(0,0,0,0.7)',
          flexShrink: 0,
        }}
      >
        <img
          src={img.src}
          alt={img.label}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.7s cubic-bezier(0.25,1,0.5,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
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
        <div style={{
          position: 'absolute', bottom: 22, left: 22,
          fontFamily: 'var(--font-serif)',
          fontSize: '17px', fontWeight: 400, letterSpacing: '1px',
          color: 'rgba(255,255,255,0.94)',
        }}>
          {img.label}
        </div>

        {/* Index badge */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          fontFamily: 'var(--font-sans)',
          fontSize: '11px', letterSpacing: '2px',
          color: 'var(--brand-gold)', opacity: 0.85,
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* ── Reflection ── */}
      {/* Flipped image, heavily faded mask = soft floor mirror */}
      <div
        aria-hidden="true"
        style={{
          width: '100%',
          height: 'clamp(50px, 10vh, 120px)',
          overflow: 'hidden',
          flexShrink: 0,
          transform: 'scaleY(-1)',
          borderRadius: '0 0 4px 4px',
          // Wider, multi-stop gradient = softer, more gradual fade
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 15%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.40) 80%, rgba(0,0,0,0.65) 100%)',
          maskImage:       'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 15%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.40) 80%, rgba(0,0,0,0.65) 100%)',
          opacity: 0.35,      // adjusted slightly higher for blurred contrast
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
      <div style={{
        width: '75%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)',
        marginTop: '-4px',
        flexShrink: 0,
      }}/>
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
      // How far to scroll horizontally
      const getScrollDist = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // end is proportional to total content — more images = more scroll
          end: () => '+=' + (getScrollDist() * 1.15),
          pin: true,
          scrub: 1.0,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
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
      {/* ── Section heading (fixed while scrolling horizontally) ── */}
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
          }}
        >
          Visual Journey
        </span>
        <h2
          className="font-serif"
          style={{
            marginTop: 18,
            fontSize: 'clamp(34px, 4.5vw, 60px)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '3px',
            color: 'var(--text-light)',
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
    </section>
  )
}
