import { UI_BUTTON_SIZE } from "../constants";

class Button extends Phaser.GameObjects.Image {
  private restFrame: string;
  private hoverFrame: string;
  private clickFrame: string;
  private clickHandler?: Function;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    restFrame: string,
    hoverFrame: string,
    clickFrame: string,
    handleClick?: Function
  ) {
    super(scene, x, y, texture, restFrame);
    this.restFrame = restFrame;
    this.hoverFrame = hoverFrame;
    this.clickFrame = clickFrame;
    this.clickHandler = handleClick;

    this.setOrigin(0, 0);
    this.setDisplaySize(UI_BUTTON_SIZE, UI_BUTTON_SIZE);
    scene.add.existing(this);

    this.setInteractive();
    this.registerPointerEvents();
  }

  private registerPointerEvents() {
    this.on("pointerover", () => {
      this.setFrame(this.hoverFrame);
    });
    this.on("pointerout", () => {
      this.setFrame(this.restFrame);
    });
    this.on("pointerdown", () => {
      this.setFrame(this.clickFrame);
    });
    if (this.clickHandler) {
      this.on(
        "pointerup",
        (
          _pointer: Phaser.Input.Pointer,
          _localX: number,
          _localY: number,
          event: Phaser.Types.Input.EventData
        ) => {
          this.setFrame(this.hoverFrame);
          event.stopPropagation();
          this.clickHandler!();
        }
      );
    } else {
      this.on("pointerup", () => {
        this.setFrame(this.hoverFrame);
      });
    }
  }

  changeFrames(restFrame: string, hoverFrame: string, clickFrame: string) {
    this.restFrame = restFrame;
    this.hoverFrame = hoverFrame;
    this.clickFrame = clickFrame;
    this.registerPointerEvents();
  }

  onClick(handleClick: Function) {
    this.on("pointerup", () => {
      this.setFrame(this.hoverFrame);
      handleClick();
    });
  }
}

export default Button;
