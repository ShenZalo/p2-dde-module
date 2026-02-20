import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase Authentication Check
const firebaseConfig = {
    apiKey: "AIzaSyAzhBwJ-zTOEopDgUmwKXzVB_obQ3iGWjY",
    authDomain: "fmdsemodule.firebaseapp.com",
    projectId: "fmdsemodule",
    storageBucket: "fmdsemodule.firebasestorage.app",
    messagingSenderId: "1033730497984",
    appId: "1:1033730497984:web:90b7af2cff747e134d3c25"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user || !user.emailVerified) {
        window.location.href = "index.html";
    }
});
