const BASE_URL = "/tasks";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "An unexpected error occurred.");
  return data;
}

export const api = {
  async getTasks(filter = "") {
    const query = filter ? `?filter=${filter}` : "";
    return handleResponse(await fetch(`${BASE_URL}${query}`));
  },
  async createTask(title) {
    return handleResponse(await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }));
  },
  async updateTask(id, fields) {
    return handleResponse(await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    }));
  },
  async deleteTask(id) {
    return handleResponse(await fetch(`${BASE_URL}/${id}`, { method: "DELETE" }));
  },
};