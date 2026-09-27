import api from "./axios"

export const applyLeaveApi = (fromDate, toDate, reason) =>
    api.post("/leaves/apply", { fromDate, toDate, reason})

export const getMyLeavesApi = () => api.get("/leaves/my-leaves")