import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Rahat Chowdhury',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    date: '1 week ago',
    avatarText: 'RC',
    content: 'An absolute gem in Sylhet! The rooms are immaculate, spacious, and the dark green luxury theme feels incredibly posh. The Srimangal tea garden excursion arranged by their travel desk was breathtaking.'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    location: 'London, UK',
    rating: 5,
    date: '3 weeks ago',
    avatarText: 'SJ',
    content: 'Exceptional hospitality. As a diaspora visiting Sylhet, safety and comfort were our top priorities. The staff was incredibly welcoming, the spa treatments were top-tier, and the pool was lovely.'
  },
  {
    id: 3,
    name: 'Dr. Farzana Alam',
    location: 'Chittagong, Bangladesh',
    rating: 5,
    date: '1 month ago',
    avatarText: 'FA',
    content: 'Ideal stay for corporate travel. The executive hall is equipped with modern AV settings, the high-speed WiFi is completely reliable, and the fine dining restaurant serves excellent local Sylheti food.'
  }
]

function ReviewCard({ name, location, rating, date, avatarText, content }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(2, 147, 68, 0.2) 0%, transparent 65%)`
    glowRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className="review-card glass-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: '8px',
        padding: '36px 30px',
        background: 'rgba(13, 18, 14, 0.45)',
        border: '1px solid rgba(212, 175, 55, 0.15)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        cursor: 'default',
        overflow: 'hidden',
        willChange: 'transform, opacity'
      }}
    >
      {/* Radial Hover Glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Header (Avatar + Name & Info) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {/* Avatar Icon */}
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid var(--brand-gold)',
              color: 'var(--brand-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '14px',
              letterSpacing: '1px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {avatarText}
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '3px' }}>{name}</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', opacity: 0.85 }}>{location}</span>
          </div>
        </div>

        {/* Google Icon Logo badge */}
        <div style={{ opacity: 0.85 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>

      {/* Star Ratings */}
      <div style={{ display: 'flex', gap: '4px', zIndex: 1 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? 'var(--brand-gold)' : 'none'} stroke="var(--brand-gold)" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Review Text Content */}
      <p
        style={{
          fontSize: '13.5px',
          lineHeight: '1.65',
          color: 'var(--text-muted)',
          opacity: 0.9,
          zIndex: 1,
          fontStyle: 'italic'
        }}
      >
        "{content}"
      </p>

      {/* Time & Verified Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(212,175,55,0.08)', zIndex: 1 }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', opacity: 0.7 }}>{date}</span>
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-emerald)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Verified Stay
        </span>
      </div>

      {/* Gold corner ornaments */}
      <div style={{ position: 'absolute', top: 8, left: 8, width: 8, height: 8, borderLeft: '1px solid rgba(212, 175, 55, 0.25)', borderTop: '1px solid rgba(212, 175, 55, 0.25)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 8, height: 8, borderRight: '1px solid rgba(212, 175, 55, 0.25)', borderBottom: '1px solid rgba(212, 175, 55, 0.25)', pointerEvents: 'none' }} />
    </div>
  )
}

export default function Reviews({ isLoading }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.reviews-trigger-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          id: 'reviews-reveal'
        }
      })

      // Title header reveals
      tl.fromTo('.reviews-title-sub',
        { opacity: 0, y: 15, letterSpacing: '4px' },
        { opacity: 1, y: 0, letterSpacing: '6px', duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.reviews-title-main',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.reviews-score-badge',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        '-=0.7'
      )

      // Cards staggered reveal
      .fromTo('.review-card',
        {
          opacity: 0,
          y: 50,
          rotateY: 8,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1.0,
          stagger: 0.16,
          ease: 'power3.out'
        },
        '-=0.7'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoading])

  return (
    <section
      id="reviews"
      ref={containerRef}
      style={{
        padding: '120px 48px',
        background: 'linear-gradient(to bottom, #080a08 0%, #050705 100%)',
        position: 'relative',
        zIndex: 5,
        borderBottom: '1px solid rgba(212, 175, 55, 0.08)'
      }}
    >
      {/* Background radial soft gold glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          width: '80%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.025) 0%, transparent 70%)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="reviews-trigger-container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header Block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
          <span
            className="reviews-title-sub text-gold"
            style={{
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '14px',
              willChange: 'transform, opacity, letter-spacing'
            }}
          >
            Guest Testimonials
          </span>
          <h2
            className="reviews-title-main font-serif"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: '300',
              lineHeight: '1.2',
              letterSpacing: '1.5px',
              color: 'var(--text-light)',
              marginBottom: '20px',
              willChange: 'transform, opacity'
            }}
          >
            Loved By <span className="text-gold" style={{ fontWeight: '600' }}>Guests</span> Worldwide
          </h2>

          {/* Google aggregate Score Badge */}
          <div
            className="reviews-score-badge glass-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 20px',
              borderRadius: '30px',
              border: '1px solid rgba(212,175,55,0.25)',
              background: 'rgba(13, 18, 14, 0.65)',
              willChange: 'transform, opacity'
            }}
          >
            {/* Google G logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-light)' }}>
                4.8 / 5.0 Rating
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                Based on 320+ Verified Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* 3 Review Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >
          {REVIEWS_DATA.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              location={review.location}
              rating={review.rating}
              date={review.date}
              avatarText={review.avatarText}
              content={review.content}
            />
          ))}
        </div>
      </div>

      <style>{`
        .review-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
        }

        .review-card:hover {
          border-color: rgba(212, 175, 55, 0.45) !important;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(2, 147, 68, 0.08) !important;
          transform: translateY(-5px);
        }
        
        @media (max-width: 768px) {
          #reviews {
            padding: 90px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
