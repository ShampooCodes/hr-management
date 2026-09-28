import { Navigate, replace } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token) {
        return <Navigate to="/" replace />
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to={role === "admin" ? "/admin" : "/employee"} replace />
    }
    return children
}

export default ProtectedRoute