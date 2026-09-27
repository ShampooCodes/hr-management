import api from "./axios"

export const getMyPayrollApi = () => api.get("/payroll/my-payroll")
