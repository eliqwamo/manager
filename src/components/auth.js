import { auth, googleProvider } from '../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signin = async() => {
        await createUserWithEmailAndPassword(auth,email,password);
    }
    const logout = async() => {
        await signOut(auth);
    }

    const signinWithGoogle = async() => {
        await signInWithPopup(auth,googleProvider)
    }

    return(
        <div>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signin}>Sign In</button>
            <button onClick={logout}>Logout</button>

            <button onClick={signinWithGoogle}>SignIn with Google</button>
        </div>
    )
}