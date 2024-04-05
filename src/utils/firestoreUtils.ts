import { adminDB } from "@/lib/firebase/admin";
import { TierAndLevelInterface } from "@/typings/data";

export const createDocInCollection = async (
  collection: string,
  id: string,
  data: TierAndLevelInterface
) => {
  const result = await adminDB.collection(collection).doc(id).set(data);
  return result;
};
