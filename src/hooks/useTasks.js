import { useState, useEffect } from 'react'

/**
 * useTasks — Custom hook for task state management.
 * 
 * Handles:
 *   - Loading/saving tasks from localStorage
 *   - Adding tasks with hard limits (3 main, 5 small)
 *   - Toggling task completion
 *   - 24-hour auto-reset (midnight clears all)
 * 
 * Returns:
 *   { mainTasks, smallTasks, mainInput, smallInput,
 *     setMainInput, setSmallInput, addMainTask, addSmallTask, toggleTask }
 */
export default function useTasks() {
  const [mainTasks, setMainTasks] = useState(() => {
    const saved = localStorage.getItem('mainTasks')
    return saved ? JSON.parse(saved) : []
  })

  const [smallTasks, setSmallTasks] = useState(() => {
    const saved = localStorage.getItem('smallTasks')
    return saved ? JSON.parse(saved) : []
  })

  const [mainInput, setMainInput] = useState('')
  const [smallInput, setSmallInput] = useState('')

  // 24-HOUR RESET — clears the board at midnight
  useEffect(() => {
    const today = new Date().toDateString()
    const savedDate = localStorage.getItem('paperflow_date')

    if (savedDate && savedDate !== today) {
      setMainTasks([])
      setSmallTasks([])
      localStorage.setItem('mainTasks', JSON.stringify([]))
      localStorage.setItem('smallTasks', JSON.stringify([]))
    }
    localStorage.setItem('paperflow_date', today)
  }, [])

  // PERSISTENCE — sync state to localStorage
  useEffect(() => {
    localStorage.setItem('mainTasks', JSON.stringify(mainTasks))
  }, [mainTasks])

  useEffect(() => {
    localStorage.setItem('smallTasks', JSON.stringify(smallTasks))
  }, [smallTasks])

  const addMainTask = (e) => {
    e.preventDefault()
    const activeMainCount = mainTasks.filter(t => !t.completed).length
    if (activeMainCount < 3 && mainInput.trim()) {
      setMainTasks([...mainTasks, { id: Date.now(), text: mainInput.trim(), completed: false }])
      setMainInput('')
    }
  }

  const addSmallTask = (e) => {
    e.preventDefault()
    const activeSmallCount = smallTasks.filter(t => !t.completed).length
    if (activeSmallCount < 5 && smallInput.trim()) {
      setSmallTasks([...smallTasks, { id: Date.now(), text: smallInput.trim(), completed: false }])
      setSmallInput('')
    }
  }

  const toggleTask = (id, isMain) => {
    if (isMain) {
      setMainTasks(mainTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    } else {
      setSmallTasks(smallTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }
  }

  return {
    mainTasks, smallTasks,
    mainInput, smallInput,
    setMainInput, setSmallInput,
    addMainTask, addSmallTask,
    toggleTask,
  }
}
