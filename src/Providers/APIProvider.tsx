import { ReactNode, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { APIBaseURL } from "../Utils/settings";
import {
  TDailyCraftsAPIData,
  TDungeonAPIData,
  TRaidAPIData,
  TWizardVaultAPIData,
  TWorldBossesAPIData,
} from "../Utils/types";
import {
  getUserDailyCrafting,
  getUserDungeons,
  getUserRaids,
  getUserWizardVault,
  getUserWorldBosses,
} from "../Utils/API";

type TAPIProvider = {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isSignedIn: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  createAccount: (email: string, password: string) => Promise<boolean>;
  updateUserInformation: (updatedUser: TUser) => Promise<boolean>;
  GetUser: () => TUser;
  userRaids: TRaidAPIData | undefined;
  userDungeons: TDungeonAPIData | undefined;
  userWorldBosses: TWorldBossesAPIData | undefined;
  userDailyCrafts: TDailyCraftsAPIData | undefined;
  userWizardVault: TWizardVaultAPIData | undefined;
};

export type TUser = {
  email: string;
  jwt: string;
  APIKey: string;
  password?: string;
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
  const [userRaids, setUserRaids] = useState<TRaidAPIData>();
  const [userDungeons, setUserDungeons] = useState<TDungeonAPIData>();
  const [userWorldBosses, setUserWorldBosses] = useState<TWorldBossesAPIData>();
  const [userDailyCrafts, setUserDailyCrafts] = useState<TDailyCraftsAPIData>();
  const [userWizardVault, setUserWizardVault] = useState<TWizardVaultAPIData>();

  const GetUser = () => {
    if (!user || !user.email) {
      const load = loadUserFromLocalStorage();
      if (load !== false) {
        setUser(load);
      } else {
        console.log(`No user!`);
        return {
          email: "",
          jwt: "",
          APIKey: "",
        };
      }
      return load;
    }

    return user;
  };

  const login = async (email: string, password: string) => {
    const url = `${APIBaseURL}auth/login`;
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
        console.log(`User: ${JSON.stringify(user)}`);
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
        console.log(`user from local storage`);
        setUser(user);
        jwttoken = user.jwt;
      }
    }

    if (jwttoken) {
      //we have a token
      // check if token is valid
      const url = `${APIBaseURL}auth/isLoggedIn`;
      const config: AxiosRequestConfig = {
        method: "post",
        url: url,
        data: {
          jwt: jwttoken,
        },
      };

      try {
        const result = await axios(config);
        if (result.status === 200) {
          console.log(JSON.stringify(result.data));
          setUser(result.data.user);
          loggedIn = true;
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (loggedIn === false) {
      console.log("Not logged in");
      navigate({ to: "/SignIn" });
      return false;
    }

    return true;
  };

  const createAccount = async (email: string, password: string) => {
    const url = `${APIBaseURL}auth/users`;
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
      console.error(error);
    }
    return false;
  };

  const resetPassword = async (email: string) => {
    if (!email) {
      console.log("no email provided to reset password - cancelling");
      return false;
    }

    const url = `${APIBaseURL}auth/passwordReset`;
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

  const updateUserInformation = async (newUser: TUser) => {
    if (!user.email || !user.jwt) {
      console.log("No current user!");
      return false;
    }

    const url = `${APIBaseURL}auth/users/${encodeURI(user.email)}`;
    const config: AxiosRequestConfig = {
      url,
      method: "patch",
      data: { newUser: newUser },
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const result = await axios(config);
      if (result.status === 200) {
        const newUser = result.data.updatedUser;
        setUser(newUser);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  };

  useEffect(() => {
    const setup = async () => {
      await GetUser();
      await isSignedIn();
      if (!user.email) {
        const usr = GetUser();
        if (!usr.email) {
          console.error("User not available!");
          return;
        }
      }
      getUserRaids(user, GetUser).then((result) => {
        if (result) setUserRaids(result);
      });

      getUserDungeons(user, GetUser).then((result) => {
        if (result) setUserDungeons(result);
      });

      getUserWorldBosses(user, GetUser).then((result) => {
        if (result) setUserWorldBosses(result);
      });

      getUserDailyCrafting(user, GetUser).then((result) => {
        if (result) setUserDailyCrafts(result);
      });

      getUserWizardVault(user, GetUser).then((result) => {
        if (result) setUserWizardVault(result);
      });
    };
    setup();
  }, []);

  return (
    <APIContext.Provider
      value={{
        resetPassword,
        login,
        GetUser,
        isSignedIn,
        logout,
        updateUserInformation,
        createAccount,
        userRaids,
        userDungeons,
        userWorldBosses,
        userDailyCrafts,
        userWizardVault,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
