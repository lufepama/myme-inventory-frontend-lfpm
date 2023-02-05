import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Routes from './routes'
import './index.css'

//The routes of the app is managed by Routes component

ReactDOM.createRoot(document.getElementById('root')).render(
  <Routes />
)
