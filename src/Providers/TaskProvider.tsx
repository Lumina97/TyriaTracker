import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import { TAPIData, TAPIDataType } from "../Utils/types";
import {
  getUserDailyCrafting,
  getUserDungeons,
  getUserRaids,
  getUserWizardVault,
  getUserWorldBosses,
} from "../Utils/API";
import { TUser } from "./APIProvider";

type TTaskProvider = {
  getApiData: (type: TAPIDataType) => TAPIData;
};

const getUser = () => {
  let User: TUser;
  const userStr = localStorage.getItem("user");
  if (userStr) {
    User = JSON.parse(userStr);
    if (!User) {
      console.log("Failed to get user!");
      return;
    }
    return User;
  } else {
    console.log("unable to get user");
    return;
  }
};

const taskContext = createContext<TTaskProvider>({} as TTaskProvider);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [raidData, setRaidData] = useState<TAPIData>({
    type: TAPIDataType.Null,
    data: null,
  } as TAPIData);
  const [dungeonData, setDungeonData] = useState<TAPIData>({
    type: TAPIDataType.Null,
    data: null,
  });
  const [dailyCraftData, setDailyCraftData] = useState<TAPIData>({
    type: TAPIDataType.Null,
    data: null,
  });
  const [worldBossData, setWorldBossData] = useState<TAPIData>({
    type: TAPIDataType.Null,
    data: null,
  });
  const [wizardVaultData, setWizardVaultData] = useState<TAPIData>({
    type: TAPIDataType.Null,
    data: null,
  });

  const getApiData = (type: TAPIDataType) => {
    switch (type) {
      case TAPIDataType.Raids:
        return raidData;
      case TAPIDataType.Dungeons:
        return dungeonData;
      case TAPIDataType.DailyCrafting:
        return dailyCraftData;
      case TAPIDataType.WizardVault:
        return wizardVaultData;
      case TAPIDataType.WorldBosses:
        return worldBossData;
      default:
        return { type: TAPIDataType.Null, data: null } as TAPIData;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = getUser() as TUser;
      if (user === null) return;

      try {
        console.log("Fetching data");
        const raidResponse = await getUserRaids(user);
        setRaidData(raidResponse);

        const dungeonResponse = await getUserDungeons(user);
        setDungeonData(dungeonResponse);

        const dailyCraftResponse = await getUserDailyCrafting(user);
        setDailyCraftData(dailyCraftResponse);

        const worldBossResponse = await getUserWorldBosses(user);
        setWorldBossData(worldBossResponse);

        const wizardVaultResponse = await getUserWizardVault(user);
        setWizardVaultData(wizardVaultResponse);
        console.log("Done Fetching data");
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <taskContext.Provider
      value={{
        getApiData,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

export const useTaskProvider = () => useContext(taskContext);
