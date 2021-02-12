import { Plugins } from "@capacitor/core";
import IUser from "../api/user";

export const getLocalStorageUser = async () => {
  const data = await Plugins.Storage.get({ key: "user" });
  if (!data.value) {
    return null;
  }
  return JSON.parse(data.value);
};

export const setLocalStorageUser = async (user: IUser) => {
  await Plugins.Storage.set({ key: "user", value: JSON.stringify(user) });
};
