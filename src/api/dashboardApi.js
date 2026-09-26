import api from "./axios"

export const getEmployeeStatsApi = () => api.get("/dashboard/employee-stats")
export const getAdminStatsApi = () => api.get("/dashboard/admin-stats")