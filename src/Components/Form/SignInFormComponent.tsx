import { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { isPasswordValid, isUsernameValid } from "../../Utils/InputValidation";

const loginError = `Username or password are wrong!`;
const SignInFormComponent = () => {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLogInError, setShowLogInError] = useState<boolean>(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (isUsernameValid(userName) && isPasswordValid(password)) {
      console.log("do smth");
    } else setShowLogInError(true);
  };

  return (
    <div className="pb-2 self-center">
      <h2 className="pb-[2rem] text-center text-4xl">Sign In</h2>
      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
        <InputFieldComponent
          labelTitle="Username:"
          wrapperProps={{
            className:
              "flex flex-col my-6 align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          labelProps={{ className: "text-xl" }}
          props={{
            onChange: (e) => setUserName(e.target.value),
            type: "text",
            value: userName,
            className:
              "hover:shadow-3xl border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent indent-[6.5rem] w-[98%] m-auto absolute left-[1%]",
          }}
        />
        <InputFieldComponent
          labelTitle="Password: "
          wrapperProps={{
            className:
              " flex flex-col my-6 align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          labelProps={{ className: "text-xl" }}
          props={{
            onChange: (e) => setPassword(e.target.value),
            type: "password",
            value: password,
            className:
              "hover:shadow-3xl border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent indent-[6.5rem] w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
        {wasSubmitted && showLogInError && (
          <div className="text-center text-[red]">{loginError}</div>
        )}

        <InputFieldComponent
          labelTitle=""
          wrapperProps={{
            className:
              " flex mt-12 flex-col align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          props={{
            type: "submit",
            className:
              "hover:drop-shadow-black hover:bg-black hover:text-white border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent  w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default SignInFormComponent;
