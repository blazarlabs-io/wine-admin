import { Timestamp } from "firebase/firestore";

export type TierType = "1";
export type LevelType = "bronze" | "silver" | "gold" | "diamond";

export interface TierAndLevelInterface {
  tier: TierType | null;
  level: LevelType | null;
}
export interface SingleLevelInterface {
  qrCodes: number;
  price: number;
}

export interface TiersInterface {
  1: "euLabels";
}

export interface LevelsInterface {
  bronze: SingleLevelInterface | null;
  silver: SingleLevelInterface | null;
  gold: SingleLevelInterface | null;
  platinum: SingleLevelInterface | null;
}

export interface CreateAdminNotification {
  requestDate: Timestamp;
  wineryName: string;
  wineryEmail: string;
  wineryPhone: string;
  wineryRepresentative: string;
}

export interface DynamicQrCodes {
  docId: string;
  staticUrl: string;
  redirectUrl: string;
  imageUrl: string;
}
