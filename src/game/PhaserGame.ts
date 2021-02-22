import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../api/endpoints";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import RexGesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin.js";
import IUser from "../api/user";
import IWorld from "../api/world";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";
import MainScene from "./scenes/MainScene";
import UIScene from "./scenes/UIScene";
import PreloadScene from "./scenes/PreloadScene";

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

    const preloadScene = new PreloadScene();
    const uiScene = new UIScene();
    const mainScene = new MainScene(this.socket, this.world);

    this.game = new Phaser.Game({
      parent,
      type: Phaser.AUTO,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      scene: [preloadScene, mainScene, uiScene],
      dom: {
        createContainer: true,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      loader: {
        baseURL: "assets",
      },
      plugins: {
        scene: [
          {
            key: "rexUI",
            plugin: RexUIPlugin,
            mapping: "rexUI",
          },
          {
            key: "rexGestures",
            plugin: RexGesturesPlugin,
            mapping: "rexGestures",
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
