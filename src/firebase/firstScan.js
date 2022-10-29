import { db } from './app';
import { ref, set, get, onValue } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

import { firstScansState, currentUserFirstScanState } from '../store/scan';

// Document Paths
const paths = () => ({
	firstScan: 'firstScans/',
	currentUserFirstScan: 'firstScans/' + getCurrentUserId(),
});

// Refferences
const refs = (directory = '') => ({
	firstScan: ref(db, paths().firstScan + directory),
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

const storeFirstScanByUidAsync = (uid = null, model = scanModel()) => {
	if (!uid) {
		throw new Error('Uid Missing From Request');
	} else {
		return set(refs(uid).firstScan, model)
			.then(() => {
				return model;
			})
			.catch((err) => {
				throw err;
			});
	}
};

const storeCurrentUserFirstScanAsync = (model = scanModel()) => {
	if (!model.uid) return console.error('Uid Missing From Request');
	else {
		return set(refs().currentUserFirstScan, model)
			.then(() => currentUserFirstScanState.set(model))
			.catch((err) => console.log(err));
	}
}

const fetchCurrentUserFirstScan = () =>
	onValue(refs().currentUserFirstScan, (snapshot) => {
		currentUserFirstScanState.set(snapshot.val());
	});

const fetchAllUserFirstScans = () =>
	onValue(refs().firstScan, (snapshot) => {
		const array = [];
		const firstScans = snapshot.val();
		for (const key in firstScans) array.push(firstScans[key]);
		firstScansState.set(array);
	});

export {
	scanModel,
	storeFirstScanByUidAsync,
	storeCurrentUserFirstScanAsync,
	fetchCurrentUserFirstScan,
	fetchAllUserFirstScans,
};
