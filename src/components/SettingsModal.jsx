import React, { useState } from 'react'
import privacyText from '../../Privacy Policy.md?raw'
import termsText from '../../Terms of Service.md?raw'

// A tiny zero-dependency markdown renderer specifically tuned for Dayleaf's premium aesthetics
function MarkdownBlock({ text }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-4 text-ink pb-8">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-xl font-serif italic mt-8 mb-3" style={{ color: 'var(--color-ink)' }}>{line.replace('## ', '')}</h2>
        }
        if (line.startsWith('# ')) {
          return <h1 key={i} className="text-2xl font-serif italic mb-6" style={{ color: 'var(--color-ink)' }}>{line.replace('# ', '')}</h1>
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          const content = line.replace(/^(- |\* )/, '')
          const parts = content.split(/(\*\*.*?\*\*)/g)
          return (
            <li key={i} className="ml-5 list-disc mb-2" style={{ color: 'var(--color-secondary)' }}>
              {parts.map((part, j) => 
                part.startsWith('**') && part.endsWith('**') ? 
                <strong key={j} className="font-semibold" style={{ color: 'var(--color-ink)' }}>{part.slice(2, -2)}</strong> : 
                part
              )}
            </li>
          )
        }
        if (line.trim() === '') return null
        
        // Bold parsing for paragraphs
        const parts = line.split(/(\*\*.*?\*\*)/g)
        return (
          <p key={i} className="leading-relaxed text-sm" style={{ color: 'var(--color-secondary)' }}>
            {parts.map((part, j) => 
               part.startsWith('**') && part.endsWith('**') ? 
               <strong key={j} className="font-semibold" style={{ color: 'var(--color-ink)' }}>{part.slice(2, -2)}</strong> : 
               part
            )}
          </p>
        )
      })}
    </div>
  )
}

export default function SettingsModal({ isOpen, onClose, themes, activeTheme, setActiveTheme, fonts, activeFont, setActiveFont, onPremiumSelect }) {
  const [view, setView] = useState('main')

  if (!isOpen) return null

  const handleClose = () => {
    setView('main')
    onClose()
  }

  const themeList = Object.values(themes)
  const fontList = Object.values(fonts)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 opacity-40 backdrop-blur-sm" 
        style={{ backgroundColor: 'var(--color-ink)' }}
        onClick={handleClose} 
      />
      
      {/* Modal Box */}
      <div 
        className="relative w-full max-w-[420px] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col transition-all duration-300"
        style={{ backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)', maxHeight: '85vh' }}
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity z-10"
        >
          ✕
        </button>

        <div className="overflow-y-auto hide-scrollbar relative">
          {view === 'main' && (
            <div className="pb-4">
              <h2 className="text-3xl font-serif italic mb-8">Settings</h2>
              
              <div className="space-y-2 mb-8 border-b pb-8" style={{ borderColor: 'var(--color-accent)' }}>
                <button onClick={() => setView('themes')} className="w-full flex justify-between px-2 py-3 transition-opacity hover:opacity-60">
                  <span className="font-medium text-lg">Themes</span>
                  <span className="opacity-50">→</span>
                </button>
                <button onClick={() => setView('fonts')} className="w-full flex justify-between px-2 py-3 transition-opacity hover:opacity-60">
                  <span className="font-medium text-lg">Fonts</span>
                  <span className="opacity-50">→</span>
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 px-2 mb-4" style={{ color: 'var(--color-ink)' }}>Legal</p>
                <button onClick={() => setView('privacy')} className="w-full flex justify-between px-2 py-3 transition-opacity hover:opacity-60">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>Privacy Policy</span>
                </button>
                <button onClick={() => setView('terms')} className="w-full flex justify-between px-2 py-3 transition-opacity hover:opacity-60">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>Terms of Service</span>
                </button>
              </div>
            </div>
          )}

          {view === 'themes' && (
            <div>
              <button 
                onClick={() => setView('main')} 
                className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
              >
                <span>←</span> Back
              </button>
              <h2 className="text-2xl font-serif italic mb-6">Themes</h2>
              
              <div className="space-y-2 pb-4">
                {themeList.map(theme => (
                  <button
                    key={theme.name}
                    onClick={() => { 
                      setActiveTheme(theme.name); 
                      if (theme.isPremium && onPremiumSelect) onPremiumSelect();
                    }}
                    className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      backgroundColor: activeTheme === theme.name ? `color-mix(in srgb, var(--color-ink) 5%, transparent)` : 'transparent',
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full shrink-0 border"
                      style={{
                        backgroundColor: theme.colors.paper,
                        borderColor: theme.colors.accent,
                        boxShadow: `inset 0 0 0 2px color-mix(in srgb, var(--color-ink) 15%, transparent)`,
                      }}
                    />
                    <span className="font-medium text-base">{theme.emoji} {theme.label}</span>
                    {theme.isPremium && activeTheme !== theme.name && (
                      <span className="ml-auto text-[10px] uppercase tracking-widest opacity-40 font-bold">Pro</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === 'fonts' && (
            <div>
              <button 
                onClick={() => setView('main')} 
                className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
              >
                <span>←</span> Back
              </button>
              <h2 className="text-2xl font-serif italic mb-6">Fonts</h2>
              
              <div className="space-y-2 pb-4">
                {fontList.map(font => (
                  <button
                    key={font.name}
                    onClick={() => {
                      setActiveFont(font.name);
                      if (font.isPremium && onPremiumSelect) onPremiumSelect();
                    }}
                    className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      backgroundColor: activeFont === font.name ? `color-mix(in srgb, var(--color-ink) 5%, transparent)` : 'transparent',
                    }}
                  >
                    <span className="text-2xl w-8 shrink-0 text-center italic leading-none" style={{ fontFamily: font.family }}>
                      {font.preview}
                    </span>
                    <span className="font-medium text-base">{font.label}</span>
                    {font.isPremium && activeFont !== font.name && (
                      <span className="ml-auto text-[10px] uppercase tracking-widest opacity-40 font-bold">Pro</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === 'privacy' && (
            <div>
              <button 
                onClick={() => setView('main')} 
                className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
              >
                <span>←</span> Back
              </button>
              <MarkdownBlock text={privacyText} />
              <div className="mt-4 pt-4 border-t text-sm text-center" style={{ borderColor: 'var(--color-accent)' }}>
                <a 
                  href="https://docs.google.com/document/d/1SzBYUvcYLhPuwF27ioVhtZDq2Qp30GyY-_3og2-M4Rg/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:opacity-70 transition-opacity font-medium"
                  style={{ color: 'var(--color-ink)' }}
                >
                  View full Privacy Policy
                </a>
              </div>
            </div>
          )}

          {view === 'terms' && (
            <div>
              <button 
                onClick={() => setView('main')} 
                className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
              >
                <span>←</span> Back
              </button>
              <MarkdownBlock text={termsText} />
              <div className="mt-4 pt-4 border-t text-sm text-center" style={{ borderColor: 'var(--color-accent)' }}>
                <a 
                  href="https://docs.google.com/document/d/17O6uWFG3KEiMnbHpYTNWOjNLDVSMyxbyS9hYKUZCNqk/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:opacity-70 transition-opacity font-medium"
                  style={{ color: 'var(--color-ink)' }}
                >
                  View full Terms of Service
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
