import Phaser from "phaser";
import { Socket } from "socket.io-client";
import { SERVER_ADDRESS } from "../../api/constants";

class MainScene extends Phaser.Scene {
  private rexUI: any;
  private socket: Socket;

  constructor(socket: Socket) {
    super("MainScene");
    this.socket = socket;
  }

  preload() {
    // ...
  }

  create() {
    const txt = this.rexUI.add.BBCodeText(
      100,
      200,
      `[color=yellow]Connected to [/color][color=green]${SERVER_ADDRESS}[/color]`
    );
    console.log(txt);
    this.socket.emit("Hey from MainScene");
  }

  update() {
    // ...
  }
}

export default MainScene;
