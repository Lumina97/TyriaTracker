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

type TTaskProvider = {
  getApiData: (type: TAPIDataType) => TAPIData;
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
      try {
        const raidResponse = await getUserRaids();
        setRaidData(raidResponse);

        const dungeonResponse = await getUserDungeons();
        setDungeonData(dungeonResponse);

        const dailyCraftResponse = await getUserDailyCrafting();
        setDailyCraftData(dailyCraftResponse);

        const worldBossResponse = await getUserWorldBosses();
        setWorldBossData(worldBossResponse);

        const wizardVaultResponse = await getUserWizardVault();
        setWizardVaultData(wizardVaultResponse);
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
