import { writable } from 'svelte/store';

// First Scans
const firstScansState = writable(null);
const currentUserFirstScanState = writable(null);
const selectedUserFirstScanState = writable(null);

// Final Scans
const finalScansState = writable(null);
const currentUserFinalScanState = writable(null);
const selectedUserFinalScanState = writable(null);

export {
	firstScansState,
	currentUserFirstScanState,
	selectedUserFirstScanState,
	finalScansState,
	currentUserFinalScanState,
	selectedUserFinalScanState,
};
