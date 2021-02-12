import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../api/constants";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import MainScene from "./scenes/MainScene";
import IUser from "../api/user";
import IWorld from "../api/world";

class PhaserGame {
  private game?: Phaser.Game;
  private socket?: Socket;
  private user: IUser;
  private world: IWorld;

  constructor(user: IUser, world: IWorld) {
    this.game = undefined;
    this.socket = undefined;
    this.user = user;
    this.world = world;
  }

  public init(parent: string) {
    this.socket = io(SERVER_ADDRESS);
    this.socket.on("connected", () => {
      console.log("Connected: " + this.socket!.connected);
    });

    const mainScene = new MainScene(this.socket);
    this.game = new Phaser.Game({
      parent,
      type: Phaser.AUTO,
      width: 1024,
      height: 600,
      scene: mainScene,
      plugins: {
        scene: [
          {
            key: "rexUI",
            plugin: RexUIPlugin,
            mapping: "rexUI",
          },
        ],
      },
    });
    return this.game;
  }

  public destroy() {
    if (this.game) {
      this.game.destroy(true, true);
      this.game = undefined;
    }
    if (this.socket?.connected) {
      this.socket.disconnect();
      this.socket = undefined;
    }
  }

  public socketEmit(message: string) {
    this.socket?.emit("message", message);
  }

  public socketHandler(event: string, listener: Function) {
    this.socket?.on(event, listener);
  }
}

export default PhaserGame;
