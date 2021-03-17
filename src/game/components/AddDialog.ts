import { findBestMatch } from "string-similarity";
import InputText from "phaser3-rex-plugins/plugins/inputtext.js";
import { EVENT_MESSAGE } from "../../api/events";
import {
  COLOR_DIALOG_BACKGROUND,
  COLOR_DIALOG_FOREGROUND,
  COLOR_STRING_DARK_GREY,
  COLOR_STRING_WHITE,
} from "../colors";
import {
  FRAME_BUTTON_CANCEL_CLICK,
  FRAME_BUTTON_CANCEL_HOVER,
  FRAME_BUTTON_CANCEL_REST,
  FRAME_BUTTON_CONFIRM_CLICK,
  FRAME_BUTTON_CONFIRM_HOVER,
  FRAME_BUTTON_CONFIRM_REST,
  GAME_HEIGHT,
  TEXTURE_BUTTONS,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import { FITWICKS } from "../fitwicks";
import RexScene from "../scenes/RexScene";
import Button from "./Button";
import ModalDialog from "./ModalDialog";

const FITWICK_NAMES = Array.from(FITWICKS.keys());

class AddDialog extends ModalDialog {
  constructor(scene: RexScene, onConfirm: Function, onCancel: Function) {
    const width = 4 * UI_BUTTON_SIZE;
    const height = Math.min(2.5 * UI_BUTTON_SIZE, GAME_HEIGHT);
    const background = scene.rexUI.add.roundRectangle(
      0,
      0,
      width,
      100,
      20,
      COLOR_DIALOG_BACKGROUND
    );
    const title = scene.rexUI.add.label({
      background: scene.rexUI.add.roundRectangle(
        0,
        0,
        width,
        40,
        20,
        COLOR_DIALOG_FOREGROUND
      ),
      text: scene.add.text(0, 0, "Add to world:", {
        fontSize: UI_FONT_SIZE,
      }),
      space: {
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
      },
    });

    const inputBoxPadding = 20;
    const inputBoxHeight = 60;

    const inputBox = new InputText(
      scene,
      0,
      0,
      width - inputBoxPadding,
      inputBoxHeight,
      {
        color: COLOR_STRING_WHITE,
        backgroundColor: COLOR_STRING_DARK_GREY,
        fontSize: UI_FONT_SIZE,
        placeholder: "Type in something",
        valign: "center",
      }
    );
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
        onConfirm(inputBox.text);
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
        onCancel();
      }
    );

    const dialog = scene.rexUI.add
      .dialog({
        x: 0,
        y: 0,
        width,
        height,
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
          top: 10,
          title: 20,
          content: 20,
          action: 5,
          left: 10,
          right: 10,
          bottom: 10,
        },
      })
      .layout()
      .pushIntoBounds()
      .popUp(500);

    super(scene, dialog);
  }

  public showError(inputName: string) {
    const bestMatch = findBestMatch(inputName, FITWICK_NAMES).bestMatch;
    console.log(
      `"${inputName}" unknown, the closest match is "${bestMatch.target}" with rating ${bestMatch.rating}`
    );

    if (bestMatch.rating > 0.2) {
      this.scene.game.events.emit(
        EVENT_MESSAGE,
        "warning",
        `Unknown object "${inputName}". Did you mean "${bestMatch.target}"?`
      );
    } else {
      this.scene.game.events.emit(
        EVENT_MESSAGE,
        "warning",
        `Unknown object "${inputName}". Check the list of all game objects to see if it exists in the game.`
      );
    }
  }
}

export default AddDialog;
