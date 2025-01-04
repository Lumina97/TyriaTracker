import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import { useAPI } from "../Providers/APIProvider";
import { TAPIDataType } from "../Utils/types";
import { useState } from "react";

export const Route = createFileRoute("/Tasks")({
  // loader: () => {
  //   throw redirect({
  //     to: "/Tasks/$taskItem",
  //     params: { taskItem: "raid" },
  //   });
  // },
  component: TasksComponent,
});

function TasksComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<TAPIDataType>(
    TAPIDataType.Raids
  );
  const user = useAPI().GetUser();

  return (
    <div className="min-h-screen flex flex-row bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-4 flex ">
        <div className="flex flex-col items-start flex-grow">
          <div className="flex gap-4  items-start">
            <Link
              className={`${currentTab === TAPIDataType.Raids ? "bg-gray-800" : "bg-gray-900 "} text-white font-bold py-2 px-4 rounded-t`}
              to="/Tasks/$taskItem"
              params={{ taskItem: TAPIDataType.Raids }}
              onClick={() => {
                setCurrentTab(TAPIDataType.Raids);
              }}
            >
              Raids
            </Link>
            <Link
              className={` ${currentTab === TAPIDataType.Dungeons ? "bg-gray-800" : "bg-gray-900"} text-white font-bold py-2 px-4 rounded-t`}
              to="/Tasks/$taskItem"
              params={{ taskItem: TAPIDataType.Dungeons }}
              onClick={() => {
                setCurrentTab(TAPIDataType.Dungeons);
              }}
            >
              Dungeons
            </Link>
            <Link
              className={` ${currentTab === TAPIDataType.WorldBosses ? "bg-gray-800" : "bg-gray-900"} text-white font-bold py-2 px-4 rounded-t`}
              to="/Tasks/$taskItem"
              params={{ taskItem: TAPIDataType.WorldBosses }}
              onClick={() => {
                setCurrentTab(TAPIDataType.WorldBosses);
              }}
            >
              World Bosses
            </Link>
            <Link
              className={` ${currentTab === TAPIDataType.DailyCrafting ? "bg-gray-800" : "bg-gray-900"} text-white font-bold py-2 px-4 rounded-t`}
              to="/Tasks/$taskItem"
              params={{ taskItem: TAPIDataType.DailyCrafting }}
              onClick={() => {
                setCurrentTab(TAPIDataType.DailyCrafting);
              }}
            >
              Daily Crafting
            </Link>
            <Link
              className={` ${currentTab === TAPIDataType.WizardVault ? "bg-gray-800" : "bg-gray-900"} text-white font-bold py-2 px-4 rounded-t`}
              to="/Tasks/$taskItem"
              params={{ taskItem: TAPIDataType.WizardVault }}
              onClick={() => {
                setCurrentTab(TAPIDataType.WizardVault);
              }}
            >
              Wizard Vault
            </Link>
          </div>
          <div
            className={`bg-gray-800 p-4 rounded-lg ${currentTab === TAPIDataType.Raids ? "rounded-tl-none" : ""}  shadow-lg w-full flex-grow`}
          >
            <Outlet />
          </div>
        </div>

        {/* Raids Section */}
        {/* <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
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
          </div> */}

        {/* Dungeons Section */}
        {/* <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
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
          </div> */}

        {/* World Bosses Section */}
        {/* <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4 ">
              World Bosses
            </h3>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
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
          </div> */}

        {/* Daily Crafting Section */}
        {/* <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4">
              Daily Crafting
            </h3>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
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
          </div> */}

        {/* Wizard Vault Section */}
        {/* <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
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
              
            )}
          </div> */}
      </div>
    </div>
  );
}
