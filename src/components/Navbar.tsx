import { useState } from 'react';
import { MdChat } from 'react-icons/md';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Icon from '../assets/chat-room.svg';
import { Button, Tooltip } from '@material-tailwind/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase.config';
import { FaUser } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import Swal from 'sweetalert2';

interface NavbarProps {
    newRoomName: string
    setNewRoomName: React.Dispatch<React.SetStateAction<string>>
    createRoom: () => Promise<void>
}

const Navbar: React.FC<NavbarProps> = ({ createRoom , newRoomName, setNewRoomName}) => {

    const [user] = useAuthState(auth);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation()
    const inChatRoom = location.pathname.startsWith('/room/')

    const handleCreateRoom = () => {
        if (newRoomName.trim().length >= 4) {
            createRoom();
            setShowModal(false)
            Swal.fire({
                icon: "success",
                text: `${newRoomName} has been successfully created`,
            });
        } else {
            setShowModal(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Room name must be at least 4 characters long",
            });
        }
    };

    return (
        <nav className="bg-black shadow-md px-4 md:px-8 lg:px-16 sticky top-0 z-50"
    
        >
            <div className="navbar-bg text-white flex justify-between items-center">
                <a href="/" className="hidden md:flex text-xl font-bold text-gray-800">
                    <img src={Icon} height={30} width={40} alt="Chat Room" />
                </a>
                {
                    inChatRoom ? <Link to="/" className='py-3'><MdChat size={40} /></Link>
                        : user ?
                            <>  <Tooltip
                                content="Create a Chat room"
                                className="border border-blue-gray-50 text-black bg-white px-4 py-3 shadow-xl shadow-black/10">
                                    <Button onClick={() => setShowModal(true)} 
                                    className={showModal ? "hidden " : "bg-black"}>
                                        <MdChat size={40} /></Button>
                                </Tooltip>
                                <Modal isvisible={showModal} onClose={() => setShowModal(false)}
                                className="transition-all duration-300 delay-150 animate-fade-in"
                                >
                                    <div className="relative flex items-center w-full max-w-[24rem]">
                                        <div className="relative h-10 w-full min-w-[200px]">
                                            <input
                                                type="text"
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                value={newRoomName}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRoomName(e.target.value)} />
                                            <label
                                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Chat Room Name
                                            </label>
                                        </div>
                                        <button
                                            className="absolute right-1 top-1 select-none rounded bg-blue-gray-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button"
                                            onClick={handleCreateRoom}
                                        >
                                            Create
                                        </button>
                                    </div>
                                </Modal>
                            </>
                            : (<span className="hidden xsm:flex" >Chat, Connect, Conquer Conversations!</span>)
                }

                {user ? (
                    <div className="flex items-center space-x-4">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="User Profile" className="w-8 h-8 rounded-full" />
                        ) : (
                            <FaUser className="w-8 h-8" />
                        )}
                        <span className="hidden xsm:flex text-white">{user.displayName}</span>
                        <SignOut />
                    </div>
                ) : (
                    <a href="#" className="transition duration-300">
                        <SignIn />
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
