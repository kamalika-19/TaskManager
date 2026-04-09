import { useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { FilterBar } from "./components/FilterBar";
import { useTasks } from "./hooks/useTasks";
import "./App.css";

export default function App() {
  const [filter, setFilter] = useState("");
  const { tasks, loading, error, addTask, toggleTask, editTask, deleteTask } = useTasks(filter);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title"><span className="title-accent">✓</span> Task Manager</h1>
        <p className="app-subtitle">Stay on top of things.</p>
      </header>
      <main className="app-main">
        <TaskForm onAdd={addTask} />
        <FilterBar filter={filter} onChange={setFilter} tasks={tasks} />
        <TaskList tasks={tasks} loading={loading} error={error} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      </main>
    </div>
  );
}