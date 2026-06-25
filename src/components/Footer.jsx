export default function Footer() {
  return (
    <footer
      style={{
        padding: '60px 48px 30px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: 3, marginBottom: 8 }}>
        THE GLORY
      </p>
      <p style={{ fontSize: 14, opacity: 0.4, letterSpacing: 1 }}>
        &copy; {new Date().getFullYear()} Hotel The Glory. All rights reserved.
      </p>
    </footer>
  )
}
