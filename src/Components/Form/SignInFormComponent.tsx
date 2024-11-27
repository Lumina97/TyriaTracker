import { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { isEmailValid, isPasswordValid } from "../../Utils/InputValidation";
import { useAPI } from "../../Providers/APIProvider";
import { Link } from "@tanstack/react-router";
import Loader from "../Loader";

const loginError = `Email or password are wrong!`;
const SignInFormComponent = () => {
  const { login } = useAPI();

  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLogInError, setShowLogInError] = useState<boolean>(false);

  const onFormSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setWasSubmitted(true);
    if (isEmailValid(email) && isPasswordValid(password)) {
      login(email, password).then((result) => {
        if (result) {
          setPassword("");
          setEmail("");
        } else setShowLogInError(true);
      });
    } else setShowLogInError(true);
    if (showLogInError) e.preventDefault();
  };

  return (
    <>
      {wasSubmitted && showLogInError === false && <Loader />}
      <div className="pb-4 self-center">
        <h2 className="text-center text-4xl">Sign In</h2>
        <form className="w-[350px]">
          <InputFieldComponent
            labelTitle="Email:"
            props={{
              onChange: (e) => setEmail(e.target.value),
              disabled: wasSubmitted && showLogInError === false,
              type: "text",
              value: email,
            }}
          />
          <InputFieldComponent
            labelTitle="Password: "
            props={{
              onChange: (e) => setPassword(e.target.value),
              disabled: wasSubmitted && showLogInError === false,
              type: "password",
              value: password,
            }}
          ></InputFieldComponent>
          {wasSubmitted && showLogInError && (
            <div className="text-center pt-4 text-[red]">{loginError}</div>
          )}

          <Link
            className="flex  mb-8 items-center justify-center max-h-[2.5rem]
            h-[2.5rem] relative  grow hover:shadow-3xl border-solid text-xl
            pb-[0.05rem] origin-left border-black border-2 rounded-md bg-transparent 
            indent-[1rem] w-[98%] m-auto  top-[2.25rem] left-[1%]"
            to="/SignIn"
            onClick={(e) => onFormSubmit(e)}
            disabled={wasSubmitted && showLogInError === false}
          >
            SIGN IN
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignInFormComponent;
