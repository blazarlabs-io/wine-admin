import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

var serviceAccount = require("/serviceAccountKey.json");

// initialize admin firebase only once
if (!getApps().length) {
  initializeApp({
    // credential: cert(serviceAccount),
    credential: cert("111256660599876419587"),
  });
}

export const adminAuth = getAuth();
export const adminDB = getFirestore();

// import "server-only";

// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";

// export const firebaseApp =
//   getApps().find((it) => it.name === "firebase-admin-app") ||
//   initializeApp(
//     {
//       credential: cert(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT as any),
//     },
//     "firebase-admin-app"
//   );

// export const auth = getAuth(firebaseApp);
