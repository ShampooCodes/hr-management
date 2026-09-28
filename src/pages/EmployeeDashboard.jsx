import {useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"
import {getEmployeeStatsApi } from "../api/dashboardApi"
import {Clock, ClipboardList, Wallet, CheckSquare, Bell, LogOut} from "lucide-react"


function EmployeeDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const fetchStats = async () => {
    try {
      const res = await getEmployeeStatsApi()
      setStats(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchStats()
  }, [])
  const cards =[
    {
      title: "My Attendance",
      desc: "Check-in, Check-out, view history",
      icon: Clock,
      path: "/employee/attendance",
    },
    {
      title: "My Payroll",
      desc: "View your salary slips",
      icon: Wallet,
      path: "/employee/payroll",
    },
    {
      title: "My Leaves",
      desc: "Apply for leave, view status",
      icon: ClipboardList,
      path: "/employee/leaves",
    },
    {
      title: "My Tasks",
      desc: "View and update assigned tasks",
      icon: CheckSquare,
      path: "/employee/tasks",
    },
    {
      title: "Notice Board",
      desc: "Company announcments",
      icon: Bell,
      path: "/employee/notices",
    },



  ] 
  return (
    <div className="min-h-screen w-full bg-black px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold text-white mb-6 tracking-wide">
            Employee Dashboard
          </h1>
          <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition"
          >
              <LogOut size={16} strokeWidth={1.5} />
              Logout
          </button>
        </div>
          {!loading && stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="border border-gray-700 rounded-xl p-4">
                  <p className="text-gray-500 text-xs">Total Attendance</p>
                  <p className="text-white text-xl font-medium mt-1">{stats.todayAttendance ?? 0}</p>
              </div>
               <div className="border border-gray-700 rounded-xl p-4">
                  <p className="text-gray-500 text-xs">Pending Leaves</p>
                  <p className="text-white text-xl font-medium mt-1">{stats.pendingLeaves ?? 0}</p>
              </div>
               <div className="border border-gray-700 rounded-xl p-4">
                  <p className="text-gray-500 text-xs">Approved Leaves</p>
                  <p className="text-white text-xl font-medium mt-1">{stats.approvedLeaves ?? 0}</p>
              </div>
               <div className="border border-gray-700 rounded-xl p-4">
                  <p className="text-gray-500 text-xs">Last Salary</p>
                  <p className="text-white text-xl font-medium mt-1">{stats.lastPayroll?.netSalary ?? "-"}</p>
              </div>
            </div>
          )}

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div
                        key={card.title}
                        onClick={() => navigate(card.path)}
                        className="border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-white transition"
                    >
                        <div className="border border-gray-600 rounded-full p-3 w-fit mb-4">
                            <Icon className="text-white" size={22} strokeWidth={1.5} />
                        </div>
                        <h2 className="text-white text-lg font-medium mb-1">{card.title}</h2>
                        <p className="text-gray-500 text-sm">{card.desc}</p>
                    </div>
                  )
              })}
          </div>
        </div>
    </div>
  )
}


export default EmployeeDashboard