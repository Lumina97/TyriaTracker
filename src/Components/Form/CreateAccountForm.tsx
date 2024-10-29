import { Dispatch, SetStateAction, useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import {
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
} from "../../Utils/InputValidation";
import { minPasswordLength, minUsernameLength } from "../../Utils/settings";

const userNameSignUpError = `Username has to be at least ${minUsernameLength} characters long`;
const passwordSignUpError = `Password has to be at least ${minPasswordLength} characters long`;

const CreateAccountForm = () => {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ShowSignInError, setShowSignInError] = useState<boolean>(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (isUsernameValid(userName) && isPasswordValid(password)) {
      console.log("do smth");
    }
  };

  return (
    <div className="pb-2 self-center">
      <h2 className="pb-[2rem] text-center text-4xl">Create Account</h2>

      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
        <InputFieldComponent
          labelTitle="Username:"
          wrapperProps={{
            className:
              "w-full inline-flex flex-col my-2 align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
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
        {wasSubmitted && !isUsernameValid(userName) && ShowSignInError && (
          <div className="text-[red]">{userNameSignUpError}</div>
        )}

        <InputFieldComponent
          labelTitle="Email: "
          wrapperProps={{
            className:
              " w-full inline-flex flex-col my-2 align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          labelProps={{ className: "text-xl" }}
          props={{
            onChange: (e) => setEmail(e.target.value),
            type: "email",
            value: email,
            className:
              "hover:shadow-3xl border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent indent-[6.5rem] w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
        {wasSubmitted && !isEmailValid(email) && ShowSignInError && (
          <div className="text-[red]">{passwordSignUpError}</div>
        )}
        <InputFieldComponent
          labelTitle="Password: "
          wrapperProps={{
            className:
              " w-full inline-flex flex-col my-2 align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
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
        {wasSubmitted && !isPasswordValid(email) && ShowSignInError && (
          <div className="text-[red]">{passwordSignUpError}</div>
        )}

        <InputFieldComponent
          labelTitle=""
          wrapperProps={{
            className:
              " flex mt-12 flex-col align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          props={{
            type: "submit",
            value: "Create account",
            className:
              "hover:drop-shadow-black hover:bg-black hover:text-white border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent  w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default CreateAccountForm;
