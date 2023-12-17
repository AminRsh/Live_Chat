import { useEffect, useState } from 'react';
import { Room } from '../types/roomType';
import { getRooms } from '../api/filestore';
import HomeBg from "../assets/HomeBg.jpg";
import ChatCard from '../components/ChatCard';


const Home = () => {

    const [rooms, setRooms] = useState<Room[]>([])
    useEffect(() => {
        getRooms(setRooms)
    }, [])
    // console.log(rooms);

    return (
        <div className="bg-center bg-cover" style={{ backgroundImage: `url(${HomeBg})`}} >
            <div className="absloute inset-0 bg-[rgba(0,0,0,0.5)]" >
                <div className="flex justify-center items-center">
                    <h1 className="text-white text-[50px] pt-[60px]">Explore Diverse Conversations: Chat Room Central</h1>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 py-[100px]">
                    <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {
                            rooms.map((room) => (
                                <ChatCard
                                    key={room.id}
                                    id={room.id}
                                    roomName={room.name}
                                    createdAt={room.createdAt || null}
                                    creatorName={room.creatorName}
                                    creatorImage={room.creatorImage}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home