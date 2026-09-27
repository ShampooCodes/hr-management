import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkInApi, checkOutApi, getMyAttendanceApi } from "../api/attendanceApi"  
import { ArrowLeft, LogIn, LogOut} from "lucide-react"

function MyAttendance(){
    const navigate = useNavigate()
    const [records, setRecords] = useState([])
    const [loading, setLoading ] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [message, setMessage] = useState("")

    const fetchRecords = async () => {
        try {
            const res =  await getMyAttendanceApi()
            setRecords(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRecords()
    }, [])

    const handleCheckIn = async () => {
        setActionLoading(true)
        setMessage("")
        try {
            await checkInApi()
            setMessage("Checked in successfully")
            fetchRecords()
        } catch (error) {
            const msg = error.response?.data?.message || "Check-in failed"
            setMessage(msg)

        } finally {
            setActionLoading(false)
        }
    }

    const handleCheckOut = async () => {
        setActionLoading(true)
        setMessage("")
        try {
            await checkOutApi()
            setMessage("Checked out successfully")
            fetchRecords()
        } catch (error) {
            const msg = error.response?.data?.message || "Check-out failed"
            setMessage(msg)
        
        } finally {
            setActionLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate("/employee")} className="text-gray-400 hover:text-white transition">
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">My Attendance</h1>
                </div>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={handleCheckIn}
                        disabled={actionLoading}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        <LogIn size={16} strokeWidth={1.5}/>
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={actionLoading}
                        className="flex items-center gap-2 border border-gray-600 text-white px-4 py-4 rounded-full text-sm font-medium hover:border-white transition disabled:opacity-50"
                    >
                        <LogOut size={16} strokeWidth={1.5} />
                        Check Out
                    </button>
                </div>

                {message && <p className="text-gray-400 text-sm mb-6">{message}</p>}

                {loading && <p className="text-gray-500 text-sm">Loading records...</p>}
                {!loading && records.length === 0 && <p className="text-gray-500 text-sm">No attendance records yet</p>}

                {!loading && records.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {records.map((rec) => (
                            <div key={rec._id} className="flex items-center justify-between border border-gray-700 rounded-xl px-5 py-4">
                                <div>
                                     <p className="text-white text-sm font-medium">
                                        {new Date(rec.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        In: {rec.checkInTime || "—"} | Out: {rec.checkOutTime || "—"}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded-full capitalize">
                                    {rec.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyAttendance