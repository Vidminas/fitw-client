export const SERVER_ADDRESS = process.env.REACT_APP_DEBUG
  ? "http://localhost:8081"
  : "https://fitw-server.azurewebsites.net:443";

export const SERVER_USERS_ENDPOINT = SERVER_ADDRESS + "/users";
export const SERVER_AUTH = SERVER_ADDRESS + "/auth";
export const SERVER_AUTH_VERIFY = SERVER_ADDRESS + "/auth/verify";
