import React, { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { isEmailValid } from "../../Utils/InputValidation";
import { useAPI } from "../../Providers/APIProvider";

const emailError = `Email is not valid`;
const resetSubmitText = `If there is an account with that email we will send a password reset link to that email!`;

const PasswordResetForm = () => {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [wasSent, setWasSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { resetPassword } = useAPI();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (isEmailValid(email)) {
      resetPassword(email);
      setWasSent(true);
      setEmail("");
    }
  };

  return (
    <div className="pb-4 self-center">
      <h2 className="text-center text-4xl">Reset password</h2>

      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
        <InputFieldComponent
          labelTitle="Email:"
          wrapperClassName="mb-12"
          props={{
            onChange: (e) => setEmail(e.target.value),
            type: "email",
            value: email,
          }}
        />

        {wasSubmitted && !isEmailValid(email) && !wasSent && (
          <div className="pl-4 text-[red]">{emailError}</div>
        )}
        {wasSent && <div className="pl-4 text-[black]">{resetSubmitText}</div>}

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
