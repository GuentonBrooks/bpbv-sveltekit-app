import { 
  SECRET_API_KEY,
  SECRET_AUTH_DOMAIN,
  // SECRET_DATABASE_URL,
  SECRET_PROJECT_ID,
  SECRET_STORAGE_BUCKET,
  SECRET_MESSAGING_SENDER_ID,
  SECRET_APP_ID,
  SECRET_MEASUREMENT_ID
} from '$env/static/private';

// import { error } from '@sveltejs/kit';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const load = () => {
  // Firebase Evironment Variable Configuration
  const firebaseConfig = {
    apiKey: SECRET_API_KEY,
    authDomain: SECRET_AUTH_DOMAIN,
    // databaseURL: SECRET_DATABASE_URL,
    projectId: SECRET_PROJECT_ID,
    storageBucket: SECRET_STORAGE_BUCKET,
    messagingSenderId: SECRET_MESSAGING_SENDER_ID,
    appId: SECRET_APP_ID,
    measurementId: SECRET_MEASUREMENT_ID,
  };

  // Initialize Firebase and Google Analytics
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Return the initialized Firebase tools to the Frontend
  return {
    app,
    analytics,
  }
};
