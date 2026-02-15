# Task Manager

A simple, responsive single-page Task Manager web app built with React and Tailwind CSS. Add tasks, filter by priority, search, and persist everything in your browser.

## Features

- **Add Task** – Task title, priority (Low / Medium / High), and optional due date
- **Display Tasks** – List view with title, priority badge, completion status, and due date
- **Complete & Delete** – Checkbox to mark complete, Delete button per task
- **Priority Filter** – Filter by All, Low, Medium, or High
- **Search** – Filter tasks by title
- **Due Date** – Optional due date; tasks sorted by due date
- **Local Storage** – Tasks are saved automatically and restored on refresh

## Tech Stack

- **React** (functional components, `useState`, `useEffect`)
- **Vite** – build tool and dev server
- **Tailwind CSS** – styling
- **JavaScript** – no TypeScript

## Project Structure

```
src/
  components/
    TaskForm.jsx   # Add task form (title, priority, due date)
    TaskList.jsx   # Renders list of TaskItem
    TaskItem.jsx   # Single task row (checkbox, title, priority, delete)
  App.jsx          # Main app state, filters, localStorage
  main.jsx
  index.css
  constants.js     # STORAGE_KEY, PRIORITIES
```

## Run Locally

```bash
npm install
npm run dev
```

Then open  http://task-manager-7kiiur5bf-mauryasushobhit-3351s-projects.vercel.app/:

## Build for Production

```bash
npm run build
npm run preview   # optional: preview production build locally
```

## Deployment

- **Vercel and github

## License

MIT

