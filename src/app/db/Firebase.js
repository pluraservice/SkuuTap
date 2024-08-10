import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const FirebaseApp = initializeApp({
    apiKey: "AIzaSyCDS447ApOT6N4M2FkvM5p__um57DW92hw",
    authDomain: "skuubit-cf1bf.firebaseapp.com",
    databaseURL: "https://skuubit-cf1bf-default-rtdb.firebaseio.com",
    projectId: "skuubit-cf1bf",
    storageBucket: "skuubit-cf1bf.appspot.com",
    messagingSenderId: "129482833282",
    appId: "1:129482833282:web:72d0c637e3247e2afea39b",
    measurementId: "G-XYJ33LGF7B"
});

export const FirebaseDatabase = getDatabase(FirebaseApp);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);