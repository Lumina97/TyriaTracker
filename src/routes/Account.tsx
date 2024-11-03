import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../Components/NavBar/Navbar";
import AccountDataComponent from "../Components/Account/AccountDataComponent";

export const Route = createFileRoute("/Account")({
  component: AccountComponent,
});

function AccountComponent() {
  return (
    <div className="bg-sunset">
      <div className="flex flex-row">
        <Navbar />
        <div className="w-full">
          <AccountDataComponent />
        </div>
      </div>
    </div>
  );
}
