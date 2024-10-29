import { APIKeyLength, minPasswordLength, minUsernameLength } from "./settings";

export const messageMinimumLength = 50;

export const isUsernameValid = (firstName: string) => {
  return firstName.length >= minUsernameLength;
};

export const isEmailValid = (email: string) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email?.match(regex);
};

export const isAPIKeyValid = (apiKey: string) => {
  return apiKey.length === APIKeyLength;
};

export const isPasswordValid = (password: string) => {
  return password.length >= minPasswordLength;
};
