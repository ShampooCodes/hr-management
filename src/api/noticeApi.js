import api from "./axios"

export const getAllNoticesApi = () => api.get("/notices")