import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import AccountDataComponent from "../Components/Account/AccountDataComponent";

export const Route = createFileRoute("/Account")({
  component: AccountComponent,
});

function AccountComponent() {
  return (
    <div className="bg-sunset min-h-screen">
      <div className="flex flex-col sm:flex-row">
        <Navbar />
        <div className=" relative w-full h-full min-h-screen ">
          <AccountDataComponent />
        </div>
      </div>
    </div>
  );
}
