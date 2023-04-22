import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { ENV } from "./env";

const firebaseConfig = {
    apiKey: ENV.apiKey,
    authDomain: ENV.authDomain,
    projectId: ENV.projectId,
    storageBucket: ENV.storageBucket,
    messagingSenderId: ENV.messagingSenderId,
    appId: ENV.appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
