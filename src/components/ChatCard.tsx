import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import ImgNotFound from '../assets/coverNotFound.png'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

type TimestampOrServerValue = Timestamp | { '.sv': string } | null;


interface ChatCardProps {
    id: string;
    roomName: string;
    createdAt: TimestampOrServerValue 
    creatorName: string;
    creatorImage: string | null;
}
interface Image {
    src: {
        landscape: string;
    };
}


const ChatCard: React.FC<ChatCardProps> = ({ id, roomName, createdAt, creatorName, creatorImage }) => {

    const [images, setImages] = useState<Image[]>([]);
    const history = useNavigate();
    let formattedDate;
    try {
        const dateObject = createdAt && (createdAt instanceof Date || (typeof createdAt === 'object' && '.sv' in createdAt && createdAt['.sv'] === 'timestamp'))
            ? new Date()
            : createdAt && 'seconds' in createdAt
                ? new Date(createdAt.seconds * 1000)
                : null;
    
        if (dateObject) {
            formattedDate = dateObject.toLocaleString();
        } else {
            console.log('Unexpected type or structure of createdAt:', typeof createdAt, createdAt);
            formattedDate = 'Date not available';
        }
    } catch (error) {
        console.error('Error formatting date:', error);
        formattedDate = 'Date not available';
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`https://api.pexels.com/v1/search?query=${roomName}&per_page=1`, {
                    headers: {
                        Authorization: import.meta.env.VITE_FIREBASE_PEXELS_API_KEY
                    }
                });
                setImages(response.data.photos);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        })();
    }, [roomName]);

    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const backgroundImg = images.length > 0 && images[0].src.landscape
            ? images[0].src.landscape
            : ImgNotFound;

        history(`/room/${id}?backgroundImg=${encodeURIComponent(backgroundImg)}`);
    };

    return (
        <Card
            shadow={false}
            className="relative mb-[50px] grid h-[30rem] w-full max-w-[20rem] items-end justify-center overflow-hidden text-center bg-center bg-cover  hover:animate-shine transform transition duration-500 hover:scale-[1.3] hover:z-50 
            hover:shadow-[20px_20px_100px_white]"
            style={{ backgroundImage: images.length > 0 && images[0].src.landscape ? `url(${images[0].src.landscape})` : `url(${ImgNotFound})` }}
        >
            <Link
                to={`/room/${id}`}
                onClick={handleCardClick}
            >
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center "
                >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full " />
                </CardHeader>
                <CardBody className="relative py-14 px-6 md:px-12">
                    <Typography
                        variant="h2"
                        color="white"
                        className="mb-6 font-medium leading-[1.5]"
                    >
                        {roomName}
                    </Typography>
                    <Typography variant="h5" className="mb-4 text-white">
                        Creator: {creatorName}
                    </Typography>
                    <Typography variant="h6" className="mb-4 text-white">
                        {formattedDate}
                    </Typography>
                    <Avatar
                        size="xl"
                        variant="circular"
                        alt="tania andrew"
                        className="border-2 border-white"
                        src={creatorImage || undefined}
                    />
                </CardBody>
            </Link>
        </Card>

    );
}

export default ChatCard