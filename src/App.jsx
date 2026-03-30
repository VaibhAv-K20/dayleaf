import React, { useState, useRef, useEffect, useCallback } from 'react'
import useTasks from './hooks/useTasks'
import useTheme from './hooks/useTheme'
import useFont from './hooks/useFont'
import TaskRow from './components/TaskRow'

import Sidebar from './components/Sidebar'
import UpgradeModal from './components/UpgradeModal'

/**
 * App — The main Dayleaf layout.
 */
const MAX_MAIN = 100
const MAX_SMALL = 60

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
  const [showSidebar, setShowSidebar] = useState(false)
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem('premium') === 'true')
  const [pendingCompleting, setPendingCompleting] = useState(new Set())
  const [undoToast, setUndoToast] = useState(null)
  
  const lastFreeTheme = useRef('classic')
  const lastFreeFont = useRef('playfair')
  const undoTimeoutRef = useRef(null)

  // When premium changes, persist it
  useEffect(() => {
    if (isPremium) {
      localStorage.setItem('premium', 'true')
    }
  }, [isPremium])

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
    if (!isPremium) {
      setActiveTheme(lastFreeTheme.current)
      setActiveFont(lastFreeFont.current)
    }
  }

  // Handle task toggle with "Thanos" effect and Undo
  const handleTaskToggle = useCallback((id, isMain) => {
    const taskList = isMain ? mainTasks : smallTasks
    const task = taskList.find(t => t.id === id)
    
    if (!task) return

    // If uncompleting (unlikely to happen from main view now, but just in case)
    if (task.completed) {
      toggleTask(id, isMain)
      return
    }

    // Start dissolving animation (Thanos effect)
    setPendingCompleting(prev => new Set(prev).add(id))
    
    setTimeout(() => {
      // Actually complete it
      toggleTask(id, isMain)
      setPendingCompleting(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })

      // Show Undo Toast
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current)
      setUndoToast({ id, isMain, text: task.text })
      
      undoTimeoutRef.current = setTimeout(() => {
        setUndoToast(null)
      }, 5000)
    }, 700) // Match CSS animation duration
  }, [mainTasks, smallTasks, toggleTask])

  const handleUndo = () => {
    if (undoToast) {
      toggleTask(undoToast.id, undoToast.isMain)
      setUndoToast(null)
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current)
    }
  }

  const activeMain = mainTasks.filter(t => !t.completed)
  const completedMain = mainTasks.filter(t => t.completed)
  const activeSmall = smallTasks.filter(t => !t.completed)
  const completedSmall = smallTasks.filter(t => t.completed)
  const totalCompleted = completedMain.length + completedSmall.length
  const totalTasks = mainTasks.length + smallTasks.length
  const allDone = totalTasks > 0 && totalCompleted === totalTasks

  return (
    <div className="min-h-screen w-full relative">
      <div className={`flex flex-col items-center pt-16 pb-8 sm:py-20 px-4 sm:px-6 w-full max-w-[600px] mx-auto select-none animate-fade-in ${allDone ? 'all-done-bg' : ''}`}>
        <div className="paper-grain" />

      {/* HEADER */}
      <header className="relative w-full mb-10 sm:mb-16 text-center flex items-center justify-center">
        {/* HAMBURGER MENU */}
        <button 
          onClick={() => setShowSidebar(true)}
          className="absolute left-0 w-12 h-12 flex flex-col justify-center gap-[5px] opacity-60 hover:opacity-100 transition-opacity"
          title="Open Settings"
        >
          <div className="w-6 h-[2px] rounded-full" style={{ backgroundColor: 'var(--color-ink)' }}></div>
          <div className="w-6 h-[2px] rounded-full" style={{ backgroundColor: 'var(--color-ink)' }}></div>
          <div className="w-4 h-[2px] rounded-full" style={{ backgroundColor: 'var(--color-ink)' }}></div>
        </button>
        <div>
          <h1 className="text-3xl sm:text-4xl italic text-ink mb-2">Dayleaf</h1>
          <p className="text-xs sm:text-sm tracking-widest uppercase text-secondary font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </header>

      {/* MAIN TASKS (3 MAX) */}
      <section className="w-full mb-10 sm:mb-16 rounded-2xl p-5 sm:p-8" style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        <div className="flex justify-between items-baseline mb-6 border-b border-accent pb-2">
          <h2 className="text-ink uppercase tracking-widest text-xs font-bold">Main Tasks</h2>
          <span className="text-xs text-secondary italic">{activeMain.length} / 3</span>
        </div>

        <div className="space-y-6 mb-4">
          {activeMain.map(task => (
            <TaskRow 
              key={task.id} 
              task={task} 
              isMain={true} 
              size="large" 
              onToggle={handleTaskToggle} 
              dissolving={pendingCompleting.has(task.id)}
            />
          ))}
        </div>

        {activeMain.length < 3 && (
          <form onSubmit={addMainTask} className="w-full mt-2">
            <div className="w-full bg-ink rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center shadow-inner transition-colors duration-400">
              <textarea
                autoFocus
                rows="1"
                maxLength={MAX_MAIN}
                className="task-textarea w-full bg-transparent border-none outline-none text-lg sm:text-xl placeholder-paper placeholder:opacity-70 font-serif italic text-paper caret-paper resize-none overflow-y-auto max-h-[120px]"
                placeholder={activeMain.length === 0 ? "What matters today?" : "What is your focus today?"}
                value={mainInput}
                onChange={(e) => {
                  setMainInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addMainTask(e);
                  }
                }}
              />
              {mainInput.length > 0 && (
                <div className={`char-count absolute -bottom-6 right-2 text-[10px] font-serif italic transition-opacity duration-300 ${mainInput.length > MAX_MAIN * 0.8 ? 'opacity-100' : 'opacity-0'}`} style={{ color: 'var(--color-paper)' }}>
                  {mainInput.length >= MAX_MAIN ? "One clear task is enough —" : `${mainInput.length} / ${MAX_MAIN}`}
                </div>
              )}
            </div>
          </form>
        )}
      </section>

      {/* SMALL TASKS (5 MAX) */}
      <section className="w-full rounded-2xl p-5 sm:p-8" style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        <div className="flex justify-between items-baseline mb-6 border-b border-accent pb-2">
          <h2 className="text-ink uppercase tracking-widest text-xs font-bold">Small Tasks</h2>
          <span className="text-xs text-secondary italic">{activeSmall.length} / 5</span>
        </div>

        <div className="space-y-4 mb-4">
          {activeSmall.map(task => (
            <TaskRow 
              key={task.id} 
              task={task} 
              isMain={false} 
              size="small" 
              onToggle={handleTaskToggle} 
              dissolving={pendingCompleting.has(task.id)}
            />
          ))}
        </div>

        {activeSmall.length < 5 && (
          <form onSubmit={addSmallTask} className="w-full mt-2">
            <div className="w-full bg-ink rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center shadow-inner transition-colors duration-400">
              <textarea
                rows="1"
                maxLength={MAX_SMALL}
                className="task-textarea w-full bg-transparent border-none outline-none text-base sm:text-lg placeholder-paper placeholder:opacity-70 font-serif italic text-paper caret-paper resize-none overflow-y-auto max-h-[100px]"
                placeholder="Maybe something else?"
                value={smallInput}
                onChange={(e) => {
                  setSmallInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addSmallTask(e);
                  }
                }}
              />
              {smallInput.length > 0 && (
                <div className={`char-count absolute -bottom-5 right-2 text-[9px] font-serif italic transition-opacity duration-300 ${smallInput.length > MAX_SMALL * 0.7 ? 'opacity-100' : 'opacity-0'}`} style={{ color: 'var(--color-paper)' }}>
                   {smallInput.length >= MAX_SMALL ? "Keep it short —" : `${smallInput.length} / ${MAX_SMALL}`}
                </div>
              )}
            </div>
          </form>
        )}
      </section>

      {/* QUIET ENCOURAGEMENT — only at 3+ completed */}
      {allDone ? (
        <p className="encouragement-msg mt-12 text-lg italic text-ink font-serif text-center">
          You've completed everything. Rest now.
        </p>
      ) : totalCompleted >= 3 && (
        <p className="encouragement-msg mt-12 text-sm italic text-secondary/70 font-serif text-center">
          Good work today.
        </p>
      )}

      {totalCompleted > 0 && !allDone && (
        <div className="completed-count font-serif animate-fade-in">
          {totalCompleted} task{totalCompleted !== 1 ? 's' : ''} completed today
        </div>
      )}



      </div>

      {/* SIDEBAR & MODALS - Moved outside animated container for fixed positioning stability */}
      <Sidebar 
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        themes={themeList}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        fonts={fontList}
        activeFont={activeFont}
        setActiveFont={setActiveFont}
        completedTasks={[
          ...completedMain.map(t => ({ ...t, _isMain: true })),
          ...completedSmall.map(t => ({ ...t, _isMain: false }))
        ]}
        onToggleTask={toggleTask}
        onPremiumSelect={() => {
          if (!isPremium) setShowUpgradeModal(true)
        }}
      />

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={handleCancelUpgrade} 
        onUnlock={() => {
          setIsPremium(true)
          localStorage.setItem('premium', 'true')
          setShowUpgradeModal(false)
        }}
        themes={themeList}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
      />

      {undoToast && (
        <div className="undo-toast">
          <span className="text-sm opacity-80">Task completed</span>
          <button onClick={handleUndo} className="undo-button">
            Undo
          </button>
        </div>
      )}
    </div>
  )
}
