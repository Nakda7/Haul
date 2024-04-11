// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
    apiKey: "AIzaSyDP83gBMFSEH4GapgAK_GHtCyhl61xTvFQ",
    authDomain: "haul-970a2.firebaseapp.com",
    projectId: "haul-970a2",
    storageBucket: "haul-970a2.appspot.com",
    messagingSenderId: "296569950432",
    appId: "1:296569950432:web:7fdb41ed65794059f40085"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage = getStorage(app)

export async function uploadFile(file){
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}