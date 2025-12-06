import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./Css/Theme.css"
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Components/Router/Router.jsx'
import AuthProvider from './Components/Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
