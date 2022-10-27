import { writable } from 'svelte/store'

const userState = writable(null);
const dbUsersState = writable(null);

export { userState, dbUsersState };