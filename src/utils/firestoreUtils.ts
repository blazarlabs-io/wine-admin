import { adminDB } from "@/lib/firebase/admin";
import { db, storage } from "@/lib/firebase/client";
import {
  CreateAdminNotification,
  DynamicQrCodes,
  TierAndLevelInterface,
} from "@/typings/data";
import { Winery } from "@/typings/wineries";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const createDocInCollection = async (
  collection: string,
  id: string,
  data: TierAndLevelInterface
) => {
  const result = await adminDB.collection(collection).doc(id).set(data);
  return result;
};

export const deleteDocInCollection = async (collection: string, id: string) => {
  const result = await adminDB.collection(collection).doc(id).delete();
  return result;
};

export const getTotalIncome = async () => {
  try {
    const collectionRef = collection(db, "wineries");
    const wineries = await getDocs(collectionRef);
    let totalIncome = 0;

    wineries.forEach(async (dx) => {
      const data = dx.data();
      const level = data.level;
      const sysVarsRef = doc(db, "utils", "systemVariables");
      const sysVarsDoc = await getDoc(sysVarsRef);
      const levelMap = sysVarsDoc.data()?.level;
      const price = level && levelMap[level].price;
      totalIncome += price;
    });

    return totalIncome;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateWineriesWithNewData = async (newWineries: Winery[]) => {
  try {
    const collectionRef = collection(db, "wineries");
    const wineries = await getDocs(collectionRef);

    wineries.forEach(async (dx) => {
      const id = dx.id;
      const winery = newWineries.find((x) => x.id === id);

      if (winery) {
        await setDoc(doc(db, "wineries", id), winery);
      }
    });
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const saveDynamicQrCode = async (data: DynamicQrCodes) => {
  const { docId, staticUrl, redirectUrl, imageUrl } = data;

  try {
    const docData = {
      docId: docId,
      staticUrl,
      redirectUrl,
      imageUrl,
    };

    const res = await setDoc(doc(db, "dynamicQrCodes", docId), docData);

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const uploadQrCodeToStorage = async (
  id: string,
  file: string,
  callback: (url: string) => void
) => {
  try {
    const blob = await fetch(file).then((r) => r.blob());
    const newImage = new File([blob], id + ".png", { type: "image/png" });

    const imgRef = ref(storage, "dynamic-qr-codes/" + id + ".png");

    const uploadTask = uploadBytesResumable(imgRef, newImage);

    const result = uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback(downloadURL);
        });
      }
    );

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getDynamicQrCodes = async () => {
  try {
    const collectionRef = collection(db, "dynamicQrCodes");
    const qrCodes = await getDocs(collectionRef);
    const qrCodesData: DynamicQrCodes[] = [];

    qrCodes.forEach((dx) => {
      const data = dx.data();
      qrCodesData.push({
        docId: data.docId,
        staticUrl: data.staticUrl,
        redirectUrl: data.redirectUrl,
        imageUrl: data.imageUrl,
      });
    });

    return qrCodesData;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateQrCode = async (data: DynamicQrCodes) => {
  try {
    const { docId, staticUrl, redirectUrl, imageUrl } = data;
    console.log(data);
    const docRef = doc(db, "dynamicQrCodes", docId);
    const res = await updateDoc(docRef, {
      docId,
      staticUrl,
      redirectUrl,
      imageUrl,
    });

    console.log("RESULT", res);

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteQrCode = async (docId: string) => {
  try {
    const res = deleteDoc(doc(db, "dynamicQrCodes", docId));
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};
