//naming conventions come from the API
//I kept them here to easily parse incoming data to
//types

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

//worldbosses
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
