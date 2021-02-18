class Button extends Phaser.GameObjects.Image {
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
    this.setOrigin(0, 0);
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
}

export default Button;
