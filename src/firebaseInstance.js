import { 
  PUBLIC_API_KEY,
  PUBLIC_AUTH_DOMAIN,
  // PUBLIC_DATABASE_URL,
  PUBLIC_PROJECT_ID,
  PUBLIC_STORAGE_BUCKET,
  PUBLIC_MESSAGING_SENDER_ID,
  PUBLIC_APP_ID,
  PUBLIC_MEASUREMENT_ID
} from '$env/static/public';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: PUBLIC_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  // databaseURL: PUBLIC_DATABASE_URL,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID,
  measurementId: PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase and Google Analytics
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };