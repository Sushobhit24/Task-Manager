import TaskItem from './TaskItem'
import { ClipboardIcon } from './Icons'

export default function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl py-8 text-center sm:py-12">
        <ClipboardIcon className="mx-auto mb-4 h-12 w-12 text-slate-300 sm:h-14 sm:w-14" />
        <p className="text-base font-semibold text-slate-700 sm:text-lg">No tasks found</p>
        <p className="mt-1 px-2 text-sm text-slate-500">
          Add a new task above or adjust your filters.
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
