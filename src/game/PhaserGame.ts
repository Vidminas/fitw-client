import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../api/endpoints";
import IUser from "../api/user";
import IWorld from "../api/world";
import {
  EVENT_FITWICK_DELETE,
  EVENT_FITWICK_MOVE,
  EVENT_FITWICK_NEW,
  EVENT_FITWICK_PLACE,
  EVENT_NAVIGATE_HOME,
  GAME_HEIGHT,
  GAME_WIDTH,
} from "./constants";
import MainScene from "./scenes/MainScene";
import UIScene from "./scenes/UIScene";
import PreloadScene from "./scenes/PreloadScene";

class PhaserGame {
  public isInitialised: boolean;
  private game?: Phaser.Game;
  private socket?: Socket;
  private user: IUser;
  private world: IWorld;
  private exitWorld: Function;

  constructor(user: IUser, world: IWorld, exitWorld: Function) {
    this.isInitialised = false;
    this.game = undefined;
    this.socket = undefined;
    this.user = user;
    this.world = world;
    this.exitWorld = exitWorld;
  }

  public init(parent: string) {
    this.socket = io(SERVER_ADDRESS);
    this.socket.on("connected", () => {
      console.log("Connected: " + this.socket!.connected);
    });

    console.log("Creating a new game");

    const preloadScene = new PreloadScene();
    const uiScene = new UIScene();
    const mainScene = new MainScene(this.world);

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
    });
    this.registerGameEvents();
    this.isInitialised = true;
    return this.game;
  }

  private registerGameEvents() {
    if (!this.game) {
      return;
    }

    this.game.events.on(EVENT_FITWICK_NEW, (fitwickName: string) => {
      this.socket?.emit(EVENT_FITWICK_NEW, fitwickName);
    });
    // this.game.events.on(EVENT_FITWICK_PLACE, () => {
    //   this.socket?.emit(EVENT_FITWICK_PLACE, )
    // });
    // this.game.events.on(EVENT_FITWICK_DELETE, this.onDeleteFitwick.bind(this));
    // this.game.events.on(EVENT_FITWICK_MOVE, this.onMoveFitwick.bind(this));

    this.game.events.on(EVENT_NAVIGATE_HOME, () => {
      this.destroy();
      this.exitWorld();
    });
  }

  public destroy() {
    this.isInitialised = false;
    if (this.game) {
      this.game.destroy(true);
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
