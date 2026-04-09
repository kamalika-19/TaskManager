import { useState } from "react";

export function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setSubmitting(true);
    setError(null);
    try {
      await onAdd(trimmed);
      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          maxLength={200}
          disabled={submitting}
          className="task-input"
        />
        <button type="submit" disabled={submitting || !title.trim()} className="btn btn-primary">
          {submitting ? "Adding…" : "Add Task"}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}