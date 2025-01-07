import axios, { AxiosRequestConfig } from "axios";
import { TAPIData, TAPIDataType, TTPItem } from "./types";
import { ESortDirection, ESortParam } from "../routes/tradingPost.index";

//@ts-ignore
const APIBaseURL = import.meta.env.VITE_API_URL;
//@ts-ignore
const token = import.meta.env.VITE_JWT;
//@ts-ignore
const email = import.meta.env.VITE_EMAIL;

export const getUserRaids = async () => {
  const url = `${APIBaseURL}api/raids`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: email,
      jwt: token,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const raidsData: TAPIData = {
        type: TAPIDataType.Raids,
        data: {
          userData: result.data.userData,
          worldData: result.data.worldData,
        },
      };
      return raidsData;
    }
  } catch (error) {
    console.error(error);
  }
  return { type: TAPIDataType.Null, data: null } as TAPIData;
};

export const getUserDungeons = async () => {
  const url = `${APIBaseURL}api/dungeons`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: email,
      jwt: token,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const dungeonsData: TAPIData = {
        type: TAPIDataType.Dungeons,
        data: {
          userData: result.data.userData,
          worldData: result.data.worldData,
        },
      };
      return dungeonsData;
    }
  } catch (error) {
    console.error(error);
  }
  return { type: TAPIDataType.Null, data: null } as TAPIData;
};

export const getUserWorldBosses = async () => {
  const url = `${APIBaseURL}api/worldBosses`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: email,
      jwt: token,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const worldBossesData: TAPIData = {
        type: TAPIDataType.WorldBosses,
        data: {
          userData: result.data.userData,
          worldData: result.data.worldData,
        },
      };
      return worldBossesData;
    }
  } catch (error) {
    console.error(error);
  }
  return { type: TAPIDataType.Null, data: null } as TAPIData;
};

export const getUserDailyCrafting = async () => {
  const url = `${APIBaseURL}api/dailyCrafting`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: email,
      jwt: token,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const dailyCraftData: TAPIData = {
        type: TAPIDataType.DailyCrafting,
        data: {
          userData: result.data.userData,
          worldData: result.data.worldData,
        },
      };
      return dailyCraftData;
    }
  } catch (error) {
    console.error(error);
  }
  return { type: TAPIDataType.Null, data: null } as TAPIData;
};

export const getUserWizardVault = async () => {
  const url = `${APIBaseURL}api/wizardVault`;
  const config: AxiosRequestConfig = {
    method: "post",
    data: {
      email: email,
      jwt: token,
    },
    url,
  };
  try {
    const result = await axios(config);
    if (result.status === 200) {
      const wizardVault: TAPIData = {
        type: TAPIDataType.WizardVault,
        data: {
          daily: result.data.userData?.daily,
          weekly: result.data.userData?.weekly,
          special: result.data.userData?.special,
        },
      };
      return wizardVault;
    }
  } catch (error) {
    console.error(error);
  }
  return { type: TAPIDataType.Null, data: null } as TAPIData;
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
