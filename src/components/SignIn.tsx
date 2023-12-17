import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from "../utils/firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Swal from "sweetalert2"

const SignIn: React.FC = () => {
    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            // console.log(result)
            // console.log(user)
            const userProfileRef = doc(db, 'users', user.uid)
            await setDoc(userProfileRef, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: serverTimestamp(),
            })
            Swal.fire({
                title: "Good job!",
                text: "You Logged in",
                icon: "success"
            });

        } catch (error) {
            console.error('Error signing in with Google: ', error);
        }
    }
    return (
        <div className="xsm:flex xsm:justify-center" >
            <button className="bg-red-600 px-[8px] py-[5px] hover:bg-red-400 rounded-lg text-white" 
            onClick={signInWithGoogle}>Sign In </button>
        </div>
    );
};

export default SignIn;
