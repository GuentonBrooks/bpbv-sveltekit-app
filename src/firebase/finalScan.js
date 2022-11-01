import { db } from './app';
import { ref, set, onValue } from 'firebase/database';
import { getCurrentUserId, getCurrentUserInfo } from './auth';

import {
	finalScansState,
	currentUserFinalScanState,
	selectedUserFinalScanState,
} from '../store/scan';
import { errorAlertState, successAlertState } from '../store/alert';

// Document Paths
const paths = () => ({
	finalScan: 'finalScans/',
	currentUserFinalScan: 'finalScans/' + getCurrentUserId(),
});

// Refferences
const refs = (directory = '') => ({
	finalScan: ref(db, paths().finalScan + directory),
	currentUserFinalScan: ref(db, paths().currentUserFinalScan),
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

const storeFinalScanByUid = (uid = null, model = scanModel()) => {
	if (!uid) return errorAlertState.set('Could not save to DB without a Unique ID');

	return set(refs(uid).finalScan, model)
		.then(() => {
			selectedUserFinalScanState.set(model);
			successAlertState.set('Update Successfully Stored!');
		})
		.catch((err) => errorAlertState.set(err));
};

const storeCurrentUserFinalScan = (model = scanModel()) => {
	if (!getCurrentUserId()) return errorAlertState.set('Could not save to DB without a Unique ID');
	if (!model.uid) model.uid = getCurrentUserId();
	if (!model.photoURL) model.photoURL = getCurrentUserInfo().photoURL;
	if (!model.displayName) model.displayName = getCurrentUserInfo().displayName;
	if (!model.email) model.email = getCurrentUserInfo().email;

	return set(refs().currentUserFinalScan, model)
		.then(() => {
			currentUserFinalScanState.set(model);
			successAlertState.set('Update Successfully Stored!');
		})
		.catch((err) => errorAlertState.set(err));
};

const fetchCurrentUserFinalScan = () => {
	if (!getCurrentUserId()) return currentUserFinalScanState.set(null);

	return onValue(refs().currentUserFinalScan, (snapshot) => {
		if (snapshot.exists()) currentUserFinalScanState.set(snapshot.val());
		else storeCurrentUserFinalScan();
	});
};

const fetchAllUserFinalScans = () =>
	onValue(refs().finalScan, (snapshot) => {
		const array = [];
		const finalScans = snapshot.val();
		for (const key in finalScans) array.push(finalScans[key]);
		finalScansState.set(array);
	});

export {
	scanModel,
	storeFinalScanByUid,
	storeCurrentUserFinalScan,
	fetchCurrentUserFinalScan,
	fetchAllUserFinalScans,
};
