import { Dialog } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { COLOR_ORANGE } from "../colors";
import {
  FRAME_BUTTON_CANCEL_CLICK,
  FRAME_BUTTON_CANCEL_HOVER,
  FRAME_BUTTON_CANCEL_REST,
  FRAME_BUTTON_CONFIRM_CLICK,
  FRAME_BUTTON_CONFIRM_HOVER,
  FRAME_BUTTON_CONFIRM_REST,
  FRAME_BUTTON_LEFT_CLICK,
  FRAME_BUTTON_LEFT_HOVER,
  FRAME_BUTTON_LEFT_REST,
  FRAME_BUTTON_RIGHT_CLICK,
  FRAME_BUTTON_RIGHT_HOVER,
  FRAME_BUTTON_RIGHT_REST,
  GAME_HEIGHT,
  GAME_WIDTH,
  TEXTURE_BUTTONS,
  UI_BUTTON_SIZE,
} from "../constants";
import UIScene from "../scenes/UIScene";
import BackgroundGallery from "./BackgroundGallery";
import Button from "./Button";

class BackgroundDialog extends Dialog {
  private confirmButton!: Button;
  private cancelButton!: Button;

  constructor(scene: UIScene, onConfirm: Function, onCancel: Function) {
    const minWidth = GAME_WIDTH - 4 * UI_BUTTON_SIZE;
    const minHeight = GAME_HEIGHT - 4 * UI_BUTTON_SIZE;
    super(scene, {
      background: scene.rexUI.add.roundRectangle(
        0,
        0,
        minWidth,
        minHeight,
        20,
        COLOR_ORANGE
      ),
      actions: [],
      content: new BackgroundGallery(scene),
    });

    this.createButtons(scene, onConfirm, onCancel);
    this.addAction(this.confirmButton);
    this.addAction(this.cancelButton);

    this.layout();
    this.setAnchor({
      centerX: "center",
      centerY: "center",
    });
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
