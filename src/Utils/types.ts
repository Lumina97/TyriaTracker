//naming conventions come from the API
//I kept them here to easily parse incoming data to
//types

//raids
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
export type TWorldBosses = {
  id: number;
  names: string[];
};

//dailyCrafts
export type TDailyCrafts = {
  id: number;
  names: string[];
};

//dungeons
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
