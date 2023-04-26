import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';

function init() {
  const apps = getApps();
  if (apps.length > 0) return apps[0];

  initializeApp({
    apiKey: process.env['NEXT_PUBLIC_FIREBASE_REST_API_KEY'],
    authDomain: process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
    projectId: process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
    storageBucket: process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
    appId: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
    measurementId: process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'],
  });
}

export const firebaseApp = init();

export const storage = getStorage(firebaseApp);
