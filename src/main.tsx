import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root') as HTMLElement

const isNotSrict = JSON.parse(localStorage.getItem('isNotStrict') || 'null')

const app = isNotSrict ? (
  <App />
) : (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
ReactDOM.createRoot(rootElement).render(app)
