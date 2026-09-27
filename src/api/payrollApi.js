import api from "./axios"

export const getMyPayrollApi = () => api.get("/payroll/my-payroll")
export const generatePayrollApi = (data) =>api.post("/payroll/generate", data)
export const getAllPayrollsApi = () => api.get("/payroll")
