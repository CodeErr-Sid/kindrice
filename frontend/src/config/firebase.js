// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt: "select_account "
});
const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);


const registerWithEmailPassword = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // User registered

        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        return user;

    } catch (error) {
        // Handle Errors here.
        console.error('Registration Error:', error.message);
    }
};

// Function to handle user login
const loginWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // User logged in successfully
        return userCredential.user;
    } catch (error) {
        // Handle errors here
        console.error('Login Error:', error.message);
        return null; // Return null to indicate the login failed
    }
};

const logout = async () => {
    try {
        await signOut(auth);
        window.location.href="/"
    } catch (error) {
        console.error('Error signing out:', error.message);
    }
};

export { auth, signInWithGooglePopup, registerWithEmailPassword, loginWithEmailPassword, logout }
