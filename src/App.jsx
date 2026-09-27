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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/admin/employees" element={<EmployeeManagement />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/employee/attendance" element={<MyAttendance />} />
      <Route path="/employee/leaves" element={<MyLeaves />} />
      <Route path="/employee/payroll" element={<MyPayroll />} />
      <Route path="/employee/notices" element={<NoticeBoard />} />
      <Route path="/admin/leaves" element={<LeaveApproval />} />
    </Routes>
  )
}
export default App
