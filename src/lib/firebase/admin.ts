import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getFunctions } from "firebase-admin/functions";

// const serviceAccountKey = require("../../../serviceAccountKey.json");
const serviceAccountKey = JSON.parse(
  Buffer.from(
    process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT as string,
    "base64"
  )
    .toString()
    .replace(/\n/g, "")
);
let adminApp;

// initialize admin firebase only once
if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccountKey),
  });
}

export const adminAuth = getAuth();
export const adminDB = getFirestore();
export const adminFunctions = getFunctions(adminApp);
