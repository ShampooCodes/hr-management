import {useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { applyLeaveApi, getMyLeavesApi } from  "../api/leaveApi"
import {ArrowLeft, Send } from "lucide-react"

function MyLeaves(){
    const navigate = useNavigate()
    const [leaves, setLeaves] = useState([])
    const [loading, setLoading] = useState(true)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [reason, setReason] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState("")

    const fetchLeaves = async () => {
        setLoading(true)
        try {
            const res = await getMyLeavesApi()
            setLeaves(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect (() => {
        fetchLeaves()
    }, [])

    const handleApply = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setMessage("")
        try {
            await applyLeaveApi(fromDate, toDate, reason)
            setMessage("Leave applied successfully")
            setFromDate("")
            setToDate("")
            setReason("")
            fetchLeaves()
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to apply leave"
            setMessage(msg)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate("/employee")} className="text-gray-400 hover:text-white transition">
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">My Leaves</h1>
                </div>    

                <form onSubmit={handleApply} className="flex flex-col gap-4 border border-gray-700 rounded-xl p-6 mb-8">
                    <h2 className="text-white text-sm font-medium mb-2">Apply for Leave</h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-gray-500 text-xs">From</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-gray-500 text-xs">To</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                            />
                        </div>
                    </div>
                <div>
                    <label className="text-gray-500 text-xs">Reason</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        rows={3}
                        className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1 resize-none"
                    />
                
                </div>

                {message && <p className="text-gray-400 text-xs">{message}</p>}

                <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50 mt-2"
                >
                    <Send size={16} strokeWidth={1.5} />
                    {submitting ? "Submitting..." : "Apply Leave"}
                </button>
            </form>
            <h2 className="text-white text-sm font-medium mb-4">Leave History</h2>
            {loading && <p className="text-gray-500 text-sm">Loading leaves...</p>}

            {!loading && leaves.length === 0 && <p className="text-gray-500 text-sm">No leave requests yet</p>}

            {!loading && leaves.length > 0 && (
                <div className="flex flex-col gap-3">
                    {leaves.map((leave) => (
                         <div key={leave._id} className="flex items-center justify-between border border-gray-700 rounded-xl px-5 py-4">
                            <div>
                                <p className="text-white text-sm font-medium">
                                    {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">{leave.reason}</p>
                            </div>
                            <span
                                className={`text-xs px-2 py-1 rounded-full capitalize border ${
                                    leave.status === "approved"
                                        ? "text-green-400 border-green-700" 
                                        : leave.status === "rejected"
                                        ? "text-red-400 border-red-700"
                                        : "text-gray-400 border-gray-700"
                                }`}
                            >
                                {leave.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>

    )
}

export default MyLeaves