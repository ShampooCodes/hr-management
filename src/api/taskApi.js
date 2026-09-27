import api from "./axios"

export const getMyTasksApi = () => api.get("/tasks/my-tasks")
export const updateTaskStatusApi = (id, status) => api.put(`/tasks/${id}/status`, {status})