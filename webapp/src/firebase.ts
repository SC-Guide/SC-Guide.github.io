import { getApp, getApps, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyD69IYM5HhxA3taphALXVlGZs5llkNYRQ',
  authDomain: 'skincare-guide-e6fcb.firebaseapp.com',
  projectId: 'skincare-guide-e6fcb',
  storageBucket: 'skincare-guide-e6fcb.firebasestorage.app',
  messagingSenderId: '192131587322',
  appId: '1:192131587322:web:d1f5ec2919cbd41fe13d43',
  measurementId: 'G-1P31KHWCVN',
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const authReady = setPersistence(auth, browserLocalPersistence);
