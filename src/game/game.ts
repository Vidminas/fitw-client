import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../constants";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import MainScene from "./scenes/MainScene";

let game: Phaser.Game | undefined = undefined;
let socket: Socket | undefined = undefined;

export const initGame = (parent: string) => {
  socket = io(SERVER_ADDRESS);
  socket.on("connected", () => {
    console.log("Connected: " + socket!.connected);
  });

  game = new Phaser.Game({
    parent,
    type: Phaser.AUTO,
    width: 1024,
    height: 600,
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
  return game;
};

export const destroyGame = () => {
  if (game) {
    game.destroy(true, true);
    game = undefined;
  }
  if (socket?.connected) {
    socket.disconnect();
    socket = undefined;
  }
};

export const socketEmit = (message: string) => {
  socket?.emit("message", message);
};

export const socketHandler = (event: string, listener: Function) => {
  socket?.on(event, listener);
};
