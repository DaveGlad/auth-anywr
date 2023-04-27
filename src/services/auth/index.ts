import { LoginDto } from '@/src/shared';
import axios from 'axios';
import {
  getAuth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';

/**
 * It creates a user with an email and a password
 * @param {LoginDto} infos - LoginDto
 * @returns A promise that resolves to a UserCredential object.
 */
export const firebaseCreateUserWithEmailAndPassword = async (
  infos: LoginDto
): Promise<UserCredential> => {
  const auth = getAuth();
  const { email, password } = infos;
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * It takes an object with an email and a password, and returns a promise that resolves to a user
 * credential
 * @param {LoginDto} infos - LoginDto
 * @returns A promise that resolves to a UserCredential object.
 */
export const firebaseLogInWithEmailAndPassword = async (
  infos: LoginDto
): Promise<UserCredential> => {
  const auth = getAuth();
  const { email, password } = infos;
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * It gets the current authentication instance, and then signs out
 */
export const logout = async (): Promise<void> => {
  const auth = getAuth();
  await auth.signOut();
};

/**
 * It returns a promise that resolves to the current user, or null if there is no user
 * @returns A promise that resolves to a FirebaseUser or null.
 */
export const authUser = async (): Promise<FirebaseUser | null> => {
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
      unsubscribe();
    });
  });
};

/**
 * It sends a POST request to the server, and returns the response data
 * @returns { success: boolean }
 */
export const Nextlogout = async (): Promise<{ success: boolean }> => {
  const response = await axios.post(`/api/logout`);
  return response.data;
};

/**
 * It sends a POST request to the server, and returns the response
 * @param {string} type - string
 * @returns { success: boolean }
 */
export const Nextlogin = async (): Promise<{ success: boolean }> => {
  const response = await axios.post(`/api/login?type=user`);
  return response.data;
};
