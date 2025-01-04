import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { TUser } from "../Providers/APIProvider";
import {
  getUserDailyCrafting,
  getUserDungeons,
  getUserRaids,
  getUserWizardVault,
  getUserWorldBosses,
} from "../Utils/API";
import { TAPIData, TAPIDataType } from "../Utils/types";
import RaidTaskComponent from "../Components/Tasks/RaidTaskComponent";
import DungeonTaskComponent from "../Components/Tasks/DungeonTaskComponent";
import DailyCraftingTaskComponent from "../Components/Tasks/DailyCraftingTaskComponent";
import WizardVaultTaskComponent from "../Components/Tasks/WizardVaultTaskComponent";
import WorldBossTaskComponent from "../Components/Tasks/WorldBossTaskComponent";
import SkeletonLoader from "../Components/SkeletonLoading/SkeletonLoader";
import { Suspense } from "react";

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

export const Route = createFileRoute("/Tasks/$taskItem")({
  component: TaskItemComponent,
  loader: async ({ params }) => {
    const route = params.taskItem as TAPIDataType;
    const user = getUser() as TUser;
    if (user === null)
      return { type: TAPIDataType.Null, data: null } as TAPIData;

    switch (route) {
      case TAPIDataType.Raids:
        return await getUserRaids(user);

      case TAPIDataType.Dungeons:
        return await getUserDungeons(user);

      case TAPIDataType.WorldBosses:
        return await getUserWorldBosses(user);

      case TAPIDataType.DailyCrafting:
        return await getUserDailyCrafting(user);

      case TAPIDataType.WizardVault:
        return await getUserWizardVault(user);
    }
  },
});

const TaskComponents = (data: TAPIData) => {
  switch (data.type) {
    case TAPIDataType.Raids:
      return <RaidTaskComponent raidsData={data.data} />;
    case TAPIDataType.Dungeons:
      return <DungeonTaskComponent dungeons={data.data} />;
    case TAPIDataType.DailyCrafting:
      return <DailyCraftingTaskComponent dailyCrafting={data.data} />;
    case TAPIDataType.WizardVault:
      return <WizardVaultTaskComponent wizardVault={data.data} />;
    case TAPIDataType.WorldBosses:
      return <WorldBossTaskComponent worldBosses={data.data} />;

    default:
      return <div>No valid data</div>;
  }
};

function TaskItemComponent() {
  const data = useLoaderData({ from: "/Tasks/$taskItem" });

  if (data.type === TAPIDataType.Null) return <div>No data</div>;

  return TaskComponents(data);
}
