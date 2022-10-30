import { writable } from 'svelte/store';

const infoAlert = writable(null);
const successAlert = writable(null);
const errorAlert = writable(null);

export { infoAlert, successAlert, errorAlert };
