import { useState, useEffect } from 'react'
import { STORAGE_KEY, PRIORITIES } from './constants'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import {
  LogoIcon,
  ListIcon,
  PendingIcon,
  DoneIcon,
  SearchIcon,
  ChevronDownIcon,
} from './components/Icons'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((t) => ({
      ...t,
      createdAt: t.createdAt ?? t.id ?? Date.now(),
    }))
  } catch {
    return []
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function nextId(tasks) {
  const ids = tasks.map((t) => t.id).filter((n) => typeof n === 'number')
  return ids.length ? Math.max(...ids) + 1 : 1
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'dueEarliest', label: 'Due date (earliest)' },
  { value: 'dueLatest', label: 'Due date (latest)' },
]

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  function handleAddTask({ title, priority, dueDate }) {
    setTasks((prev) => [
      ...prev,
      {
        id: nextId(prev),
        title,
        priority,
        completed: false,
        dueDate,
        createdAt: Date.now(),
      },
    ])
  }

  function handleToggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const filteredByPriority =
    priorityFilter === 'All'
      ? tasks
      : tasks.filter((t) => t.priority === priorityFilter)

  const filteredBySearch = searchQuery.trim()
    ? filteredByPriority.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : filteredByPriority

  const sortedTasks = [...filteredBySearch].sort((a, b) => {
    if (sortBy === 'newest') return (b.createdAt || 0) - (a.createdAt || 0)
    if (sortBy === 'oldest') return (a.createdAt || 0) - (b.createdAt || 0)
    if (sortBy === 'dueEarliest') {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    if (sortBy === 'dueLatest') {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(b.dueDate) - new Date(a.dueDate)
    }
    return 0
  })

  const total = tasks.length
  const pending = tasks.filter((t) => !t.completed).length
  const donePercent = total ? Math.round((total - pending) / total * 100) : 0

  const priorityCounts = { All: tasks.length }
  PRIORITIES.forEach((p) => {
    priorityCounts[p] = tasks.filter((t) => t.priority === p).length
  })

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-6 text-slate-800 sm:px-6 sm:py-8 md:px-8 lg:px-8">
      <div className="mx-auto w-full max-w-2xl min-w-0">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <LogoIcon className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                Task Manager
              </h1>
              <p className="text-xs text-slate-600 sm:text-sm">Stay organized, get things done.</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/60 min-w-0 sm:gap-3 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 sm:h-10 sm:w-10">
                <ListIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-slate-900 sm:text-2xl">{total}</p>
                <p className="text-xs font-medium text-slate-500">Total</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/60 min-w-0 sm:gap-3 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 sm:h-10 sm:w-10">
                <PendingIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-slate-900 sm:text-2xl">{pending}</p>
                <p className="text-xs font-medium text-slate-500">Pending</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/60 min-w-0 sm:gap-3 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 sm:h-10 sm:w-10">
                <DoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-slate-900 sm:text-2xl">{donePercent}%</p>
                <p className="text-xs font-medium text-slate-500">Done</p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-4 sm:space-y-6">
          <TaskForm onAddTask={handleAddTask} />

          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 sm:p-6 min-w-0">
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 shrink-0 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full min-w-0 rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-base text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 [touch-action:manipulation]"
                aria-label="Search tasks by title"
              />
            </div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {['All', ...PRIORITIES].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriorityFilter(p)}
                    className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 [touch-action:manipulation] ${
                      priorityFilter === p
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300'
                    }`}
                  >
                    {p} {priorityCounts[p] ?? 0}
                  </button>
                ))}
              </div>
              <div className="relative w-full min-w-0 sm:w-auto sm:min-w-[11rem]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full min-h-[44px] appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-4 pr-9 text-base text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 [touch-action:manipulation]"
                  aria-label="Sort tasks"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400">
                  <ChevronDownIcon className="h-4 w-4 shrink-0" />
                </span>
              </div>
            </div>
            <TaskList
              tasks={sortedTasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          </div>
        </div>

        <footer className="mt-8 pb-6 text-center text-sm text-slate-500 sm:mt-10">
          Designed and developed by Sushobhit Kumar
        </footer>
      </div>
    </div>
  )
}
