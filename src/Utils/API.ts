import axios, { AxiosRequestConfig } from "axios";
import { TUser } from "../Providers/APIProvider";
import { APIBaseURL } from "./settings";
import {
  TDailyCraftsAPIData,
  TDungeonAPIData,
  TRaidAPIData,
  TWizardVaultAPIData,
  TWorldBossesAPIData,
} from "./types";

const validateUser = async (user: TUser, GetUser: () => TUser) => {
  console.log("Validating user!");

  if (!user.email) {
    console.log("Has no user - getting from local!");
    user = GetUser();
    if (!user.email) {
      console.log("User was empty!");
      return false;
    }
    console.log(`Got from local!:${JSON.stringify(user)} `);
  }

  return user;
};

export const forgotPassword = () => {
  console.log("Send password reset email");
};

export const getUserRaids = async (user: TUser, GetUser: () => TUser) => {
  const usr = await validateUser(user, GetUser);
  if (usr === false) return;

  const url = `${APIBaseURL}api/raids`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: usr.email,
      jwt: usr.jwt,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const raidsData: TRaidAPIData = {
        userData: result.data.userData,
        worldData: result.data.worldData,
      };
      return raidsData;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const getUserDungeons = async (user: TUser, GetUser: () => TUser) => {
  const usr = await validateUser(user, GetUser);
  if (usr === false) return;
  const url = `${APIBaseURL}api/dungeons`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: usr.email,
      jwt: usr.jwt,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const dungeonsData: TDungeonAPIData = {
        userData: result.data.userData,
        worldData: result.data.worldData,
      };
      return dungeonsData;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const getUserWorldBosses = async (user: TUser, GetUser: () => TUser) => {
  const usr = await validateUser(user, GetUser);
  if (usr === false) return;

  const url = `${APIBaseURL}api/worldBosses`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: usr.email,
      jwt: usr.jwt,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const worldBossesData: TWorldBossesAPIData = {
        userData: result.data.userData,
        worldData: result.data.worldData,
      };
      return worldBossesData;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const getUserDailyCrafting = async (
  user: TUser,
  GetUser: () => TUser
) => {
  const usr = await validateUser(user, GetUser);
  if (usr === false) return;

  const url = `${APIBaseURL}api/dailyCrafting`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: usr.email,
      jwt: usr.jwt,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const dailyCraftData: TDailyCraftsAPIData = {
        userData: result.data.userData,
        worldData: result.data.worldData,
      };
      return dailyCraftData;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const getUserWizardVault = async (user: TUser, GetUser: () => TUser) => {
  const usr = await validateUser(user, GetUser);
  if (usr === false) return;

  const url = `${APIBaseURL}api/wizardVault`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: usr.email,
      jwt: usr.jwt,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const wizardVault: TWizardVaultAPIData = {
        daily: result.data.userData?.daily,
        weekly: result.data.userData?.weekly,
        special: result.data.userData?.special,
      };
      return wizardVault;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};
