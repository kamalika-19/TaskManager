import { useState, useEffect, useCallback } from "react";
import { api } from "../api";

export function useTasks(filter) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTasks(await api.getTasks(filter));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const addTask = async (title) => {
    const task = await api.createTask(title);
    setTasks((prev) => [task, ...prev]);
  };
  const toggleTask = async (id, completed) => {
    const updated = await api.updateTask(id, { completed: !completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };
  const editTask = async (id, title) => {
    const updated = await api.updateTask(id, { title });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };
  const deleteTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, loading, error, addTask, toggleTask, editTask, deleteTask };
}