import Phaser from "phaser";
import { io, Socket } from "socket.io-client";

class MainScene extends Phaser.Scene {
  private rexUI: any;
  private socket: Socket;

  constructor() {
    super("MainScene");
    this.socket = io("http://localhost:8081");
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
  }

  preload() {
    // ...
  }

  update() {
    // ...
  }
}

export default MainScene;
