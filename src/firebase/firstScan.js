import { db } from './app';
import { ref, set, onValue } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

import {
	firstScansState,
	currentUserFirstScanState,
	selectedUserFirstScanState,
} from '../store/scan';
import { errorAlertState, successAlertState } from '../store/alert';

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

const storeFirstScanByUid = (uid = null, model = scanModel()) => {
	if (!uid) return errorAlertState.set('Could not save to DB without a Unique ID');

	return set(refs(uid).firstScan, model)
		.then(() => {
			selectedUserFirstScanState.set(model);
			successAlertState.set('Update Successfully Stored!');
		})
		.catch((err) => errorAlertState.set(err));
};

const storeCurrentUserFirstScan = (model = scanModel()) => {
	if (!getCurrentUserId()) return errorAlertState.set('Could not save to DB without a Unique ID');
	if (!model.uid) model.uid = getCurrentUserId();
	if (!model.photoURL) model.photoURL = getCurrentUserInfo().photoURL;
	if (!model.displayName) model.displayName = getCurrentUserInfo().displayName;
	if (!model.email) model.email = getCurrentUserInfo().email;

	return set(refs().currentUserFirstScan, model)
		.then(() => {
			currentUserFirstScanState.set(model);
			successAlertState.set('Update Successfully Stored!');
		})
		.catch((err) => errorAlertState.set(err));
};

const fetchCurrentUserFirstScan = () => {
	if (!getCurrentUserId()) return currentUserFirstScanState.set(null);

	return onValue(refs().currentUserFirstScan, (snapshot) => {
		if (snapshot.exists()) currentUserFirstScanState.set(snapshot.val());
		else storeCurrentUserFirstScan();
	});
};

const fetchAllUserFirstScans = () =>
	onValue(refs().firstScan, (snapshot) => {
		const array = [];
		const firstScans = snapshot.val();
		for (const key in firstScans) array.push(firstScans[key]);
		firstScansState.set(array);
	});

export {
	scanModel,
	storeFirstScanByUid,
	storeCurrentUserFirstScan,
	fetchCurrentUserFirstScan,
	fetchAllUserFirstScans,
};
