import { TWorldBoss, TWorldBossesAPIData } from "../../Utils/types";
import TaskItem from "./TaskItem";

const WorldBossTaskComponent = ({
  worldBosses,
}: {
  worldBosses: TWorldBossesAPIData;
}) => {
  const doesUserHaveWorldBoss = (worldData: TWorldBoss) => {
    return worldBosses?.userData?.find(
      (boss: string) => boss === worldData.name
    );
  };

  return (
    <div className="flex gap-2 flex-col">
      {worldBosses?.worldData?.map((boss) => {
        const taskItem = {
          name: boss.name,
          currentProgress: doesUserHaveWorldBoss(boss) ? 1 : 0,
          finishedProgress: 1,
        };
        return <TaskItem key={boss.name} item={taskItem} />;
      })}
    </div>
  );
};

export default WorldBossTaskComponent;
