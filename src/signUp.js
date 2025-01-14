import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { message } from './alert';

import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    updateDoc,
    onSnapshot,
    doc,
} from 'firebase/firestore'

import {
    createUserWithEmailAndPassword,
    getAuth, 
    onAuthStateChanged
} from 'firebase/auth';

//import { firebaseConfig } from "./firebaseConfig.js";

const firebaseConfig = {
    apiKey: "AIzaSyBZiOp9t_Orzgm8PQlZB5QNzF9mt_CXkY4",
    authDomain: "softwareconstructionbaratie.firebaseapp.com",
    projectId: "softwareconstructionbaratie",
    storageBucket: "softwareconstructionbaratie.appspot.com",
    messagingSenderId: "298658687745",
    appId: "1:298658687745:web:b087cae08882b11f50c900",
    measurementId: "G-748VR9HX3T"
  };

//init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth = getAuth();
const colRef = collection(db, 'Users')

// Subscribing to auth changes
const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        console.log("Current userID (uid):", user.uid);
        console.log("Welcome", user.email)
    }
    else {
        console.log("No current user signed in!");
    }
})

//Adding a user to the users collection
const addAccountForm = document.querySelector(".formBackround");
addAccountForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (addAccountForm.psw.value !== addAccountForm.pswrepeat.value){
        message("Passwords do not match", "Please try again!", "error", true)
    }
    else {
        const name = addAccountForm.name.value;
        const email = addAccountForm.email.value;
        const password = addAccountForm.psw.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                //Created and Signed In
                const user = userCred.user;
                console.log(user);
                setDoc(doc(db, "Users", user.uid), {
                    Name: addAccountForm.name.value,
                    email: addAccountForm.email.value,
                    password: addAccountForm.psw.value
                })
                    .then(() => {
                        message("Account Created Successfully", "Welcome to El Baratie Mexicano", "success", false)
                        location.href = '../dist/mainPage.html';
                        addAccountForm.reset();
                    })
                })
    }
})


