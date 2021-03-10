import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../api/endpoints";
import IUser from "../api/user";
import IWorld from "../api/world";
import IFitwick from "../api/fitwick";
import {
  EVENT_CONNECT,
  EVENT_FITWICK_PICK_UP,
  EVENT_NAVIGATE_HOME,
  EVENT_DONE_FITWICK_NEW,
  EVENT_DONE_FITWICK_PLACE,
  EVENT_FITWICK_MOVE,
  EVENT_WORLD_CHANGE_BACKGROUND,
  EVENT_WORLD_EXIT,
  EVENT_WORLD_ENTER,
  EVENT_DONE_FITWICK_DELETE,
} from "../api/events";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";
import MainScene from "./scenes/MainScene";
import UIScene from "./scenes/UIScene";
import PreloadScene from "./scenes/PreloadScene";
import Fitwick from "./components/Fitwick";

// logic borrowed from:
// https://stackoverflow.com/questions/31829951/how-to-reduce-javascript-object-to-only-contain-properties-from-interface
const fitwickDataKeys = [
  "worldId",
  "name",
  "x",
  "y",
  "atlasTexture",
  "atlasFrame",
] as const;
// These two types are not used, they will just cause an error
// if the data keys do not match the IFitwick interface
/* eslint-disable @typescript-eslint/no-unused-vars */
type ExtraTestKeysWarning<
  T extends never = Exclude<typeof fitwickDataKeys[number], keyof IFitwick>
> = void;
type MissingTestKeysWarning<
  T extends never = Exclude<keyof IFitwick, typeof fitwickDataKeys[number]>
> = void;
/* eslint-enable @typescript-eslint/no-unused-vars */
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((o, k) => {
    o[k] = obj[k];
    return o;
  }, {} as Pick<T, K>);
}

const removeExtraFitwickProps = (fitwick: Fitwick): IFitwick => {
  return pick(fitwick, ...fitwickDataKeys);
};

class PhaserGame {
  private game?: Phaser.Game;
  private socket?: Socket;
  private exitWorldCallback: Function;

  constructor(exitWorldCallback: Function) {
    this.game = undefined;
    this.socket = undefined;
    this.exitWorldCallback = exitWorldCallback;
  }

  public init(parent: string, user: IUser, world: IWorld) {
    this.socket = io(SERVER_ADDRESS);
    this.socket.on(EVENT_CONNECT, () => {
      this.socket?.emit(EVENT_WORLD_ENTER, user, world);
    });

    const preloadScene = new PreloadScene();
    const uiScene = new UIScene();
    const mainScene = new MainScene(world);

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
    // EVENT_DO_FITWICK_NEW is just from UIScene to MainScene
    this.game.events.on(EVENT_DONE_FITWICK_NEW, (fitwick: Fitwick) => {
      this.socket?.emit(
        EVENT_DONE_FITWICK_NEW,
        removeExtraFitwickProps(fitwick)
      );
      console.log(fitwick);
    });
    this.game.events.on(EVENT_FITWICK_MOVE, (fitwick: Fitwick) => {
      this.socket?.emit(EVENT_FITWICK_MOVE, removeExtraFitwickProps(fitwick));
    });
    // EVENT_DO_FITWICK_PLACE is just from UIScene to MainScene
    this.game.events.on(EVENT_DONE_FITWICK_PLACE, (fitwick: Fitwick) => {
      this.socket?.emit(EVENT_DONE_FITWICK_PLACE, fitwick);
    });
    this.game.events.on(EVENT_FITWICK_PICK_UP, (fitwick: Fitwick) => {
      this.socket?.emit(
        EVENT_FITWICK_PICK_UP,
        removeExtraFitwickProps(fitwick)
      );
    });
    this.game.events.on(EVENT_DONE_FITWICK_DELETE, (fitwick: Fitwick) => {
      this.socket?.emit(
        EVENT_DONE_FITWICK_DELETE,
        removeExtraFitwickProps(fitwick)
      );
    });
    // No need to inform server about EVENT_FITWICK_TAP
    // this is for local client only
    this.game.events.on(EVENT_WORLD_EXIT, () => {
      this.socket?.emit(EVENT_WORLD_EXIT);
    });
    // Also no need to inform about navigating away from the game page
    this.game.events.on(EVENT_NAVIGATE_HOME, () => {
      this.destroy();
      this.exitWorldCallback();
    });
  }

  public destroy() {
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
