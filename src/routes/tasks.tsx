import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import { TAPIDataType } from "../Utils/types";
import { Suspense, useState } from "react";
import SkeletonLoader from "../Components/SkeletonLoading/SkeletonLoader";

export const Route = createFileRoute("/tasks")({
  component: TasksComponent,
});

function TasksComponent() {
  const [currentTab, setCurrentTab] = useState<TAPIDataType>(
    TAPIDataType.Raids,
  );

  return (
    <div className="min-h-screen flex flex-row bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-4 flex ">
        <div className="flex flex-col items-start flex-grow">
          <div className="flex gap-4  items-start">
            <Link
              data-testid="raidLink"
              className={`${currentTab === TAPIDataType.Raids ? "bg-gray-800" : "bg-gray-900 "} text-white font-bold py-2 px-4 rounded-t`}
              to="/tasks/$taskItem"
              params={{ taskItem: TAPIDataType.Raids }}
              onClick={() => {
                setCurrentTab(TAPIDataType.Raids);
              }}
            >
              Raids
            </Link>
            <Link
              data-testid="dungeonLink"
              className={` ${currentTab === TAPIDataType.Dungeons ? "bg-gray-800" : "bg-gray-900"} text-white font-bold py-2 px-4 rounded-t`}
              to="/tasks/$taskItem"
              params={{ taskItem: TAPIDataType.Dungeons }}
              onClick={() => {
                setCurrentTab(TAPIDataType.Dungeons);
              }}
            >
              Dungeons
            </Link>
            <Link
              data-testid="bossLink"
              className={` ${currentTab === TAPIDataType.WorldBosses ? "bg-gray-800" : "bg-gray-900"} text-white font-bold py-2 px-4 rounded-t`}
              to="/tasks/$taskItem"
              params={{ taskItem: TAPIDataType.WorldBosses }}
              onClick={() => {
                setCurrentTab(TAPIDataType.WorldBosses);
              }}
            >
              World Bosses
            </Link>
            <Link
              data-testid="craftLink"
              className={` ${currentTab === TAPIDataType.DailyCrafting ? "bg-gray-800" : "bg-gray-900"} text-white font-bold py-2 px-4 rounded-t`}
              to="/tasks/$taskItem"
              params={{ taskItem: TAPIDataType.DailyCrafting }}
              onClick={() => {
                setCurrentTab(TAPIDataType.DailyCrafting);
              }}
            >
              Daily Crafting
            </Link>
            <Link
              data-testid="vaultLink"
              className={` ${currentTab === TAPIDataType.WizardVault ? "bg-gray-800" : "bg-gray-900"} text-white font-bold py-2 px-4 rounded-t`}
              to="/tasks/$taskItem"
              params={{ taskItem: TAPIDataType.WizardVault }}
              onClick={() => {
                setCurrentTab(TAPIDataType.WizardVault);
              }}
            >
              Wizard Vault
            </Link>
          </div>
          <div
            data-testid="taskTable"
            id="table"
            className={`bg-gray-800 p-4 rounded-lg ${currentTab === TAPIDataType.Raids ? "rounded-tl-none" : ""}  shadow-lg w-full flex-grow`}
          >
            {/*this only works on the first load and not when switching tabs */}
            <Suspense fallback={<SkeletonLoader amountOfRows={10} />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
