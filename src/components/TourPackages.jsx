import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOURS_DATA = [
  {
    id: '01',
    title: 'Jaflong Valley Adventure',
    duration: 'Full Day (8 Hours)',
    price: 'BDT 3,500',
    img: '/images/tour-jaflong.png',
    desc: 'Explore the scenic river beds of Lalakhal, ancient stone extraction areas, and panoramic views of Meghalaya\'s Indian border mountains.',
    inclusions: ['Luxury SUV Transport', 'Local Tour Guide', 'Traditional Lunch', 'Entry Tickets', 'Refreshments']
  },
  {
    id: '02',
    title: 'Ratargul Swamp Forest Safari',
    duration: 'Half Day (6 Hours)',
    price: 'BDT 4,000',
    img: '/images/tour-ratargul.png',
    desc: 'Glide through the freshwater flooded forest of Ratargul in a traditional boat. A sanctuary of flora, fauna, and mirror-water reflections.',
    inclusions: ['Private Boat Ride', 'AC Transport', 'Expert Naturalist Guide', 'Sylheti Special Lunch', 'Life Jackets']
  },
  {
    id: '03',
    title: 'Srimangal Tea Estate Excursion',
    duration: 'Full Day (10 Hours)',
    price: 'BDT 5,500',
    img: '/images/tour-srimangal.png',
    desc: 'Wander through the sprawling green tea gardens of Srimangal, visit indigenous villages, and taste the famous 7-layer tea.',
    inclusions: ['Premium AC Sedan', 'Tea Expert Guide', 'Lunch & Tea Tasting', 'Village Entry Fees', 'Hotel Pick/Drop']
  }
]

function TourCard({ title, duration, price, img, desc, inclusions, id }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.15) 0%, transparent 65%)`
    glowRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className="tour-card glass-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        height: '520px',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        border: '1px solid rgba(212, 175, 55, 0.15)',
        background: 'rgba(13, 18, 14, 0.45)',
        willChange: 'transform, opacity',
      }}
    >
      {/* Interactive Radial Glow */}
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
        className="tour-img-container"
      >
        {/* Sweep curtain overlay */}
        <div
          className="tour-reveal-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--brand-emerald) 0%, #015226 100%)',
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
            filter: 'brightness(0.6) contrast(1.05)',
          }}
          className="tour-img"
        />

        {/* Ambient Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #080a08 0%, rgba(8, 10, 8, 0.5) 60%, rgba(8, 10, 8, 0.15) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Duration Badge & Number */}
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
        <span
          className="emerald-badge"
          style={{
            fontSize: '10px',
            padding: '4px 10px',
            background: 'rgba(2, 147, 68, 0.2)',
            border: '1px solid rgba(2, 147, 68, 0.4)',
            color: 'var(--brand-emerald)',
            backdropFilter: 'blur(4px)',
            letterSpacing: '1px'
          }}
        >
          {duration}
        </span>
        <div
          className="font-serif"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'rgba(212, 175, 55, 0.65)',
            letterSpacing: '1px'
          }}
        >
          {id}
        </div>
      </div>

      {/* Card Content Area */}
      <div
        style={{
          padding: '30px 24px',
          position: 'relative',
          zIndex: 2,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
        className="tour-content"
      >
        {/* Title */}
        <h4
          className="font-serif"
          style={{
            fontSize: '24px',
            fontWeight: '300',
            color: 'var(--text-light)',
            letterSpacing: '0.5px',
            lineHeight: '1.2'
          }}
        >
          {title}
        </h4>

        {/* Short description */}
        <p
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: 'var(--text-muted)',
            opacity: 0.85,
            marginBottom: '4px'
          }}
        >
          {desc}
        </p>

        {/* Inclusions tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            margin: '6px 0 12px 0'
          }}
        >
          {inclusions.map((inclusion) => (
            <span
              key={inclusion}
              style={{
                fontSize: '10px',
                padding: '3px 8px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(212, 175, 55, 0.12)',
                color: 'var(--brand-champagne)',
                letterSpacing: '0.5px'
              }}
            >
              {inclusion}
            </span>
          ))}
        </div>

        {/* Footer Details (Price + Button) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(212, 175, 55, 0.15)',
            paddingTop: '16px',
            marginTop: '4px'
          }}
        >
          <div>
            <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Starting Rate
            </span>
            <span className="text-gold font-serif" style={{ fontSize: '20px', fontWeight: '600' }}>
              {price}
            </span>
          </div>

          <a
            href="#contact"
            className="gold-btn"
            style={{
              padding: '10px 18px',
              fontSize: '11px',
              letterSpacing: '1.5px',
            }}
          >
            Enquire Now
          </a>
        </div>
      </div>

      {/* Gold corner ornaments */}
      <div style={{ position: 'absolute', top: 8, left: 8, width: 10, height: 10, borderLeft: '1px solid rgba(212, 175, 55, 0.3)', borderTop: '1px solid rgba(212, 175, 55, 0.3)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 10, height: 10, borderRight: '1px solid rgba(212, 175, 55, 0.3)', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', pointerEvents: 'none', zIndex: 2 }} />
    </div>
  )
}

export default function TourPackages({ isLoading }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.tours-grid-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          id: 'tours-reveal'
        }
      })

      // 1. Title reveal
      tl.fromTo('.tours-title-sub',
        { opacity: 0, y: 15, letterSpacing: '4px' },
        { opacity: 1, y: 0, letterSpacing: '6px', duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.tours-title-main',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )

      // 2. Card entrance slide + 3D rotation
      .fromTo('.tour-card',
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
          stagger: 0.18,
          ease: 'power3.out'
        },
        '-=0.7'
      )

      // 3. Sweeping reveal curtain for image masking
      .fromTo('.tour-reveal-overlay',
        { scaleX: 1 },
        { scaleX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.inOut' },
        '-=0.95'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading])

  return (
    <section
      id="tour-packages"
      ref={sectionRef}
      style={{
        padding: '120px 48px',
        background: 'linear-gradient(to bottom, #050705 0%, #080a08 100%)',
        position: 'relative',
        zIndex: 5,
        borderBottom: '1px solid rgba(212, 175, 55, 0.08)',
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '75%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="tours-grid-container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <span
            className="tours-title-sub text-gold"
            style={{
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '14px',
              willChange: 'transform, opacity, letter-spacing'
            }}
          >
            Tailored Excursions
          </span>
          <h2
            className="tours-title-main font-serif"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: '300',
              lineHeight: '1.2',
              letterSpacing: '1.5px',
              color: 'var(--text-light)',
              willChange: 'transform, opacity'
            }}
          >
            Curated Sylhet <span className="text-gold" style={{ fontWeight: '600' }}>Tour Packages</span>
          </h2>
        </div>

        {/* 3 Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '35px',
            perspective: '1200px',
          }}
        >
          {TOURS_DATA.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              duration={tour.duration}
              price={tour.price}
              img={tour.img}
              desc={tour.desc}
              inclusions={tour.inclusions}
            />
          ))}
        </div>
      </div>

      <style>{`
        .tour-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease !important;
        }
        
        .tour-card:hover {
          border-color: rgba(212, 175, 55, 0.45) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.08) !important;
          transform: translateY(-5px);
        }

        .tour-card:hover .tour-img {
          transform: scale(1.06);
        }

        .tour-card:hover h4 {
          color: var(--brand-gold) !important;
        }
        
        @media (max-width: 768px) {
          #tour-packages {
            padding: 90px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
