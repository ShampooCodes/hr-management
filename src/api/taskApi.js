import api from "./axios"

export const getMyTasksApi = () => api.get("/tasks/my-tasks")
export const updateTaskStatusApi = (id, status) => api.put(`/tasks/${id}/status`, {status})
export const assignTaskApi = (data) => api.post("/tasks/assign", data)
export const getAllTasksApi = () => api.get("/tasks")
export const deleteTaskApi = (id) => api.delete(`/tasks/${id}`)