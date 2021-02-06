import _axios from "axios";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { Sentry } from "~/utils/sentry";

// Firebase

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

// Axios

const axios = _axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://okusuri.land/api/"
      : "http://localhost:8000/api/",
});

// Types

type Profile = {
  id: string;
  image: string;
  name: string;
  screenName: string;
};

// Helper Functions

const getCredential = async () => {
  try {
    return (await firebase.auth().getRedirectResult()).credential;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

const getProfile = async (token: string): Promise<Profile | null> => {
  try {
    const { data } = await axios.get<{ data: Profile }>("/reception", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

const getToken = async (user: firebase.User) => {
  try {
    return await user.getIdToken();
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

const postCredential = async (
  credential: firebase.auth.AuthCredential,
  token: string
) => {
  try {
    const { data } = await axios.post<{ data: Profile }>(
      "/patients",
      {
        accessToken: (credential as any).accessToken,
        accessTokenSecret: (credential as any).secret,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

// Main

const authenticate = () => {
  firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider());
};

export const useOkusuriLand = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Side Effects

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (!user) {
        setProfile(null);
        setToken(null);
        return;
      }

      setToken(await getToken(user));
    });
  }, []);

  useEffect(() => {
    if (!token) {
      setProfile(null);
      return;
    }

    (async () => {
      setIsProcessing(true);

      const credential = await getCredential();

      setProfile(
        await (credential
          ? postCredential(credential, token)
          : getProfile(token))
      );

      setIsProcessing(false);
    })();
  }, [token]);

  return {
    authenticate,
    isProcessing,
    profile,
  };
};
