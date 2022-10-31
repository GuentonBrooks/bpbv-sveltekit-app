import { app } from './app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';
import { currentUserState } from '../store/user';
import { errorAlertState } from '../store/alert';

// Initialize Auth Handler
const auth = getAuth(app);

// Google Auth Functions
const provider = new GoogleAuthProvider();
const googleSignIn = () => signInWithRedirect(auth, provider);
const googleSignOut = () =>
	signOut(auth)
		.then(() => currentUserState.set(null))
		.catch((err) => errorAlertState.set(err));

// Current User Information Functions
const getCurrentUserId = () => auth.currentUser && auth.currentUser.uid;
const getCurrentUserInfo = () => ({
	uid: auth.currentUser && auth.currentUser.uid,
	email: auth.currentUser && auth.currentUser.email,
	displayName: auth.currentUser && auth.currentUser.displayName,
	photoURL: auth.currentUser && auth.currentUser.photoURL,
});

export { auth, googleSignIn, googleSignOut, getCurrentUserId, getCurrentUserInfo };
