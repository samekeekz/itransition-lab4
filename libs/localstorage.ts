"use client";

type User = {
  id: string;
  name: string;
  status: string;
};

export const storeUserDataInLocalStorage = (userData: User) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const getUserDataFromLocalStorage = () => {
  const userDataString = localStorage.getItem("userData");
  return userDataString ? JSON.parse(userDataString) : null;
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem("userData");
};