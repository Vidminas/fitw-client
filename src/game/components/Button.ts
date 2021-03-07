import { UI_BUTTON_SIZE } from "../constants";

class Button extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    restFrame: string,
    private hoverFrame: string,
    clickFrame: string,
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
      this.on(
        "pointerup",
        (
          _pointer: Phaser.Input.Pointer,
          _localX: number,
          _localY: number,
          event: Phaser.Types.Input.EventData
        ) => {
          this.setFrame(hoverFrame);
          event.stopPropagation();
          handleClick();
        }
      );
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
