import { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import {
  isEmailValid,
  isPasswordValid,
  isAPIKeyValid,
} from "../../Utils/InputValidation";
import { minPasswordLength } from "../../Utils/settings";
import { useAPI } from "../../Providers/APIProvider";
import { Link } from "@tanstack/react-router";

const emailSignUpError = `Email is not valid`;
const passwordSignUpError = `Password has to be at least ${minPasswordLength} characters long`;
const apiKeySignUpError = `APIKey is not valid`;

const CreateAccountForm = () => {
  const { createAccount } = useAPI();

  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [errorResponseMessage, setErrorResponseMessage] = useState<string>("");

  const resetFormData = () => {
    setPassword("");
    setSecondPassword("");
    setEmail("");
    setApiKey("");
    setErrorResponseMessage("");
    setWasSubmitted(false);
  };

  const onFormSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setErrorResponseMessage("");
    e.preventDefault();

    setWasSubmitted(true);
    if (
      isEmailValid(email) &&
      isPasswordValid(password) &&
      isAPIKeyValid(apiKey)
    ) {
      if (password !== secondPassword) {
        console.log("passwords do not match!");
        return;
      }
      createAccount(email, password, apiKey).then((result) => {
        if (result.status === true) resetFormData();
        else setErrorResponseMessage(result.message);
      });
    }
  };

  return (
    <div className="pb-4 self-center">
      <h2 className=" text-center text-4xl">Create Account</h2>

      <form className="w-[350px]">
        <InputFieldComponent
          labelTitle="Email: "
          props={{
            onChange: (e) => setEmail(e.target.value),
            type: "email",
            value: email,
          }}
        />
        {wasSubmitted && !isEmailValid(email) && (
          <div className="text-[red]">{emailSignUpError}</div>
        )}
        <InputFieldComponent
          labelTitle="Password: "
          props={{
            onChange: (e) => setPassword(e.target.value),
            autoComplete: "new-password",
            type: "password",
            value: password,
          }}
        />
        {wasSubmitted && !isPasswordValid(password) && (
          <div className="text-[red]">{passwordSignUpError}</div>
        )}

        <InputFieldComponent
          labelTitle="Confirm Password: "
          props={{
            onChange: (e) => setSecondPassword(e.target.value),
            autoComplete: "new-password",
            type: "password",
            value: secondPassword,
          }}
        />
        {wasSubmitted && !isPasswordValid(secondPassword) && (
          <div className="text-[red]">{passwordSignUpError}</div>
        )}

        <InputFieldComponent
          labelTitle="Guild Wars 2 API Key: "
          props={{
            onChange: (e) => setApiKey(e.target.value),
            type: "text",
            value: apiKey,
          }}
        />
        {wasSubmitted && !isAPIKeyValid(apiKey) && (
          <div className="text-[red]">{apiKeySignUpError}</div>
        )}

        {wasSubmitted && errorResponseMessage.length > 0 && (
          <div className="text-[red]">{errorResponseMessage}</div>
        )}

        <Link
          className="flex  mb-8 items-center justify-center max-h-[2.5rem] mx-0
            h-[2.5rem] relative  grow hover:shadow-3xl border-solid text-xl
            pb-[0.05rem] origin-left border-black border-2 rounded-md bg-transparent 
            indent-[1rem] w-[98%] m-auto  top-[2.25rem] left-[1%]"
          to="/SignIn"
          onClick={(e) => onFormSubmit(e)}
        >
          Create Account
        </Link>
      </form>
    </div>
  );
};

export default CreateAccountForm;
