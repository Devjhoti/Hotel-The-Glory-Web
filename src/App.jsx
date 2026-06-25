import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Loader from './components/Loader'
import AIChatBot from './components/AIChatBot'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      {!isLoading && <Navbar />}
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} />} />
      </Routes>
      {!isLoading && <Footer />}
      {!isLoading && <AIChatBot />}
    </>
  )
}

