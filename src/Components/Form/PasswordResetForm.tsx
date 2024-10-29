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
    <div className="pb-4 self-center">
      <h2 className="text-center text-4xl">Reset password</h2>

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
          inputClassName="hover:drop-shadow-2xl hover:bg-black hover:text-white indent-[0]"
          props={{
            type: "submit",
            value: "Reset password",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default PasswordResetForm;
