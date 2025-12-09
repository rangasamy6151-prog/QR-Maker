import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./QRCode.css"
import { QRCode } from './QRCode'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QRCode/>
  </StrictMode>,
)
