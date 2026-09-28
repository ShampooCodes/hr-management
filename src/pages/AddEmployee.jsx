import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/authApi";
import { ArrowLeft, UserPlus } from "lucide-react";

function AddEmployee(){
    const navigate = useNavigate()
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "employee",
        department: "",
        designation: "",
    })

    const [error, setError]= useState("")
    const [success, setSuccess] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleChange= (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const validate= () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!form.fullName.trim()) return "Full name is required"
        if (!form.email) return "Email is required"
        if (!emailRegex.test(form.email)) return "Enter a valid email address"
        if (!form.password) return "Password is required"
        if (form.password.length < 6) return "Password must be at least 6 characters"
        return ""
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess("")

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        setError("")
        setSubmitting(true)
        try {
            await registerApi(form)
            setSuccess("Employee added successfully")
            setForm({
                fullName: "",
                email: "",
                password: "",
                role: "employee",
                department: "",
                designation: "",
            })
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to add employee"
            setError(msg)
        } finally {
            setSubmitting(false)
        }   
    }

    const inputClass = "w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"

    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/admin/employees")}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                     <h1 className="text-2xl font-semibold text-white tracking-wide">Add Employee</h1>
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 border border-gray-700 rounded-xl p-6"
                >
                    <div>
                        <label className="text-gray-500 text-xs">Full Name</label>
                        <input 
                            name="fullName" 
                            value={form.fullName} 
                            onChange={handleChange} 
                            className={inputClass} 
                        />
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs">Password</label>
                        <input
                            type="password" 
                            name="password" value={form.password} 
                            onChange={handleChange} 
                            className={inputClass} 
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-gray-500 text-xs">Department</label>
                            <input name="department" value={form.department} onChange={handleChange} className={inputClass} />
                        </div>
                        <div className="flex-1">
                            <label className="text-gray-500 text-xs">Designation</label>
                            <input name="designation" value={form.designation} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-500 text-xs">Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full bg-black border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                        >
                            <option value="employee" className="bg-black">Employee</option>
                            <option value="admin" className="bg-black">Admin</option>
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    {success && <p className="text-green-400 text-xs">{success}</p>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50 mt-2"
                    >
                        <UserPlus size={16} strokeWidth={1.5} />
                        {submitting ? "Adding..." : "Add Employee"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee