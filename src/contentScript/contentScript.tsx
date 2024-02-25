import React from 'react'
import { createRoot } from 'react-dom/client'
import ContentPage from '../components/contentScriptPage'
import "./contentScript.scss";


const root = document.createElement('div')
document.body.appendChild(root)

const rootElement = createRoot(root)
rootElement.render(<ContentPage />)
