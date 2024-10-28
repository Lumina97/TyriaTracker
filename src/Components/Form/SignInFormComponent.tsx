import { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { isPasswordValid, isUsernameValid } from "../../Utils/InputValidation";
import { minPasswordLength, minUsernameLength } from "../../Utils/settings";

const loginError = `Username or password are wrong!`;

const userNameSignUpError = `Username has to be at least ${minUsernameLength} characters long`;
const passwordSignUpError = `Password has to be at least ${minPasswordLength} characters long`;

const SignInFormComponent = () => {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLogInError, setShowLogInError] = useState<boolean>(false);
  const [ShowSignInError, setShowSignInError] = useState<boolean>(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    setShowLogInError(true);
    if (isUsernameValid(userName) && isPasswordValid(password)) {
      console.log("do smth");
    }
  };

  return (
    <div>
      <h2 className="pb-[2rem] text-center text-4xl">Sign In</h2>

      <form
        className="flex gap-8 h-[300px] w-[350px] flex-col"
        onSubmit={(e) => onFormSubmit(e)}
      >
        <InputFieldComponent
          labelTitle="Username:"
          wrapperProps={{
            className:
              " pt-8 flex flex-col align-middle justify-center  max-h-[2.5rem] h-[2.5rem] relative pl-2 ",
          }}
          labelProps={{ className: "text-xl" }}
          props={{
            onChange: (e) => setUserName(e.target.value),
            type: "text",
            value: userName,
            className:
              "border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent indent-[6.5rem] w-[98%] m-auto absolute left-[1%]",
          }}
        />
        {wasSubmitted && !isUsernameValid(userName) && ShowSignInError && (
          <div className="text-[red]">{userNameSignUpError}</div>
        )}

        <InputFieldComponent
          labelTitle="Password: "
          wrapperProps={{
            className:
              " flex flex-col align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          labelProps={{ className: "text-xl" }}
          props={{
            onChange: (e) => setPassword(e.target.value),
            type: "password",
            value: password,
            className:
              "border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent indent-[6.5rem] w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
        {wasSubmitted && !isPasswordValid(email) && ShowSignInError && (
          <div className="text-[red]">{passwordSignUpError}</div>
        )}

        {wasSubmitted && showLogInError && (
          <div className="text-center text-[red]">{loginError}</div>
        )}

        <InputFieldComponent
          labelTitle=""
          wrapperProps={{
            className:
              " flex flex-col align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          props={{
            type: "submit",
            className:
              "border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent  w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default SignInFormComponent;
