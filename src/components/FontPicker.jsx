import React, { useState, useEffect } from 'react'

/**
 * FontPicker — Minimal font selector with live hover preview.
 *
 * - Hover a font → previews it live across the whole page
 * - Click → saves the selection
 * - PRO fonts are clearly badged
 */
export default function FontPicker({ activeFont, setActiveFont, fonts, activeTheme, themes, onPremiumSelect }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const fontList = Object.values(fonts)
  const currentTheme = themes[activeTheme]

  useEffect(() => {
    const fontToApply = (open && hovered) ? fonts[hovered] : fonts[activeFont]
    if (fontToApply) {
      document.documentElement.style.setProperty('--font-serif', fontToApply.family)
    }
  }, [open, hovered, activeFont, fonts])

  function handleMouseEnter(font) {
    setHovered(font.name)
  }

  function handleMouseLeave() {
    setHovered(null)
  }

  function handleSelect(font) {
    setActiveFont(font.name)
    setOpen(false)
    setHovered(null)
    if (font.isPremium && onPremiumSelect) {
      onPremiumSelect()
    }
  }

  return (
    <div className="fixed bottom-4 right-16 sm:bottom-6 sm:right-20 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="theme-toggle w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: currentTheme.colors.accent,
          color: currentTheme.colors.ink,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          fontFamily: fonts[activeFont].family,
          fontStyle: 'italic',
          fontSize: '15px',
          fontWeight: 600,
        }}
        title="Change font"
      >
        Aa
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="theme-dropdown absolute bottom-12 sm:bottom-14 right-0 rounded-xl p-3 space-y-1"
          style={{
            backgroundColor: currentTheme.colors.paper,
            boxShadow: '0 8px 30px rgba(0,0,0,0.14)',
            border: `1px solid ${currentTheme.colors.accent}`,
            minWidth: '210px',
          }}
        >
          <p
            className="text-[10px] uppercase tracking-widest pb-2 mb-1 border-b"
            style={{ color: currentTheme.colors.secondary, borderColor: currentTheme.colors.accent }}
          >
            Font Style
          </p>

          {fontList.map(font => {
            const isActive = activeFont === font.name
            const isHovered = hovered === font.name

            return (
              <button
                key={font.name}
                onClick={() => handleSelect(font)}
                onMouseEnter={() => handleMouseEnter(font)}
                onMouseLeave={handleMouseLeave}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                style={{
                  backgroundColor: isActive
                    ? `color-mix(in srgb, ${currentTheme.colors.ink} 10%, transparent)`
                    : isHovered
                    ? `color-mix(in srgb, ${currentTheme.colors.ink} 5%, transparent)`
                    : 'transparent',
                  border: isActive
                    ? `1px solid color-mix(in srgb, ${currentTheme.colors.ink} 14%, transparent)`
                    : '1px solid transparent',
                  color: currentTheme.colors.ink,
                }}
              >
                {/* Live font preview letter */}
                <span
                  className="text-xl w-8 shrink-0 text-center italic leading-none"
                  style={{ fontFamily: font.family }}
                >
                  {font.preview}
                </span>

                <span className="text-sm font-medium flex-1">{font.label}</span>

                {font.isPremium && (
                  <span
                    className="text-[9px] font-semibold tracking-widest px-2 py-1 rounded-full uppercase"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${currentTheme.colors.accent} 60%, #D4A5A5)`,
                      color: currentTheme.colors.secondary,
                      border: `1px solid color-mix(in srgb, ${currentTheme.colors.accent} 80%, #B08080)`,
                    }}
                  >
                    PRO
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
