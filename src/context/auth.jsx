/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updateProfile} from "firebase/auth";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('There is no auth provider.')
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(true)

    const signup = async (email, password) => 
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const  userCreated = userCredential.user;
            console.log("New account created successfully! ", userCreated);
            // Return the User UID
            return userCreated.uid;
            
        })

    const login  = async (email, password) => 
        signInWithEmailAndPassword(auth, email, password)

    const logout = () => signOut(auth)
    
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserPhotoUrl = async (newPhotoUrl) => {
        console.log('last photo: ', auth.currentUser.photoURL)
        console.log('new photo received: ', newPhotoUrl);

        const updated = await updateProfile(auth.currentUser,{
            photoURL: newPhotoUrl
        })
        .then(()=>{
            console.log("profile updated")
            console.log('new photo:', auth.currentUser.photoURL)
            return true
        })
        .catch((error)=>{
            console.log('profile no updated')
            alert(error.message)
            return false
        });

        if(updated) return true
        if(!updated) return false
    }

    const updateUserName = async (newUserName) => {
        await updateProfile(auth.currentUser,{
            displayName: newUserName
        })
        .then(()=>{
            console.log("profile updated")
        })
        .catch((error)=>{
            console.log('profile no updated')
            alert(error.message)
            
        });
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            if(currentUser){
                setUser(currentUser)
                setUserId(currentUser.uid)
                setLoading(false)
            }
        })
    },[])

    const logInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        console.log(GoogleAuthProvider);
        return signInWithPopup(auth, googleProvider)
    }

    return (
        <AuthContext.Provider 
            value={{
                user,
                userId,
                loading,
                signup,
                login,
                logout,
                logInWithGoogle,
                resetPassword,
                updateUserPhotoUrl,
                updateUserName,
            }} 
        >
            {children}
    </AuthContext.Provider >
    )
}