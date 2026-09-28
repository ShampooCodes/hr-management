function MyTasks() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate("/employee")} className="text-gray-400 hover:text-white transition">
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">My Tasks</h1>
                </div>
            </div>
        </div>
    )
}