import { useState } from "react"
import { sendMessage } from "../api/filestore"
import { auth } from "../utils/firebase.config"

interface SendMessageProps {
    scroll: React.RefObject<HTMLDivElement>
    disabled: boolean,
    selectedRoomId: string | null
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll, disabled, selectedRoomId }) => {
    const [msg, setMsg] = useState<string>("")

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.currentUser || !selectedRoomId) return;
        const { uid, photoURL } = auth.currentUser

        await sendMessage(selectedRoomId, uid, photoURL || '', msg)
        setMsg('')
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <form onSubmit={handleSendMessage}>
            <div className="flex items-center p-4 mt-[100px]">
                <input type="text" placeholder="Type your message..." 
                className="w-full rounded-lg border border-gray-300 px-4 py-2" 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                disabled={disabled}
                />
                <button type="submit"  disabled={disabled || msg.trim() === ''}
                className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white">Send</button>
            </div>
        </form>
    )
}

export default SendMessage
