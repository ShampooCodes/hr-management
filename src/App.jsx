import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import MyAttendance from "./pages/MyAttendance";
import MyLeaves from "./pages/MyLeaves";
import MyPayroll from "./pages/MyPayroll";
import NoticeBoard from "./pages/NoticeBoard";
import LeaveApproval from "./pages/LeaveApproval";
import Payroll from "./pages/Payroll";
import PostNotice from "./pages/PostNotice";
import AssignTask from "./pages/AssignTask";
import MyTasks from "./pages/MyTasks";
import ProtectedRoute from "./components/ProtectedRoute";

const admin = (page)=> <ProtectedRoute allowedRole="admin">{page}</ProtectedRoute>
const employee = (page)=> <ProtectedRoute allowedRole="employee">{page}</ProtectedRoute>

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={admin(<AdminDashboard />)} />
      <Route path="/admin/employees" element={admin(<EmployeeManagement />)} />
      <Route path="/admin/leaves" element={admin(<LeaveApproval />)} />
      <Route path="/admin/payroll" element={admin(<Payroll />)} />
      <Route path="/admin/notices" element={admin(<PostNotice />)} />
      <Route path="/admin/tasks" element={admin(<AssignTask />)} />

      <Route path="/employee" element={employee(<EmployeeDashboard />)} />
      <Route path="/employee/attendance" element={employee(<MyAttendance />)} />
      <Route path="/employee/leaves" element={employee(<MyLeaves />)} />
      <Route path="/employee/payroll" element={employee(<MyPayroll />)} />
      <Route path="/employee/tasks" element={employee(<MyTasks />)} />
      <Route path="/employee/notices" element={employee(<NoticeBoard />)} />
    </Routes>
  )
}
export default App
