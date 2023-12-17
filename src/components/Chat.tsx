import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Message } from "../types/messagType";
import { getMessages, getRoomById } from "../api/filestore";
import { auth } from "../utils/firebase.config";
import SendMessage from "./SendMessage";

const Chat = () => {

    const location = useLocation();
    const backgroundImg = new URLSearchParams(location.search).get("backgroundImg");
    const { roomId } = useParams<{ roomId: string }>()
    const selectedRoomId = roomId ?? null
    const scroll = useRef<HTMLDivElement>(null)
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (roomId) {
            getRoomById(roomId, setRoomName)
            getMessages(roomId, setMessages)
        }
    }, [roomId])


    return (
        <div className="w-screen h-[1200px]  bg-center bg-cover relative "
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div
                className="absolute inset-0 bg-[rgba(120,116,116,0.1)]"
            >
                <div className="container mx-auto px-[2.5px] my-[200px] md:px-[40px] sm:px-[20px] xsm:px-[5px]">
                    <div className="flex flex-col bg-[rgba(120,116,116,0.4)]  rounded-lg  shadow-[20px_20px_100px_rgb(36,36,36)]">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-4 rounded-t-lg">
                            <h1 className="text-center text-2xl font-bold text-white">Welcome to {roomName} room</h1>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <div className="flex flex-col space-y-2 p-4">
                                {messages.map((message) => {
                                    // console.log('Current Message:', message);
                                    return (
                                        <div key={message.id}
                                            className={`flex ${message.uid === auth.currentUser?.uid ? 'self-end bg-blue-500'
                                                : 'self-start bg-gray-500'} items-center rounded-xl px-3 mx-[30px]`}>
                                            <div className="relative">
                                                <div 
                                                className= {`absolute top-1/2 transform -translate-y-1/2 
                                                ${message.uid === auth.currentUser?.uid ? '-right-[40px]' : '-left-[40px]'}`} >
                                                    <img
                                                        src={message.photoURL}
                                                        alt={auth.currentUser?.displayName || 'User'}
                                                        className="w-10 h-10 rounded-full border-2 border-white" />
                                                </div>

                                                <div className={` text-white p-3 rounded-lg max-w-xs md:max-w-md`}>
                                                    <div className="text-xs opacity-75">
                                                        {message.displayName || 'Anonymous'}
                                                    </div>
                                                    <div>{message.text}</div>
                                                    <div className="text-xs opacity-75">
                                                        {message.createdAt?.toDate ? message.createdAt.toDate().toLocaleTimeString() : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                        <SendMessage
                            scroll={scroll}
                            disabled={!auth.currentUser}
                            selectedRoomId={selectedRoomId}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat