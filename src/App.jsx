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
      <Route path="/admin/payroll" element={<Payroll />} />
      <Route path="/admin/notices" element={<PostNotice />} />
      <Route path="/admin/tasks" element={<AssignTask />} />
      <Route path="/employee/tasks" element={<MyTasks />} />
    </Routes>
  )
}
export default App
