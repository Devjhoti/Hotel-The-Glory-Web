import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LenisProvider } from './components/LenisProvider'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <App />
      </LenisProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
