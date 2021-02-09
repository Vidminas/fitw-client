import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../constants";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import MainScene from "./scenes/MainScene";
import User from "../api/user";
import World from "../api/world";

class PhaserGame {
  private game?: Phaser.Game;
  private socket?: Socket;
  constructor() {
    this.game = undefined;
    this.socket = undefined;
  }

  public init(parent: string, user: User, world?: World) {
    if (!user) {
      console.log("NO USER!");
      return null;
    }

    this.socket = io(SERVER_ADDRESS);
    this.socket.on("connected", () => {
      console.log("Connected: " + this.socket!.connected);
    });

    console.log("Rendering game with user");
    console.log(user);

    // const mainScene = new MainScene(this.socket);
    this.game = new Phaser.Game({
      parent,
      type: Phaser.AUTO,
      width: 1024,
      height: 600,
      // scene: mainScene,
      scene: MainScene,
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
