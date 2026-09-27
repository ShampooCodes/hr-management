import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { getMyPayrollApi } from "../api/payrollApi"
import { ArrowLeft, Wallet } from "lucide-react"

function MyPayroll() {
    const navigate = useNavigate()
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchPayroll = async () => {
        setLoading(true)
        setError("")
        try {
            const res= await getMyPayrollApi()
            setRecords(res.data)

        } catch (error) {
            const msg = error.response?.data?.message || "Failed to load payroll"
            setError(msg)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPayroll()
    }, [])

    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate("/employee")} className="text-gray-400 hover:text-white transition">
                        <ArrowLeft size={22} strokeWidth={.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">My Payroll</h1>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {loading && <p className="text-gray-500 text-sm">Loading payroll records...</p>}
                {!loading && records.length === 0 && !error && (
                    <p className="text-gray-500 text-sm">No payroll records</p>
                )}

                {!loading && records.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {records.map((rec) => (
                            <div key={rec._id} className="border border-gray-700 rounded-xl px-5 py-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="border border-gray-600 rounded-full p-2">
                                            <Wallet className="text-white" size={16} strokeWidth={1.5}/>

                                        </div>
                                        <p className="text-white text-sm font-medium">
                                            {rec.month} {rec.year}
                                        </p>
                                    </div>
                                    <p className="text-white text-lg font-semibold">₹{rec.netSalary}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 border-t border-gray-800 pt-3">
                                    <div>
                                        <p> Basic Salary</p>
                                        <p className="text-gray-300 mt-1">₹{rec.basicSalary}</p>
                                    </div>
                                    <div>
                                        <p>Leaves Taken</p>
                                        <p className="text-gray-300 mt-1">{rec.leavesTaken}</p>
                                    </div>
                                    <div>
                                        <p>Deduction</p>
                                        <p className="text-gray-300 mt-1">₹{rec.deduction}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

export default MyPayroll