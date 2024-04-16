export type TierType = "1" | "2";
export type LevelType = "wood" | "bronze" | "silver" | "gold" | "platinum";

export interface TierAndLevelInterface {
  tier: TierType | null;
  level: LevelType | null;
}
export interface SingleLevelInterface {
  euLabels: number;
  price: number;
}

export interface TiersInterface {
  1: "euLabels";
}

export interface LevelsInterface {
  iron: SingleLevelInterface | null;
  bronze: SingleLevelInterface | null;
  silver: SingleLevelInterface | null;
  gold: SingleLevelInterface | null;
  platinum: SingleLevelInterface | null;
  diamond: SingleLevelInterface | null;
}
