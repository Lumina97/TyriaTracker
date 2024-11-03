import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";

export const Route = createFileRoute("/Home")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <Navbar />
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    </>
  );
}
