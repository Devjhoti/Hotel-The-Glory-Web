import { useEffect, useRef, useState } from 'react'
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
    desc: 'Rejuvenate in our crystal-clear temperature-controlled pool, surrounded by luxury botanical gardens.',
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

function MobileFacilityCard({ id, title, desc, img, icon }) {
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

      <div style={{ position: 'absolute', top: 8, left: 8, width: 10, height: 10, borderLeft: '1px solid rgba(212, 175, 55, 0.3)', borderTop: '1px solid rgba(212, 175, 55, 0.3)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 10, height: 10, borderRight: '1px solid rgba(212, 175, 55, 0.3)', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', pointerEvents: 'none', zIndex: 2 }} />
    </div>
  )
}

export default function Facilities({ isLoading }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false)
  const sectionRef = useRef(null)
  const mediaColRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Parallax Media Hover response
  const handleMediaMouseMove = (e) => {
    if (isMobile || !mediaColRef.current) return
    const container = mediaColRef.current
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to('.facility-img-el', {
      x: x * 0.04,
      y: y * 0.04,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }

  const handleMediaMouseLeave = () => {
    if (isMobile) return
    gsap.to('.facility-img-el', {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.facilities-grid-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            id: 'facilities-reveal-mobile'
          }
        })

        tl.fromTo('.facilities-title-sub',
          { opacity: 0, y: 15, letterSpacing: '4px' },
          { opacity: 1, y: 0, letterSpacing: '6px', duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.facilities-title-main',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          '-=0.6'
        )
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
        .fromTo('.facility-reveal-overlay',
          { scaleX: 1 },
          { scaleX: 0, duration: 0.8, stagger: 0.12, ease: 'power3.inOut' },
          '-=0.95'
        )
      } else {
        // Desktop Pinned Split-Screen Showcase
        // Setup initial visible states for index 0
        gsap.set(`.facility-text-card-0 .facility-card-title`, { color: 'var(--brand-gold)' })
        gsap.set(`.facility-text-card-0 .facility-card-num`, { color: 'var(--brand-gold)' })
        gsap.set(`.facility-text-card-0 .facility-card-icon`, { color: 'var(--brand-gold)', scale: 1.15 })
        gsap.set(`.facility-text-card-0 .facility-card-desc`, { opacity: 0.85, y: 0 })
        gsap.set(`.facility-active-bar-0`, { opacity: 1 })
        gsap.set(`.facility-img-wrapper-0 .facility-img-el`, { scale: 1.05 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 4}`, // 400vh scroll
            pin: true,
            scrub: 1.2,
            id: 'facilities-pin-desktop',
            invalidateOnRefresh: true
          }
        })

        const cardHeight = 320

        // Transition from step i-1 to step i
        for (let i = 1; i < 6; i++) {
          const stepLabel = `step-${i}`

          // Vertical translate scroll for left track
          tl.to('.facilities-text-track', {
            y: -i * cardHeight,
            duration: 1.5,
            ease: 'power2.inOut'
          }, stepLabel)

          // De-highlight previous card
          tl.to(`.facility-text-card-${i - 1} .facility-card-title`, {
            color: 'rgba(245, 245, 245, 0.3)',
            duration: 0.8,
            ease: 'power2.out'
          }, stepLabel)
          .to(`.facility-text-card-${i - 1} .facility-card-num`, {
            color: 'rgba(212, 175, 55, 0.25)',
            duration: 0.8,
            ease: 'power2.out'
          }, stepLabel)
          .to(`.facility-text-card-${i - 1} .facility-card-icon`, {
            color: 'rgba(212, 175, 55, 0.4)',
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
          }, stepLabel)
          .to(`.facility-text-card-${i - 1} .facility-card-desc`, {
            opacity: 0,
            y: 15,
            duration: 0.8,
            ease: 'power2.out'
          }, stepLabel)
          .to(`.facility-active-bar-${i - 1}`, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
          }, stepLabel)

          // Highlight active card
          tl.to(`.facility-text-card-${i} .facility-card-title`, {
            color: 'var(--brand-gold)',
            duration: 1.2,
            ease: 'power2.out'
          }, stepLabel)
          .to(`.facility-text-card-${i} .facility-card-num`, {
            color: 'var(--brand-gold)',
            duration: 1.2,
            ease: 'power2.out'
          }, stepLabel)
          .to(`.facility-text-card-${i} .facility-card-icon`, {
            color: 'var(--brand-gold)',
            scale: 1.15,
            duration: 1.2,
            ease: 'power2.out'
          }, stepLabel)
          .to(`.facility-text-card-${i} .facility-card-desc`, {
            opacity: 0.85,
            y: 0,
            duration: 1.2,
            ease: 'power2.out'
          }, stepLabel)
          .to(`.facility-active-bar-${i}`, {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
          }, stepLabel)

          // Reveal active media canvas
          tl.fromTo(`.facility-img-wrapper-${i}`,
            { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 1.8,
              ease: 'power2.inOut'
            },
            stepLabel
          )
          .fromTo(`.facility-img-wrapper-${i} .facility-img-el`,
            { scale: 1.25 },
            {
              scale: 1.05,
              duration: 1.8,
              ease: 'power2.out'
            },
            stepLabel
          )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, isLoading])

  if (isMobile) {
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
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <span
              className="facilities-title-sub text-gold"
              style={{
                fontSize: '13px',
                fontWeight: '600',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '14px',
                letterSpacing: '6px'
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
                color: 'var(--text-light)'
              }}
            >
              World-Class <span className="text-gold" style={{ fontWeight: '600' }}>Facilities</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              perspective: '1200px',
            }}
          >
            {FACILITIES_DATA.map((facility) => (
              <MobileFacilityCard
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

  return (
    <section
      id="facilities"
      ref={sectionRef}
      style={{
        background: '#080a08',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(212, 175, 55, 0.08)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.08)',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div
        className="facilities-split-container"
        style={{
          display: 'flex',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left Column (Typography Control) */}
        <div
          style={{
            width: '45%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 80px',
            position: 'relative',
            zIndex: 10,
            borderRight: '1px solid rgba(212, 175, 55, 0.08)',
            background: 'linear-gradient(to right, #080a08 85%, #050705 100%)',
          }}
        >
          {/* Static Section Title Block */}
          <div style={{ marginBottom: '48px', alignSelf: 'flex-start' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--brand-gold)',
                textTransform: 'uppercase',
                letterSpacing: '5px',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              Discover the Glory Experience
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: '300',
                color: 'var(--text-light)',
                lineHeight: '1.2'
              }}
            >
              World-Class <span className="text-gold" style={{ fontWeight: '600' }}>Facilities</span>
            </h2>
          </div>

          {/* Window showing the focused active text card */}
          <div
            className="facilities-text-window"
            style={{
              height: '320px',
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
            }}
          >
            <div
              className="facilities-text-track"
              style={{
                display: 'flex',
                flexDirection: 'column',
                willChange: 'transform'
              }}
            >
              {FACILITIES_DATA.map((facility, index) => (
                <div
                  key={facility.id}
                  className={`facility-text-card facility-text-card-${index}`}
                  style={{
                    height: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    paddingLeft: '32px',
                    borderLeft: '2px solid rgba(212, 175, 55, 0.06)',
                  }}
                >
                  {/* Left Gold Active Indicator Line */}
                  <div
                    className={`facility-active-bar facility-active-bar-${index}`}
                    style={{
                      position: 'absolute',
                      left: '-2px',
                      top: '15%',
                      height: '70%',
                      width: '2px',
                      background: 'var(--brand-gold)',
                      opacity: 0,
                      boxShadow: '0 0 10px var(--brand-gold)',
                      transition: 'opacity 0.4s ease'
                    }}
                  />

                  {/* Header Title + Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
                    <span
                      className="font-serif facility-card-num"
                      style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        color: 'rgba(212, 175, 55, 0.25)',
                        transition: 'color 0.4s ease'
                      }}
                    >
                      {facility.id}
                    </span>
                    <div
                      className="facility-card-icon"
                      style={{
                        color: 'rgba(212, 175, 55, 0.4)',
                        transition: 'all 0.4s ease',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {facility.icon}
                    </div>
                    <h3
                      className="font-serif facility-card-title"
                      style={{
                        fontSize: '24px',
                        fontWeight: '300',
                        color: 'rgba(245, 245, 245, 0.3)',
                        transition: 'color 0.4s ease'
                      }}
                    >
                      {facility.title}
                    </h3>
                  </div>

                  {/* Body description */}
                  <p
                    className="facility-card-desc"
                    style={{
                      fontSize: '14.5px',
                      lineHeight: '1.65',
                      color: 'var(--text-muted)',
                      opacity: 0,
                      transform: 'translateY(15px)',
                      maxWidth: '440px',
                      transition: 'opacity 0.4s ease, transform 0.4s ease'
                    }}
                  >
                    {facility.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (High-Fidelity Media Showcase) */}
        <div
          ref={mediaColRef}
          onMouseMove={handleMediaMouseMove}
          onMouseLeave={handleMediaMouseLeave}
          style={{
            width: '55%',
            height: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '64px',
            background: '#050705',
            zIndex: 5
          }}
        >
          {/* Framed Outer container */}
          <div
            style={{
              width: '100%',
              height: '80%',
              borderRadius: '16px',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 35px 80px rgba(0, 0, 0, 0.95)',
              position: 'relative',
              overflow: 'hidden',
              background: '#030403'
            }}
          >
            {FACILITIES_DATA.map((facility, index) => (
              <div
                key={facility.id}
                className={`facility-img-wrapper facility-img-wrapper-${index}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  zIndex: index,
                  clipPath: index === 0 
                    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
                    : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                  willChange: 'clip-path'
                }}
              >
                <img
                  className="facility-img-el"
                  src={facility.img}
                  alt={facility.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.55) contrast(1.08) saturate(0.9)',
                    willChange: 'transform'
                  }}
                />
              </div>
            ))}

            {/* Dark green luxury vignette shading overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8, 10, 8, 0.75) 0%, transparent 50%, rgba(8, 10, 8, 0.35) 100%)',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
