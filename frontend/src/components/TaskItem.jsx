import { useState } from "react";

export function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async () => {
    setBusy(true);
    try {
      await onToggle(task.id, task.completed);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await onDelete(task.id);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const trimmed = editTitle.trim();

    if (!trimmed || trimmed === task.title) {
      setEditing(false);
      return;
    }

    setBusy(true);
    try {
      await onEdit(task.id, trimmed);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""} ${busy ? "busy" : ""}`}>
      
      {/* LEFT SIDE */}
      <div className="task-main">
        
        {/* ✅ REAL CHECKBOX */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={busy}
          className="task-checkbox"
        />

        {/* ✏️ EDIT MODE */}
        {editing ? (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
              maxLength={200}
              disabled={busy}
              className="edit-input"
            />

            <button
              type="submit"
              disabled={busy || !editTitle.trim()}
              className="btn save-btn"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => {
                setEditTitle(task.title);
                setEditing(false);
              }}
              className="btn cancel-btn"
            >
              Cancel
            </button>
          </form>
        ) : (
          <span
            className="task-title"
            onDoubleClick={() => setEditing(true)}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="task-actions">
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="btn edit-btn"
            disabled={busy}
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="btn delete-btn"
          disabled={busy}
        >
          Delete
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="item-error">{error}</p>}
    </li>
  );
}