import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../api/employeeApi";
import { assignTaskApi, getAllTasksApi } from "../api/taskApi";
import { ArrowLeft, CheckSquare, Send } from "lucide-react";

function AssignTask() {
    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState("")

    const fetchData = async () => {
        setLoading(true)
        setError("")
        try {
            const [empRes, taskRes] = await Promise.all([
                getAllEmployees(),
                getAllTasksApi(),
            ])
            setEmployees(empRes.data.filter((e) => e.role !== "admin"))
            setTasks(taskRes.data)
        } catch (error) {
            console.log(error);
            setError("Failed to load data")
            
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    },[])

    const handleAssign = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setMessage("")
        try {
            await assignTaskApi({ title, description, assignedTo, dueDate })
            setMessage("Task assigned successfully")
            setTitle("")
            setDescription("")
            setAssignedTo("")
            setDueDate("")
            fetchData()
        } catch (error) {
            const msg=  error.response?.data?.message || "Failed to assign task"
            setMessage(msg)
        } finally{
            setSubmitting(false)
        }
    }

    const statusColor = (status) => {
        if (status === "done") return "text-green-400 border-green-700"
        if (status === "in-progress") return "text-amber-400 border-amber-700"

        return  "text-gray-400 border-gray-700"
    }

    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate("/admin")}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">Task Management</h1>
                </div>

                <form 
                    onSubmit={handleAssign}
                    className="flex flex-col gap-4 border border-gray-700 rounded-xl p-6 mb-8"
                >
                    <h2 className="text-white text-sm font-medium mb-2">Assign Task</h2>
                    <div>
                        <label className="text-gray-500 text-xs">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={3}
                            className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1 resize-none"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-gray-500 text-xs">Assign To</label>
                            <select
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                                required
                                className="w-full bg-black border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                            >
                                <option value="" className="bg-black">Select employee</option>
                                {employees.map((emp) => (
                                    <option 
                                        key={emp._id} 
                                        value={emp._id} 
                                        className="bg-black"
                                    >
                                        {emp.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-gray-500 text-xs">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                            />
                        </div>
                    </div>

                    {message && <p className="text-gray-400 text-xs">{message}</p>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50 mt-2"
                    >
                        <Send size={16} strokeWidth={1.5} />
                        {submitting ? "Assigning..." : "Assign Task"}
                    </button>
                </form>
                
                <h2 className="text-white text-sm font-medium mb-4">All Tasks</h2>
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {loading && <p className="text-gray-500 text-sm">Loading tasks...</p>}
                {!loading && tasks.length === 0 && !error && (
                    <p className="text-gray-500 text-sm">No tasks assigned yet</p>
                )}

                {!loading && tasks.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="border border-gray-700 rounded-xl px-5 py-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <CheckSquare className="text-white" size={16} strokeWidth={1.5} />
                                        <p className="text-white text-sm font-medium">{task.title}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full capitalize border ${statusColor(task.status)}`}>
                                        {task.status}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-xs mb-3">{task.description}</p>
                                <div className="flex items-center justify-between text-gray-500 text-xs">
                                    <span>Assigned to: {task.assignedTo?.fullName || "—"}</span>
                                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AssignTask