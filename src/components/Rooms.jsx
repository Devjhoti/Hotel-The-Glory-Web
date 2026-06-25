import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const roomsData = [
  {
    name: 'Executive Suite',
    price: 'BDT 5,500',
    image: '/images/room-2.jpg',
    size: '320 sq.ft.',
    occupancy: '2 Adults, 1 Child',
    view: 'City View',
    amenities: ['AC', 'Free WiFi', 'Mini Bar', 'Smart TV']
  },
  {
    name: 'Deluxe Twin Room',
    price: 'BDT 7,000',
    image: '/images/room-3.jpg',
    size: '380 sq.ft.',
    occupancy: '2 Adults, 2 Children',
    view: 'Garden View',
    amenities: ['AC', 'Free WiFi', 'Mini Bar', 'Electronic Safe']
  },
  {
    name: 'Glory Royal Suite',
    price: 'BDT 9,500',
    image: '/images/room-4.jpg',
    size: '450 sq.ft.',
    occupancy: '3 Adults, 2 Children',
    view: 'Lake View',
    amenities: ['AC', 'Free WiFi', 'Mini Bar', 'Bath Tub']
  },
  {
    name: 'Presidential Suite',
    price: 'BDT 16,000',
    image: '/images/room-5.jpg',
    size: '700 sq.ft.',
    occupancy: '4 Adults, 2 Children',
    view: 'Panoramic View',
    amenities: ['AC', 'Free WiFi', 'Mini Bar', 'Private Jacuzzi']
  },
  {
    name: 'Luxury Family Suite',
    price: 'BDT 12,000',
    image: '/images/room-6.jpg',
    size: '550 sq.ft.',
    occupancy: '4 Adults, 2 Children',
    view: 'Pool View',
    amenities: ['AC', 'Free WiFi', 'Mini Bar', 'Electronic Safe']
  }
]

// ── Room Card with soft reflection below ──────────────────────────────────
function RoomCard({ room }) {
  const cardRef      = useRef(null)
  const drawerRef    = useRef(null)
  const hiddenRef    = useRef(null)

  const expand = () => {
    if (drawerRef.current) drawerRef.current.style.height = '280px'
    if (hiddenRef.current)  hiddenRef.current.style.opacity = '1'
  }
  const collapse = () => {
    if (drawerRef.current) drawerRef.current.style.height = '135px'
    if (hiddenRef.current)  hiddenRef.current.style.opacity = '0'
  }

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const glare = card.querySelector('.card-glare')
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.12) 0%, transparent 55%)`
      glare.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    collapse()
    const card = cardRef.current
    if (!card) return
    const glare = card.querySelector('.card-glare')
    if (glare) glare.style.opacity = '0'
  }

  return (
    // Outer wrapper: card + reflection stacked vertically
    <div
      style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'clamp(280px, 30vw, 500px)',
      }}
    >
      {/* ── Main Card ── */}
      <div
        ref={cardRef}
        className="room-card"
        onMouseEnter={expand}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          width: '100%',
          height: 'clamp(340px, 55vh, 620px)',
          position: 'relative',
          borderRadius: '8px',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          overflow: 'hidden',
          background: 'var(--bg-dark-card)',
          backdropFilter: 'blur(12px)',
          flexShrink: 0,
        }}
      >
        {/* Specular glare overlay */}
        <div
          className="card-glare"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            zIndex: 10,
            mixBlendMode: 'overlay',
            willChange: 'background, opacity'
          }}
        />
        {/* Image */}
        <div className="room-image-wrapper" style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
          <img
            src={room.image}
            alt={room.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.02)',
              transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,10,8,0.1) 0%, rgba(8,10,8,0.4) 60%, rgba(8,10,8,0.95) 100%)',
            zIndex: 1,
          }}/>
        </div>

        {/* Expandable Drawer */}
        <div
          ref={drawerRef}
          style={{
            position: 'absolute', bottom: 0, left: 0, width: '100%',
            height: '135px', zIndex: 2, padding: '24px',
            display: 'flex', flexDirection: 'column', gap: '16px',
            borderTop: '1px solid rgba(212,175,55,0.25)',
            background: 'rgba(8,10,8,0.92)',
            backdropFilter: 'blur(16px)',
            transition: 'height 0.5s cubic-bezier(0.25,1,0.3,1)',
            overflow: 'hidden',
          }}
        >
          {/* Always-visible header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <h3 className="font-serif" style={{ fontSize:'22px', fontWeight:'500', color:'var(--text-light)', letterSpacing:'1px' }}>
                {room.name}
              </h3>
              <span style={{ fontSize:'12px', color:'var(--brand-champagne)', letterSpacing:'1.5px', textTransform:'uppercase', display:'block', marginTop:'4px' }}>
                {room.view} · {room.size}
              </span>
            </div>
            <div style={{ textAlign:'right' }}>
              <span className="text-gold font-serif" style={{ fontSize:'20px', fontWeight:'600', display:'block' }}>
                {room.price}
              </span>
              <span style={{ fontSize:'10px', color:'var(--text-muted)', textTransform:'uppercase' }}>/ Night</span>
            </div>
          </div>

          {/* Hover-reveal details */}
          <div
            ref={hiddenRef}
            style={{
              display:'flex', flexDirection:'column', gap:'12px',
              opacity: 0, transition: 'opacity 0.3s ease 0.12s', marginTop:'4px'
            }}
          >
            <div style={{ fontSize:'13px', color:'var(--text-light)', display:'flex', gap:'8px', alignItems:'center' }}>
              <span style={{ color:'var(--brand-gold)' }}>Occupancy:</span> {room.occupancy}
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {room.amenities.map(a => (
                <span key={a} style={{
                  fontSize:'11px', padding:'4px 10px',
                  background:'rgba(2,147,68,0.08)', border:'1px solid rgba(2,147,68,0.25)',
                  color:'var(--text-muted)', borderRadius:'12px'
                }}>{a}</span>
              ))}
            </div>
            <a href="#contact" className="gold-btn" style={{
              fontSize:'11px', padding:'10px 20px',
              textAlign:'center', display:'block', width:'100%', marginTop:'8px'
            }}>
              Check Availability
            </a>
          </div>
        </div>
      </div>

      {/* ── Soft Reflection ── */}
      <div
        aria-hidden="true"
        style={{
          width: '100%',
          height: 'clamp(50px, 10vh, 120px)',
          overflow: 'hidden',
          flexShrink: 0,
          transform: 'scaleY(-1)',  // flip vertically
          borderRadius: '0 0 6px 6px',
          // Multi-stop gradient: wide soft fade, almost nothing at bottom
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 15%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.40) 80%, rgba(0,0,0,0.65) 100%)',
          maskImage:       'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 15%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.40) 80%, rgba(0,0,0,0.65) 100%)',
          opacity: 0.35,             // adjusted slightly higher for blurred contrast
        }}
      >
        <img
          src={room.image}
          alt=""
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

      {/* Thin gold shimmer line between image and reflection */}
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

export default function Rooms() {
  const containerRef = useRef(null)
  const stickyRef    = useRef(null)
  const trackRef     = useRef(null)

  useEffect(() => {
    const track     = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const pin = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
      pin: true,
      scrub: 1,
      id: 'rooms-pin',
      invalidateOnRefresh: true,
      animation: gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
      })
    })

    return () => pin.kill()
  }, [])

  return (
    <section
      id="rooms"
      ref={containerRef}
      style={{ position: 'relative', background: '#0d0f0d', zIndex: 6 }}
    >
      <div
        ref={stickyRef}
        style={{
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 0',
          position: 'relative',
        }}
      >
        {/* Heading */}
        <div style={{
          paddingLeft: '52px', paddingRight: '80px', marginBottom: '36px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <div>
            <span className="emerald-badge" style={{ marginBottom: '12px' }}>Sanctuaries</span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: '300', letterSpacing: '2px', color: 'var(--text-light)',
              }}
            >
              Rooms &amp; <span className="text-gold" style={{ fontWeight: '600' }}>Suites</span>
            </h2>
          </div>
          <div className="desktop-menu" style={{ fontSize:'14px', color:'var(--brand-gold)', letterSpacing:'2px', textTransform:'uppercase', opacity:0.6 }}>
            Scroll Down to Navigate →
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'flex-start',   // so reflection sits below naturally
            gap: '28px',
            paddingLeft: '52px',
            paddingRight: '80px',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {/* Leading spacer so heading doesn't overlap first card */}
          <div style={{ minWidth: '440px', flexShrink: 0 }} />

          {roomsData.map((room) => (
            <RoomCard key={room.name} room={room} />
          ))}
        </div>
      </div>

      <style>{`
        .room-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .room-card:hover {
          border-color: rgba(212, 175, 55, 0.45);
          box-shadow: 0 20px 48px rgba(0, 136, 62, 0.06);
        }
        .room-card:hover .room-image-wrapper img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  )
}
