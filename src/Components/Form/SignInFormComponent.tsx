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
    <div className="pb-4 self-center">
      <h2 className="text-center text-4xl">Sign In</h2>
      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
        <InputFieldComponent
          labelTitle="Username:"
          props={{
            onChange: (e) => setUserName(e.target.value),
            type: "text",
            value: userName,
          }}
        />
        <InputFieldComponent
          labelTitle="Password: "
          props={{
            onChange: (e) => setPassword(e.target.value),
            type: "password",
            value: password,
          }}
        ></InputFieldComponent>
        {wasSubmitted && showLogInError && (
          <div className="text-center text-[red]">{loginError}</div>
        )}

        <InputFieldComponent
          labelTitle=""
          inputClassName="hover:drop-shadow-2xl hover:bg-black hover:text-white indent-[0]"
          props={{
            type: "submit",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default SignInFormComponent;
