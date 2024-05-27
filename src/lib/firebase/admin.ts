import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getFunctions } from "firebase-admin/functions";

// const serviceAccountKey = require("../../../serviceAccountKey.json");

let adminApp;

// initialize admin firebase only once
if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT?.replace(
        /\\n/g,
        "\n"
      ),
    }),
  });
}

export const adminAuth = getAuth();
export const adminDB = getFirestore();
export const adminFunctions = getFunctions(adminApp);
