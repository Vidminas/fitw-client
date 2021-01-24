import Phaser from "phaser";

class MainScene extends Phaser.Scene {
  private rexUI: any;
  constructor() {
    super("MainScene");
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
