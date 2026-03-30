import React from 'react'

/**
 * TaskRow — A single task item with checkbox and text.
 * 
 * Props:
 *   task      - { id, text, completed }
 *   isMain    - boolean, whether this is a main task
 *   size      - 'large' | 'small'
 *   onToggle  - function(id, isMain) called on click
 */
export default function TaskRow({ task, isMain, size = 'large', onToggle, dissolving = false }) {
  return (
    <div
      onClick={() => !dissolving && onToggle(task.id, isMain)}
      className={`task-item flex items-center group cursor-pointer active:scale-[0.98] transition-all duration-200 ${task.completed ? 'task-completed' : ''} ${dissolving ? 'dissolving' : ''}`}
    >
      <div className="p-2 -ml-2 mr-2">
        <div
          className={`checkbox-ring ${size === 'large' ? 'w-6 h-6' : 'w-5 h-5'} rounded-full border border-accent flex items-center justify-center ${task.completed ? 'checked bg-accent border-secondary' : 'group-hover:border-secondary'}`}
        >
          {task.completed && (
            <div className={`checkbox-dot ${size === 'large' ? 'w-2.5 h-2.5' : 'w-2 h-2'} rounded-full bg-secondary`} />
          )}
        </div>
      </div>
      <span className={`${size === 'large' ? 'text-xl sm:text-2xl font-medium tracking-tight font-serif italic' : 'text-base sm:text-lg font-serif italic'} text-ink flex-1`}>
        {task.text}
      </span>
    </div>
  )
}
