import { writable } from 'svelte/store';

const currentUserState = writable(null);
const allUsersState = writable(null);

export { currentUserState, allUsersState };
