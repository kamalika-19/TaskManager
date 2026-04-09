const express = require("express");
const router = express.Router();
const store = require("../store");

router.get("/", (req, res) => {
  const { filter } = req.query;
  let tasks = store.getAll();
  if (filter === "completed") tasks = tasks.filter((t) => t.completed);
  else if (filter === "incomplete") tasks = tasks.filter((t) => !t.completed);
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim().length === 0)
    return res.status(400).json({ error: "Title is required and must be a non-empty string." });
  if (title.trim().length > 200)
    return res.status(400).json({ error: "Title must be 200 characters or fewer." });
  res.status(201).json(store.create(title));
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;
  if (!store.getById(id)) return res.status(404).json({ error: "Task not found." });
  const updates = {};
  if (typeof completed !== "undefined") {
    if (typeof completed !== "boolean") return res.status(400).json({ error: "'completed' must be a boolean." });
    updates.completed = completed;
  }
  if (typeof title !== "undefined") {
    if (typeof title !== "string" || title.trim().length === 0)
      return res.status(400).json({ error: "Title must be a non-empty string." });
    if (title.trim().length > 200)
      return res.status(400).json({ error: "Title must be 200 characters or fewer." });
    updates.title = title.trim();
  }
  if (Object.keys(updates).length === 0)
    return res.status(400).json({ error: "No valid fields provided to update." });
  res.json(store.update(id, updates));
});

router.delete("/:id", (req, res) => {
  if (!store.delete(req.params.id)) return res.status(404).json({ error: "Task not found." });
  res.status(200).json({ message: "Task deleted successfully." });
});

module.exports = router;