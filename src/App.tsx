import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase.config';
import { UserAuthType } from './types/userAuthType';
import { useState } from 'react';
import { createRoom} from './api/filestore';
import Chat from './components/Chat';


const App: React.FC = () => {
  const [user] = useAuthState(auth) as [UserAuthType | null, boolean, Error | undefined]

  
  const [newRoomName, setNewRoomName] = useState<string>('');
  // const [users, setUsers] = useState<UserAuthType[]>([]);
  
  const handleCreatRoom = async() => {
    if (user && newRoomName) {
      await createRoom(newRoomName, user)
      setNewRoomName('')
    }
  }

  return (
    <BrowserRouter>
      <Navbar
        newRoomName={newRoomName}
        setNewRoomName={setNewRoomName}
        createRoom={handleCreatRoom}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
