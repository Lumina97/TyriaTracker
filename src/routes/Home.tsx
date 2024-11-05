import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import TaskComponent from "../Components/Tasks/TaskComponent";

export const Route = createFileRoute("/Home")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex flex-row">
      <Navbar />
      <div className="p-2">{/* <TaskComponent /> */}</div>
    </div>
  );
}
