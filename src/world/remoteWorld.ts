import axios from "axios";
import { SERVER_WORLDS_ENDPOINT } from "../api/endpoints";
import IUser from "../api/user";

export const fetchWorld = async (worldID: IUser["worlds"]) => {
  return await axios.get(`${SERVER_WORLDS_ENDPOINT}/${worldID}`);
};

export const fetchWorlds = async (worldIDs: IUser["worlds"][]) => {
  return await axios.get(`${SERVER_WORLDS_ENDPOINT}?id=${worldIDs.join(",")}`);
};

export const deleteWorld = async (worldID: IUser["worlds"]) => {
  return await axios.delete(`${SERVER_WORLDS_ENDPOINT}/${worldID}`);
};
