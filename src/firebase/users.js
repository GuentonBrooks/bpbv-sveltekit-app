import { db } from './app';
import { ref, set, get } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

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

const fetchAllUsersAsync = () =>
	get(refs().users)
		.then((snapshot) => {
			const array = [];
			const users = snapshot.val();
			for (const key in users) array.push(users[key]);
			return array;
		})
		.catch((err) => {
			throw err;
		});

export { storeCurrentUserInfoAsync, fetchCurrentUserInfoAsync, fetchAllUsersAsync };
