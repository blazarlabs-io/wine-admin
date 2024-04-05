export type TierType = "1" | "2";
export type LevelType = "wood" | "bronze" | "silver" | "gold" | "platinum";

export interface TierAndLevelInterface {
  tier: TierType | null;
  level: LevelType | null;
}
