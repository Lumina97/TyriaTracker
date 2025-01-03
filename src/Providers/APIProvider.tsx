import { ReactNode, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIBaseURL } from "../Utils/settings";

type TAPIProvider = {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isSignedIn: () => Promise<boolean>;
  initializePasswordReset: (
    email: string
  ) => Promise<false | AxiosResponse<any, any>>;
  performPasswordReset: (
    email: string,
    resetCode: string,
    newPassword: string
  ) => Promise<boolean>;
  createAccount: (
    email: string,
    password: string,
    apiKey: string
  ) => Promise<{ status: boolean; message: string }>;
  updateUserInformation: (updatedUser: TUser) => Promise<boolean>;
  GetUser: () => TUser;
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
  localStorage.removeItem("user");
};

const APIContext = createContext<TAPIProvider>({} as TAPIProvider);

export const APIProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser>({} as TUser);
  const GetUser = () => {
    if (!user || !user.email) {
      const load = loadUserFromLocalStorage();
      if (load !== false) {
        setUser(load);
      } else {
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
      const user = loadUserFromLocalStorage();
      if (user !== false && user !== null && user) {
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
          setUser(result.data.user);
          loggedIn = true;
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (loggedIn === false) {
      navigate({ to: "/SignIn" });
      return false;
    }

    return true;
  };

  const createAccount = async (
    email: string,
    password: string,
    apiKey: string
  ) => {
    const url = `${APIBaseURL}auth/users`;
    const config: AxiosRequestConfig = {
      method: "post",
      url,
      data: {
        email: email,
        password: password,
        APIKey: apiKey,
      },
    };

    return axios(config)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.data.newUser));
        setUser(result.data.newUser);
        navigate({ to: "/Home" });
        return result.data;
      })
      .catch((error) => {
        return error.response.data as { status: boolean; message: string };
      });
  };

  const initializePasswordReset = async (email: string) => {
    if (!email) {
      console.log("no email provided to reset password - cancelling");
      return false;
    }

    const url = `${APIBaseURL}auth/passwordReset/initialize`;
    const config: AxiosRequestConfig = {
      url,
      method: "post",
      data: {
        email,
      },
    };
    const response = await axios(config);
    if (response.status === 200) return response;

    return false;
  };

  const performPasswordReset = async (
    email: string,
    resetCode: string,
    newPassword: string
  ) => {
    if (!resetCode) {
      console.log("no reset code provided to reset password - cancelling");
      return false;
    }

    const url = `${APIBaseURL}auth/passwordReset/confirm`;
    const config: AxiosRequestConfig = {
      url,
      method: "post",
      data: {
        email,
        resetCode,
        newPassword,
      },
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        navigate({ to: "/" });
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const updateUserInformation = async (newUser: TUser) => {
    if (!user.email || !user.jwt) {
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
        localStorage.setItem("user", JSON.stringify(newUser));
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  };

  useEffect(() => {
    // const setup = async () => {
    //   if (window.location.pathname === "/SignIn") return;
    //   await GetUser();
    //   await isSignedIn();
    //   if (!user.email) {
    //     const usr = GetUser();
    //     if (!usr.email) {
    //       console.error("User not available!");
    //       return;
    //     }
    //   }
    // getUserRaids(user, GetUser)
    //   .then((result) => {
    //     if (result) setUserRaids(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // getUserDungeons(user, GetUser)
    //   .then((result) => {
    //     if (result) setUserDungeons(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // getUserWorldBosses(user, GetUser)
    //   .then((result) => {
    //     if (result) setUserWorldBosses(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // getUserDailyCrafting(user, GetUser)
    //   .then((result) => {
    //     if (result) setUserDailyCrafts(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // getUserWizardVault(user, GetUser)
    //   .then((result) => {
    //     if (result) setUserWizardVault(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // };
    // setup();
  }, []);

  return (
    <APIContext.Provider
      value={{
        initializePasswordReset,
        performPasswordReset,
        login,
        GetUser,
        isSignedIn,
        logout,
        updateUserInformation,
        createAccount,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
