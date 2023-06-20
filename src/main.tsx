import React from 'react'
import ReactDOM from 'react-dom/client'
import { inject } from '@vercel/analytics';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

inject();

