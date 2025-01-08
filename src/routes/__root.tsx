import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TaskProvider } from "../Providers/TaskProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <TaskProvider>
        <Outlet />
      </TaskProvider>
    </>
  );
}
