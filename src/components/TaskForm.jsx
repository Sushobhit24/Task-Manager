import { useState } from 'react'
import { PRIORITIES } from '../constants'
import { CalendarIcon, PlusIcon } from './Icons'

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAddTask({
      title: trimmed,
      priority,
      dueDate: dueDate || null,
    })
    setTitle('')
    setPriority('Medium')
    setDueDate('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 min-w-0 sm:p-6"
    >
      <h2 className="mb-4 text-base font-semibold text-slate-800 sm:text-lg">Add a new task.</h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-600">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full min-w-0 rounded-lg border border-slate-300 px-4 py-2.5 text-base text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 [touch-action:manipulation]"
          />
        </div>
        <div className="w-full min-w-0 sm:w-36">
          <label htmlFor="priority" className="mb-1 block text-sm font-medium text-slate-600">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 [touch-action:manipulation]"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full min-w-0 sm:w-40">
          <label htmlFor="dueDate" className="mb-1 block text-sm font-medium text-slate-600">
            Due Date
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-base text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 [touch-action:manipulation]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800 sm:w-auto [touch-action:manipulation]"
        >
          <PlusIcon className="h-5 w-5 shrink-0" />
          Add Task
        </button>
      </div>
    </form>
  )
}
