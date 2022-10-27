import { auth, db } from './firebaseInstance';
import { ref, set, get } from 'firebase/database';

// Database Document Paths
const paths = () => ({
  users: 'users/',
  currentUser: 'users/' + getCurrentUserId(),
});

// Database Refferences
const refs = () => ({
  users: ref(db, paths().users),
  currentUserInfo: ref(db, paths().currentUser),
});

// Current User Information Functions
const getCurrentUserId = () => auth.currentUser.uid;
const getCurrentUserEmail = () => auth.currentUser.email;
const getCurrentUserDisplayName = () => auth.currentUser.displayName;
const getCurrentUserPhotoURL = () => auth.currentUser.photoURL;
const getCurrentUserInfo = () => ({
  uid: auth.currentUser.uid,
  email: auth.currentUser.email,
  displayName: auth.currentUser.displayName,
  photoURL: auth.currentUser.photoURL,
});

const storeCurrentUserInfoAsync = () => (
  set(refs().currentUserInfo, getCurrentUserInfo())
    .then(() => { return getCurrentUserInfo() })
    .catch((err) => { throw err })
);

const fetchCurrentUserInfoAsync = () => (
  get(refs().currentUserInfo)
    .then((snapshot) => {
        if (snapshot.exists()) {
        return snapshot.val()
      } else {
        storeCurrentUserInfoAsync()
          .then((currentUser) => { return currentUser })
          .catch((err) => { throw err })
      }
    })
    .catch((err) => { throw err })
);

const fetchAllUsersAsync = () => (
  get(refs().users)
    .then((snapshot) => {
      const array = [];
      const users = snapshot.val();
      for (const key in users) array.push(users[key]);
      return array;
    })
    .catch((err) => { throw err })
);

export {
  getCurrentUserId,
  getCurrentUserEmail,
  getCurrentUserDisplayName,
  getCurrentUserPhotoURL,
  getCurrentUserInfo,
  storeCurrentUserInfoAsync,
  fetchCurrentUserInfoAsync,
  fetchAllUsersAsync,
}