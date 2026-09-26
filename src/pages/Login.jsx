import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginApi } from "../api/authApi"
import { Users, Mail, Lock, Building2 } from "lucide-react"

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [formError, setFormError] = useState("")
    const [loading, setLoading] = useState(false)

    const clearErrors = ()=> {
        setEmailError("")
        setPasswordError("")
        setFormError("")
    }

    const validate = () => {
        clearErrors()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        if (!email) {
            setEmailError("Email is required")
            return false
        }
         if (!emailRegex.test(email)) {
            setEmailError("Enter a valid email address")
            return false
        }
        if (!password) {
            setPasswordError("Password is required")
            return false
        }
         if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters")
            return false
        }

        return true
    }
    const handleLogin =async (e) => {
        e.preventDefault()
        if (!validate()) return

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
            clearErrors()
            const msg = error.response?.data?.message || "Login failed, try again"
            setFormError(msg)
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="h-screen w-full flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center mb-10">
                    <div className="border border-white rounded-full p-4 mb-4">
                        <Building2 className="text-white" size={32} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">HR Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Sign in to Continue</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    <div>
                        <div className="flex items-center gap-3 border-b border-gray-600 focus-within:border-white pb-2">
                            <Mail className="text-gray-400" size={18} strokeWidth={1.5} />
                            <input
                                type="email"
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent outline-none text-white placeholder-gray-500 w-full text-sm"
                                required
                            />
                        </div>
                        {emailError && (
                            <p className="text-red-500 text-xs mt-1.5 pl-2">
                                {emailError}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 border-b border-gray-600 focus-within:border-white pb-2">
                            <Lock className="text-gray-400" size={18} strokeWidth={1.5} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-transparent outline-none text-white placeholder-gray-500 w-full text-sm"
                            />
                        </div>
                        {passwordError && (
                            <p className="text-red-500 text-xs mt-1.5 pl-2">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    {formError && (
                        <p className="text-red-500 text-xs px-3 py-2 rounded">{formError}</p>
                    )}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-white text-black font-medium py-2.5 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        {loading ? "logging in..." : "Login"}
                    </button>
                </form>
                <div className="flex items-center justify-center gap-2 mt-8 text-gray-600 text-xs">
                    <Users size={14} strokeWidth={1.5} />
                    <span>Admin & Employee Access</span>
                </div>
            </div>
        </div>
    )
}

export default Login