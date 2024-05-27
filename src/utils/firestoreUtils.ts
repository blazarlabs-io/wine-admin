import { adminDB } from "@/lib/firebase/admin";
import { db } from "@/lib/firebase/client";
import { CreateAdminNotification, TierAndLevelInterface } from "@/typings/data";
import { Winery } from "@/typings/wineries";
import { collection, getDoc, getDocs, doc, setDoc } from "firebase/firestore";

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
