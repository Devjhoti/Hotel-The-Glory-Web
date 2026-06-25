import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact() {
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
    // Clear error for that field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
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

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '80px',
            alignItems: 'start'
          }}
        >
          {/* ── LEFT COLUMN: Contact Details & Info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            <div>
              <span className="emerald-badge" style={{ marginBottom: '14px' }}>Inquiries & Booking</span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: '300',
                  lineHeight: '1.2',
                  letterSpacing: '1.5px',
                  color: 'var(--text-light)'
                }}
              >
                Plan Your <span className="text-gold" style={{ fontWeight: '600' }}>Stay</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginTop: '16px' }}>
                Have questions about rooms, booking details, or private tour coordination? Submit an inquiry request form, and our 24/7 hospitality desk will respond within a few hours with rate details and confirmation options.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '4px' }}>Location Address</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>Sadik Tower, Noyasorok, Sylhet, Bangladesh</p>
                </div>
              </div>

              {/* Phone & Booking */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '4px' }}>Reservation Hotline</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>+880 1303-995511 (Hotline / WhatsApp)</p>
                </div>
              </div>

              {/* Email Address */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '4px' }}>General Email</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>info@hoteltheglory.com</p>
                </div>
              </div>
            </div>

            {/* Embedded Directions Map */}
            <div
              style={{
                width: '100%',
                height: '220px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(212,175,55,0.15)',
                position: 'relative'
              }}
            >
              <iframe
                title="Hotel The Glory Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.665796919293!2d91.874187!3d24.909322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751aac063d8d641%3A0xe54b9f2d15fb9d08!2sSadik%20Tower%2C%20Noyasorok%20Rd%2C%20Sylhet%203100!5e0!3m2!1sen!2sbd!4v1688000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.8) invert(0.9) contrast(1.1) brightness(0.9)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── RIGHT COLUMN: Glassmorphic Booking Inquiry Form ── */}
          <div
            className="glass-panel"
            style={{
              padding: '40px 32px',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              position: 'relative',
              background: 'rgba(13, 18, 14, 0.5)',
              minHeight: '620px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
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
                  <h3 className="font-serif" style={{ fontSize: '24px', fontWeight: '300', color: 'var(--text-light)', letterSpacing: '1px', marginBottom: '24px' }}>
                    Booking Request Form
                  </h3>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Basic Grid Inputs */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      {/* Name */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          style={{
                            padding: '12px 16px',
                            background: 'rgba(8, 10, 8, 0.5)',
                            border: errors.fullName ? '1px solid #ff4d4d' : '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                          placeholder="Rakib Ahmed"
                        />
                        {errors.fullName && <span style={{ fontSize: '11px', color: '#ff4d4d' }}>{errors.fullName}</span>}
                      </div>

                      {/* Email */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{
                            padding: '12px 16px',
                            background: 'rgba(8, 10, 8, 0.5)',
                            border: errors.email ? '1px solid #ff4d4d' : '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                          placeholder="rakib@domain.com"
                        />
                        {errors.email && <span style={{ fontSize: '11px', color: '#ff4d4d' }}>{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          style={{
                            padding: '12px 16px',
                            background: 'rgba(8, 10, 8, 0.5)',
                            border: errors.phone ? '1px solid #ff4d4d' : '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                          placeholder="+880 1712-345678"
                        />
                        {errors.phone && <span style={{ fontSize: '11px', color: '#ff4d4d' }}>{errors.phone}</span>}
                      </div>
                    </div>

                    {/* Date Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '20px' }}>
                      {/* Check-In */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Check-In *</label>
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          style={{
                            padding: '12px 14px',
                            background: 'rgba(8, 10, 8, 0.5)',
                            border: errors.checkIn ? '1px solid #ff4d4d' : '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        />
                        {errors.checkIn && <span style={{ fontSize: '11px', color: '#ff4d4d' }}>{errors.checkIn}</span>}
                      </div>

                      {/* Check-Out */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Check-Out *</label>
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          style={{
                            padding: '12px 14px',
                            background: 'rgba(8, 10, 8, 0.5)',
                            border: errors.checkOut ? '1px solid #ff4d4d' : '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        />
                        {errors.checkOut && <span style={{ fontSize: '11px', color: '#ff4d4d' }}>{errors.checkOut}</span>}
                      </div>

                      {/* Guests Adults */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Adults</label>
                        <select
                          name="adults"
                          value={formData.adults}
                          onChange={handleInputChange}
                          style={{
                            padding: '12.5px 14px',
                            background: 'rgba(8, 10, 8, 0.75)',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num} style={{ background: '#080a08', color: '#f5f5f5' }}>{num} Guest{num > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>

                      {/* Guests Children */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Children</label>
                        <select
                          name="children"
                          value={formData.children}
                          onChange={handleInputChange}
                          style={{
                            padding: '12.5px 14px',
                            background: 'rgba(8, 10, 8, 0.75)',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        >
                          {[0, 1, 2, 3, 4].map(num => (
                            <option key={num} value={num} style={{ background: '#080a08', color: '#f5f5f5' }}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Room Preference & Referral */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      {/* Room Type */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Room Preference</label>
                        <select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleInputChange}
                          style={{
                            padding: '12.5px 14px',
                            background: 'rgba(8, 10, 8, 0.75)',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        >
                          {['Executive Suite', 'Deluxe Twin Room', 'Glory Royal Suite', 'Presidential Suite', 'Luxury Family Suite'].map(room => (
                            <option key={room} value={room} style={{ background: '#080a08', color: '#f5f5f5' }}>{room}</option>
                          ))}
                        </select>
                      </div>

                      {/* Referral */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>How did you hear about us?</label>
                        <select
                          name="referral"
                          value={formData.referral}
                          onChange={handleInputChange}
                          style={{
                            padding: '12.5px 14px',
                            background: 'rgba(8, 10, 8, 0.75)',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            borderRadius: '4px',
                            color: '#f5f5f5',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        >
                          {['Google Search', 'Social Media', 'Friends & Family', 'Travel Agency', 'Other'].map(source => (
                            <option key={source} value={source} style={{ background: '#080a08', color: '#f5f5f5' }}>{source}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-champagne)' }}>Special Requests</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        style={{
                          padding: '14px',
                          background: 'rgba(8, 10, 8, 0.5)',
                          border: '1px solid rgba(212, 175, 55, 0.25)',
                          borderRadius: '4px',
                          color: '#f5f5f5',
                          fontSize: '14px',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                        placeholder="Airport shuttle arrangement, high floor request, extra towels, etc..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="gold-btn"
                      style={{
                        padding: '16px',
                        width: '100%',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginTop: '10px',
                        border: '1px solid var(--brand-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
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
                  </form>
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
                      boxShadow: '0 0 20px rgba(2, 147, 68, 0.2)'
                    }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-gold" style={{ fontSize: '28px', fontWeight: '300', marginBottom: '14px' }}>
                    Inquiry Received
                  </h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
                    Thank you for your reservation inquiry. A summary has been logged and our front office will contact you on your provided phone number shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="gold-btn"
                    style={{ fontSize: '12px', padding: '10px 24px' }}
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
