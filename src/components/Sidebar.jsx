import React, { useState } from 'react'
import privacyText from '../../Privacy Policy.md?raw'
import termsText from '../../Terms of Service.md?raw'

function MarkdownBlock({ text }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-4 text-ink pb-8">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-serif italic mt-8 mb-3" style={{ color: 'var(--color-ink)' }}>{line.replace('## ', '')}</h2>
        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-serif italic mb-6" style={{ color: 'var(--color-ink)' }}>{line.replace('# ', '')}</h1>
        if (line.startsWith('- ') || line.startsWith('* ')) {
          const content = line.replace(/^(- |\* )/, '')
          const parts = content.split(/(\*\*.*?\*\*)/g)
          return (
             <li key={i} className="ml-5 list-disc mb-2" style={{ color: 'var(--color-secondary)' }}>
                {parts.map((part, j) => part.startsWith('**') && part.endsWith('**') ? <strong key={j} className="font-semibold" style={{ color: 'var(--color-ink)' }}>{part.slice(2, -2)}</strong> : part)}
             </li>
          )
        }
        if (line.trim() === '') return null
        
        const parts = line.split(/(\*\*.*?\*\*)/g)
        return (
          <p key={i} className="leading-relaxed text-sm" style={{ color: 'var(--color-secondary)' }}>
             {parts.map((part, j) => part.startsWith('**') && part.endsWith('**') ? <strong key={j} className="font-semibold" style={{ color: 'var(--color-ink)' }}>{part.slice(2, -2)}</strong> : part)}
          </p>
        )
      })}
    </div>
  )
}

export default function Sidebar({ isOpen, onClose, themes, activeTheme, setActiveTheme, fonts, activeFont, setActiveFont, completedTasks = [], onToggleTask, onPremiumSelect }) {
  const [view, setView] = useState('main')
  const themeList = Object.values(themes)
  const fontList = Object.values(fonts)

  const handleClose = () => {
    setView('main')
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 opacity-40 backdrop-blur-sm transition-opacity duration-300" 
          style={{ backgroundColor: 'var(--color-ink)' }}
          onClick={handleClose} 
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[340px] z-50 shadow-2xl p-6 sm:p-8 flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif italic">Settings</h2>
          <button 
            onClick={handleClose}
            className="w-10 h-10 flex flex-col justify-center items-center gap-[4px] opacity-60 hover:opacity-100 transition-opacity bg-ink/5 rounded-full"
            style={{ color: 'var(--color-ink)' }}
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto hide-scrollbar relative flex-1">
          {view === 'main' && (
            <div className="pb-4 flex flex-col animate-fade-in">
              <div className="space-y-2 mb-8 border-b pb-8" style={{ borderColor: 'var(--color-accent)' }}>
                <button onClick={() => setView('themes')} className="w-full flex justify-between px-4 py-4 rounded-xl transition-all duration-200 hover:bg-ink/5 items-center">
                  <span className="font-medium text-lg flex items-center gap-3"><span className="text-xl">🎨</span> Themes</span>
                  <span className="opacity-40 text-lg">→</span>
                </button>
                <button onClick={() => setView('fonts')} className="w-full flex justify-between px-4 py-4 rounded-xl transition-all duration-200 hover:bg-ink/5 items-center">
                  <span className="font-medium text-lg flex items-center gap-3"><span className="text-xl italic font-serif" style={{ fontFamily: 'Times New Roman' }}>Aa</span> Fonts</span>
                  <span className="opacity-40 text-lg">→</span>
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 px-4 mb-3" style={{ color: 'var(--color-ink)' }}>Legal & Info</p>
                <button onClick={() => setView('privacy')} className="w-full flex justify-between px-4 py-3 rounded-lg transition-all hover:bg-ink/5 items-center">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>Privacy Policy</span>
                </button>
                <button onClick={() => setView('terms')} className="w-full flex justify-between px-4 py-3 rounded-lg transition-all hover:bg-ink/5 items-center">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>Terms of Service</span>
                </button>
              </div>

              {completedTasks.length > 0 && (
                <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-accent)' }}>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 px-4 mb-4" style={{ color: 'var(--color-ink)' }}>Completed Today ({completedTasks.length})</p>
                  <div className="space-y-1 px-2 max-h-[300px] overflow-y-auto hide-scrollbar">
                    {completedTasks.map(task => (
                      <div 
                        key={task.id} 
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-ink/5 group transition-all"
                        onClick={() => onToggleTask(task.id, task._isMain)}
                      >
                        <div className="w-4 h-4 rounded-full border border-accent flex items-center justify-center bg-accent/20">
                          <span className="text-[10px]" style={{ color: 'var(--color-ink)' }}>✓</span>
                        </div>
                        <span className="text-sm font-serif italic line-through opacity-40 group-hover:opacity-60 transition-opacity flex-1 break-words py-1" style={{ color: 'var(--color-ink)' }}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8 flex flex-col items-center">
                <p className="text-xs tracking-widest uppercase opacity-40 mt-6 text-center" style={{ color: 'var(--color-ink)' }}>Resetting in 24 hours</p>
              </div>
            </div>
          )}

          {view === 'themes' && (
            <div className="animate-fade-in">
              <button onClick={() => setView('main')} className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-2" style={{ color: 'var(--color-ink)' }}>
                <span>←</span> Back
              </button>
              <div className="space-y-2 pb-8">
                {themeList.map(theme => (
                  <button
                    key={theme.name}
                    onClick={() => { setActiveTheme(theme.name); if (theme.isPremium && onPremiumSelect) onPremiumSelect(); }}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200"
                    style={{ backgroundColor: activeTheme === theme.name ? `color-mix(in srgb, var(--color-ink) 5%, transparent)` : 'transparent' }}
                  >
                    <div className="w-6 h-6 rounded-full shrink-0 border" style={{ backgroundColor: theme.colors.paper, borderColor: theme.colors.accent, boxShadow: `inset 0 0 0 2px color-mix(in srgb, var(--color-ink) 15%, transparent)` }} />
                    <span className="font-medium text-base" style={{ color: 'var(--color-ink)' }}>{theme.emoji} {theme.label}</span>
                    {theme.isPremium && activeTheme !== theme.name && (<span className="ml-auto text-[10px] uppercase tracking-widest opacity-40 font-bold px-2 py-1 rounded" style={{ backgroundColor: 'color-mix(in srgb, var(--color-ink) 10%, transparent)', color: 'var(--color-ink)' }}>Pro</span>)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === 'fonts' && (
            <div className="animate-fade-in">
              <button onClick={() => setView('main')} className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-2" style={{ color: 'var(--color-ink)' }}>
                <span>←</span> Back
              </button>
              <div className="space-y-2 pb-8">
                {fontList.map(font => (
                   <button
                   key={font.name}
                   onClick={() => { setActiveFont(font.name); if (font.isPremium && onPremiumSelect) onPremiumSelect(); }}
                   className="w-full flex items-center gap-5 px-4 py-4 rounded-xl text-left transition-all duration-200"
                   style={{ backgroundColor: activeFont === font.name ? `color-mix(in srgb, var(--color-ink) 5%, transparent)` : 'transparent' }}
                 >
                   <span className="text-2xl w-8 shrink-0 text-center italic leading-none" style={{ fontFamily: font.family, color: 'var(--color-ink)' }}>{font.preview}</span>
                   <span className="font-medium text-base" style={{ color: 'var(--color-ink)' }}>{font.label}</span>
                   {font.isPremium && activeFont !== font.name && (<span className="ml-auto text-[10px] uppercase tracking-widest opacity-40 font-bold px-2 py-1 rounded" style={{ backgroundColor: 'color-mix(in srgb, var(--color-ink) 10%, transparent)', color: 'var(--color-ink)' }}>Pro</span>)}
                 </button>
                ))}
              </div>
            </div>
          )}

          {view === 'privacy' && (
            <div className="animate-fade-in relative z-10">
              <button onClick={() => setView('main')} className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-2" style={{ color: 'var(--color-ink)' }}>
                <span>←</span> Back
              </button>
              <MarkdownBlock text={privacyText} />
            </div>
          )}

          {view === 'terms' && (
            <div className="animate-fade-in relative z-10">
              <button onClick={() => setView('main')} className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-6 hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-2" style={{ color: 'var(--color-ink)' }}>
                <span>←</span> Back
              </button>
              <MarkdownBlock text={termsText} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
