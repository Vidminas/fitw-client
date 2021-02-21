import axios from "axios";
import { SERVER_AUTH, SERVER_AUTH_LOGIN } from "../api/endpoints";
import IUser from "../api/user";

export const requestUserAuthEmail = async (email: string) => {
  return await axios.post(SERVER_AUTH, JSON.stringify({ destination: email }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchUserWithToken = async (token: string) => {
  return await axios.get(SERVER_AUTH_LOGIN + token);
};

export const authUserWithServer = async (user: IUser) => {
  return await axios.post(SERVER_AUTH_LOGIN, JSON.stringify({ id: user.id }), {
    headers: { "Content-Type": "application/json" },
  });
};
