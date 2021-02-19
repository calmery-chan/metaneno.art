import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

// Types

export type Credential = {
  accessToken: string;
  secret: string;
};

// Functions

export const getCredential = async () =>
  (await firebase.auth().getRedirectResult()).credential as Credential | null;

export const getToken = async (user: firebase.User) => await user.getIdToken();

export const logIn = async () => {
  await firebase
    .auth()
    .signInWithRedirect(new firebase.auth.TwitterAuthProvider());
};

export const logOut = async () => {
  await firebase.auth().signOut();
};

export { firebase };
