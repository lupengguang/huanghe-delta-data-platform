import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const urlParams = new URLSearchParams(window.location.search);
const redirectPath = urlParams.get('p');
if (redirectPath && !window.location.hash) {
  window.location.replace(redirectPath + window.location.hash);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)