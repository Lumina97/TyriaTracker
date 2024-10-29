import React, { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { isEmailValid } from "../../Utils/InputValidation";

const emailError = `Email is not valid`;

const PasswordResetForm = () => {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (isEmailValid(email)) {
      console.log("do something");
    }
  };

  return (
    <div className="pb-2 self-center">
      <h2 className="pb-[2rem] text-center text-4xl">Create Account</h2>

      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
        <InputFieldComponent
          labelTitle="Email:"
          props={{
            onChange: (e) => setEmail(e.target.value),
            type: "email",
            value: email,
          }}
        />
        {wasSubmitted && !isEmailValid(email) && (
          <div className="text-[red]">{emailError}</div>
        )}

        <InputFieldComponent
          labelTitle=""
          props={{
            type: "submit",
            value: "Reset password",
            className:
              "hover:drop-shadow-black hover:bg-black hover:text-white border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-md bg-transparent  w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default PasswordResetForm;
