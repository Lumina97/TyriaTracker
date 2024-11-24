import React, { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { isEmailValid, isPasswordValid } from "../../Utils/InputValidation";
import { useAPI } from "../../Providers/APIProvider";

const emailError = `Email is not valid`;

const PasswordResetForm = () => {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [wasSent, setWasSent] = useState<boolean>(false);
  const [resetResponse, setResetResponse] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [resetCode, setResetCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { initializePasswordReset, performPasswordReset } = useAPI();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (wasSent === false) {
      setWasSubmitted(true);
      if (isEmailValid(email)) {
        const result = await initializePasswordReset(email);
        if (result !== false) {
          setResetResponse(result.data.message);
          setWasSent(true);
        } else setEmail("");
      }
    } else {
      if (resetCode === "" || newPassword === "") return;
      if (isPasswordValid(newPassword))
        performPasswordReset(email, resetCode, newPassword);
    }
  };

  return (
    <div className="pb-4 self-center">
      <h2 className="text-center text-4xl">Reset password</h2>

      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
        <InputFieldComponent
          labelTitle={`${wasSent ? "Reset Code:" : "Email:"}`}
          wrapperClassName="mb-12"
          props={{
            onChange: (e) => {
              wasSent ? setResetCode(e.target.value) : setEmail(e.target.value);
            },
            type: wasSent ? "text" : "email",
            value: wasSent ? resetCode : email,
          }}
        />
        {wasSent && (
          <InputFieldComponent
            labelTitle="New password"
            wrapperClassName="mb-12"
            props={{
              onChange: (e) => {
                setNewPassword(e.target.value);
              },
              type: "password",
              value: newPassword,
            }}
          />
        )}

        {wasSubmitted && !isEmailValid(email) && !wasSent && (
          <div className="pl-4 text-[red]">{emailError}</div>
        )}
        {wasSent && <div className="pl-4 text-[black]">{resetResponse}</div>}

        <InputFieldComponent
          labelTitle=""
          inputClassName="hover:drop-shadow-2xl hover:bg-black hover:text-white indent-[0]"
          props={{
            type: "submit",
            value: "Reset password",
          }}
        />
      </form>
    </div>
  );
};

export default PasswordResetForm;
