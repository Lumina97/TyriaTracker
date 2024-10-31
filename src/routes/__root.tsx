import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../Components/NavBar/Navbar";
import { APIProvider } from "../Providers/APIProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <APIProvider>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </APIProvider>
    </>
  );
}
