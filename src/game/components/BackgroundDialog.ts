import { Dialog } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { COLOR_DIALOG_BACKGROUND, COLOR_DIALOG_FOREGROUND } from "../colors";
import {
  FRAME_BUTTON_CANCEL_CLICK,
  FRAME_BUTTON_CANCEL_HOVER,
  FRAME_BUTTON_CANCEL_REST,
  FRAME_BUTTON_CONFIRM_CLICK,
  FRAME_BUTTON_CONFIRM_HOVER,
  FRAME_BUTTON_CONFIRM_REST,
  TEXTURE_BUTTONS,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import RexScene from "../scenes/RexScene";
import BackgroundGallery from "./BackgroundGallery";
import Button from "./Button";
import ModalDialog from "./ModalDialog";

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

class BackgroundDialog extends ModalDialog {
  constructor(scene: RexScene, onConfirm: Function, onCancel: Function) {
    const minWidth = scene.scale.width - 4 * UI_BUTTON_SIZE;
    const minHeight = scene.scale.height - 4 * UI_BUTTON_SIZE;

    const dialog = new Dialog(scene, {
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

    dialog.addAction(
      new Button(
        scene,
        0,
        0,
        TEXTURE_BUTTONS,
        FRAME_BUTTON_CONFIRM_REST,
        FRAME_BUTTON_CONFIRM_HOVER,
        FRAME_BUTTON_CONFIRM_CLICK,
        () =>
          onConfirm(
            (dialog.getElement("content") as BackgroundGallery)
              .newBackgroundTexture
          )
      )
    );
    dialog.addAction(
      new Button(
        scene,
        0,
        0,
        TEXTURE_BUTTONS,
        FRAME_BUTTON_CANCEL_REST,
        FRAME_BUTTON_CANCEL_HOVER,
        FRAME_BUTTON_CANCEL_CLICK,
        () => onCancel()
      )
    );

    dialog.layout();
    dialog.pushIntoBounds();
    dialog.popUp(500);
    scene.add.existing(dialog);
    super(scene, dialog);
  }
}

export default BackgroundDialog;
