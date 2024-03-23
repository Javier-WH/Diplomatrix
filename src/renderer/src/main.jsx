import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MainContextProvider } from './contexts/mainContext';
import { MenuContextProvider } from './contexts/menuContext';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/mira/theme.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainContextProvider>
      <MenuContextProvider>
        <PrimeReactProvider>
         <App />
        </PrimeReactProvider>
      </MenuContextProvider>
    </MainContextProvider>
  </React.StrictMode>
)
