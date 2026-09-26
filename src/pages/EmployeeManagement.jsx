import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployeeApi, getAllEmployees } from "../api/employeeApi";
import { ArrowLeft, Trash2, User, Mail, Building2 } from "lucide-react"

function EmployeeManagement() {
    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [deletingId, setDeletingId] = useState(null)

    const fetchEmployees = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await getAllEmployees()
            setEmployees(res.data)
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to load employees"
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchEmployees()
    }, [])
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?")
        if(!confirmDelete) return
        setDeletingId(id)

        try {
            await deleteEmployeeApi(id)
            setEmployees((prev) => prev.filter((emp) => emp._id !== id))
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to delete employee"
            setError(msg)
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate("/admin")}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">
                        Employee Management
                    </h1>
                </div>
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                {loading && (
                    <p className="text-gray-500 text-sm">Loading employees...</p>
                )}
                {!loading && employees.length === 0 && !error && (
                    <p className="text-gray-500 text-sm">No employees found</p>
                )}

                {!loading && employees.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {employees.map((emp)=> (
                             <div
                                key={emp._id}
                                className="flex items-center justify-between border border-gray-700 rounded-xl px-5 py-4 hover:border-white transition"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="border border-gray-600 rounded-full p-2">
                                        <User className="text-white" size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">{emp.fullName}</p>
                                        <div className="flex items-center gap-3 text-gray-500 text-xs mt-1">
                                            <span className="flex items-center gap-1">
                                                <Mail size={12} strokeWidth={1.5} />
                                                {emp.email}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Building2 size={12} strokeWidth={1.5} />
                                                {emp.department || "—"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded-full capitalize">
                                        {emp.role}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(emp._id)}
                                        disabled={deletingId === emp._id}
                                        className="text-gray-400 hover:text-red-500 transition disabled:opacity-50"
                                    >
                                        <Trash2 size={18} strokeWidth={1.5} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmployeeManagement