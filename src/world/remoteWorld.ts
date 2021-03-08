import axios from "axios";
import { SERVER_WORLDS_ENDPOINT } from "../api/endpoints";

export const fetchWorld = async (worldId: any) => {
  return await axios.get(`${SERVER_WORLDS_ENDPOINT}/${worldId}`);
};
