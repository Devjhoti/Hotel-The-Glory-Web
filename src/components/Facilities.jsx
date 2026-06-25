import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FACILITIES_DATA = [
  {
    id: '01',
    title: 'Fine Dining Restaurant',
    desc: 'Savor a masterfully crafted menu featuring authentic Sylheti delicacies and exquisite international cuisines.',
    img: '/creative/creative-4.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M4 6h6M8 22v-7M16 2v13a3 3 0 0 0 6 0V2M19 15v7" />
      </svg>
    )
  },
  {
    id: '02',
    title: 'Swimming Pool',
    desc: 'Rejuvenate in our crystal-clear temperature-controlled pool, surrounded by lush botanical aesthetics.',
    img: '/creative/creative-5.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 22V10c0-3.3-2.7-6-6-6S6 6.7 6 10v12M18 10h-4M6 10h4M18 14h-4M6 14h4M18 18h-4M6 18h4" />
      </svg>
    )
  },
  {
    id: '03',
    title: 'Luxury Gym',
    desc: 'Maintain your peak fitness with state-of-the-art cardiovascular machines and professional strength training gear.',
    img: '/images/gym.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6.5 6.5 11 11M3 8.5v7h3.5v-7zm14 0v7h3.5v-7z" />
        <path d="M6.5 5v14M17.5 5v14" />
      </svg>
    )
  },
  {
    id: '04',
    title: 'Wellness Spa & Salon',
    desc: 'Indulge in healing therapeutic massages and organic body treatments designed to restore complete harmony.',
    img: '/creative/creative-6.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5-4 7-9 7-12 0-3.9-3.1-7-7-7s-7 3.1-7 7c0 3 2 8 7 12Z" />
        <path d="M12 10c-2-2-4-2-6 0 2 2 4 2 6 0ZM12 10c2-2 4-2 6 0-2 2-4 2-6 0ZM12 2v20" />
      </svg>
    )
  },
  {
    id: '05',
    title: 'Conference & Event Hall',
    desc: 'Host prestigious corporate seminars, banquets, and group conferences in our fully-equipped grand event halls.',
    img: '/images/conference.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M7 20h10M12 16v4M9 8h6M9 12h3" />
      </svg>
    )
  },
  {
    id: '06',
    title: 'Travel & Tour Desk',
    desc: 'Embark on curated excursions to Hazrat Shahjalal Shrine, local tea gardens, and the wetlands of Ratargul.',
    img: '/creative/creative-7.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m16.2 7.8-2 5.6-5.6 2 2-5.6 5.6-2Z" />
      </svg>
    )
  }
]

function FacilityCard({ id, title, desc, img, icon }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(2, 147, 68, 0.25) 0%, transparent 65%)`
    glowRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className="facility-card glass-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        height: '420px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        border: '1px solid rgba(212, 175, 55, 0.15)',
        background: 'rgba(13, 18, 14, 0.45)',
        willChange: 'transform, opacity',
      }}
    >
      {/* Dynamic Hover Glow Overlay */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Image Container with Zoom & Sweep */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0
        }}
        className="facility-img-container"
      >
        {/* Entrance reveal gold curtain curtain */}
        <div
          className="facility-reveal-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--brand-gold) 0%, #a48227 100%)',
            zIndex: 3,
            transformOrigin: 'left',
            transform: 'scaleX(1)'
          }}
        />

        <img
          src={img}
          alt={title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
            filter: 'brightness(0.55) contrast(1.05) saturate(0.95)',
          }}
          className="facility-img"
        />

        {/* Ambient Dark Green Gradient Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #080a08 0%, rgba(8, 10, 8, 0.6) 50%, rgba(8, 10, 8, 0.25) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Header Accent (Icon + ID) */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2
        }}
      >
        <div
          className="facility-icon"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '6px',
            background: 'rgba(8, 10, 8, 0.65)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: 'var(--brand-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease',
          }}
        >
          {icon}
        </div>
        <div
          className="font-serif"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '2px',
            color: 'rgba(212, 175, 55, 0.75)',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          {id}
        </div>
      </div>

      {/* Content Area */}
      <div
        style={{
          padding: '30px 24px',
          position: 'relative',
          zIndex: 2,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="facility-content"
      >
        <h4
          className="font-serif"
          style={{
            fontSize: '22px',
            fontWeight: '300',
            color: 'var(--text-light)',
            marginBottom: '10px',
            letterSpacing: '0.5px',
            transition: 'color 0.3s ease'
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: '13.5px',
            lineHeight: '1.6',
            color: 'var(--text-muted)',
            opacity: 0.85,
            transition: 'opacity 0.3s ease, color 0.3s ease'
          }}
        >
          {desc}
        </p>

        {/* Fine gold horizontal border that widens on hover */}
        <div
          className="facility-line"
          style={{
            width: '35px',
            height: '1px',
            background: 'var(--brand-gold)',
            marginTop: '20px',
            transition: 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />
      </div>

      {/* Gold corner ornaments */}
      <div style={{ position: 'absolute', top: 8, left: 8, width: 10, height: 10, borderLeft: '1px solid rgba(212, 175, 55, 0.3)', borderTop: '1px solid rgba(212, 175, 55, 0.3)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 10, height: 10, borderRight: '1px solid rgba(212, 175, 55, 0.3)', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', pointerEvents: 'none', zIndex: 2 }} />
    </div>
  )
}

export default function Facilities() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.facilities-grid-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          id: 'facilities-reveal'
        }
      })

      // 1. Title reveal
      tl.fromTo('.facilities-title-sub',
        { opacity: 0, y: 15, letterSpacing: '4px' },
        { opacity: 1, y: 0, letterSpacing: '6px', duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.facilities-title-main',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )

      // 2. Card entrance slide + 3D rotation
      .fromTo('.facility-card',
        {
          opacity: 0,
          y: 60,
          rotateX: 12,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out'
        },
        '-=0.7'
      )

      // 3. Sweeping reveal curtain for image masking
      .fromTo('.facility-reveal-overlay',
        { scaleX: 1 },
        { scaleX: 0, duration: 0.8, stagger: 0.12, ease: 'power3.inOut' },
        '-=0.95'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="facilities"
      ref={sectionRef}
      style={{
        padding: '120px 48px',
        background: 'linear-gradient(to bottom, #080a08 0%, #050705 100%)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(212, 175, 55, 0.08)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.08)',
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(2, 147, 68, 0.05) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="facilities-grid-container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <span
            className="facilities-title-sub text-gold"
            style={{
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '14px',
              willChange: 'transform, opacity, letter-spacing'
            }}
          >
            Discover the Glory Experience
          </span>
          <h2
            className="facilities-title-main font-serif"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: '300',
              lineHeight: '1.2',
              letterSpacing: '1.5px',
              color: 'var(--text-light)',
              willChange: 'transform, opacity'
            }}
          >
            World-Class <span className="text-gold" style={{ fontWeight: '600' }}>Facilities</span>
          </h2>
        </div>

        {/* 3x2 Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            perspective: '1200px',
          }}
        >
          {FACILITIES_DATA.map((facility) => (
            <FacilityCard
              key={facility.id}
              id={facility.id}
              title={facility.title}
              desc={facility.desc}
              img={facility.img}
              icon={facility.icon}
            />
          ))}
        </div>
      </div>

      <style>{`
        .facility-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease !important;
        }
        
        .facility-card:hover {
          border-color: rgba(212, 175, 55, 0.45) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 20px rgba(2, 147, 68, 0.15) !important;
        }

        .facility-card:hover .facility-img {
          transform: scale(1.06);
        }

        .facility-card:hover .facility-icon {
          transform: scale(1.08) rotate(6deg);
          border-color: rgba(212, 175, 55, 0.7) !important;
          background: rgba(8, 10, 8, 0.8) !important;
        }

        .facility-card:hover .facility-content {
          transform: translateY(-5px);
        }

        .facility-card:hover h4 {
          color: var(--brand-gold) !important;
        }

        .facility-card:hover .facility-line {
          width: 75px;
        }
        
        @media (max-width: 768px) {
          #facilities {
            padding: 90px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
