import { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { isEmailValid, isPasswordValid } from "../../Utils/InputValidation";
import { useAPI } from "../../Providers/APIProvider";
import { Link } from "@tanstack/react-router";

const loginError = `Email or password are wrong!`;
const SignInFormComponent = () => {
  const { login } = useAPI();

  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLogInError, setShowLogInError] = useState<boolean>(false);

  const onFormSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (isEmailValid(email) && isPasswordValid(password)) {
      login(email, password).then((result) => {
        if (result) {
          setPassword("");
          setEmail("");
        } else setShowLogInError(true);
      });
    } else setShowLogInError(true);
    if (showLogInError) e.preventDefault();
  };

  return (
    <div className="pb-4 self-center">
      <h2 className="text-center text-4xl">Sign In</h2>
      <form className="w-[350px]">
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

        <Link
          className="flex  my-8 items-center justify-center max-h-[2.5rem]
            h-[2.5rem] relative  grow hover:shadow-3xl border-solid text-xl
            pb-[0.05rem] origin-left border-black border-2 rounded-md bg-transparent 
            indent-[1rem] w-[98%] m-auto  top-[2.25rem] left-[1%]"
          to="/SignIn"
          onClick={(e) => onFormSubmit(e)}
        >
          SIGN IN
        </Link>
        {/* <InputFieldComponent
          labelTitle=""
          inputClassName="hover:drop-shadow-2xl hover:bg-black hover:text-white indent-[0rem]"
          props={{
            value: "SIGN IN",
            type: "submit",
          }}
        ></InputFieldComponent> */}
      </form>
    </div>
  );
};

export default SignInFormComponent;
