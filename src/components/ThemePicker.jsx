import React, { useState } from 'react'

/**
 * ThemePicker — A minimal, zen-styled theme selector.
 * 
 * Shows as a small palette icon. Clicking opens a dropdown
 * with color circles for each theme.
 */
export default function ThemePicker({ activeTheme, setActiveTheme, themes, onPremiumSelect }) {
  const [open, setOpen] = useState(false)
  const themeList = Object.values(themes)

  return (
    <div className="relative z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="theme-toggle w-10 h-10 rounded-full flex items-center justify-center text-sm"
        style={{
          backgroundColor: themes[activeTheme].colors.accent,
          color: themes[activeTheme].colors.ink,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
        title="Change theme"
      >
        🎨
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="theme-dropdown absolute bottom-12 sm:bottom-14 right-0 rounded-xl p-3 space-y-2"
          style={{
            backgroundColor: themes[activeTheme].colors.paper,
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            border: `1px solid ${themes[activeTheme].colors.accent}`,
            minWidth: '180px',
          }}
        >
          {themeList.map(theme => (
            <button
              key={theme.name}
              onClick={() => { 
                setActiveTheme(theme.name); 
                setOpen(false);
                if (theme.isPremium && onPremiumSelect) onPremiumSelect();
              }}
              className="theme-option w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm"
              style={{
                backgroundColor: activeTheme === theme.name
                  ? theme.colors.accent + '40'
                  : 'transparent',
                color: themes[activeTheme].colors.ink,
              }}
            >
              {/* Color preview circle */}
              <div
                className="w-5 h-5 rounded-full shrink-0 border"
                style={{
                  backgroundColor: theme.colors.paper,
                  borderColor: theme.colors.accent,
                  boxShadow: `inset 0 0 0 2px ${theme.colors.ink}20`,
                }}
              />
              <span className="font-medium">{theme.emoji} {theme.label}</span>
              {theme.isPremium && activeTheme !== theme.name && (
                <span className="ml-auto text-[10px] opacity-50">✦</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
