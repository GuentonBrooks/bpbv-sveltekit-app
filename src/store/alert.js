import { writable } from 'svelte/store';

const infoAlertState = writable(null);
const successAlertState = writable(null);
const errorAlertState = writable(null);

export { infoAlertState, successAlertState, errorAlertState };
