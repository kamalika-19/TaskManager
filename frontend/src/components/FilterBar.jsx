export function FilterBar({ filter, onChange, tasks }) {
  const done = tasks.filter((t) => t.completed).length;
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {[["", "All"], ["incomplete", "Active"], ["completed", "Done"]].map(([val, label]) => (
          <button key={val} className={`filter-tab ${filter === val ? "active" : ""}`} onClick={() => onChange(val)}>
            {label}
          </button>
        ))}
      </div>
      <span className="task-count">{done}/{tasks.length} done</span>
    </div>
  );
}