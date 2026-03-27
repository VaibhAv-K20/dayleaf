import { useState, useEffect } from 'react'
import themes from '../themes'

/**
 * useTheme — Manages the active theme.
 * 
 * - Loads saved theme from localStorage
 * - Applies CSS variables to :root on change
 * - Persists selection
 */
export default function useTheme() {
  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem('paperflow_theme')
    return saved && themes[saved] ? saved : 'classic'
  })

  useEffect(() => {
    const theme = themes[activeTheme]
    if (!theme) return

    const root = document.documentElement
    root.style.setProperty('--color-paper', theme.colors.paper)
    root.style.setProperty('--color-ink', theme.colors.ink)
    root.style.setProperty('--color-secondary', theme.colors.secondary)
    root.style.setProperty('--color-accent', theme.colors.accent)
    root.style.setProperty('--color-card', theme.colors.card)

    localStorage.setItem('paperflow_theme', activeTheme)
  }, [activeTheme])

  return { activeTheme, setActiveTheme, themes }
}
