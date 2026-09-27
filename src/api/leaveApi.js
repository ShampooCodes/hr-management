import api from "./axios"

export const applyLeaveApi = (fromDate, toDate, reason) =>
    api.post("/leaves/apply", { fromDate, toDate, reason})

export const getMyLeavesApi = () => api.get("/leaves/my-leaves")
export const getALLLeaavesApi = () => api.get("/leaves")
export const updateLeaveStatusApi = (id, status) => api.put(`/leaves/${id}/status`, {status})