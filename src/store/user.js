import { writable } from 'svelte/store';

const userState = writable(null);
const allUsersState = writable(null);

export { userState, allUsersState };
