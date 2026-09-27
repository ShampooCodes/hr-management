import api from "./axios"

export const getAllNoticesApi = () => api.get("/notices")
export const postNoticeApi = (data) => api.post("/notices", data)