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
          wrapperProps={{
            className:
              "w-full inline-flex flex-col my-2 align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          labelProps={{ className: "text-xl" }}
          props={{
            onChange: (e) => setEmail(e.target.value),
            type: "email",
            value: email,
            className:
              "hover:shadow-3xl border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent indent-[4rem] w-[98%] m-auto absolute left-[1%]",
          }}
        />
        {wasSubmitted && !isEmailValid(email) && (
          <div className="text-[red]">{emailError}</div>
        )}

        <InputFieldComponent
          labelTitle=""
          wrapperProps={{
            className:
              " flex mt-12 flex-col align-middle justify-center max-h-[2.5rem]  h-[2.5rem] relative pl-2 grow",
          }}
          props={{
            type: "submit",
            value: "Reset password",
            className:
              "hover:drop-shadow-black hover:bg-black hover:text-white border-solid text-xl h-full pb-[0.05rem] border-black border-2 rounded-2xl bg-transparent  w-[98%] m-auto absolute left-[1%]",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default PasswordResetForm;
