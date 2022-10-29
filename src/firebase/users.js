import { db } from './app';
import { ref, set, get, onValue } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

import { allUsersState, currentUserState } from '../store/user';

// Document Paths
const paths = () => ({
	users: 'users/',
	currentUser: 'users/' + getCurrentUserId(),
});

// Refferences
const refs = () => ({
	users: ref(db, paths().users),
	currentUser: ref(db, paths().currentUser),
});

const storeCurrentUser = () =>
	set(refs().currentUser, getCurrentUserInfo())
		.then(() => currentUserState.set(getCurrentUserInfo()))
		.catch((err) => console.error(err));

const fetchCurrentUser = () =>
	onValue(refs().currentUser, (snapshot) => {
		console.log(snapshot.val())
		if (snapshot.exists()) currentUserState.set(snapshot.val());
		else storeCurrentUser();
	})

const fetchAllUsers = () =>
	onValue(refs().users, (snapshot) => {
		const array = [];
		const users = snapshot.val();
		for (const key in users) array.push(users[key]);
		allUsersState.set(array);
	});

export { storeCurrentUser, fetchCurrentUser, fetchAllUsers };
