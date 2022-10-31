import { db } from './app';
import { ref, set, get, onValue } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

import { allUsersState, currentUserState } from '../store/user';
import { errorAlertState, successAlertState } from '../store/alert';

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

const storeCurrentUser = () => {
	if (!getCurrentUserId()) return currentUserState.set(null);
	else {
		return set(refs().currentUser, getCurrentUserInfo())
			.then(() => {
				currentUserState.set(getCurrentUserInfo());
				successAlertState.set("Current User Successfully Stored in Database");
			})
			.catch((err) => errorAlertState.set(err));
	}
}

const fetchCurrentUser = () => {
	if (!getCurrentUserId()) return currentUserState.set(null);
	else {
		return onValue(refs().currentUser, (snapshot) => {
			if (snapshot.exists()) currentUserState.set(snapshot.val());
			else storeCurrentUser();
		})
	}
};

const fetchAllUsers = () =>
	onValue(refs().users, (snapshot) => {
		const array = [];
		const users = snapshot.val();
		for (const key in users) array.push(users[key]);
		allUsersState.set(array);
	});

export { storeCurrentUser, fetchCurrentUser, fetchAllUsers };
