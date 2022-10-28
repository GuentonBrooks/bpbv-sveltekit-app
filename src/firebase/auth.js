import { app } from './app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';

// Initialize Auth Handler
const auth = getAuth(app);

// Google Auth Functions
const provider = new GoogleAuthProvider();
const googleSignIn = () => signInWithRedirect(auth, provider);
const googleSignOutAsync = () =>
	signOut(auth)
		.then(() => {
			return 'Signed Off';
		})
		.catch((err) => {
			throw err;
		});

// Current User Information Functions
const getCurrentUserId = () => auth.currentUser && auth.currentUser.uid;
const getCurrentUserInfo = () => ({
	uid: auth.currentUser && auth.currentUser.uid,
	email: auth.currentUser && auth.currentUser.email,
	displayName: auth.currentUser && auth.currentUser.displayName,
	photoURL: auth.currentUser && auth.currentUser.photoURL,
});

export { auth, googleSignIn, googleSignOutAsync, getCurrentUserId, getCurrentUserInfo };
