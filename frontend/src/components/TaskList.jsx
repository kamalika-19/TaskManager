import { TaskItem } from "./TaskItem";

export function TaskList({ tasks, loading, error, onToggle, onDelete, onEdit }) {
  if (loading) return (
    <div className="state-message">
      <div className="spinner" />
      <p>Loading tasks…</p>
    </div>
  );
  if (error) return <div className="state-message state-error"><p>⚠ Could not load tasks: {error}</p></div>;
  if (tasks.length === 0) return <div className="state-message"><p>No tasks here. Add one above!</p></div>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}