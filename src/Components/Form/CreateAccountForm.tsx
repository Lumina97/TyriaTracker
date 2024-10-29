import { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import {
  isAPIKeyValid,
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
} from "../../Utils/InputValidation";
import {
  minPasswordLength,
  minUsernameLength,
  APIKeyLength,
} from "../../Utils/settings";

const userNameSignUpError = `Username has to be at least ${minUsernameLength} characters long`;
const emailSignUpError = `Email is not valid`;
const passwordSignUpError = `Password has to be at least ${minPasswordLength} characters long`;
const APIKEYSignUpError = `API Key has to be ${APIKeyLength} characters long`;

const CreateAccountForm = () => {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (isUsernameValid(userName) && isPasswordValid(password)) {
      console.log("do something");
    }
  };

  return (
    <div className="pb-2 self-center">
      <h2 className="pb-[2rem] text-center text-4xl">Create Account</h2>

      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
        <InputFieldComponent
          labelTitle="Username:"
          props={{
            onChange: (e) => setUserName(e.target.value),
            type: "text",
            value: userName,
          }}
        />
        {wasSubmitted && !isUsernameValid(userName) && (
          <div className="text-[red]">{userNameSignUpError}</div>
        )}

        <InputFieldComponent
          labelTitle="Email: "
          props={{
            onChange: (e) => setEmail(e.target.value),
            type: "email",
            value: email,
          }}
        ></InputFieldComponent>
        {wasSubmitted && !isEmailValid(email) && (
          <div className="text-[red]">{emailSignUpError}</div>
        )}
        <InputFieldComponent
          labelTitle="Password: "
          props={{
            onChange: (e) => setPassword(e.target.value),
            type: "password",
            value: password,
          }}
        ></InputFieldComponent>
        {wasSubmitted && !isPasswordValid(password) && (
          <div className="text-[red]">{passwordSignUpError}</div>
        )}

        <InputFieldComponent
          labelTitle="API Key:"
          props={{
            onChange: (e) => setApiKey(e.target.value),
            type: "text",
            value: apiKey,
          }}
        ></InputFieldComponent>
        {wasSubmitted && !isAPIKeyValid(apiKey) && (
          <div className="text-[red]">{APIKEYSignUpError}</div>
        )}

        <InputFieldComponent
          labelTitle=""
          props={{
            type: "submit",
            value: "Create account",
            className:
              "hover:drop-shadow-black hover:bg-black hover:text-white border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-md bg-transparent  w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default CreateAccountForm;
