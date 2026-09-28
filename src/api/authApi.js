import api from "./axios"

export const loginApi = (email, password) => {
    return api.post("/auth/login", {email, password})
}

export const registerApi = (data) => api.post("/auth/register", data)