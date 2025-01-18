import {
  createFileRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";
import { TAPIData, TAPIDataType } from "../Utils/types";
import RaidTaskComponent from "../Components/Tasks/RaidTaskComponent";
import DungeonTaskComponent from "../Components/Tasks/DungeonTaskComponent";
import DailyCraftingTaskComponent from "../Components/Tasks/DailyCraftingTaskComponent";
import WizardVaultTaskComponent from "../Components/Tasks/WizardVaultTaskComponent";
import WorldBossTaskComponent from "../Components/Tasks/WorldBossTaskComponent";
import SkeletonLoader from "../Components/SkeletonLoading/SkeletonLoader";
import { useTaskProvider } from "../Providers/TaskProvider";

export const Route = createFileRoute("/tasks/$taskItem")({
  component: TaskItemComponent,
});

const TaskComponents = (data: TAPIData) => {
  if (!data) return <></>;
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
  const { taskItem } = useParams({ from: "/tasks/$taskItem" });
  const data = useTaskProvider().getApiData(taskItem as TAPIDataType);
  if (data.type === TAPIDataType.Null)
    return <SkeletonLoader amountOfRows={10} />;
  else return TaskComponents(data);
}
