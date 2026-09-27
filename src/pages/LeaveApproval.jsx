import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getALLLeaavesApi, updateLeaveStatusApi } from "../api/leaveApi";
import { ArrowLeft, Check, X } from "lucide-react";

function LeaveApproval() {
    const navigate = useNavigate()
    const [leaves, setLeaves] =useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [updatingId, setUpdatingId] = useState(null)

    const fetchLeaves = async ()=>{
        setLoading(true)
        setError("")
        try {
            const res =await getALLLeaavesApi()
            setLeaves(res.data)
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to load leaves"
            setError(msg)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=> {
        fetchLeaves()
    }, [])

    const handleUpdate = async (id, status)=>{
        setUpdatingId(id)
        try {
             await updateLeaveStatusApi(id, status)
            setLeaves((prev) =>
                prev.map((l) => (l._id === id ? { ...l, status } : l))
            )
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to update leave"
            setError(msg)
        } finally {
        setUpdatingId(null)
        }
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
                    <h1 className="text-2xl font-semibold text-white tracking-wide">Leave Approval</h1>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {loading && <p className="text-gray-500 text-sm">Loading leaves...</p>}

                {!loading && leaves.length === 0 && !error && (
                    <p className="text-gray-500 text-sm">No leave requests found</p>
                )}

                {!loading && leaves.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {leaves.map((leave) => (
                            <div
                                key={leave._id} 
                                className="flex items-center justify-between border border-gray-700 rounded-xl px-5 py-4"
                            >
                                <div>
                                    <p className="text-white text-sm font-medium">
                                        {leave.employee?.fullName || "Unknown"}
                                        <span className="text-gray-500 text-xs ml-2">
                                            ({leave.employee?.department || "—"})
                                        </span>
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">{leave.reason}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {leave.status === "pending" ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdate(leave._id, "approved")}
                                                disabled={updatingId === leave._id}
                                                className="border border-gray-600 text-white p-2 rounded-full hover:border-green-400 hover:text-green-400 transition disabled:opacity-50"
                                            >
                                                <Check size={16} strokeWidth={1.5} />
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(leave._id, "rejected")}
                                                disabled={updatingId === leave._id}
                                                className="border border-gray-600 text-white p-2 rounded-full hover:border-red-400 hover:text-red-400 transition disabled:opacity-50"
                                            >
                                                <X size={16} strokeWidth={1.5} />
                                            </button>
                                        </>
                                    ) : (
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full capitalize border ${
                                                leave.status === "approved"
                                                    ? "text-green-400 border-green-700"
                                                    : "text-red-400 border-red-700"
                                            }`}
                                        >
                                            {leave.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LeaveApproval