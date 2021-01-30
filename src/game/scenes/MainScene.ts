import Phaser from "phaser";
import { SERVER_ADDRESS } from "../../constants";
import { socketEmit } from "../game";

class MainScene extends Phaser.Scene {
  private rexUI: any;

  constructor() {
    super("MainScene");
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
    socketEmit("Hey from MainScene");
  }

  update() {
    // ...
  }
}

export default MainScene;
