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
  EVENT_DO_FITWICK_NEW,
  EVENT_DO_FITWICK_PLACE,
  EVENT_DO_FITWICK_DELETE,
  EVENT_MESSAGE,
  EVENT_WORLD_DATA,
  EVENT_BROWSER_MESSAGE,
} from "../api/events";
import { SCALE_RATIO } from "./constants";
import MainScene from "./scenes/MainScene";
import GUIScene from "./scenes/GUIScene";
import PreloadScene from "./scenes/PreloadScene";
import Fitwick from "./components/Fitwick";
import ModalScene from "./scenes/ModalScene";
import FitwickConfigLoaderPlugin from "./fitwickLoader";

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
  private consoleInfo: typeof console.info;
  private consoleWarn: typeof console.warn;
  private consoleError: typeof console.error;

  constructor(exitWorldCallback: Function) {
    this.game = undefined;
    this.socket = undefined;
    this.exitWorldCallback = exitWorldCallback;
    this.consoleInfo = console.info;
    this.consoleWarn = console.warn;
    this.consoleError = console.error;
  }

  public init(
    parent: string,
    userId: IUser["id"],
    worldId: IWorld["id"] | null,
    worldName: string,
    showToastMessage: (color: string, message: string) => void
  ) {
    this.game = new Phaser.Game({
      parent,
      type: Phaser.AUTO,
      // creating a game slightly larger than window size
      // allows to zoom out more
      width: window.innerWidth * SCALE_RATIO,
      height: window.innerHeight * SCALE_RATIO,
      autoFocus: true,
      scene: [PreloadScene, MainScene, GUIScene, ModalScene],
      dom: {
        createContainer: true,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        expandParent: true,
      },
      loader: {
        baseURL: "assets",
      },
      plugins: {
        global: [
          {
            key: "fitwickConfig",
            plugin: FitwickConfigLoaderPlugin,
            start: true,
          },
        ],
      },
    });

    if (userId) {
      this.socket = io(SERVER_ADDRESS);
      this.socket.on(EVENT_CONNECT, () => {
        this.socket?.emit(
          EVENT_WORLD_ENTER,
          userId,
          worldId,
          worldName,
          (responseData: IWorld) => {
            this.game?.events.emit(EVENT_WORLD_DATA, responseData);
          }
        );
      });
      this.hookIntoBrowserEvents();
      this.registerServerEvents(showToastMessage);
    }

    this.registerGameEvents(showToastMessage);

    return this.game;
  }

  private hookIntoBrowserEvents() {
    const gameThis = this;
    console.info = function (message?: any, ...optionalArgs: any[]) {
      gameThis.socket?.emit(EVENT_BROWSER_MESSAGE, message);
      return gameThis.consoleInfo.apply(
        console,
        [message].concat(optionalArgs)
      );
    };
    console.warn = function (message?: any, ...optionalArgs: any[]) {
      gameThis.socket?.emit(EVENT_BROWSER_MESSAGE, message);
      return gameThis.consoleWarn.apply(
        console,
        [message].concat(optionalArgs)
      );
    };
    console.error = function (message?: any, ...optionalArgs: any[]) {
      gameThis.socket?.emit(EVENT_BROWSER_MESSAGE, message);
      return gameThis.consoleError.apply(
        console,
        [message].concat(optionalArgs)
      );
    };
    window.onerror = function (message, url, lineNo, columnNo, error) {
      const msg = [
        "Message: " + message,
        "URL: " + url,
        "Line: " + lineNo,
        "Column: " + columnNo,
        "Error object: " + JSON.stringify(error),
      ].join(" - ");
      gameThis.socket?.emit(EVENT_BROWSER_MESSAGE, msg);
      return false;
    };
  }

  private registerGameEvents(
    showToastMessage: (color: string, message: string) => void
  ) {
    if (!this.game) {
      return;
    }

    this.game.events.on(EVENT_MESSAGE, (color: string, message: string) => {
      showToastMessage(color, message);
      this.socket?.emit(EVENT_MESSAGE, color, message);
    });

    this.game.events.on(
      EVENT_WORLD_CHANGE_BACKGROUND,
      (external: boolean, newBackgroundTexture: string) => {
        if (!external) {
          this.socket?.emit(
            EVENT_WORLD_CHANGE_BACKGROUND,
            newBackgroundTexture
          );
        }
      }
    );
    // EVENT_DO_FITWICK_NEW is just from UIScene to MainScene
    this.game.events.on(
      EVENT_DONE_FITWICK_NEW,
      (external: boolean, fitwick: Fitwick) => {
        if (!external) {
          this.socket?.emit(
            EVENT_DONE_FITWICK_NEW,
            removeExtraFitwickProps(fitwick)
          );
        }
      }
    );
    this.game.events.on(
      EVENT_FITWICK_MOVE,
      (external: boolean, fitwick: Fitwick) => {
        if (!external) {
          this.socket?.emit(
            EVENT_FITWICK_MOVE,
            removeExtraFitwickProps(fitwick)
          );
        }
      }
    );
    // EVENT_DO_FITWICK_PLACE is just from GUIScene to MainScene
    this.game.events.on(
      EVENT_DONE_FITWICK_PLACE,
      (external: boolean, fitwick: Fitwick) => {
        // the DONE_PLACE event is not actually fired when the DO_PLACE event was external
        // but since the parameters need to match, I'm keeping the check just in case
        if (!external) {
          this.socket?.emit(
            EVENT_DONE_FITWICK_PLACE,
            removeExtraFitwickProps(fitwick)
          );
        }
      }
    );
    this.game.events.on(
      EVENT_FITWICK_PICK_UP,
      (external: boolean, fitwick: Fitwick) => {
        if (!external) {
          this.socket?.emit(
            EVENT_FITWICK_PICK_UP,
            removeExtraFitwickProps(fitwick)
          );
        }
      }
    );
    this.game.events.on(
      EVENT_DONE_FITWICK_DELETE,
      (external: boolean, fitwick: Fitwick) => {
        if (!external) {
          this.socket?.emit(
            EVENT_DONE_FITWICK_DELETE,
            removeExtraFitwickProps(fitwick)
          );
        }
      }
    );
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

  private registerServerEvents(
    showToastMessage: (color: string, message: string) => void
  ) {
    if (!this.socket) {
      return;
    }

    this.socket.on(EVENT_MESSAGE, showToastMessage);

    this.socket.on(
      EVENT_WORLD_CHANGE_BACKGROUND,
      (newBackgroundTexture: string) => {
        // true -> external event
        this.game?.events.emit(
          EVENT_WORLD_CHANGE_BACKGROUND,
          true,
          newBackgroundTexture
        );
      }
    );
    this.socket.on(EVENT_DONE_FITWICK_NEW, (fitwick: IFitwick) => {
      // true -> external event
      this.game?.events.emit(EVENT_DO_FITWICK_NEW, true, fitwick);
    });
    this.socket.on(EVENT_FITWICK_MOVE, (fitwick: IFitwick) => {
      // true -> external event
      this.game?.events.emit(EVENT_FITWICK_MOVE, true, fitwick);
    });
    this.socket.on(EVENT_DONE_FITWICK_PLACE, (fitwick: IFitwick) => {
      // true -> external event
      this.game?.events.emit(EVENT_DO_FITWICK_PLACE, true, fitwick);
    });
    this.socket.on(EVENT_FITWICK_PICK_UP, (fitwick: IFitwick) => {
      // true -> external event
      this.game?.events.emit(EVENT_FITWICK_PICK_UP, true, fitwick);
    });
    this.socket.on(EVENT_DONE_FITWICK_DELETE, (fitwick: IFitwick) => {
      // true -> external event
      this.game?.events.emit(EVENT_DO_FITWICK_DELETE, true, fitwick);
    });
  }

  public destroy() {
    console.info = this.consoleInfo;
    console.warn = this.consoleWarn;
    console.error = this.consoleError;
    // When the function returns true, this prevents the firing of the default event handler.
    window.onerror = () => false;

    if (this.game) {
      this.game.destroy(true);
      this.game = undefined;
    }
    if (this.socket?.connected) {
      this.socket.disconnect();
      this.socket = undefined;
    }
  }
}

export default PhaserGame;
