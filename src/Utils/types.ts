//naming conventions come from the API
//I kept them here to easily parse incoming data to
//types

export enum TAPIDataType {
  Null = "null",
  Raids = "raid",
  Dungeons = "dungeons",
  WorldBosses = "worldBosses",
  DailyCrafting = "dailyCrafts",
  WizardVault = "wizardVault",
}

export type TAPIData =
  | { type: TAPIDataType.Null; data: null }
  | { type: TAPIDataType.Raids; data: TRaidAPIData }
  | { type: TAPIDataType.WizardVault; data: TWizardVaultAPIData }
  | { type: TAPIDataType.WorldBosses; data: TWorldBossesAPIData }
  | { type: TAPIDataType.DailyCrafting; data: TDailyCraftsAPIData }
  | { type: TAPIDataType.Dungeons; data: TDungeonAPIData };

//raids
export type TRaidAPIData = {
  userData: string[];
  worldData: TRaidWing[];
};

export type TRaidWing = {
  id: number;
  name: string;
  events: TRaidEvent[];
};

export type TRaidEvent = {
  id: number;
  name: string;
  type: string;
  RaidWingID: number;
};

//wizard vault
export type TWizardVaultAPIData = {
  daily: TWizardVault;
  weekly: TWizardVault;
  special: TWizardVault;
};

export type TWizardVault = {
  meta_progress_current: number;
  meta_progress_complete: number;
  meta_reward_item_id: number;
  meta_reward_astral: number;
  meta_reward_claimed: boolean;
  objectives: TWizardVaultObjective[];
};

export type TWizardVaultObjective = {
  id: number;
  title: string;
  track: string;
  acclaim: number;
  progress_current: number;
  progress_complete: number;
  claimed: boolean;
};

//worldBosses
export type TWorldBossesAPIData = {
  userData: string[];
  worldData: TWorldBoss[];
};

export type TWorldBoss = {
  id: number;
  name: string;
};

//dailyCrafts
export type TDailyCraftsAPIData = {
  userData: string[];
  worldData: TDailyCraft[];
};
export type TDailyCraft = {
  id: number;
  name: string;
};

//dungeons
export type TDungeonAPIData = {
  userData: string[];
  worldData: TDungeon[];
};

export type TDungeon = {
  id: number;
  name: string;
  paths: TDungeonPath[];
};

export type TDungeonPath = {
  id: number;
  name: string;
  type: string;
  DungeonID: number;
};

export type TTPItem = {
  id: number;
  level: number;
  name: string;
  icon: string;
  rarity: string;
  vendorValue: string;
  LatestPrice: TTPItemPriceHistory;
  PriceHistory?: TTPItemPriceHistory[];
};

export type TTPItemPriceHistory = {
  buyPrice: number;
  sellPrice: number;
  demand?: number;
  supply?: number;
  itemID: number;
  profit: number;
  ROI: number;
  timestamp: string;
};
