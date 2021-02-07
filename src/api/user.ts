import Group from "./group";
import World from "./world";

interface User {
  username: string;
  groups: Group[];
  worlds: World[];
}

export default User;
