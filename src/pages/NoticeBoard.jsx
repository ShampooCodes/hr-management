import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllNoticesApi } from "../api/noticeApi"
import { ArrowLeft, Megaphone } from "lucide-react"

function NoticeBoard(){
    const navigate = useNavigate()
    const [notices, setNotices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchNotices = async () => {
        setLoading(true)
        setError("")
        try {
            const res= await getAllNoticesApi()
            setNotices(res.data)
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to load notices"  
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotices()
    },[])

    return (
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate("/employee")} className="text-gray-400 hover:text-white transition">
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">Notice Board</h1>
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {loading && <p className="text-gray-500 text-sm">Loading notices...</p>}
                {!loading && notices.length === 0 && !error && (
                    <p className="text-gray-500 text-sm">No announcements yet</p>
                )}

                {!loading && notices.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {notices.map((notice) =>(
                            <div key={notice._id} className="border border-gray-700 rounded-xl px-5 py-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="border border-gray-600 rounded-full p-2">
                                        <Megaphone className="text-white" size={16} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-white text-sm font-medium">{notice.title}</p>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">{notice.message}</p>
                                <div className="flex items-center justify-between text-gray-500 text-xs">
                                    <span>By {notice.postedBy?.fullName || "Admin"}</span>
                                    <span>{new Date(notice.postedOn).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NoticeBoard