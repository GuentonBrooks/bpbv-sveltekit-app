import { db } from './app';
import { ref, set, get, onValue } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

import { firstScansState, currentUserFirstScanState, selectedUserFirstScanState } from '../store/scan';

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
	uid: null,
	photoURL: null,
	displayName: null,
	email: null,
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

const currentUserScanModel = () => ({
	...scanModel,
	uid: getCurrentUserInfo().uid,
	photoURL: getCurrentUserInfo().photoURL,
	displayName: getCurrentUserInfo().displayName,
	email: getCurrentUserInfo().email,
})

const storeFirstScanByUid = (uid = null, model = scanModel()) => {
	if (!uid) return console.error('Uid Missing From Request');
	else {
		return set(refs(uid).firstScan, model)
			.then(() => selectedUserFirstScanState.set(model))
			.catch((err) => console.error(err));
	}
};

const storeCurrentUserFirstScan = (model = currentUserScanModel()) => {
	if (!model.uid) return console.error('Uid Missing From Request');
	else {
		return set(refs().currentUserFirstScan, model)
			.then(() => currentUserFirstScanState.set(model))
			.catch((err) => console.error(err));
	}
}

const fetchCurrentUserFirstScan = () => {
	if (!getCurrentUserId()) return currentUserFirstScanState.set(null);
	else return	onValue(refs().currentUserFirstScan, (snapshot) => {
		if (snapshot.exists()) currentUserFirstScanState.set(snapshot.val());
		else storeCurrentUserFirstScan();
	});
}

const fetchAllUserFirstScans = () =>
	onValue(refs().firstScan, (snapshot) => {
		const array = [];
		const firstScans = snapshot.val();
		for (const key in firstScans) array.push(firstScans[key]);
		firstScansState.set(array);
	});

export {
	scanModel,
	currentUserScanModel,
	storeFirstScanByUid,
	storeCurrentUserFirstScan,
	fetchCurrentUserFirstScan,
	fetchAllUserFirstScans,
};
