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
export default function TaskRow({ task, isMain, size = 'large', onToggle }) {
  return (
    <div
      onClick={() => onToggle(task.id, isMain)}
      className={`task-item flex items-center group cursor-pointer ${task.completed ? 'task-completed' : ''}`}
    >
      <div
        className={`checkbox-ring ${size === 'large' ? 'w-5 h-5 mr-5' : 'w-4 h-4 mr-4'} rounded-full border border-accent flex items-center justify-center ${task.completed ? 'checked bg-accent border-secondary' : 'group-hover:border-secondary'}`}
      >
        {task.completed && (
          <div className={`checkbox-dot ${size === 'large' ? 'w-2 h-2' : 'w-1.5 h-1.5'} rounded-full bg-secondary`} />
        )}
      </div>
      <span className={`${size === 'large' ? 'text-xl sm:text-2xl font-medium tracking-tight font-serif italic' : 'text-base sm:text-lg font-serif italic'} text-ink`}>
        {task.text}
      </span>
    </div>
  )
}
