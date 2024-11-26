import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import TaskComponent from "../Components/Tasks/TaskComponent";
import { TUser, useAPI } from "../Providers/APIProvider";
import {
  TDailyCraftsAPIData,
  TDungeon,
  TDungeonAPIData,
  TRaidAPIData,
  TRaidWing,
  TWizardVaultAPIData,
  TWorldBoss,
  TWorldBossesAPIData,
} from "../Utils/types";
import TaskItem, { TTaskItem } from "../Components/Tasks/TaskItem";
import { useState } from "react";
import {
  getUserDailyCrafting,
  getUserDungeons,
  getUserRaids,
  getUserWizardVault,
  getUserWorldBosses,
} from "../Utils/API";

export const Route = createFileRoute("/Home")({
  loader: async () => {
    console.log("loader");
    let User: TUser;
    const userStr = localStorage.getItem("user");
    if (userStr) {
      User = JSON.parse(userStr);
      if (!User) {
        console.log("Failed to get user!");
        return {};
      }
    } else {
      console.log("unable to get user");
      return {};
    }

    const raids = await getUserRaids(User);
    const dungeons = await getUserDungeons(User);
    const worldBosses = await getUserWorldBosses(User);
    const dailyCrafting = await getUserDailyCrafting(User);
    const wizardVault = await getUserWizardVault(User);

    return {
      raids,
      dungeons,
      worldBosses,
      dailyCrafting,
      wizardVault,
    };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const [userRaids, setUserRaids] = useState<TRaidAPIData>();
  const [userDungeons, setUserDungeons] = useState<TDungeonAPIData>();
  const [userWorldBosses, setUserWorldBosses] = useState<TWorldBossesAPIData>();
  const [userDailyCrafts, setUserDailyCrafts] = useState<TDailyCraftsAPIData>();
  const [userWizardVault, setUserWizardVault] = useState<TWizardVaultAPIData>();

  const { raids, dungeons, worldBosses, dailyCrafting, wizardVault } =
    useLoaderData({ from: "/Home" });

  console.log(raids?.userData);
  console.log(dungeons?.userData);
  console.log(worldBosses?.userData);
  console.log(dailyCrafting?.userData);
  console.log(wizardVault?.daily);
  console.log(wizardVault?.weekly);
  console.log(wizardVault?.special);

  const doesUserHaveRaid = (worldData: TRaidWing) => {
    return userRaids?.userData?.find(
      (userwing) => userwing.id === worldData.id
    );
  };

  const doesUserHaveDungeon = (worldData: TDungeon) => {
    return userDungeons?.userData?.find(
      (userDungeon) => userDungeon.id === worldData.id
    );
  };

  const doesUserHaveWorldBoss = (worldData: TWorldBoss) => {
    return userWorldBosses?.userData?.find((boss) => boss.id === worldData.id);
  };

  const doesUserHaveDailyCraft = (worldData: TWorldBoss) => {
    return userDailyCrafts?.userData?.find(
      (craft) => craft.id === worldData.id
    );
  };

  const wizardDailyTasks: TTaskItem[] | undefined =
    userWizardVault?.daily?.objectives.map((objective, index) => {
      return {
        name: objective.title,
        currentProgress: objective.progress_current,
        finishedProgress: objective.progress_complete,
      };
    });

  const wizardWeeklyTasks: TTaskItem[] | undefined =
    userWizardVault?.weekly?.objectives.map((objective, index) => {
      return {
        name: objective.title,
        currentProgress: objective.progress_current,
        finishedProgress: objective.progress_complete,
      };
    });

  const wizardSpecialTasks: TTaskItem[] | undefined =
    userWizardVault?.special?.objectives.map((objective, index) => {
      return {
        name: objective.title,
        currentProgress: objective.progress_current,
        finishedProgress: objective.progress_complete,
      };
    });

  return (
    <div className="w-full sm:flex-row lg:flex-row md:flex-row bg-sunset flex flex-col ">
      <Navbar />
    </div>
  );
}
