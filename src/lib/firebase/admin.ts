import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccountKey = require("../../../serviceAccountKey.json");

// initialize admin firebase only once
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccountKey),
  });
}

export const adminAuth = getAuth();
export const adminDB = getFirestore();
