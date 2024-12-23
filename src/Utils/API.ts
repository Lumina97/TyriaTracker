import axios, { AxiosRequestConfig } from "axios";
import { TUser } from "../Providers/APIProvider";
import { APIBaseURL } from "./settings";
import {
  TDailyCraftsAPIData,
  TDungeonAPIData,
  TRaidAPIData,
  TTPItem,
  TWizardVaultAPIData,
  TWorldBossesAPIData,
} from "./types";
import { ESortDirection, ESortParam } from "../routes/TradingPost.index";

const validateUser = async (user: TUser, GetUser: () => TUser) => {
  if (!user.email) {
    user = GetUser();
    if (!user.email) {
      return false;
    }
  }
  return user;
};

export const forgotPassword = () => {
  console.log("Send password reset email");
};

export const getUserRaids = async (user: TUser) => {
  if (user.email === "") {
    console.log("user email was empty");
    return undefined;
  }

  const url = `${APIBaseURL}api/raids`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: user.email,
      jwt: user.jwt,
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

export const getUserDungeons = async (user: TUser) => {
  if (user.email === "") {
    console.log("user email was empty");
    return undefined;
  }

  const url = `${APIBaseURL}api/dungeons`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: user.email,
      jwt: user.jwt,
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

export const getUserWorldBosses = async (user: TUser) => {
  if (user.email === "") {
    console.log("user email was empty");
    return undefined;
  }

  const url = `${APIBaseURL}api/worldBosses`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: user.email,
      jwt: user.jwt,
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

export const getUserDailyCrafting = async (user: TUser) => {
  if (user.email === "") {
    console.log("user email was empty");
    return undefined;
  }

  const url = `${APIBaseURL}api/dailyCrafting`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: user.email,
      jwt: user.jwt,
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

export const getUserWizardVault = async (user: TUser) => {
  if (user.email === "") {
    console.log("user email was empty");
    return undefined;
  }

  const url = `${APIBaseURL}api/wizardVault`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: user.email,
      jwt: user.jwt,
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

export const getAllTradingPostItems = async () => {
  try {
    const url = `${APIBaseURL}api/tradingPost/getTradableItems`;
    const config: AxiosRequestConfig = {
      method: "post",
      url,
    };
    const response = await axios(config);
    if (response.status === 200) {
      return response.data.data as TTPItem[];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTradableItemsInRange = async (
  start: number,
  amount: number,
  sortParam: ESortParam,
  sortDirection: ESortDirection
) => {
  try {
    const url = `${APIBaseURL}api/tradingPost/getTradableItems`;
    const param = sortParam ? sortParam.toString() : "demand";
    const config: AxiosRequestConfig = {
      method: "post",
      url,
      data: {
        start,
        amount,
        orderCriteria: param,
        orderDirection: sortDirection,
      },
    };
    const response = await axios(config);
    if (response.status === 200) {
      return response.data.data as TTPItem[];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllTradingPostItemIds = async () => {
  try {
    const url = `${APIBaseURL}api/tradingPost/getTradableItemIDs`;
    const config: AxiosRequestConfig = {
      method: "post",
      url,
    };
    const response = await axios(config);
    if (response.status === 200) {
      return response.data.data as number[];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
