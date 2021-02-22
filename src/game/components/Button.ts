import { UI_BUTTON_SIZE } from "../constants";

class Button extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    private restFrame: string,
    private hoverFrame: string,
    private clickFrame: string,
    handleClick?: Function
  ) {
    super(scene, x, y, texture, restFrame);
    this.setOrigin(0, 0);
    this.setDisplaySize(UI_BUTTON_SIZE, UI_BUTTON_SIZE);
    scene.add.existing(this);

    this.setInteractive();
    this.on("pointerover", () => {
      this.setFrame(hoverFrame);
    });
    this.on("pointerout", () => {
      this.setFrame(restFrame);
    });
    this.on("pointerdown", () => {
      this.setFrame(clickFrame);
    });
    if (handleClick) {
      this.on("pointerup", () => {
        this.setFrame(hoverFrame);
        handleClick();
      });
    } else {
      this.on("pointerup", () => {
        this.setFrame(hoverFrame);
      });
    }
  }

  onClick(handleClick: Function) {
    this.on("pointerup", () => {
      this.setFrame(this.hoverFrame);
      handleClick();
    });
  }
}

export default Button;
