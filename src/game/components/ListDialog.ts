import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { COLOR_DIALOG_BACKGROUND, COLOR_DIALOG_FOREGROUND } from "../colors";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  TEXTURE_KENNEY_ASSETS,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import FITWICKS from "../fitwicks";
import RexScene from "../scenes/RexScene";

const createFitwickList = (scene: RexScene, width: number, height: number) => {
  const columns = Math.floor(width / (UI_BUTTON_SIZE * 3));
  const rows = Math.ceil(FITWICKS.size / columns);

  const sizer = scene.rexUI.add.gridSizer({
    width,
    height,
    column: columns,
    row: rows,
    space: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
      column: 8,
      row: 8,
    },
  });

  FITWICKS.forEach((textures: string[], name: string) => {
    const fitwickRow = scene.rexUI.add.label({
      icon: scene.add
        .image(0, 0, TEXTURE_KENNEY_ASSETS, textures[0])
        .setDisplaySize(UI_BUTTON_SIZE, UI_BUTTON_SIZE),
      text: scene.add.text(0, 0, name, {
        fontSize: UI_FONT_SIZE,
        wordWrap: {
          width: UI_BUTTON_SIZE * 2,
        },
      }),
      space: { icon: 3 },
    });
    sizer.add(fitwickRow);
  });

  return sizer;
};

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
    text: scene.add.text(0, 0, "All game objects:", {
      fontSize: UI_FONT_SIZE,
    }),
    space: {
      left: 15,
      right: 15,
      top: 10,
      bottom: 10,
    },
  });

class ListDialog extends ScrollablePanel {
  constructor(scene: RexScene) {
    // this first takes the width of the whole game and leaves space of two buttons on either side
    // then it divdes the panel width into how many fitwicks fit on one row
    // (each fitwick is the size of 3 buttons)
    // then it gets the floor of that and multiplies by the fitwick width
    // to get rid of the unnecessary space
    // and finally adds 20 for padding
    const width =
      Math.floor((GAME_WIDTH - UI_BUTTON_SIZE * 4) / (UI_BUTTON_SIZE * 3)) *
        (UI_BUTTON_SIZE * 3) +
      20;
    const height = GAME_HEIGHT - UI_BUTTON_SIZE * 4;
    super(scene, {
      x: 0,
      y: 0,
      anchor: {
        centerX: "center",
        centerY: "center",
      },
      width,
      height,
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
        child: createFitwickList(scene, width - 20, height),
        mask: { padding: 1 },
      },
      slider: true,
      scroller: true,
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

export default ListDialog;
