import { writable } from 'svelte/store';

const firstScansState = writable(null);
const currentUserFirstScanState = writable(null);

export { firstScansState, currentUserFirstScanState };
