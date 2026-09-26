import api from "./axios"

export const checkInApi = () => api.post("/attendance/check-in")   
export const checkOutApi = () => api.put("/attendance/check-out")
export const getMyAttendanceApi = () => api.get("/attendance/my-record")  