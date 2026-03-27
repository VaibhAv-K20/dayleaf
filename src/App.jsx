import React, { useState, useRef, useEffect } from 'react'
import useTasks from './hooks/useTasks'
import useTheme from './hooks/useTheme'
import useFont from './hooks/useFont'
import TaskRow from './components/TaskRow'
import CompletedArea from './components/CompletedArea'
import SettingsModal from './components/SettingsModal'
import ThemePicker from './components/ThemePicker'
import UpgradeModal from './components/UpgradeModal'

/**
 * App — The main PaperFlow layout.
 * 
 * A minimalist daily planner with:
 *   - 3 Main Tasks (big priorities)
 *   - 5 Small Tasks (quick wins)
 *   - 24-hour auto-reset
 */
export default function App() {
  const {
    mainTasks, smallTasks,
    mainInput, smallInput,
    setMainInput, setSmallInput,
    addMainTask, addSmallTask,
    toggleTask,
  } = useTasks()

  const { activeTheme, setActiveTheme, themes: themeList } = useTheme()
  const { activeFont, setActiveFont, fonts: fontList } = useFont()

  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const lastFreeTheme = useRef('classic')
  const lastFreeFont = useRef('playfair')

  // Keep track of the last free selections to revert back if canceled
  useEffect(() => {
    if (themeList[activeTheme] && !themeList[activeTheme].isPremium) {
      lastFreeTheme.current = activeTheme
    }
  }, [activeTheme, themeList])

  useEffect(() => {
    if (fontList[activeFont] && !fontList[activeFont].isPremium) {
      lastFreeFont.current = activeFont
    }
  }, [activeFont, fontList])

  function handleCancelUpgrade() {
    setShowUpgradeModal(false)
    setActiveTheme(lastFreeTheme.current)
    setActiveFont(lastFreeFont.current)
  }

  // Split into active & completed
  const activeMain = mainTasks.filter(t => !t.completed)
  const completedMain = mainTasks.filter(t => t.completed)
  const activeSmall = smallTasks.filter(t => !t.completed)
  const completedSmall = smallTasks.filter(t => t.completed)
  const totalCompleted = completedMain.length + completedSmall.length

  return (
    <div className="min-h-screen flex flex-col items-center py-8 sm:py-20 px-4 sm:px-6 w-full max-w-[600px] mx-auto select-none">
      <div className="paper-grain" />

      {/* HEADER */}
      <header className="w-full mb-10 sm:mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl italic text-ink mb-2">Dayleaf</h1>
        <p className="text-xs sm:text-sm tracking-widest uppercase text-secondary font-medium">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </header>

      {/* MAIN TASKS (3 MAX) */}
      <section className="w-full mb-10 sm:mb-16 rounded-2xl p-5 sm:p-8" style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        <div className="flex justify-between items-baseline mb-6 border-b border-accent pb-2">
          <h2 className="text-ink uppercase tracking-widest text-xs font-bold">Main Tasks</h2>
          <span className="text-xs text-secondary italic">{mainTasks.length} / 3</span>
        </div>

        <div className="space-y-6 mb-4">
          {activeMain.map(task => (
            <TaskRow key={task.id} task={task} isMain={true} size="large" onToggle={toggleTask} />
          ))}
        </div>

        {mainTasks.length < 3 && (
          <form onSubmit={addMainTask} className="w-full mt-2">
            <div className="w-full bg-ink rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center shadow-inner transition-colors duration-400">
              <input
                autoFocus
                className="w-full bg-transparent border-none outline-none text-lg sm:text-xl placeholder-paper placeholder:opacity-70 font-serif italic text-paper caret-paper"
                placeholder="What is your focus today?"
                value={mainInput}
                onChange={(e) => setMainInput(e.target.value)}
              />
            </div>
          </form>
        )}

        <CompletedArea tasks={completedMain} isMain={true} size="large" onToggle={toggleTask} />
      </section>

      {/* SMALL TASKS (5 MAX) */}
      <section className="w-full rounded-2xl p-5 sm:p-8" style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        <div className="flex justify-between items-baseline mb-6 border-b border-accent pb-2">
          <h2 className="text-ink uppercase tracking-widest text-xs font-bold">Small Tasks</h2>
          <span className="text-xs text-secondary italic">{smallTasks.length} / 5</span>
        </div>

        <div className="space-y-4 mb-4">
          {activeSmall.map(task => (
            <TaskRow key={task.id} task={task} isMain={false} size="small" onToggle={toggleTask} />
          ))}
        </div>

        {smallTasks.length < 5 && (
          <form onSubmit={addSmallTask} className="w-full mt-2">
            <div className="w-full bg-ink rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center shadow-inner transition-colors duration-400">
              <input
                className="w-full bg-transparent border-none outline-none text-base sm:text-lg placeholder-paper placeholder:opacity-70 font-serif italic text-paper caret-paper"
                placeholder="Maybe something else?"
                value={smallInput}
                onChange={(e) => setSmallInput(e.target.value)}
              />
            </div>
          </form>
        )}

        <CompletedArea tasks={completedSmall} isMain={false} size="small" onToggle={toggleTask} />
      </section>

      {/* QUIET ENCOURAGEMENT — only at 3+ completed */}
      {totalCompleted >= 3 && (
        <p className="encouragement-msg mt-12 text-sm italic text-secondary/70 font-serif text-center">
          Good work today.
        </p>
      )}

      {/* FOOTER */}
      <footer className="mt-auto pt-12 text-center">
        <p className="reset-text uppercase">Resetting in 24 hours</p>
      </footer>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        {/* THEME PICKER */}
        <ThemePicker 
          activeTheme={activeTheme} 
          setActiveTheme={setActiveTheme} 
          themes={themeList} 
          onPremiumSelect={() => setShowUpgradeModal(true)} 
        />

        {/* SETTINGS BUTTON */}
        <button
          onClick={() => setShowSettingsModal(true)}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110 active:scale-95"
          style={{
            backgroundColor: themeList[activeTheme].colors.accent,
            color: themeList[activeTheme].colors.ink,
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}
          title="Settings"
        >
          ⚙️
        </button>
      </div>

      {/* SETTINGS MODAL */}
      <SettingsModal 
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        themes={themeList}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        fonts={fontList}
        activeFont={activeFont}
        setActiveFont={setActiveFont}
        onPremiumSelect={() => setShowUpgradeModal(true)}
      />

      {/* UPGRADE MODAL */}
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={handleCancelUpgrade} 
        onUnlock={() => setShowUpgradeModal(false)}
        themes={themeList}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
      />
    </div>
  )
}
