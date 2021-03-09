import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../api/endpoints";
import IUser from "../api/user";
import IWorld from "../api/world";
import IFitwick from "../api/fitwick";
import {
  EVENT_CONNECT,
  EVENT_FITWICK_DELETE,
  EVENT_FITWICK_PICK_UP,
  EVENT_DO_FITWICK_NEW,
  EVENT_DO_FITWICK_PLACE,
  EVENT_NAVIGATE_HOME,
  EVENT_DONE_FITWICK_NEW,
  EVENT_DONE_FITWICK_PLACE,
  EVENT_FITWICK_MOVE,
  EVENT_WORLD_CHANGE_BACKGROUND,
  EVENT_WORLD_EXIT,
  EVENT_WORLD_ENTER,
} from "../api/events";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";
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
    this.socket.on(EVENT_CONNECT, () => {
      this.socket?.emit(EVENT_WORLD_ENTER, this.user, this.world);
    });

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

    this.game.events.on(
      EVENT_WORLD_CHANGE_BACKGROUND,
      (newBackgroundTexture: string) => {
        this.socket?.emit(EVENT_WORLD_CHANGE_BACKGROUND, newBackgroundTexture);
      }
    );
    this.game.events.on(EVENT_DONE_FITWICK_NEW, (fitwick: IFitwick) => {
      this.socket?.emit(EVENT_DONE_FITWICK_NEW, fitwick);
    });
    this.game.events.on(
      EVENT_FITWICK_MOVE,
      (
        fitwickName: string,
        oldX: number,
        oldY: number,
        newX: number,
        newY: number
      ) => {
        this.socket?.emit(
          EVENT_FITWICK_MOVE,
          fitwickName,
          oldX,
          oldY,
          newX,
          newY
        );
      }
    );
    this.game.events.on(EVENT_DONE_FITWICK_PLACE, (fitwick: IFitwick) => {
      this.socket?.emit(EVENT_DONE_FITWICK_PLACE, fitwick);
    });

    // this.game.events.on(EVENT_FITWICK_PLACE, () => {
    //   this.socket?.emit(EVENT_FITWICK_PLACE, )
    // });
    // this.game.events.on(EVENT_FITWICK_DELETE, this.onDeleteFitwick.bind(this));
    // this.game.events.on(EVENT_FITWICK_MOVE, this.onMoveFitwick.bind(this));

    this.game.events.on(EVENT_WORLD_EXIT, () => {
      this.socket?.emit(EVENT_WORLD_EXIT);
    });
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
