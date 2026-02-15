export default function TaskItem({ task, onToggleComplete, onDelete }) {
  const priorityColors = {
    Low: 'bg-slate-100 text-slate-600',
    Medium: 'bg-amber-100 text-amber-800',
    High: 'bg-rose-100 text-rose-700',
  }
  const badgeClass = priorityColors[task.priority] || priorityColors.Low

  return (
    <li
      className={`flex flex-wrap items-center gap-3 rounded-xl border bg-white p-3 shadow-sm transition min-w-0 sm:flex-nowrap sm:p-4 ${
        task.completed ? 'border-slate-200 opacity-75' : 'border-slate-200/80'
      }`}
    >
      <label className="flex min-h-[44px] min-w-[44px] shrink-0 cursor-pointer items-center justify-center gap-2 [touch-action:manipulation]">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 [touch-action:manipulation]"
        />
        <span className="sr-only">Mark as {task.completed ? 'incomplete' : 'complete'}</span>
      </label>
      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm font-medium text-slate-800 sm:text-base ${
            task.completed ? 'line-through text-slate-500' : ''
          }`}
        >
          {task.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
          >
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-xs text-slate-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="min-h-[44px] min-w-[44px] shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/20 active:bg-rose-100 [touch-action:manipulation]"
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  )
}
