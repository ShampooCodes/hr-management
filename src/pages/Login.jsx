import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    return(
        <div className="h-screen item-center  justify-center bg-black-800 flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-white">HR Management</h1>

            <button 
                onClick={() => navigate("/admin")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg"
            >
                Login as Admin
            </button>

            <button
                onClick={() => navigate("/employee")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg"
            >
                Login as Employee
            </button>
        </div>
    )
}

export default Login