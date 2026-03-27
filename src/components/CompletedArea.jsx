import React from 'react'
import TaskRow from './TaskRow'

/**
 * CompletedArea — Renders completed tasks below the active ones.
 * Only shows if there are completed tasks.
 * 
 * Props:
 *   tasks    - array of completed task objects
 *   isMain   - boolean
 *   size     - 'large' | 'small'
 *   onToggle - function(id, isMain)
 */
export default function CompletedArea({ tasks, isMain, size, onToggle }) {
  if (tasks.length === 0) return null

  return (
    <div className="completed-area mt-6 pt-4 border-t border-accent/40">
      <p className="text-[10px] text-secondary/60 uppercase tracking-widest mb-3 font-medium">
        Completed
      </p>
      <div className={`${size === 'large' ? 'space-y-4' : 'space-y-3'}`}>
        {tasks.map(task => (
          <div key={task.id} className="slide-in">
            <TaskRow task={task} isMain={isMain} size={size} onToggle={onToggle} />
          </div>
        ))}
      </div>
    </div>
  )
}
