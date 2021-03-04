import InputText from "phaser3-rex-plugins/plugins/inputtext.js";
import { COLOR_ORANGE } from "../colors";
import {
  FRAME_BUTTON_CANCEL_CLICK,
  FRAME_BUTTON_CANCEL_HOVER,
  FRAME_BUTTON_CANCEL_REST,
  FRAME_BUTTON_CONFIRM_CLICK,
  FRAME_BUTTON_CONFIRM_HOVER,
  FRAME_BUTTON_CONFIRM_REST,
  TEXTURE_BUTTONS,
} from "../constants";
import { RexScene } from "../scenes/RexScene";
import Button from "./Button";

class AddDialog {
  private rexDialog: any;

  constructor(scene: RexScene, onConfirm: Function, onCancel: Function) {
    const background = scene.rexUI.add.roundRectangle(
      0,
      0,
      100,
      100,
      20,
      COLOR_ORANGE
    );
    const title = scene.rexUI.add.label({
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xbc5100),
      text: scene.add.text(0, 0, "Add to world:", {
        fontSize: "20px",
      }),
      space: {
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
      },
    });
    const inputBox = new InputText(scene, 0, 0, 400, 60, {
      color: "white",
      fontSize: "24px",
      placeholder: "Type in something",
      backgroundColor: "#333333",
      valign: "center",
    });
    inputBox.setStyle("border-radius", "25px");
    scene.add.existing(inputBox);

    const confirmButton = new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_CONFIRM_REST,
      FRAME_BUTTON_CONFIRM_HOVER,
      FRAME_BUTTON_CONFIRM_CLICK,
      () => {
        console.log("confirm");
      }
    );
    const cancelButton = new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_CANCEL_REST,
      FRAME_BUTTON_CANCEL_HOVER,
      FRAME_BUTTON_CANCEL_CLICK,
      () => {
        console.log("cancelled");
      }
    );

    this.rexDialog = scene.rexUI.add
      .dialog({
        x: 0,
        y: 0,
        anchor: {
          centerX: "center",
          centerY: "center",
        },
        background,
        title,
        content: inputBox,
        actions: [cancelButton, confirmButton],
        actionsAlign: "left",
        space: {
          title: 20,
          content: 20,
          action: 5,
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      })
      .layout()
      .pushIntoBounds()
      .popUp(500);

    this.rexDialog.on(
      "button.click",
      (button: Button, groupName: string, index: number) => {
        if (button === confirmButton) {
          onConfirm(inputBox.text);
        } else {
          onCancel();
        }
      }
    );
  }

  public hide() {
    this.rexDialog.scaleDownDestroy(100);
  }

  public showError(fitwickText: string) {
    console.log(`${fitwickText} unknown!`);
  }
}

export default AddDialog;
