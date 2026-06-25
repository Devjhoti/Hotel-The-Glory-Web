import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Rooms', href: '#rooms' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          padding: scrolled ? '12px 48px' : '24px 48px',
          background: scrolled ? 'rgba(8, 10, 8, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.4s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease, border-color 0.4s ease',
        }}
        className="navbar-container"
      >
        {/* Left: Brand Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo/logo.png"
              alt="Hotel The Glory"
              style={{
                height: scrolled ? '38px' : '45px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            />
          </a>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div
          className="desktop-menu"
          style={{
            flex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '13px',
                fontWeight: '400',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                position: 'relative',
                padding: '6px 0',
                opacity: 0.8,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1'
                const line = e.currentTarget.querySelector('.nav-line')
                if (line) gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8'
                const line = e.currentTarget.querySelector('.nav-line')
                if (line) gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power2.in' })
              }}
            >
              {link.name}
              {/* Dynamic hover line */}
              <span
                className="nav-line"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'var(--brand-gold)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'center',
                  transition: 'none',
                }}
              />
            </a>
          ))}
        </div>

        {/* Right: Call to Action (Desktop) & Hamburger Trigger (Mobile) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
          <a href="#contact" className="gold-btn desktop-menu" style={{ fontSize: '12px', padding: '10px 22px' }}>
            Enquire Now
          </a>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none', // Managed in media queries / CSS
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '24px',
              height: '16px',
              zIndex: 1001,
              padding: 0,
            }}
            className="mobile-hamburger-btn"
          >
            <span
              style={{
                width: '24px',
                height: '1.5px',
                backgroundColor: 'var(--text-light)',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                width: '24px',
                height: '1.5px',
                backgroundColor: 'var(--text-light)',
                transition: 'opacity 0.3s ease',
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '24px',
                height: '1.5px',
                backgroundColor: 'var(--text-light)',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Full-Screen Glassmorphic Menu Overlay (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(8, 10, 8, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              zIndex: 998,
            }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                style={{
                  fontSize: '28px',
                  fontFamily: 'var(--font-serif)',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--text-light)',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-light)')}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="gold-btn"
              style={{ marginTop: '24px' }}
            >
              Enquire Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
