import { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { isEmailValid, isPasswordValid } from "../../Utils/InputValidation";
import { useAPI } from "../../Providers/APIProvider";

const loginError = `Email or password are wrong!`;
const SignInFormComponent = () => {
  const { login } = useAPI();

  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLogInError, setShowLogInError] = useState<boolean>(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (isEmailValid(email) && isPasswordValid(password)) {
      console.log(`Logging in with email: ${email} and password: ${password} `);
      login(email, password);
    } else setShowLogInError(true);
  };

  return (
    <div className="pb-4 self-center">
      <h2 className="text-center text-4xl">Sign In</h2>
      <form className="w-[350px]" onSubmit={(e) => onFormSubmit(e)}>
        <InputFieldComponent
          labelTitle="Email:"
          props={{
            onChange: (e) => setEmail(e.target.value),
            type: "text",
            value: email,
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
          inputClassName="hover:drop-shadow-2xl hover:bg-black hover:text-white indent-[0rem]"
          props={{
            value: "SIGN IN",
            type: "submit",
          }}
        ></InputFieldComponent>
      </form>
    </div>
  );
};

export default SignInFormComponent;
