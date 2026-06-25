import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

// ── Custom Styled Calendar Component (Matches Hotel Theme) ────────────────
function CustomCalendar({ selectedDate, onSelectDate, minDate, onClose, alignRight = false }) {
  const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : new Date())
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayIndex = new Date(year, month, 1).getDay()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const prevMonth = (e) => {
    e.stopPropagation()
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = (e) => {
    e.stopPropagation()
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const days = []
  // Empty slots for preceding month days
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={`empty-${i}`} style={{ width: '32px', height: '32px' }} />)
  }

  // Days of the current month
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const minLimit = minDate ? new Date(minDate) : today
  minLimit.setHours(0, 0, 0, 0)

  for (let day = 1; day <= daysInMonth; day++) {
    const thisDate = new Date(year, month, day)
    thisDate.setHours(0, 0, 0, 0)
    const isDisabled = thisDate < minLimit
    const isSelected = selectedDate && new Date(selectedDate).toDateString() === thisDate.toDateString()

    days.push(
      <button
        key={`day-${day}`}
        disabled={isDisabled}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onSelectDate(thisDate.toISOString().split('T')[0])
          onClose()
        }}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          background: isSelected ? 'var(--brand-gold)' : 'transparent',
          color: isSelected ? '#080a08' : isDisabled ? 'rgba(255,255,255,0.15)' : '#fff',
          fontWeight: isSelected ? '600' : '400',
          cursor: isDisabled ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontFamily: 'var(--font-sans)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!isSelected && !isDisabled) {
            e.currentTarget.style.background = 'rgba(212,175,55,0.15)'
            e.currentTarget.style.color = 'var(--brand-gold)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected && !isDisabled) {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#fff'
          }
        }}
      >
        {day}
      </button>
    )
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        bottom: '110%',
        left: alignRight ? 'auto' : 0,
        right: alignRight ? 0 : 'auto',
        width: '272px',
        background: 'rgba(13, 15, 13, 0.98)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        zIndex: 30,
      }}
    >
      {/* Calendar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <button
          type="button"
          onClick={prevMonth}
          style={{ background: 'transparent', border: 'none', color: 'var(--brand-gold)', cursor: 'pointer', fontSize: '14px', padding: '4px' }}
        >
          &larr;
        </button>
        <span style={{ color: '#fff', fontWeight: '500', fontSize: '13px', fontFamily: 'var(--font-serif)', letterSpacing: '1px' }}>
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          style={{ background: 'transparent', border: 'none', color: 'var(--brand-gold)', cursor: 'pointer', fontSize: '14px', padding: '4px' }}
        >
          &rarr;
        </button>
      </div>

      {/* Weekday Names */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', marginBottom: '8px' }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd) => (
          <span key={wd} style={{ color: 'var(--brand-champagne)', fontSize: '10px', fontWeight: '500', opacity: 0.8 }}>
            {wd}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {days}
      </div>
    </div>
  )
}

export default function BookingWidget({ isHeroLoading }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [childrenCount, setChildrenCount] = useState(0)
  const [roomType, setRoomType] = useState('Deluxe Twin Room')

  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)
  const [showRoomDropdown, setShowRoomDropdown] = useState(false)
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [inquirySubmitted, setInquirySubmitted] = useState(false)

  // Inquiry form states
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [referral, setReferral] = useState('Google Search')

  const checkInColRef = useRef(null)
  const checkOutColRef = useRef(null)
  const guestDropdownRef = useRef(null)
  const roomDropdownRef = useRef(null)

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(e.target)) {
        setShowGuestDropdown(false)
      }
      if (roomDropdownRef.current && !roomDropdownRef.current.contains(e.target)) {
        setShowRoomDropdown(false)
      }
      if (checkInColRef.current && !checkInColRef.current.contains(e.target)) {
        setShowCheckInCalendar(false)
      }
      if (checkOutColRef.current && !checkOutColRef.current.contains(e.target)) {
        setShowCheckOutCalendar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Format dates for display
  const formatDateDisplay = (dateStr, fallback) => {
    if (!dateStr) return fallback
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  // Handle inquiry submission
  const handleInquirySubmit = (e) => {
    e.preventDefault()
    if (!fullName || !email || !phone) return

    setInquirySubmitted(true)
    setTimeout(() => {
      // Reset form after delay
      setShowInquiryModal(false)
      setInquirySubmitted(false)
      setFullName('')
      setEmail('')
      setPhone('')
      setSpecialRequests('')
    }, 3200)
  }

  return (
    <>
      {/* ── Main Booking Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={isHeroLoading ? {} : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '90%',
          maxWidth: '1050px',
          background: 'rgba(13, 15, 13, 0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          gap: '4px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Check-In Column */}
        <div
          ref={checkInColRef}
          onClick={() => {
            setShowCheckInCalendar(!showCheckInCalendar)
            setShowCheckOutCalendar(false)
            setShowGuestDropdown(false)
            setShowRoomDropdown(false)
          }}
          className="booking-col"
          style={{
            flex: '1 1 180px',
            padding: '14px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            transition: 'background 0.3s ease',
          }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: 'var(--brand-gold)', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>CHECK IN</span>
          <span style={{ fontSize: '15px', color: '#fff', fontWeight: '500', fontFamily: 'var(--font-serif)' }}>
            {formatDateDisplay(checkIn, 'Select Date')}
          </span>

          {/* Custom Check-In Calendar */}
          <AnimatePresence>
            {showCheckInCalendar && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <CustomCalendar
                  selectedDate={checkIn}
                  onSelectDate={(date) => {
                    setCheckIn(date)
                    // Auto-adjust checkout if check-in is set after check-out
                    if (checkOut && new Date(date) >= new Date(checkOut)) {
                      setCheckOut('')
                    }
                  }}
                  onClose={() => setShowCheckInCalendar(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', background: 'rgba(212,175,55,0.15)', alignSelf: 'stretch', margin: '12px 0' }} />

        {/* Check-Out Column */}
        <div
          ref={checkOutColRef}
          onClick={() => {
            setShowCheckOutCalendar(!showCheckOutCalendar)
            setShowCheckInCalendar(false)
            setShowGuestDropdown(false)
            setShowRoomDropdown(false)
          }}
          className="booking-col"
          style={{
            flex: '1 1 180px',
            padding: '14px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            transition: 'background 0.3s ease',
          }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: 'var(--brand-gold)', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>CHECK OUT</span>
          <span style={{ fontSize: '15px', color: '#fff', fontWeight: '500', fontFamily: 'var(--font-serif)' }}>
            {formatDateDisplay(checkOut, 'Select Date')}
          </span>

          {/* Custom Check-Out Calendar */}
          <AnimatePresence>
            {showCheckOutCalendar && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <CustomCalendar
                  selectedDate={checkOut}
                  minDate={checkIn || new Date().toISOString().split('T')[0]}
                  onSelectDate={setCheckOut}
                  onClose={() => setShowCheckOutCalendar(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', background: 'rgba(212,175,55,0.15)', alignSelf: 'stretch', margin: '12px 0' }} />

        {/* Guests Column */}
        <div
          ref={guestDropdownRef}
          className="booking-col"
          style={{
            flex: '1 1 180px',
            padding: '14px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            transition: 'background 0.3s ease',
          }}
          onClick={() => {
            setShowGuestDropdown(!showGuestDropdown)
            setShowCheckInCalendar(false)
            setShowCheckOutCalendar(false)
            setShowRoomDropdown(false)
          }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: 'var(--brand-gold)', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>GUESTS</span>
          <span style={{ fontSize: '15px', color: '#fff', fontWeight: '500', fontFamily: 'var(--font-serif)' }}>
            {adults} {adults === 1 ? 'Adult' : 'Adults'}
            {childrenCount > 0 ? `, ${childrenCount} ${childrenCount === 1 ? 'Child' : 'Children'}` : ''}
          </span>

          {/* Guest Selector Dropdown (Opens upward and centered) */}
          <AnimatePresence>
            {showGuestDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inner parts
                style={{
                  position: 'absolute',
                  bottom: '110%',
                  left: '-46px',
                  width: '272px',
                  background: 'rgba(10, 12, 10, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  zIndex: 20,
                }}
              >
                {/* Adults Count */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>Adults</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Age 13+</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="counter-btn"
                    >
                      -
                    </button>
                    <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600', minWidth: '16px', textAlign: 'center' }}>{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.min(6, adults + 1))}
                      className="counter-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children Count */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>Children</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Age 0-12</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                      className="counter-btn"
                    >
                      -
                    </button>
                    <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600', minWidth: '16px', textAlign: 'center' }}>{childrenCount}</span>
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.min(5, childrenCount + 1))}
                      className="counter-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', background: 'rgba(212,175,55,0.15)', alignSelf: 'stretch', margin: '12px 0' }} />

        {/* Room Type Column */}
        <div
          ref={roomDropdownRef}
          className="booking-col"
          style={{
            flex: '1 2 220px',
            padding: '14px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            transition: 'background 0.3s ease',
          }}
          onClick={() => {
            setShowRoomDropdown(!showRoomDropdown)
            setShowCheckInCalendar(false)
            setShowCheckOutCalendar(false)
            setShowGuestDropdown(false)
          }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: 'var(--brand-gold)', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>ROOM TYPE</span>
          <span style={{ fontSize: '15px', color: '#fff', fontWeight: '500', fontFamily: 'var(--font-serif)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {roomType}
          </span>

          {/* Room Selection Dropdown (Opens upward and centered) */}
          <AnimatePresence>
            {showRoomDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  bottom: '110%',
                  left: '-26px',
                  width: '272px',
                  background: 'rgba(10, 12, 10, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  padding: '8px 0',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  zIndex: 20,
                  maxHeight: '260px',
                  overflowY: 'auto',
                }}
              >
                {[
                  'Executive Suite',
                  'Deluxe Twin Room',
                  'Glory Royal Suite',
                  'Presidential Suite',
                  'Luxury Family Suite'
                ].map((room) => (
                  <div
                    key={room}
                    onClick={(e) => {
                      e.stopPropagation()
                      setRoomType(room)
                      setShowRoomDropdown(false)
                    }}
                    style={{
                      padding: '12px 20px',
                      fontSize: '13px',
                      color: roomType === room ? 'var(--brand-gold)' : '#fff',
                      background: roomType === room ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                      transition: 'all 0.2s ease',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)'
                      e.currentTarget.style.color = 'var(--brand-gold)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = roomType === room ? 'rgba(212, 175, 55, 0.08)' : 'transparent'
                      e.currentTarget.style.color = roomType === room ? 'var(--brand-gold)' : '#fff'
                    }}
                  >
                    {room}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => setShowInquiryModal(true)}
          style={{
            flex: '1 1 180px',
            border: 'none',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 1) 0%, rgba(184, 138, 22, 1) 100%)',
            color: '#080a08',
            fontWeight: '600',
            fontSize: '12px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            borderRadius: '8px',
            padding: '16px 28px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.25)'
          }}
        >
          Enquire Now
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ transition: 'transform 0.3s ease' }}>
            <path d="M9 1l4 4m0 0l-4 4m4-4H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </motion.div>

      {/* ── Booking Inquiry Dialog Modal (Awwwards Style) ── */}
      <AnimatePresence>
        {showInquiryModal && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6, 8, 6, 0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              overflowY: 'auto',
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              style={{
                width: '100%',
                maxWidth: '650px',
                background: 'rgba(13, 17, 13, 0.95)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                padding: '40px',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowInquiryModal(false)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '18px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-gold)'
                  e.currentTarget.style.color = 'var(--brand-gold)'
                  e.currentTarget.style.transform = 'rotate(90deg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                ✕
              </button>

              {!inquirySubmitted ? (
                <>
                  <div style={{ marginBottom: '28px' }}>
                    <span className="emerald-badge" style={{ marginBottom: '10px' }}>Reservation Request</span>
                    <h3 className="font-serif" style={{ fontSize: '32px', color: '#fff', letterSpacing: '1px' }}>
                      Complete Your Inquiry
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
                      Please provide your contact details to submit this reservation inquiry to our reservations team.
                    </p>
                  </div>

                  {/* Summary of Booking Selection */}
                  <div style={{
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    marginBottom: '28px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <span style={{ fontSize: '9px', letterSpacing: '1.5px', color: 'var(--brand-gold)', display: 'block', textTransform: 'uppercase' }}>Selected Room</span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#fff', fontFamily: 'var(--font-serif)' }}>{roomType}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', letterSpacing: '1.5px', color: 'var(--brand-gold)', display: 'block', textTransform: 'uppercase' }}>Dates</span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#fff', fontFamily: 'var(--font-serif)' }}>
                        {formatDateDisplay(checkIn, 'TBD')} – {formatDateDisplay(checkOut, 'TBD')}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', letterSpacing: '1.5px', color: 'var(--brand-gold)', display: 'block', textTransform: 'uppercase' }}>Guests</span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#fff', fontFamily: 'var(--font-serif)' }}>
                        {adults} Ad, {childrenCount} Ch
                      </span>
                    </div>
                  </div>

                  {/* Complete Form */}
                  <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '10px', color: 'var(--brand-gold)', letterSpacing: '1px' }}>FULL NAME *</label>
                        <input
                          required
                          type="text"
                          placeholder="E.g., John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          style={{
                            padding: '14px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '10px', color: 'var(--brand-gold)', letterSpacing: '1px' }}>EMAIL ADDRESS *</label>
                        <input
                          required
                          type="email"
                          placeholder="johndoe@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            padding: '14px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '10px', color: 'var(--brand-gold)', letterSpacing: '1px' }}>PHONE NUMBER *</label>
                        <input
                          required
                          type="tel"
                          placeholder="+880 1XXX-XXXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            padding: '14px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '14px',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '10px', color: 'var(--brand-gold)', letterSpacing: '1px' }}>HOW DID YOU FIND US?</label>
                        <select
                          value={referral}
                          onChange={(e) => setReferral(e.target.value)}
                          style={{
                            padding: '14px',
                            background: 'rgba(10, 12, 10, 0.95)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '14px',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option>Google Search</option>
                          <option>Facebook / Instagram</option>
                          <option>Word of Mouth</option>
                          <option>TripAdvisor</option>
                          <option>OTA (Booking.com/Agoda)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '10px', color: 'var(--brand-gold)', letterSpacing: '1px' }}>SPECIAL REQUESTS (OPTIONAL)</label>
                      <textarea
                        rows={3}
                        placeholder="Airport transfer, baby cot, dietary preferences, extra bed..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        style={{
                          padding: '14px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '14px',
                          outline: 'none',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: '10px',
                        border: 'none',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 1) 0%, rgba(184, 138, 22, 1) 100%)',
                        color: '#080a08',
                        fontWeight: '600',
                        fontSize: '13px',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        borderRadius: '6px',
                        padding: '18px 0',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.45)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none'
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      Submit Booking Inquiry
                    </button>
                  </form>
                </>
              ) : (
                /* Success Animation View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 0',
                    textAlign: 'center',
                  }}
                >
                  {/* Animated Check Ring */}
                  <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '28px' }}>
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="var(--brand-gold)"
                        strokeWidth="4"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                      <motion.path
                        d="M26 40l10 10 20-20"
                        stroke="var(--brand-gold)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '28px', color: '#fff', marginBottom: '14px', letterSpacing: '1px' }}>
                    Inquiry Received
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.6' }}>
                    Thank you, <strong style={{ color: '#fff' }}>{fullName}</strong>. Our reservations desk will review your details and send a formal quote to <span style={{ color: 'var(--brand-gold)' }}>{email}</span> shortly.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      <style>{`
        .booking-col {
          border: 1px solid transparent;
        }
        .booking-col:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 175, 55, 0.15);
        }
        .counter-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
          transition: all 0.2s ease;
        }
        .counter-btn:hover {
          border-color: var(--brand-gold);
          color: var(--brand-gold);
          background: rgba(212, 175, 55, 0.08);
        }
      `}</style>
    </>
  )
}
