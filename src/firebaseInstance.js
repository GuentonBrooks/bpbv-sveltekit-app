import { 
  PUBLIC_API_KEY,
  PUBLIC_AUTH_DOMAIN,
  PUBLIC_DATABASE_URL,
  PUBLIC_PROJECT_ID,
  PUBLIC_STORAGE_BUCKET,
  PUBLIC_MESSAGING_SENDER_ID,
  PUBLIC_APP_ID,
  PUBLIC_MEASUREMENT_ID
} from '$env/static/public';

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: PUBLIC_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  databaseURL: PUBLIC_DATABASE_URL,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID,
  measurementId: PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase and Google Analytics
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Google Specific
const provider = new GoogleAuthProvider();
const googleSignIn = () => signInWithRedirect(auth, provider);
const googleSignOutAsync = () => signOut(auth).then(() => {}).catch((err) => { throw err });

export { auth, db, googleSignIn, googleSignOutAsync };