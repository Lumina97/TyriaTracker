import { ReactNode, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import axios, { Axios, AxiosRequestConfig } from "axios";
import { APIBaseURL } from "../Utils/settings";

type TAPIProvider = {
  login: (email: string, password: string) => Promise<boolean>;
  createAccount: (email: string, password: string) => Promise<boolean>;
};

const loadJWTFromLocalStorage = () => {
  try {
    const key = localStorage.getItem("jwt");
    return key;
  } catch (error) {
    return false;
  }
};

const APIContext = createContext<TAPIProvider>({} as TAPIProvider);

export const APIProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate({ from: "/SignIn" });
  const [jwt, setJwt] = useState<string>("");

  const login = async (email: string, password: string) => {
    const url = APIBaseURL + "auth/login";
    console.log(url);
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
        setJwt(result.data.jwt);
        localStorage.setItem("jwt", result.data.jwt);
        navigate({ to: "/Home" });
        return true;
      }
    } catch (error) {}
    return false;
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
        setJwt(result.data.jwt);
        localStorage.setItem("jwt", result.data.jwt);
        navigate({ to: "/Home" });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  useEffect(() => {
    console.log("Getting jwt");
    const key = loadJWTFromLocalStorage();
    if (key !== false && key !== null) {
      setJwt(key);
      console.log("got jwt from storage");
    }
  }, []);

  return (
    <APIContext.Provider value={{ login, createAccount }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
