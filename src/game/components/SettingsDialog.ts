import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components.js";
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
    text: scene.add.text(0, 0, "Settings:", {
      fontSize: UI_FONT_SIZE,
    }),
    space: {
      left: 15,
      right: 15,
      top: 10,
      bottom: 10,
    },
  });

const createSettingsGrid = (scene: RexScene) => {
  const grid = scene.rexUI.add.gridSizer({
    column: 1,
    row: 5,
  });

  grid.add(scene.add.text(0, 0, "Volume: 999%"));
  return grid;
};

const createPanel = (scene: RexScene) => {
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

  return scene.rexUI.add.dialog({
    content: createSettingsGrid(scene),
    actions: [confirmButton, cancelButton],
  });
};

class SettingsDialog extends ScrollablePanel {
  constructor(scene: RexScene) {
    super(scene, {
      x: 0,
      y: 0,
      anchor: {
        centerX: "center",
        centerY: "center",
      },
      width: GAME_WIDTH - 4 * UI_BUTTON_SIZE,
      height: GAME_HEIGHT - 4 * UI_BUTTON_SIZE,
      scrollMode: "vertical",
      background: scene.rexUI.add.roundRectangle(
        0,
        0,
        2,
        2,
        10,
        COLOR_DIALOG_BACKGROUND
      ),
      header: createTitle(scene),
      panel: {
        child: createPanel(scene),
        mask: { padding: 1 },
      },
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        panel: 10,
      },
    });
    this.layout();
    this.popUp(500);
    scene.add.existing(this);
    this.setInteractive();
    this.on(
      "wheel",
      (
        _pointer: Phaser.Input.Pointer,
        _deltaX: number,
        deltaY: number,
        _deltaZ: number
      ) => {
        let newScrollValue = this.childOY - deltaY;
        if (newScrollValue < this.bottomChildOY) {
          newScrollValue = this.bottomChildOY;
        } else if (newScrollValue > this.topChildOY) {
          newScrollValue = this.topChildOY;
        }
        this.setChildOY(newScrollValue);
      }
    );
  }

  public hide() {
    this.scaleDownDestroy(100);
  }
}

export default SettingsDialog;
