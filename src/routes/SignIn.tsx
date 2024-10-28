import { createFileRoute } from "@tanstack/react-router";
import SignInFormComponent from "../Components/Form/SignInFormComponent";

import "../CSS/global.css";
import "../CSS/signIn.css";

export const Route = createFileRoute("/SignIn")({
  component: SignInComponent,
});

function SignInComponent() {
  return (
    <section className="min-h-[100vh]">
      <div className="w-1/3 max-w-[400px] m-auto pt-[5rem]">
        <img src="src\assets\Gw2_taskmaster.png" className="w-full" />
      </div>
      <div className="w-1/2 m-auto flex direction-column justify-center">
        <SignInFormComponent />
      </div>
    </section>
  );
}
