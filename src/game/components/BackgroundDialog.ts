import { Dialog } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { COLOR_DIALOG_BACKGROUND, COLOR_DIALOG_FOREGROUND } from "../colors";
import {
  FRAME_BUTTON_CANCEL_CLICK,
  FRAME_BUTTON_CANCEL_HOVER,
  FRAME_BUTTON_CANCEL_REST,
  FRAME_BUTTON_CONFIRM_CLICK,
  FRAME_BUTTON_CONFIRM_HOVER,
  FRAME_BUTTON_CONFIRM_REST,
  GAME_HEIGHT,
  GAME_WIDTH,
  TEXTURE_BUTTONS,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import RexScene from "../scenes/RexScene";
import UIScene from "../scenes/UIScene";
import BackgroundGallery from "./BackgroundGallery";
import Button from "./Button";

const createTitle = (scene: RexScene) =>
  scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(
      0,
      0,
      100,
      40,
      20,
      COLOR_DIALOG_FOREGROUND
    ),
    text: scene.add.text(0, 0, "Choose a world background:", {
      fontSize: UI_FONT_SIZE,
    }),
    space: {
      left: 15,
      right: 15,
      top: 10,
      bottom: 10,
    },
  });

class BackgroundDialog extends Dialog {
  private confirmButton!: Button;
  private cancelButton!: Button;

  constructor(scene: UIScene, onConfirm: Function, onCancel: Function) {
    const minWidth = GAME_WIDTH - 4 * UI_BUTTON_SIZE;
    const minHeight = GAME_HEIGHT - 4 * UI_BUTTON_SIZE;
    super(scene, {
      x: 0,
      y: 0,
      anchor: {
        centerX: "center",
        centerY: "center",
      },
      background: scene.rexUI.add.roundRectangle(
        0,
        0,
        minWidth,
        minHeight,
        20,
        COLOR_DIALOG_BACKGROUND
      ),
      title: createTitle(scene),
      actions: [],
      content: new BackgroundGallery(scene),
      space: {
        top: 10,
      },
      expand: {
        title: false,
      },
    });

    this.createButtons(scene, onConfirm, onCancel);
    this.addAction(this.confirmButton);
    this.addAction(this.cancelButton);

    this.layout();
    this.pushIntoBounds();
    this.popUp(500);
    scene.add.existing(this);
  }

  public hide() {
    this.scaleDownDestroy(100);
  }

  private createButtons(
    scene: UIScene,
    onConfirm: Function,
    onCancel: Function
  ) {
    this.confirmButton = new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_CONFIRM_REST,
      FRAME_BUTTON_CONFIRM_HOVER,
      FRAME_BUTTON_CONFIRM_CLICK,
      () =>
        onConfirm(
          (this.getElement("content") as BackgroundGallery).newBackgroundTexture
        )
    );
    this.cancelButton = new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_CANCEL_REST,
      FRAME_BUTTON_CANCEL_HOVER,
      FRAME_BUTTON_CANCEL_CLICK,
      () => onCancel()
    );
  }
}

export default BackgroundDialog;
