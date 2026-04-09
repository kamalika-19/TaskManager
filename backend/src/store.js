const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

// 📥 Read tasks from file
function readTasks() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// 💾 Write tasks to file
function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// 🆔 Generate ID
function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

const store = {
  getAll() {
    return readTasks();
  },

  getById(id) {
    return readTasks().find((t) => t.id === id) || null;
  },

  create(title) {
    const tasks = readTasks();

    const task = {
      id: generateId(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(task);
    writeTasks(tasks);
    return task;
  },

  update(id, fields) {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) return null;

    tasks[index] = { ...tasks[index], ...fields };
    writeTasks(tasks);
    return tasks[index];
  },

  delete(id) {
    let tasks = readTasks();
    const initialLength = tasks.length;

    tasks = tasks.filter((t) => t.id !== id);

    if (tasks.length === initialLength) return false;

    writeTasks(tasks);
    return true;
  },
};

module.exports = store;