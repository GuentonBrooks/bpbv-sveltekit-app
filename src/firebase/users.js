import { db } from './app';
import { ref, set, get, onValue } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

import { allUsersState } from '../store/user';

// Document Paths
const paths = () => ({
	users: 'users/',
	currentUser: 'users/' + getCurrentUserId(),
});

// Refferences
const refs = () => ({
	users: ref(db, paths().users),
	currentUserInfo: ref(db, paths().currentUser),
});

const storeCurrentUserInfoAsync = () =>
	set(refs().currentUserInfo, getCurrentUserInfo())
		.then(() => {
			return getCurrentUserInfo();
		})
		.catch((err) => {
			throw err;
		});

const fetchCurrentUserInfoAsync = () =>
	get(refs().currentUserInfo)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				storeCurrentUserInfoAsync()
					.then((currentUser) => {
						return currentUser;
					})
					.catch((err) => {
						throw err;
					});
			}
		})
		.catch((err) => {
			throw err;
		});

const fetchAllUsers = () =>
	onValue(refs().users, (snapshot) => {
		const array = [];
		const users = snapshot.val();
		for (const key in users) array.push(users[key]);
		allUsersState.set(array);
	});

export { storeCurrentUserInfoAsync, fetchCurrentUserInfoAsync, fetchAllUsers };
