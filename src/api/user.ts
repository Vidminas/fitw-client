import Group from "./group";
import World from "./world";

interface IUser {
  id: any;
  emailHash: string;
  username: string;
  groups: Group[];
  worlds: World[];
}

export default IUser;
