import { TRaidAPIData, TRaidEvent } from "../../Utils/types";
import TaskComponent from "./TaskComponent";
import { TTaskItem } from "./TaskItem";

const RaidTaskComponent = ({ raidsData }: { raidsData: TRaidAPIData }) => {
  const doesUserHaveRaidEvent = (raidEvent: TRaidEvent) => {
    return raidsData?.userData?.find(
      (userEvent) => userEvent === raidEvent.name
    );
  };

  return raidsData?.worldData?.map((raid) => {
    const taskItems: TTaskItem[] = [];
    raid.events.map((event) => {
      taskItems.push({
        name: event.name,
        currentProgress: doesUserHaveRaidEvent(event) ? 1 : 0,
        finishedProgress: 1,
      });
    });
    return (
      <TaskComponent
        key={raid.events[0].name}
        tasks={{ name: raid.name, taskItems: taskItems }}
      />
    );
  });
};

export default RaidTaskComponent;
