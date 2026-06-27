import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VirtualTour({ isLoading }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const playBtnRef = useRef(null)

  const videoUrl = 'https://res.cloudinary.com/dtctcaxxr/video/upload/v1782327668/AQPz2PpgprjQYDC_efsjBHIvS_njz_2MhLNcsI-LYTxT-sejWzCMnDANts7VvMO-A8Zb3ZDDACqUhUg_o9KF2HvWE0TrICCmw_Lqd2wpwKHYhg_d4p055.mp4'

  // Magnetic Cursor Play Button Logic
  const handleMouseMove = (e) => {
    if (!containerRef.current || !playBtnRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Smooth spring follow effect using GSAP quickTo
    gsap.to(playBtnRef.current, {
      x: x - 40, // offset half the button width
      y: y - 40,
      duration: 0.6,
      ease: 'power3.out'
    })
  }

  // Double-Check Scroll Entrance Animation
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      // Scale down and widen container on scroll trigger
      gsap.fromTo('.video-frame-container',
        { scale: 0.9, opacity: 0.6, borderRadius: '24px' },
        {
          scale: 1,
          opacity: 1,
          borderRadius: '8px',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.video-frame-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.tour-header-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tour-header-anim',
            start: 'top 85%'
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isLoading])

  const handlePlayToggle = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play()
      setIsPlaying(true)
      setIsMuted(false) // unmute when user clicks play
      video.muted = false
    }
  }

  const handleMuteToggle = (e) => {
    e.stopPropagation() // Prevent triggering parent play/pause toggle
    const video = videoRef.current
    if (!video) return
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    const currentProgress = (video.currentTime / video.duration) * 100
    setProgress(currentProgress)
  }

  const handleProgressBarClick = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    video.currentTime = percentage * video.duration
    setProgress(percentage * 100)
  }

  return (
    <section
      id="virtual-tour"
      ref={containerRef}
      style={{
        padding: '120px 48px',
        background: 'linear-gradient(to bottom, #050705 0%, #080a08 100%)',
        position: 'relative',
        zIndex: 5,
        borderBottom: '1px solid rgba(212, 175, 55, 0.08)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span
            className="tour-header-anim text-gold"
            style={{
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '14px',
              letterSpacing: '6px'
            }}
          >
            Prestige & Ambience
          </span>
          <h2
            className="tour-header-anim font-serif"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: '300',
              lineHeight: '1.2',
              letterSpacing: '1.5px',
              color: 'var(--text-light)'
            }}
          >
            Experience The Glory <span className="text-gold" style={{ fontWeight: '600' }}>Virtual Tour</span>
          </h2>
        </div>

        {/* Video Player Frame */}
        <div
          className="video-frame-container"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            // Center the play button on mouse leave
            if (playBtnRef.current) {
              gsap.to(playBtnRef.current, {
                x: 'calc(50% - 40px)',
                y: 'calc(50% - 40px)',
                duration: 0.6,
                ease: 'power3.out'
              })
            }
          }}
          onClick={handlePlayToggle}
          style={{
            width: '100%',
            aspectRatio: '16/9',
            position: 'relative',
            cursor: 'none', // Hide system cursor to highlight magnetic custom cursor
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
            background: '#030503',
            willChange: 'transform, opacity'
          }}
        >
          {/* Cloudinary MP4 Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            onTimeUpdate={handleTimeUpdate}
            loop
            muted={isMuted}
            autoPlay
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Luxury Video Overlay Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isPlaying
                ? 'linear-gradient(to top, rgba(8, 10, 8, 0.5) 0%, transparent 40%, transparent 60%, rgba(8, 10, 8, 0.4) 100%)'
                : 'rgba(8, 10, 8, 0.45)',
              zIndex: 1,
              pointerEvents: 'none',
              transition: 'background 0.5s ease'
            }}
          />

          {/* Cinematic Idle Poster/Title Overlays */}
          {!isPlaying && (
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '40px',
                zIndex: 2,
                pointerEvents: 'none',
                fontFamily: 'var(--font-serif)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <h3 style={{ fontSize: 'clamp(20px, 3.5vw, 36px)', color: 'var(--text-light)', fontWeight: '300', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
                Cinematic Property Walkthrough
              </h3>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: 'var(--brand-gold)', letterSpacing: '2px', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                Press anywhere to unmute and play
              </span>
            </div>
          )}

          {/* ── Magnetic Floating Play/Pause Button Overlay ── */}
          <div
            ref={playBtnRef}
            style={{
              position: 'absolute',
              // Initial position: center of container
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(13, 18, 14, 0.75)',
              border: '1.5px solid var(--brand-gold)',
              backdropFilter: 'blur(8px)',
              color: 'var(--brand-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              opacity: isHovered ? 1 : 0.85,
              scale: isHovered ? 1.08 : 1,
              transition: 'opacity 0.3s ease, scale 0.3s ease',
              pointerEvents: 'none' // Click passes through to container
            }}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}

            {/* Glowing magnetic rings */}
            {isHovered && <span className="video-magnetic-pulse" />}
          </div>

          {/* ── Custom Control Bar Footer ── */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '20px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '30px',
              zIndex: 3,
              transform: isHovered || !isPlaying ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            onClick={(e) => e.stopPropagation()} // Stop event bubbling
          >
            {/* Play progress seek bar */}
            <div
              onClick={handleProgressBarClick}
              style={{
                flex: 1,
                height: '5px',
                background: 'rgba(255, 255, 255, 0.25)',
                borderRadius: '3px',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}
              className="video-progress-bar"
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'var(--brand-gold)',
                  borderRadius: '3px',
                  position: 'relative'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: `calc(${progress}% - 5px)`,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--brand-gold)',
                  boxShadow: '0 0 10px var(--brand-gold)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.2s ease'
                }}
              />
            </div>

            {/* Right Mute Button & Info */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {/* Sound Toggle */}
              <button
                onClick={handleMuteToggle}
                style={{
                  color: 'var(--brand-gold)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  borderRadius: '50%',
                  background: 'rgba(13, 18, 14, 0.5)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  transition: 'all 0.3s ease'
                }}
                className="sound-toggle-btn"
              >
                {isMuted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .video-magnetic-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid var(--brand-gold);
          opacity: 0.5;
          animation: video-ripple 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }

        @keyframes video-ripple {
          0% { transform: scale(0.98); opacity: 0.6; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .sound-toggle-btn:hover {
          background: var(--brand-gold) !important;
          color: #080a08 !important;
          transform: scale(1.05);
        }

        .video-progress-bar:hover {
          height: 7px !important;
        }
      `}</style>
    </section>
  )
}
