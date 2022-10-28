import { db } from './app';
import { ref, set, get } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

// Document Paths
const paths = () => ({
	firstScan: 'firstScans/',
	currentUserFirstScan: 'firstScans/' + getCurrentUserId(),
});

// Refferences
const refs = () => ({
	firstScan: ref(db, paths().firstScan),
	currentUserFirstScan: ref(db, paths().currentUserFirstScan),
});

// Scan Model
const scanModel = () => ({
	uid: getCurrentUserInfo().uid,
	photoURL: getCurrentUserInfo().photoURL,
	displayName: getCurrentUserInfo().displayName,
	email: getCurrentUserInfo().email,
	age: null,
	sex: null,
	len: null,
	weight: null,
	bmi: null,
	bodyFatPercent: null,
	muscleMassPercent: null,
	baseMetabolicRate: null,
	visceralFatLevel: null,
	bodyAge: null,
});

const initCurrentUserFirstScanAsync = () =>
	get(refs().currentUserFirstScan)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				storeCurrentUserFirstScanAsync()
					.then((model) => {
						return model;
					})
					.catch((err) => {
						throw err;
					});
			}
		})
		.catch((err) => {
			throw err;
		});

const storeCurrentUserFirstScanAsync = (model = scanModel()) =>
	set(refs().currentUserFirstScan, model)
		.then(() => {
			return model;
		})
		.catch((err) => {
			throw err;
		});

const storeFirstScanByUidAsync = (uid = null, model = scanModel()) => {
	if (!uid) {
		throw new Error('Uid Missing From Request');
	} else {
		set(refs().firstScan + uid, model)
			.then(() => {
				return model;
			})
			.catch((err) => {
				throw err;
			});
	}
};

const fetchAllUserFirstScansAsync = () =>
	get(refs().firstScan)
		.then((snapshot) => {
			const array = [];
			const firstScans = snapshot.val();
			for (const key in firstScans) array.push(firstScans[key]);
			return array;
		})
		.catch((err) => {
			throw err;
		});

export {
	scanModel,
	initCurrentUserFirstScanAsync,
	storeCurrentUserFirstScanAsync,
	storeFirstScanByUidAsync,
	fetchAllUserFirstScansAsync,
};
