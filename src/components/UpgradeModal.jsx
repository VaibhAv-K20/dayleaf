import React, { useState } from 'react'

export default function UpgradeModal({ isOpen, onClose, onUnlock, themes, activeTheme, setActiveTheme }) {
  const [selectedPlan, setSelectedPlan] = useState('yearly')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div 
        className="relative w-full max-w-[420px] rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>

        <h2 className="text-3xl font-serif italic mb-3">Make this your daily space ✨</h2>
        <p className="text-sm opacity-80 mb-6 font-medium leading-relaxed">
          Unlock beautiful themes, elegant typography, and fully personalize your Dayleaf experience.
        </p>

        {/* Live Theme Preview */}
        {themes && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-3 ml-1 text-center">
              Try a theme live
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 mb-6">
              {Object.values(themes).map(theme => (
                <button
                  key={theme.name}
                  onClick={() => setActiveTheme(theme.name)}
                  className={`w-10 h-10 shrink-0 rounded-full border-2 transition-all duration-300 ${activeTheme === theme.name ? 'scale-110 shadow-xl' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}
                  style={{
                    backgroundColor: theme.colors.paper,
                    borderColor: activeTheme === theme.name ? 'var(--color-ink)' : theme.colors.accent,
                    boxShadow: `inset 0 0 0 2px color-mix(in srgb, var(--color-ink) 15%, transparent)`
                  }}
                  title={theme.label}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pricing Options */}
        <div className="space-y-3 mb-8">
          {/* Yearly (Highlighted) */}
          <div 
            onClick={() => setSelectedPlan('yearly')}
            className={`relative w-full rounded-2xl p-4 flex items-center justify-between cursor-pointer border-2 transition-all ${selectedPlan === 'yearly' ? '' : 'opacity-80 hover:opacity-100'}`}
            style={{ 
              borderColor: selectedPlan === 'yearly' ? 'var(--color-ink)' : 'color-mix(in srgb, var(--color-ink) 20%, transparent)',
              backgroundColor: selectedPlan === 'yearly' ? 'color-mix(in srgb, var(--color-ink) 4%, transparent)' : 'transparent' 
            }}
          >
            <div className="absolute -top-3 left-4 px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full"
                 style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}>
              Best Value
            </div>
            <div>
              <p className="font-semibold text-lg">Yearly</p>
              <p className="text-sm opacity-70">₹499 / year (~$6)</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: selectedPlan === 'yearly' ? 'var(--color-ink)' : 'color-mix(in srgb, var(--color-ink) 20%, transparent)' }}>
              {selectedPlan === 'yearly' && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-ink)' }} />}
            </div>
          </div>

          {/* Monthly */}
          <div 
            onClick={() => setSelectedPlan('monthly')}
            className={`w-full rounded-2xl p-4 flex items-center justify-between cursor-pointer border-2 transition-all ${selectedPlan === 'monthly' ? '' : 'opacity-80 hover:opacity-100'}`}
            style={{ 
              borderColor: selectedPlan === 'monthly' ? 'var(--color-ink)' : 'color-mix(in srgb, var(--color-ink) 10%, transparent)',
              backgroundColor: selectedPlan === 'monthly' ? 'color-mix(in srgb, var(--color-ink) 4%, transparent)' : 'transparent' 
            }}
          >
            <div>
              <p className="font-medium text-lg">Monthly</p>
              <p className="text-sm opacity-70">₹149 / month (~$2)</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: selectedPlan === 'monthly' ? 'var(--color-ink)' : 'color-mix(in srgb, var(--color-ink) 20%, transparent)' }}>
              {selectedPlan === 'monthly' && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-ink)' }} />}
            </div>
          </div>
        </div>

        <button 
          onClick={onUnlock}
          className="w-full py-4 rounded-full text-lg font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}
        >
          Unlock your space
        </button>

        <p className="text-center mt-5 flex flex-col items-center gap-3">
          <button onClick={onClose} className="text-xs opacity-50 hover:opacity-100 uppercase tracking-wider font-semibold">
            Continue with free basic
          </button>
          <button 
            onClick={() => {
              if (localStorage.getItem('premium') === 'true') {
                onUnlock()
              } else {
                alert('No premium purchase found on this device.')
              }
            }} 
            className="text-[10px] opacity-40 hover:opacity-80 transition-opacity underline underline-offset-2 uppercase tracking-widest font-semibold"
          >
            Restore purchase
          </button>
        </p>

        <p className="text-center mt-6">
          <span className="text-[10px] uppercase tracking-widest opacity-30 font-bold" style={{ color: 'var(--color-ink)' }}>Premium unlock applies to this device only</span>
        </p>
      </div>
    </div>
  )
}
