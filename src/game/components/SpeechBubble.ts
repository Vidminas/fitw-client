import ContainerLite from "phaser3-rex-plugins/plugins/containerlite.js";
import { COLOR_STRING_BLACK } from "../colors";
import {
  FRAME_BUTTON_SPEAKER_CLICK,
  FRAME_BUTTON_SPEAKER_HOVER,
  FRAME_BUTTON_SPEAKER_REST,
  SPEECH_BUBBLE_MIN_HEIGHT,
  SPEECH_BUBBLE_MIN_WIDTH,
  SPEECH_BUBBLE_PADDING,
  TEXTURE_BUTTONS,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import Button from "./Button";
import Fitwick from "./Fitwick";

class SpeechBubble extends ContainerLite {
  readonly parent: Fitwick;
  readonly speakerButton: Button;

  constructor(scene: Phaser.Scene, parent: Fitwick, quote: string) {
    const bubble = scene.add.graphics({ x: 0, y: 0 });
    const content = scene.add.text(0, 0, quote, {
      fontFamily: "Arial",
      fontSize: UI_FONT_SIZE,
      color: COLOR_STRING_BLACK,
      align: "center",
      wordWrap: {
        width:
          SPEECH_BUBBLE_MIN_WIDTH - UI_BUTTON_SIZE - SPEECH_BUBBLE_PADDING * 2,
      },
    });
    const b = content.getBounds();

    const arrowHeight = SPEECH_BUBBLE_MIN_HEIGHT / 4;
    const bubbleWidth =
      Math.max(SPEECH_BUBBLE_MIN_WIDTH, b.width) + SPEECH_BUBBLE_PADDING;
    const bubbleHeight =
      Math.max(SPEECH_BUBBLE_MIN_HEIGHT, b.height) + SPEECH_BUBBLE_PADDING;

    // Code inspired by https://github.com/photonstorm/phaser3-examples/blob/master/public/src/game%20objects/text/speech%20bubble.js
    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(bubbleWidth / 2 - arrowHeight);
    const point1Y = bubbleHeight;
    const point2X = Math.floor(bubbleWidth / 2 + arrowHeight);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 2);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    super(scene, 0, 0, bubbleWidth, bubbleHeight);
    this.parent = parent;

    content.setPosition(
      bubble.x + SPEECH_BUBBLE_PADDING,
      bubble.y + (bubbleHeight - b.height) / 2
    );

    this.speakerButton = new Button(
      scene,
      content.x + b.width + SPEECH_BUBBLE_PADDING,
      content.y + (b.height - UI_BUTTON_SIZE) / 2,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_SPEAKER_REST,
      FRAME_BUTTON_SPEAKER_HOVER,
      FRAME_BUTTON_SPEAKER_CLICK,
      () => {
        parent.playAudio();
      }
    );

    this.setOrigin(0);
    this.setInteractive();
    this.add(bubble);
    this.add(content);
    this.add(this.speakerButton);

    // scene.add
    //   .graphics()
    //   .strokeRectShape(this.getBounds())
    //   .lineStyle(3, 0xff0000);
    scene.add.existing(this);
  }
}

export default SpeechBubble;
