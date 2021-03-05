import ContainerLite from "phaser3-rex-plugins/plugins/containerlite.js";
import {
  FRAME_BUTTON_SPEAKER_CLICK,
  FRAME_BUTTON_SPEAKER_HOVER,
  FRAME_BUTTON_SPEAKER_REST,
  TEXTURE_BUTTONS,
  UI_BUTTON_SIZE,
} from "../constants";
import Button from "./Button";
import Fitwick from "./Fitwick";

class SpeechBubble extends ContainerLite {
  readonly parent: Fitwick;
  readonly speakerButton: Button;
  private bubble: Phaser.GameObjects.Graphics;
  private content: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    parent: Fitwick,
    x: number,
    y: number,
    width: number,
    height: number,
    quote: string
  ) {
    const bubbleWidth = width;
    const bubbleHeight = height;
    const bubblePadding = 10;
    const arrowHeight = bubbleHeight / 4;

    super(
      scene,
      x,
      y,
      bubbleWidth + bubblePadding,
      bubbleHeight + arrowHeight + bubblePadding
    );
    this.parent = parent;

    // Code inspired by https://github.com/photonstorm/phaser3-examples/blob/master/public/src/game%20objects/text/speech%20bubble.js
    this.bubble = scene.add.graphics({ x: x, y: y });

    //  Bubble shadow
    this.bubble.fillStyle(0x222222, 0.5);
    this.bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    this.bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    this.bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    this.bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    this.bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(bubbleWidth / 2 - arrowHeight);
    const point1Y = bubbleHeight;
    const point2X = Math.floor(bubbleWidth / 2 + arrowHeight);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 2);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    this.bubble.lineStyle(4, 0x222222, 0.5);
    this.bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    this.bubble.fillTriangle(
      point1X,
      point1Y,
      point2X,
      point2Y,
      point3X,
      point3Y
    );
    this.bubble.lineStyle(2, 0x565656, 1);
    this.bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    this.bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    this.content = scene.add.text(0, 0, quote, {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#000000",
      align: "center",
      wordWrap: { width: bubbleWidth - UI_BUTTON_SIZE - bubblePadding * 2 },
    });

    const b = this.content.getBounds();
    this.content.setPosition(
      this.bubble.x + bubbleWidth / 2 - b.width / 2,
      this.bubble.y + bubbleHeight / 2 - b.height / 2
    );

    this.speakerButton = new Button(
      scene,
      this.content.x + b.width,
      this.content.y - b.height,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_SPEAKER_REST,
      FRAME_BUTTON_SPEAKER_HOVER,
      FRAME_BUTTON_SPEAKER_CLICK
    );

    this.setOrigin(0);
    this.setInteractive();
    this.add(this.bubble);
    this.add(this.content);
    this.add(this.speakerButton);

    // scene.add
    //   .graphics()
    //   .strokeRectShape(this.getBounds())
    //   .lineStyle(3, 0xff0000);
    scene.add.existing(this);
  }
}

export default SpeechBubble;
