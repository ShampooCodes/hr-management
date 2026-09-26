import api from "./axios"

export const getAllEmployees = ()=> api.get("/employees")
export const deleteEmployeeApi = (id) => api.delete(`/employees/${id}`)