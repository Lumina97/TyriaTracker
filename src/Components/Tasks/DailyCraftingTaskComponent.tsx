import { TDailyCraft, TDailyCraftsAPIData } from "../../Utils/types";
import TaskItem from "./TaskItem";

const DailyCraftingTaskComponent = ({
  dailyCrafting,
}: {
  dailyCrafting: TDailyCraftsAPIData;
}) => {
  const doesUserHaveDailyCraft = (worldData: TDailyCraft) => {
    return dailyCrafting?.userData?.find(
      (craft: string) => craft === worldData.name
    );
  };

  return (
    <div className="flex gap-2 flex-col">
      {dailyCrafting?.worldData?.map((craft) => {
        const taskItem = {
          name: craft.name,
          currentProgress: doesUserHaveDailyCraft(craft) ? 1 : 0,
          finishedProgress: 1,
        };

        return <TaskItem key={craft.name} item={taskItem} />;
      })}
    </div>
  );
};

export default DailyCraftingTaskComponent;
