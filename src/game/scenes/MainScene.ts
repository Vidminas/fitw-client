import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../constants";

class MainScene extends Phaser.Scene {
  private rexUI: any;
  private socket: Socket;

  constructor() {
    super("MainScene");
    this.socket = io(SERVER_ADDRESS);
    this.socket.on("connected", () => {
      console.log("Connected: " + this.socket.connected);
    });
  }

  create() {
    const txt = this.rexUI.add.BBCodeText(
      300,
      400,
      "[color=red]WAHEY![/color]"
    );
    console.log(txt);
  }

  preload() {
    // ...
  }

  update() {
    // ...
  }
}

export default MainScene;
