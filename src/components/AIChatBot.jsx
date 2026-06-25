import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to Hotel The Glory, Sylhet. I am GloryBot, your digital concierge. How may I assist you with your luxury stay today?'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Clear new message badge on open
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false)
    }
  }, [isOpen])

  const quickReplies = [
    { label: 'Room Categories & Rates', query: 'What are your room types and rates?' },
    { label: 'Hotel Facilities', query: 'What facilities and services do you offer?' },
    { label: 'Book a Sylhet Excursion', query: 'Tell me about the tour packages.' }
  ]

  const handleSendMessage = async (text) => {
    const messageToSend = text || inputMessage
    if (!messageToSend.trim()) return

    // Add user message
    const updatedMessages = [...messages, { role: 'user', content: messageToSend }]
    setMessages(updatedMessages)
    setInputMessage('')
    setIsTyping(true)

    try {
      const responseText = await getBotResponse(updatedMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }])
    } catch (error) {
      console.error(error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, Guest. I encountered a temporary connection issue. Please feel free to reach our reservations desk directly at +8801303995511.'
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const getBotResponse = async (chatMessages) => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // In production, try to hit Vercel Serverless Function proxy
    if (!isLocalhost) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: chatMessages })
        })
        if (response.ok) {
          const data = await response.json()
          return data.choices[0].message.content
        }
        console.warn('Backend proxy response not OK, falling back to direct API.')
      } catch (err) {
        console.warn('Error fetching from serverless endpoint, using client fallback.', err)
      }
    }

    // Direct Browser-to-Groq request (Local Dev Fallback or Backend Fail)
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are "GloryBot", the premium AI Concierge for Hotel The Glory in Sylhet, Bangladesh. 
            Keep replies polite, warm, and brief. Mention the hotline +8801303995511 for quick bookings.
            Room Categories: Executive Suite (~BDT 4,500/night), Deluxe Twin (~BDT 5,500/night), Glory Royal, Presidential, Family Suite.
            Tours: Jaflong (BDT 3,500), Ratargul (BDT 4,000), Srimangal (BDT 5,500).`
          },
          ...chatMessages
        ],
        temperature: 0.6,
        max_tokens: 400
      })
    })

    if (!response.ok) {
      throw new Error('Groq API direct call failed.')
    }
    const data = await response.json()
    return data.choices[0].message.content
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, fontFamily: 'var(--font-sans)' }}>
      {/* ── Chatbot Floating Icon Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(13, 18, 14, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid var(--brand-gold)',
          color: 'var(--brand-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 175, 55, 0.25)',
          position: 'relative',
          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="chat-toggle-btn"
        aria-label="Open AI Concierge Chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Ambient Ring Glow */}
        {!isOpen && <span className="chat-pulse" />}

        {/* Unread Alert Badge */}
        {hasNewMessage && !isOpen && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--brand-emerald)',
              border: '2px solid #080a08',
              boxShadow: '0 0 10px var(--brand-emerald)'
            }}
          />
        )}
      </button>

      {/* ── Main Concierge Chat Box Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="glass-panel"
            style={{
              position: 'absolute',
              bottom: '76px',
              right: '0',
              width: '380px',
              height: '520px',
              borderRadius: '12px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              background: 'rgba(13, 18, 14, 0.92)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 16px 50px rgba(0,0,0,0.8), 0 0 30px rgba(2,147,68,0.05)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                background: 'rgba(8, 10, 8, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative', display: 'flex' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid var(--brand-gold)',
                      color: 'var(--brand-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#25D366',
                      border: '2px solid #0d120e',
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-serif" style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-light)', letterSpacing: '0.5px' }}>GloryBot</h4>
                  <span style={{ fontSize: '10px', color: 'var(--brand-gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>AI Concierge</span>
                </div>
              </div>
            </div>

            {/* Message Thread History */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                scrollbarWidth: 'none',
              }}
              className="chat-thread-container"
            >
              {messages.map((msg, i) => {
                const isBot = msg.role === 'assistant'
                return (
                  <div
                    key={i}
                    style={{
                      alignSelf: isBot ? 'flex-start' : 'flex-end',
                      maxWidth: '82%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isBot ? 'flex-start' : 'flex-end'
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: isBot ? '0 12px 12px 12px' : '12px 0 12px 12px',
                        background: isBot ? 'rgba(255, 255, 255, 0.03)' : 'var(--brand-emerald)',
                        border: isBot ? '1px solid rgba(212, 175, 55, 0.15)' : 'none',
                        color: '#f5f5f5',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap',
                        boxShadow: isBot ? 'none' : '0 4px 15px rgba(2, 147, 68, 0.15)'
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                )
              })}

              {/* Simulated typing indicator */}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '4px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '0 12px 12px 12px' }}>
                  <span className="dot-typing" />
                  <span className="dot-typing second-dot" />
                  <span className="dot-typing third-dot" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length === 1 && !isTyping && (
              <div
                style={{
                  padding: '0 20px 14px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Quick Questions</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(reply.query)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        background: 'rgba(212, 175, 55, 0.06)',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        color: 'var(--brand-champagne)',
                        fontSize: '11px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'var(--transition-fast)'
                      }}
                      className="quick-reply-btn"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input Footer */}
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                background: 'rgba(8, 10, 8, 0.45)',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask anything about rooms, dining, tours..."
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  background: 'rgba(8, 10, 8, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '20px',
                  color: '#f5f5f5',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                className="chat-input"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: inputMessage.trim() ? 'var(--brand-gold)' : 'rgba(212, 175, 55, 0.08)',
                  border: 'none',
                  color: inputMessage.trim() ? '#0a0a0a' : 'rgba(212, 175, 55, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputMessage.trim() ? 'pointer' : 'default',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .chat-toggle-btn:hover {
          transform: scale(1.08);
          color: var(--text-light) !important;
          border-color: var(--text-light) !important;
        }

        .chat-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid var(--brand-gold);
          opacity: 0;
          animation: chat-ripple 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes chat-ripple {
          0% { transform: scale(0.95); opacity: 0.6; }
          100% { transform: scale(1.35); opacity: 0; border-color: var(--brand-emerald); }
        }

        .chat-input:focus {
          border-color: var(--brand-gold) !important;
        }

        .quick-reply-btn:hover {
          background: var(--brand-gold) !important;
          color: #0a0a0a !important;
          border-color: var(--brand-gold) !important;
        }

        .dot-typing {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--brand-gold);
          display: inline-block;
          animation: dot-bounce 1.4s infinite ease-in-out both;
        }

        .second-dot {
          animation-delay: 0.2s;
        }

        .third-dot {
          animation-delay: 0.4s;
        }

        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }

        .chat-thread-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
