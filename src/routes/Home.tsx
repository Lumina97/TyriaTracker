import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import TaskComponent from "../Components/Tasks/TaskComponent";
import { TUser } from "../Providers/APIProvider";
import {
  TDailyCraft,
  TDungeonPath,
  TRaidEvent,
  TWorldBoss,
  TRaidAPIData,
  TDungeonAPIData,
  TWizardVaultAPIData,
  TWorldBossesAPIData,
  TDailyCraftsAPIData,
} from "../Utils/types";
import {
  getUserDailyCrafting,
  getUserDungeons,
  getUserRaids,
  getUserWizardVault,
  getUserWorldBosses,
} from "../Utils/API";
import { useEffect, useState } from "react";
import TaskItem, { TTaskItem } from "../Components/Tasks/TaskItem";

export const Route = createFileRoute("/Home")({
  loader: async () => {
    // let User: TUser;
    // const userStr = localStorage.getItem("user");
    // if (userStr) {
    //   User = JSON.parse(userStr);
    //   if (!User) {
    //     console.log("Failed to get user!");
    //     return {};
    //   }
    // } else {
    //   console.log("unable to get user");
    //   return {};
    // }
    // const raids = await getUserRaids(User);
    // const dungeons = await getUserDungeons(User);
    // const worldBosses = await getUserWorldBosses(User);
    // const dailyCrafting = await getUserDailyCrafting(User);
    // const wizardVault = await getUserWizardVault(User);
    // return {
    //   raids,
    //   dungeons,
    //   worldBosses,
    //   dailyCrafting,
    //   wizardVault,
    // };
  },
  component: HomeComponent,
});

function HomeComponent() {
  // const { raids, dungeons, worldBosses, dailyCrafting, wizardVault } =
  //useLoaderData({ from: "/Home" });

  const [raids, setRaids] = useState<TRaidAPIData | undefined>(undefined);
  const [dungeons, setDungeons] = useState<TDungeonAPIData | undefined>(
    undefined
  );
  const [worldBosses, setWorldBosses] = useState<
    TWorldBossesAPIData | undefined
  >(undefined);
  const [dailyCrafting, setDailyCrafting] = useState<
    TDailyCraftsAPIData | undefined
  >(undefined);
  const [wizardVault, setWizardVault] = useState<
    TWizardVaultAPIData | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let User: TUser;
      const userStr = localStorage.getItem("user");
      if (userStr) {
        User = JSON.parse(userStr);
        if (!User) {
          console.log("Failed to get user!");
          return;
        }
      } else {
        console.log("unable to get user");
        return;
      }

      const raids = await getUserRaids(User);
      const dungeons = await getUserDungeons(User);
      const worldBosses = await getUserWorldBosses(User);
      const dailyCrafting = await getUserDailyCrafting(User);
      const wizardVault = await getUserWizardVault(User);

      setRaids(raids);
      setDungeons(dungeons);
      setWorldBosses(worldBosses);
      setDailyCrafting(dailyCrafting);
      setWizardVault(wizardVault);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const doesUserHaveRaidEvent = (raidEvent: TRaidEvent) => {
    return raids?.userData?.find((userEvent) => userEvent === raidEvent.name);
  };

  const doesUserHaveDungeonPath = (dungeonPath: TDungeonPath) => {
    return dungeons?.userData?.find(
      (userDungeon) => userDungeon === dungeonPath.name
    );
  };

  const doesUserHaveWorldBoss = (worldData: TWorldBoss) => {
    return worldBosses?.userData?.find(
      (boss: string) => boss === worldData.name
    );
  };

  const doesUserHaveDailyCraft = (worldData: TDailyCraft) => {
    return dailyCrafting?.userData?.find(
      (craft: string) => craft === worldData.name
    );
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
    <div className="min-h-screen flex flex-row bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Raids Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4">Raids</h3>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-700 h-6 rounded-md"
                  ></div>
                ))}
              </div>
            ) : (
              raids?.worldData?.map((raid) => {
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
              })
            )}
          </div>

          {/* Dungeons Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4">Dungeons</h3>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-700 h-6 rounded-md"
                  ></div>
                ))}
              </div>
            ) : (
              dungeons?.worldData?.map((dungeon, index) => {
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
              })
            )}
          </div>

          {/* World Bosses Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4 ">
              World Bosses
            </h3>
            <div className=" grid grid-cols-2 gap-2">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse bg-gray-700 h-6 rounded-md"
                    ></div>
                  ))}
                </div>
              ) : (
                worldBosses?.worldData?.map((boss, index) => {
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
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Daily Crafting Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4">
              Daily Crafting
            </h3>
            <div className=" grid grid-cols-2 gap-2">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse bg-gray-700 h-6 rounded-md"
                    ></div>
                  ))}
                </div>
              ) : (
                dailyCrafting?.worldData?.map((craft, index) => {
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
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Wizard Vault Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4">
              Wizard Vault
            </h3>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-700 h-6 rounded-md"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Daily Tasks</h4>
                  {wizardDailyTasks && (
                    <TaskComponent
                      key={"Daily"}
                      tasks={{ name: "Daily", taskItems: wizardDailyTasks }}
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Weekly Tasks</h4>
                  {wizardWeeklyTasks && (
                    <TaskComponent
                      key={"Weekly"}
                      tasks={{ name: "Weekly", taskItems: wizardWeeklyTasks }}
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Special Tasks</h4>
                  {wizardSpecialTasks && (
                    <TaskComponent
                      key={"Special"}
                      tasks={{
                        name: "Special",
                        taskItems: wizardSpecialTasks,
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
