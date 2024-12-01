import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import CreateAccountForm from "../Components/Form/CreateAccountForm";
import SignInFormComponent from "../Components/Form/SignInFormComponent";

import "../CSS/global.css";
import PasswordResetForm from "../Components/Form/PasswordResetForm";

export const Route = createFileRoute("/SignIn")({
  component: SignInComponent,
});

function SignInComponent() {
  const [showCreateAccount, setCreateAccount] = useState<boolean>(false);
  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);

  return (
    <section className="bg-sunset relative min-h-[100vh]">
      <div className="w-1/3 max-w-[15%] m-auto pt-4">
        <img src="assets\Gw2_taskmaster.png" className="w-full" />
      </div>
      <div className="w-1/2 m-auto flex flex-col align-center justify-center">
        {showPasswordReset && (
          <>
            <PasswordResetForm />
            <button
              onClick={() => {
                setCreateAccount(false);
                setShowPasswordReset(false);
              }}
              className="text-[grey]  hover:text-[black]"
            >
              Sign in
            </button>
          </>
        )}
        {!showPasswordReset && (
          <>
            {showCreateAccount && (
              <>
                <CreateAccountForm />
                <button
                  onClick={() => {
                    setCreateAccount(false);
                    setShowPasswordReset(false);
                  }}
                  className="text-[grey]  hover:text-[black]"
                >
                  Sign in
                </button>
              </>
            )}
            {!showCreateAccount && (
              <>
                <SignInFormComponent />
                <div className="flex flex-col self-center">
                  <button
                    onClick={() => {
                      setCreateAccount(true);
                      setShowPasswordReset(false);
                    }}
                    className="text-[grey] text-left hover:text-[black]"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => {
                      setCreateAccount(false);
                      setShowPasswordReset(true);
                    }}
                    className="text-[grey] text-left hover:text-[black]"
                  >
                    Forgot password...
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
