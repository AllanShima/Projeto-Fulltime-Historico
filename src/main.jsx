import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
    // React.StrictMode is a tool that helps you write better React applications by highlighting potential problems.
    // It runs during development mode only and does not affect the production build.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
