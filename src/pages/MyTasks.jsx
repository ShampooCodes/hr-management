import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyTasksApi, updateTaskStatusApi } from "../api/taskApi";
import { ArrowLeft, CheckSquare } from "lucide-react";

function MyTasks() {
    const navigate = useNavigate()
    
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [updatingId, setUpdatingId] = useState(null)

    const fetchTasks = async()=> {
        setLoading(true)
        setError("")
        try {
            const res = await getMyTasksApi()
            setTasks(res.data)
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to load tasks"
            setError(msg)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleStatusChange = async (id, status) => {
        setUpdatingId(id)
        try {
            await updateTaskStatusApi(id, status)
            setTasks((prev)=>
                prev.map((t) => (t._id === id ? {...t, status } : t))
            )
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to update task"
            setError(msg)
        } finally {
            setUpdatingId(null)
        }
    }

     const statusColor = (status) => {
        if (status === "done") return "text-green-400 border-green-700"
        if (status === "in-progress") return "text-amber-400 border-amber-700"
        return "text-gray-400 border-gray-700"
    }
    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate("/employee")} className="text-gray-400 hover:text-white transition">
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">My Tasks</h1>
                </div>

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
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 text-xs">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                        disabled={updatingId === task._id}
                                        className="bg-black border border-gray-700 text-white text-xs rounded-full px-3 py-1 outline-none"
                                    >
                                        <option value="pending" className="bg-black">Pending</option>
                                        <option value="in-progress" className="bg-black">In Progress</option>
                                        <option value="done" className="bg-black">Done</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyTasks