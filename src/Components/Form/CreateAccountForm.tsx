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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (isEmailValid(email) && isPasswordValid(password)) {
      console.log("do something");
    }
  };

  return (
    <div className="pb-4 self-center">
      <h2 className=" text-center text-4xl">Create Account</h2>

      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
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
          labelTitle="Confirm Password: "
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
          labelTitle=""
          inputClassName="hover:drop-shadow-2xl hover:bg-black hover:text-white indent-[0]"
          props={{
            type: "submit",
            value: "Create account",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default CreateAccountForm;
