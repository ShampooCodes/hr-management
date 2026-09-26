import { useNavigate } from "react-router-dom"
import { Users, ClipboardList, Wallet } from "lucide-react"

function AdminDashboard() {
    const navigate= useNavigate()
    
    const cards= [
        {
            title: "Employee Management",
            desc: "Add staff, view records",
            icon: Users,
            path: "/admin/employees",
        },
        {
            title: "Leave Approval",
            desc: "Approve or reject leave requests",
            icon: ClipboardList,
            path: "/admin/leaves",
        },
        {
            title: "Payroll Processing",
            desc: "Calculate and process salaries",
            icon: Wallet,
            path: "/admin/payroll",
        },
    ]
    return (
        <div className="min-h-screen w-full bg-black px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold text-white mb-10 tracking-wide">Admin Dashboard</h1>

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

export default AdminDashboard