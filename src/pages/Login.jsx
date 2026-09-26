import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginApi } from "../api/authApi"

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin =async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res= await loginApi(email, password)

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.role)
            localStorage.setItem("name", res.data.name)

            if (res.data.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/employee")
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Login failed, try again"
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="h-screen flex flex-col items-center justify-center bg-black gap-4">
            <h1 className="text-4xl font-bold text-white mb-4">HR Management</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
                <input
                    type="email"
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 rounded-lg outline-none bg-white"
                    required
                />
                <input
                    type="password"
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-2 rounded-lg outline-none bg-white"
                    required
                />
                 { error && <p className="text-red-500 text-sm">{error}</p> }
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg"
                >
                    {loading ? "logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login