import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import TaskComponent from "../Components/Tasks/TaskComponent";
import { TUser } from "../Providers/APIProvider";
import {
  TDailyCraft,
  TDungeonPath,
  TRaidEvent,
  TWorldBoss,
} from "../Utils/types";
import TaskItem, { TTaskItem } from "../Components/Tasks/TaskItem";
import {
  getUserDailyCrafting,
  getUserDungeons,
  getUserRaids,
  getUserWizardVault,
  getUserWorldBosses,
} from "../Utils/API";

export const Route = createFileRoute("/Home")({
  loader: async () => {
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
  const { raids, dungeons, worldBosses, dailyCrafting, wizardVault } =
    useLoaderData({ from: "/Home" });

  const doesUserHaveRaidEvent = (raidEvent: TRaidEvent) => {
    return raids?.userData?.find((userEvent) => userEvent === raidEvent.name);
  };

  const doesUserHaveDungeonPath = (dungeonPath: TDungeonPath) => {
    return dungeons?.userData?.find(
      (userDungeon) => userDungeon === dungeonPath.name
    );
  };

  const doesUserHaveWorldBoss = (worldData: TWorldBoss) => {
    return worldBosses?.userData?.find((boss) => boss === worldData.name);
  };

  const doesUserHaveDailyCraft = (worldData: TDailyCraft) => {
    return dailyCrafting?.userData?.find((craft) => craft === worldData.name);
  };

  const wizardDailyTasks: TTaskItem[] | undefined =
    wizardVault?.daily?.objectives.map((objective) => {
      return {
        name: objective.title,
        currentProgress: objective.progress_current,
        finishedProgress: objective.progress_complete,
      };
    });

  const wizardWeeklyTasks: TTaskItem[] | undefined =
    wizardVault?.weekly?.objectives.map((objective) => {
      return {
        name: objective.title,
        currentProgress: objective.progress_current,
        finishedProgress: objective.progress_complete,
      };
    });

  const wizardSpecialTasks: TTaskItem[] | undefined =
    wizardVault?.special?.objectives.map((objective) => {
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
          {raids?.worldData?.map((raid) => {
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
          {dungeons?.worldData?.map((dungeon, index) => {
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
          {worldBosses?.worldData?.map((boss, index) => {
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
          {dailyCrafting?.worldData?.map((craft, index) => {
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
