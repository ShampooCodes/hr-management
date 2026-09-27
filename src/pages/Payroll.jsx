import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../api/employeeApi";
import { generatePayrollApi, getAllPayrollsApi } from "../api/payrollApi";
import { ArrowLeft, Wallet } from "lucide-react";

function Payroll() {
    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [employeeId, setEmployeeId] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [basicSalary, setBasicSalary] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState("")

    const fetchData =async () => {
        setLoading(true)
        try {
            const [empRes, payrollRes] = await Promise.all([
                getAllEmployees(),
                getAllPayrollsApi(),
            ])
            setEmployees(empRes.data.filter((e) => e.role !== "admin"))
            setRecords(payrollRes.data)
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=> {
        fetchData()
    }, [])

    const handleGenerate = async (e) => {
        e.preventDefault()
        console.log("Form submitted!", { employeeId, month, year, basicSalary })
        setSubmitting(true)
        setMessage("")
        try {
            await generatePayrollApi({ employeeId, month, year, basicSalary: Number(basicSalary) })
            setMessage("Payroll generated successfully")
            setEmployeeId("")
            setMonth("")
            setYear("")
            setBasicSalary("")
            fetchData()
        } catch (error) {
            console.log("ERROR:", error)
            const msg = error.response?.data?.message || "Failed to generate payroll"
            setMessage(msg)
        } finally {
            setSubmitting(false)
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
                    <h1 className="text-2xl font-semibold text-white tracking-wide">Payroll Processing</h1>
                </div>

                <form 
                    onSubmit={handleGenerate}
                    className="flex flex-col gap-4 border border-gray-700 rounded-xl p-6 mb-8"
                >
                    <h2 className="text-white text-sm font-medium mb-2">Generate Payroll</h2>
                    <div>
                        <label className="text-gray-500 text-xs">Employee</label>
                        <select
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
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

                     <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-gray-500 text-xs">Month</label>
                            <input
                                type="text"
                                placeholder="e.g. September"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-gray-500 text-xs">Year</label>
                            <input
                                type="number"
                                placeholder="2026"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                            />
                        </div>
                     </div>

                      <div>
                        <label className="text-gray-500 text-xs">Basic Salary</label>
                        <input
                            type="number"
                            value={basicSalary}
                            onChange={(e) => setBasicSalary(e.target.value)}
                            required
                            className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                        />
                    </div>

                     {message && <p className="text-gray-400 text-xs">{message}</p>}

                     <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50 mt-2"
                     >
                        <Wallet size={16} strokeWidth={1.5} />
                        {submitting ? "Generating..." : "Generate Payroll"}
                     </button>
                 </form>

                <h2 className="text-white text-sm font-medium mb-4">Payroll Records</h2>
                
                {loading && <p className="text-gray-500 text-sm">Loading records...</p>}
                {!loading && records.length === 0 && (
                    <p className="text-gray-500 text-sm">No payroll generated yet</p>
                )}

                 {!loading && records.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {records.map((rec) => (
                            <div 
                                key={rec._id} 
                                className="flex items-center justify-between border border-gray-700 rounded-xl px-5 py-4"
                            >
                                <div>
                                    <p className="text-white text-sm font-medium">
                                        {rec.employee?.fullName || "Unknown"}
                                        <span className="text-gray-500 text-xs ml-2">
                                            {rec.month} {rec.year}
                                        </span>
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        Leaves: {rec.leavesTaken} | Deduction: Rs{rec.deduction}
                                    </p>
                                </div>
                                <p className="text-white text-lg font-semibold">Rs{rec.netSalary}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
         </div>
    )
}

export default Payroll