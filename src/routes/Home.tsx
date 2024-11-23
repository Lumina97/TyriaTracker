import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import TaskComponent from "../Components/Tasks/TaskComponent";
import { useAPI } from "../Providers/APIProvider";
import { TDungeon, TRaidWing, TWorldBoss } from "../Utils/types";
import TaskItem, { TTaskItem } from "../Components/Tasks/TaskItem";

export const Route = createFileRoute("/Home")({
  component: HomeComponent,
});

function HomeComponent() {
  const {
    userRaids,
    userDungeons,
    userWorldBosses,
    userDailyCrafts,
    userWizardVault,
  } = useAPI();

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
      <div className=" grid w-full grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 grid-flow-row sm:w-full  sm:m-6 md:m-6 lg:m-6 gap-8">
        <div className="sm:p-2 md:p-2 lg:p-2 w-full flex flex-col border-2 text-white border-black bg-gradient-to-br from-gray-700 to-gray-950">
          <h3 className="text-center text-3xl font">Raids</h3>
          {userRaids?.worldData.map((raid) => {
            const taskItems: TTaskItem[] = [];
            const UserRaid = doesUserHaveRaid(raid);
            raid.events.map((event, index) => {
              taskItems.push({
                name: event.name,
                currentProgress:
                  UserRaid?.events[index].name === event.name ? 1 : 0,
                finishedProgress: 1,
              });
            });
            return (
              <TaskComponent
                //@ts-ignore
                key={raid.events[0].name}
                tasks={{ name: raid.name, taskItems: taskItems }}
              />
            );
          })}
        </div>
        {/*dungeons */}
        <div className="sm:p-2 md:p-2 lg:p-2 w-full flex flex-col border-2 text-white border-black bg-gradient-to-br from-gray-700 to-gray-950">
          <h3 className="text-center text-3xl font">Dungeons</h3>
          {userDungeons?.worldData.map((dungeon, index) => {
            const taskItems: TTaskItem[] = [];
            const UserDungeon = doesUserHaveDungeon(dungeon);

            dungeon.paths.map((path, index) => {
              taskItems.push({
                name: path.name,
                currentProgress:
                  UserDungeon?.paths[index].name === path.name ? 1 : 0,
                finishedProgress: 1,
              });
            });

            return (
              <TaskComponent
                //@ts-ignore
                key={dungeon.id || index}
                tasks={{ name: dungeon.name, taskItems: taskItems }}
              />
            );
          })}
        </div>

        {/*WorldBosses */}
        <div className="sm:p-2 md:p-2 lg:p-2 w-full flex flex-col border-2 text-white border-black bg-gradient-to-br from-gray-700 to-gray-950">
          <h3 className="text-center text-3xl font">World Bosses</h3>
          {userWorldBosses?.worldData.map((boss, index) => {
            const taskItem = {
              name: boss.name,
              currentProgress: doesUserHaveWorldBoss(boss) ? 1 : 0,
              finishedProgress: 1,
            };

            return (
              <TaskItem
                //@ts-ignore
                key={boss.name || index}
                item={taskItem}
                wrapperClass="p-2"
              />
            );
          })}
        </div>

        {/*Daily Crafts */}
        <div className="sm:p-2 md:p-2 lg:p-2 w-full flex flex-col border-2 text-white border-black bg-gradient-to-br from-gray-700 to-gray-950">
          <h3 className="text-center text-3xl font">Daily Crafting</h3>
          {userDailyCrafts?.worldData.map((craft, index) => {
            const taskItem = {
              name: craft.name,
              currentProgress: doesUserHaveDailyCraft(craft) ? 1 : 0,
              finishedProgress: 1,
            };

            return (
              <TaskItem
                //@ts-ignore
                key={craft.name || index}
                item={taskItem}
                wrapperClass="p-2"
              />
            );
          })}
        </div>

        {/*wizard Vault*/}
        <div className="sm:p-2 md:p-2 lg:p-2 w-full flex flex-col border-2 text-white border-black bg-gradient-to-br from-gray-700 to-gray-950">
          <h3 className="text-center text-3xl font">Wizard Vault</h3>
          {wizardDailyTasks && (
            <TaskComponent
              tasks={{ name: "Daily", taskItems: wizardDailyTasks }}
            />
          )}
          {wizardWeeklyTasks && (
            <TaskComponent
              tasks={{ name: "Weekly", taskItems: wizardWeeklyTasks }}
            />
          )}

          {wizardSpecialTasks && (
            <TaskComponent
              tasks={{ name: "Special", taskItems: wizardSpecialTasks }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
