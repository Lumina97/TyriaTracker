import { createFileRoute, redirect } from "@tanstack/react-router";
import { TAPIDataType } from "../Utils/types";

export const Route = createFileRoute("/Tasks/")({
  loader: () => {
    throw redirect({
      to: "/Tasks/$taskItem",
      params: { taskItem: TAPIDataType.Raids },
    });
  },
  component: () => <div>This should never be reached</div>,
});
