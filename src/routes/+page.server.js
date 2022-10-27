import { userState } from '../store/user'

// export const load = () => {
//   userState.subscribe((user) => {
//     if (user) return { hasUser: true };
//     else return { hasUser: false };
//   });
// };

export function load() {
  let hasUser;
  userState.subscribe((user) => user ? hasUser = true : hasUser = false);
  return {
    hasUser
  };
}