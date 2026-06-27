import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Premium Floating Input Component
function FloatingInput({ label, name, type = 'text', value, onChange, error, onFocus, onBlur, ...rest }) {
  const [focused, setFocused] = useState(false)
  const isDate = type === 'date'
  const isActive = focused || value || isDate

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '14px' }}>
      <label
        style={{
          position: 'absolute',
          left: '0',
          top: isActive ? '-12px' : '12px',
          fontSize: isActive ? '10px' : '14px',
          color: error ? '#ff4d4d' : isActive ? 'var(--brand-gold)' : 'var(--brand-champagne)',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          opacity: isActive ? 1 : 0.65
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setFocused(true)
          if (onFocus) onFocus(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          if (onBlur) onBlur(e)
        }}
        style={{
          width: '100%',
          padding: '16px 0 6px 0',
          background: 'transparent',
          border: 'none',
          borderBottom: error ? '1px solid #ff4d4d' : '1px solid rgba(212, 175, 55, 0.25)',
          color: '#f5f5f5',
          fontSize: '15px',
          outline: 'none',
          fontFamily: 'var(--font-sans)',
          transition: 'border-color 0.3s ease',
        }}
        {...rest}
      />
      {/* Animated bottom focus border line */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: focused ? '100%' : '0%',
          height: '2px',
          background: 'linear-gradient(90deg, var(--brand-emerald), var(--brand-gold))',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          boxShadow: focused ? '0 1px 6px rgba(212, 175, 55, 0.4)' : 'none'
        }}
      />
      {error && (
        <span style={{ fontSize: '11px', color: '#ff4d4d', marginTop: '4px', display: 'block', letterSpacing: '0.5px' }}>
          {error}
        </span>
      )}
    </div>
  )
}

// Premium Floating Textarea Component
function FloatingTextarea({ label, name, value, onChange, error, rows = 3, ...rest }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value

  return (
    <div style={{ position: 'relative', width: '100%', marginTop: '12px', marginBottom: '14px' }}>
      <label
        style={{
          position: 'absolute',
          left: '0',
          top: isActive ? '-12px' : '12px',
          fontSize: isActive ? '10px' : '14px',
          color: error ? '#ff4d4d' : isActive ? 'var(--brand-gold)' : 'var(--brand-champagne)',
          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          opacity: isActive ? 1 : 0.65
        }}
      >
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '16px 0 6px 0',
          background: 'transparent',
          border: 'none',
          borderBottom: error ? '1px solid #ff4d4d' : '1px solid rgba(212, 175, 55, 0.25)',
          color: '#f5f5f5',
          fontSize: '15px',
          outline: 'none',
          fontFamily: 'var(--font-sans)',
          resize: 'none',
          transition: 'border-color 0.3s ease',
        }}
        {...rest}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: focused ? '100%' : '0%',
          height: '2px',
          background: 'linear-gradient(90deg, var(--brand-emerald), var(--brand-gold))',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          boxShadow: focused ? '0 1px 6px rgba(212, 175, 55, 0.4)' : 'none'
        }}
      />
      {error && (
        <span style={{ fontSize: '11px', color: '#ff4d4d', marginTop: '4px', display: 'block', letterSpacing: '0.5px' }}>
          {error}
        </span>
      )}
    </div>
  )
}

// Custom Luxury Dropdown Component
function CustomSelect({ label, value, options, onChange, name }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (val) => {
    onChange(val)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', marginBottom: '14px' }}>
      <label
        style={{
          position: 'absolute',
          left: '0',
          top: '-12px',
          fontSize: '10px',
          color: 'var(--brand-gold)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          pointerEvents: 'none'
        }}
      >
        {label}
      </label>
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '16px 24px 6px 0',
          background: 'transparent',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          color: '#f5f5f5',
          fontSize: '15px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
          position: 'relative'
        }}
      >
        <span>{value}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            color: 'var(--brand-gold)'
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        
        {/* Animated focus line */}
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: isOpen ? '100%' : '0%',
            height: '2px',
            background: 'linear-gradient(90deg, var(--brand-emerald), var(--brand-gold))',
            transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            boxShadow: isOpen ? '0 1px 6px rgba(212, 175, 55, 0.4)' : 'none'
          }}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 8, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              zIndex: 100,
              marginTop: '6px',
              background: 'rgba(8, 10, 8, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '4px',
              maxHeight: '220px',
              overflowY: 'auto',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.65)',
              originY: 0
            }}
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                style={{
                  padding: '11px 16px',
                  fontSize: '14px',
                  color: value === option ? 'var(--brand-gold)' : 'var(--text-light)',
                  background: value === option ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderLeft: value === option ? '3px solid var(--brand-gold)' : '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(212, 175, 55, 0.06)'
                  e.target.style.color = 'var(--brand-gold)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = value === option ? 'rgba(212, 175, 55, 0.08)' : 'transparent'
                  e.target.style.color = value === option ? 'var(--brand-gold)' : 'var(--text-light)'
                }}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact({ isLoading }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '0',
    roomType: 'Executive Suite',
    referral: 'Google Search',
    specialRequests: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleDropdownChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const tempErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/

    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required.'
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email.'
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required.'
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Please enter a valid phone number.'
    }

    if (!formData.checkIn) {
      tempErrors.checkIn = 'Check-in date is required.'
    }
    
    if (!formData.checkOut) {
      tempErrors.checkOut = 'Check-out date is required.'
    } else if (formData.checkIn && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      tempErrors.checkOut = 'Check-out must be after check-in.'
    }

    if (parseInt(formData.adults, 10) < 1) tempErrors.adults = 'Must have at least 1 adult.'

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        adults: '1',
        children: '0',
        roomType: 'Executive Suite',
        referral: 'Google Search',
        specialRequests: ''
      })
    }, 1800)
  }

  // Adults: Display helper mappings
  const adultOptions = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests']
  const getAdultsDisplay = (val) => {
    const num = parseInt(val, 10)
    return `${num} Guest${num > 1 ? 's' : ''}`
  }

  // Children: Display helper mappings
  const childrenOptions = ['0 Children', '1 Child', '2 Children', '3 Children', '4 Children']
  const getChildrenDisplay = (val) => {
    const num = parseInt(val, 10)
    return `${num} Child${num !== 1 ? 'ren' : ''}`
  }

  const roomOptions = ['Executive Suite', 'Deluxe Twin Room', 'Glory Royal Suite', 'Presidential Suite', 'Luxury Family Suite']
  const referralOptions = ['Google Search', 'Social Media', 'Friends & Family', 'Travel Agency', 'Other']

  // Premium bouncy spring physics configurations
  const customSpringConfig = {
    type: 'spring',
    stiffness: 90,
    damping: 10,
    mass: 0.95
  }

  const formFieldVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 11
      }
    }
  }

  return (
    <section
      id="contact"
      style={{
        padding: '120px 48px',
        background: 'linear-gradient(to bottom, #080a08 0%, #0d0f0d 100%)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(212, 175, 55, 0.08)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView={isLoading ? "hidden" : "visible"}
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
              }
            }
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '80px',
            alignItems: 'start'
          }}
        >
          {/* ── LEFT COLUMN: Contact Details & Info ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -70 },
              visible: { opacity: 1, x: 0, transition: customSpringConfig }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            <div>
              <span className="emerald-badge" style={{ marginBottom: '16px' }}>Inquiries & Booking</span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  fontWeight: '300',
                  lineHeight: '1.15',
                  letterSpacing: '1.5px',
                  color: 'var(--text-light)'
                }}
              >
                Plan Your <span className="text-gold" style={{ fontWeight: '600' }}>Stay</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginTop: '18px' }}>
                Have questions about rooms, booking details, or private tour coordination? Submit an inquiry request form, and our 24/7 hospitality desk will respond within a few hours with rate details and confirmation options.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Address */}
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 12 }}
                style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', cursor: 'default' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)', marginBottom: '4px' }}>Location Address</h4>
                  <p style={{ fontSize: '15px', color: 'var(--text-light)', lineHeight: '1.5' }}>Sadik Tower, Noyasorok, Sylhet, Bangladesh</p>
                </div>
              </motion.div>

              {/* Phone & Booking */}
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 12 }}
                style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', cursor: 'default' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)', marginBottom: '4px' }}>Reservation Hotline</h4>
                  <p style={{ fontSize: '15px', color: 'var(--text-light)', lineHeight: '1.5' }}>+880 1303-995511 (Hotline / WhatsApp)</p>
                </div>
              </motion.div>

              {/* Email Address */}
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 12 }}
                style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', cursor: 'default' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)', marginBottom: '4px' }}>General Email</h4>
                  <p style={{ fontSize: '15px', color: 'var(--text-light)', lineHeight: '1.5' }}>info@hoteltheglory.com</p>
                </div>
              </motion.div>
            </div>

            {/* Embedded Directions Map with Custom Themed Gradient Highlight Wrapper */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: customSpringConfig }
              }}
              whileHover="hover"
              style={{
                width: '100%',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.35) 0%, rgba(2, 147, 68, 0.35) 100%)',
                padding: '2px', // Dual-tone luxury highlighted frame border
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)'
              }}
            >
              <motion.div
                variants={{
                  hover: { scale: 1.015 }
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#080a08'
                }}
              >
                <motion.iframe
                  title="Hotel The Glory Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.665796919293!2d91.874187!3d24.909322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751aac063d8d641%3A0xe54b9f2d15fb9d08!2sSadik%20Tower%2C%20Noyasorok%20Rd%2C%20Sylhet%203100!5e0!3m2!1sen!2sbd!4v1688000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  variants={{
                    hover: { filter: 'grayscale(0.4) invert(0.9) contrast(1.2) brightness(0.85)' }
                  }}
                  initial={{ filter: 'grayscale(0.9) invert(0.9) contrast(1.25) brightness(0.7)' }}
                  transition={{ duration: 0.4 }}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Embedded Vignette shading */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, transparent 40%, rgba(8, 10, 8, 0.8) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Explore Location Action tag popup */}
                <motion.div
                  variants={{
                    hover: { opacity: 1, y: 0 }
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    background: 'rgba(13, 18, 14, 0.88)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    pointerEvents: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--brand-gold)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>Explore Location</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--brand-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Glassmorphic Booking Inquiry Form ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 70 },
              visible: { opacity: 1, x: 0, transition: customSpringConfig }
            }}
            className="glass-panel"
            style={{
              padding: '48px 40px',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              position: 'relative',
              background: 'rgba(13, 18, 14, 0.45)',
              minHeight: '620px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
            }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-serif" style={{ fontSize: '26px', fontWeight: '300', color: 'var(--text-light)', letterSpacing: '1px', marginBottom: '32px' }}>
                    Booking Request Form
                  </h3>

                  <motion.form
                    onSubmit={handleSubmit}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.15
                        }
                      }
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                  >
                    {/* Basic Grid Inputs */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '28px' }}>
                      {/* Name */}
                      <motion.div variants={formFieldVariants}>
                        <FloatingInput
                          label="Full Name *"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          error={errors.fullName}
                        />
                      </motion.div>

                      {/* Email */}
                      <motion.div variants={formFieldVariants}>
                        <FloatingInput
                          label="Email Address *"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          error={errors.email}
                        />
                      </motion.div>

                      {/* Phone */}
                      <motion.div variants={formFieldVariants}>
                        <FloatingInput
                          label="Phone Number *"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          error={errors.phone}
                        />
                      </motion.div>
                    </div>

                    {/* Date & Occupancy Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '28px' }}>
                      {/* Check-In */}
                      <motion.div variants={formFieldVariants}>
                        <FloatingInput
                          label="Check-In *"
                          name="checkIn"
                          type="date"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          error={errors.checkIn}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </motion.div>

                      {/* Check-Out */}
                      <motion.div variants={formFieldVariants}>
                        <FloatingInput
                          label="Check-Out *"
                          name="checkOut"
                          type="date"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          error={errors.checkOut}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        />
                      </motion.div>

                      {/* Guests Adults */}
                      <motion.div variants={formFieldVariants}>
                        <CustomSelect
                          label="Adults"
                          name="adults"
                          value={getAdultsDisplay(formData.adults)}
                          options={adultOptions}
                          onChange={(displayVal) => {
                            const numVal = displayVal.split(' ')[0]
                            handleDropdownChange('adults', numVal)
                          }}
                        />
                      </motion.div>

                      {/* Guests Children */}
                      <motion.div variants={formFieldVariants}>
                        <CustomSelect
                          label="Children"
                          name="children"
                          value={getChildrenDisplay(formData.children)}
                          options={childrenOptions}
                          onChange={(displayVal) => {
                            const numVal = displayVal.split(' ')[0]
                            handleDropdownChange('children', numVal)
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Room Preference & Referral */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '28px' }}>
                      {/* Room Type */}
                      <motion.div variants={formFieldVariants}>
                        <CustomSelect
                          label="Room Preference"
                          name="roomType"
                          value={formData.roomType}
                          options={roomOptions}
                          onChange={(val) => handleDropdownChange('roomType', val)}
                        />
                      </motion.div>

                      {/* Referral */}
                      <motion.div variants={formFieldVariants}>
                        <CustomSelect
                          label="How did you hear about us?"
                          name="referral"
                          value={formData.referral}
                          options={referralOptions}
                          onChange={(val) => handleDropdownChange('referral', val)}
                        />
                      </motion.div>
                    </div>

                    {/* Special Requests */}
                    <motion.div variants={formFieldVariants}>
                      <FloatingTextarea
                        label="Special Requests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        error={errors.specialRequests}
                        rows={3}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={formFieldVariants}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="gold-btn"
                        style={{
                          padding: '18px',
                          width: '100%',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginTop: '10px',
                          border: '1px solid var(--brand-gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px'
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="form-spinner" />
                            <span>Processing Request...</span>
                          </>
                        ) : (
                          'Submit Booking Inquiry'
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                </motion.div>
              ) : (
                /* Success Message State */
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  style={{ textAlign: 'center', padding: '30px 10px' }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'rgba(2, 147, 68, 0.1)',
                      border: '2px solid var(--brand-emerald)',
                      color: 'var(--brand-emerald)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px auto',
                      boxShadow: '0 0 25px rgba(2, 147, 68, 0.3)'
                    }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-gold" style={{ fontSize: '30px', fontWeight: '300', marginBottom: '16px', letterSpacing: '0.5px' }}>
                    Inquiry Received
                  </h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.65', marginBottom: '32px' }}>
                    Thank you for your reservation inquiry. A summary has been logged and our front office will contact you on your provided phone number shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="gold-btn"
                    style={{ fontSize: '12px', padding: '12px 28px' }}
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .form-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(212, 175, 55, 0.2);
          border-top-color: var(--brand-gold);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.8) sepia(50%) saturate(1000%) hue-rotate(15deg);
          cursor: pointer;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
