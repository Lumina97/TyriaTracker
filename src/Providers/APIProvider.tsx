import { ReactNode, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { APIBaseURL } from "../Utils/settings";

type TAPIProvider = {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isSignedIn: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  createAccount: (email: string, password: string) => Promise<boolean>;
  GetUser: () => TUser | false;
};

export type TUser = {
  email: string;
  jwt: string;
  apiKey: string;
};

const loadUserFromLocalStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const User: TUser = JSON.parse(userStr);
      return User;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const clearUserFromLocalStorage = () => {
  console.log("Clearing data");
  localStorage.removeItem("user");
};

const APIContext = createContext<TAPIProvider>({} as TAPIProvider);

export const APIProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate({ from: "/SignIn" });
  const [user, setUser] = useState<TUser>({} as TUser);

  const GetUser = () => {
    if (!user.email) {
      const load = loadUserFromLocalStorage();
      if (load !== false) {
        console.log(`Loadede user: ${JSON.stringify(load)}`);
        setUser(load);
      } else {
        console.log(`No user!`);
      }
      return load;
    }
    console.log(`returning user: ${JSON.stringify(user)}`);

    return user;
  };

  const login = async (email: string, password: string) => {
    const url = APIBaseURL + "auth/login";
    const config: AxiosRequestConfig = {
      method: "post",
      url: url,
      data: {
        email,
        password,
      },
    };

    try {
      const result = await axios(config);
      if (result.data.status === true) {
        const user: TUser = result.data.newUser;
        console.log(`User: ${user}`);
        if (user) {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          navigate({ to: "/Home" });
          return true;
        }
      }
    } catch (error) {}
    return false;
  };

  const logout = async () => {
    clearUserFromLocalStorage();
    setUser({} as TUser);
    navigate({ to: "/SignIn" });
  };

  const isSignedIn = async () => {
    let loggedIn = false;
    let jwttoken = user.jwt;
    //check if we have a token
    if (!user.jwt) {
      //load from localstorage
      console.log("no jwt");
      const user = loadUserFromLocalStorage();
      if (user !== false && user !== null && user) {
        setUser(user);
        jwttoken = user.jwt;
      }
    }

    if (jwttoken) {
      //we have a token
      // check if token is valid
      const url = APIBaseURL + "auth/isLoggedIn";
      const config: AxiosRequestConfig = {
        method: "post",
        url: url,
        data: {
          jwt: jwttoken,
        },
      };

      try {
        const result = await axios(config);
        //we are not logged in
        //clear jwt and local storage and return to sign in screen
        if (result.status === 200) {
          loggedIn = true;
        }
      } catch (error) {}
    }

    if (loggedIn === false) {
      console.log("Not logged in");
      navigate({ to: "/SignIn" });
      return false;
    }

    return true;
  };

  const createAccount = async (email: string, password: string) => {
    const url = APIBaseURL + "auth/users";
    const config: AxiosRequestConfig = {
      method: "post",
      url,
      data: {
        email,
        password,
      },
    };

    try {
      const result = await axios(config);
      if (result.data.status === true) {
        setUser(result.data.newUser);
        localStorage.setItem("jwt", result.data.jwt);
        navigate({ to: "/Home" });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const resetPassword = async (email: string) => {
    if (!email) {
      console.log("no email provided to reset password - cancelling");
      return false;
    }

    const url = APIBaseURL + "auth/passwordReset";
    const config: AxiosRequestConfig = {
      url,
      method: "post",
      data: {
        email,
      },
    };
    const response = await axios(config);
    if (response.status === 200) return true;

    return false;
  };

  useEffect(() => {
    // isSignedIn().then();
  }, []);

  return (
    <APIContext.Provider
      value={{
        resetPassword,
        login,
        GetUser,
        isSignedIn,
        logout,
        createAccount,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
