import api from "./axios"

export const loginApi = (email, password) => {
    return api.post("/auth/login", {email, password})
}