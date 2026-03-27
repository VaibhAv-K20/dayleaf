import { useState, useEffect } from 'react'
import fonts from '../fonts'

/**
 * useFont — Manages the active serif font.
 *
 * - Loads saved font from localStorage
 * - Applies --font-serif CSS variable to :root on change
 * - Persists selection
 */
export default function useFont() {
  const [activeFont, setActiveFont] = useState(() => {
    const saved = localStorage.getItem('paperflow_font')
    return saved && fonts[saved] ? saved : 'playfair'
  })

  useEffect(() => {
    const font = fonts[activeFont]
    if (!font) return
    document.documentElement.style.setProperty('--font-serif', font.family)
    localStorage.setItem('paperflow_font', activeFont)
  }, [activeFont])

  return { activeFont, setActiveFont, fonts }
}
