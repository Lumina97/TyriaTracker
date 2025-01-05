import { TDungeonAPIData, TDungeonPath } from "../../Utils/types";
import { TTaskItem } from "./TaskItem";
import TaskComponent from "./TaskComponent";

const DungeonTaskComponent = ({ dungeons }: { dungeons: TDungeonAPIData }) => {
  const doesUserHaveDungeonPath = (dungeonPath: TDungeonPath) => {
    return dungeons?.userData?.find(
      (userDungeon) => userDungeon === dungeonPath.name
    );
  };

  return dungeons?.worldData?.map((dungeon, index) => {
    const taskItems: TTaskItem[] = [];
    dungeon.paths.map((path) => {
      taskItems.push({
        name: path.name,
        currentProgress: doesUserHaveDungeonPath(path) ? 1 : 0,
        finishedProgress: 1,
      });
    });

    return (
      <TaskComponent
        key={dungeon.id}
        tasks={{ name: dungeon.name, taskItems: taskItems }}
      />
    );
  });
};

export default DungeonTaskComponent;
