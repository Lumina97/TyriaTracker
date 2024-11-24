import { Outlet, createRootRoute } from "@tanstack/react-router";
import { APIProvider } from "../Providers/APIProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <APIProvider>
        <Outlet />
      </APIProvider>
    </>
  );
}
