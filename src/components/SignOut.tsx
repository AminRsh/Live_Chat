import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase.config';
import Swal from "sweetalert2"



const SignOut: React.FC = () => {

    const  handleSignOut = () => {
        signOut(auth)
        Swal.fire({
            title: "Good job!",
            text: "You Logged Out",
            icon: "success"
        });
    }
    return (
        <div>
            <button className="bg-red-600 px-[8px] py-[5px] hover:bg-red-400 rounded-lg text-white"
            onClick={handleSignOut}   
            >Sign Out</button>
        </div>
    );
};

export default SignOut;