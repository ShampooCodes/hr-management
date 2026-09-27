import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNoticeApi } from "../api/noticeApi";
import { ArrowLeft, Megaphone, Send } from "lucide-react";

function PostNotice() {
    const navigate =useNavigate()

    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [feedback, setFeedback] = useState("")

    const handlePost = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setFeedback("")
        try {
            await postNoticeApi({ title, message })
            setFeedback("Notice posted successfully")
            setTitle("")
            setMessage("")
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to post notice"
            setFeedback(msg)
        } finally {
            setSubmitting(false)
        }
    }

    return(
        <div className="min-h-screen w-full bg-black px-6 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate("/admin")} className="text-gray-400 hover:text-white transition">
                        <ArrowLeft size={22} strokeWidth={1.5} />
                    </button>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">Post Notice</h1>
                </div>

                <form 
                    onSubmit={handlePost} 
                    className="flex flex-col gap-4 border border-gray-700 rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Megaphone className="text-white" size={18} strokeWidth={1.5} />
                        <h2 className="text-white text-sm font-medium">New Announcement</h2>
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={4}
                            className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-sm py-1.5 mt-1 resize-none"
                        />
                    </div>

                    {feedback && <p className="text-gray-400 text-xs">{feedback}</p>}

                    <button 
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50 mt-2"
                    > 
                        <Send size={16} strokeWidth={1.5} />
                        {submitting ? "Posting..." : "Post Notice"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PostNotice