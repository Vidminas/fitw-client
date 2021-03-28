import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { COLOR_DIALOG_BACKGROUND, COLOR_DIALOG_FOREGROUND } from "../colors";
import {
  CONFIG_FITWICKS,
  FRAME_BUTTON_CANCEL_CLICK,
  FRAME_BUTTON_CANCEL_HOVER,
  FRAME_BUTTON_CANCEL_REST,
  TEXTURE_BUTTONS,
  UI_BIG_FONT_SIZE,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import { FitwickConfigSection } from "../fitwickLoader";
import RexScene from "../scenes/RexScene";
import Button from "./Button";
import ModalDialog from "./ModalDialog";

const FITWICK_ITEM_SIZE = UI_BUTTON_SIZE * 4;
const FITWICK_ITEM_SPACE = 8;

const createFitwickList = (scene: RexScene, width: number, height: number) => {
  const fitwickConfig = scene.cache.json.get(CONFIG_FITWICKS) as
    | FitwickConfigSection
    | undefined;

  const columns =
    Math.floor(width / (FITWICK_ITEM_SIZE + FITWICK_ITEM_SPACE)) + 1;
  const rows = fitwickConfig
    ? Math.ceil(fitwickConfig.fitwicks.length / columns) + 1
    : 3;

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
      column: FITWICK_ITEM_SPACE,
      row: FITWICK_ITEM_SPACE,
    },
  });

  fitwickConfig?.fitwicks.forEach((fitwick) => {
    const firstTexture = fitwick.sprites[0][0];
    const firstFrame = fitwick.sprites[0][1];
    const fitwickRow = scene.rexUI.add.label({
      icon: scene.add
        .image(0, 0, firstTexture, firstFrame)
        .setDisplaySize(UI_BUTTON_SIZE, UI_BUTTON_SIZE),
      text: scene.add.text(0, 0, fitwick.name, {
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

const createTitle = (scene: RexScene, dialogWidth: number, hide: Function) => {
  const titleBackground = scene.rexUI.add.roundRectangle(
    0,
    0,
    100,
    40,
    20,
    COLOR_DIALOG_FOREGROUND
  );
  const titleText = scene.add.text(0, 0, "All game objects:", {
    fontSize: UI_BIG_FONT_SIZE,
  });
  const titleWidth = titleText.getBounds().width;
  return scene.rexUI.add.label({
    background: titleBackground,
    text: titleText,
    action: new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_CANCEL_REST,
      FRAME_BUTTON_CANCEL_HOVER,
      FRAME_BUTTON_CANCEL_CLICK,
      hide
    ),
    space: {
      left: 15,
      right: 15,
      top: 10,
      bottom: 10,
      // -30 is left+right space
      text: dialogWidth - titleWidth - UI_BUTTON_SIZE - 30,
    },
  });
};

class ListDialog extends ModalDialog {
  constructor(scene: RexScene) {
    const baseWidth = Math.max(
      scene.scale.width - 4 * UI_BUTTON_SIZE,
      Math.min(4 * UI_BUTTON_SIZE, scene.scale.width)
    );
    // this divides the panel width into how many fitwicks fit on one row
    const width =
      baseWidth - (baseWidth % (FITWICK_ITEM_SIZE + FITWICK_ITEM_SPACE)) + 20;
    const height = Math.max(
      scene.scale.height * 0.75,
      Math.min(4 * UI_BUTTON_SIZE, scene.scale.height)
    );
    const scrollablePanel = new ScrollablePanel(scene, {
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
      header: createTitle(scene, width, () => this.hide()),
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
    scrollablePanel.layout();
    scrollablePanel.popUp(500);
    scrollablePanel.setInteractive();
    scrollablePanel.on(
      "wheel",
      (
        _pointer: Phaser.Input.Pointer,
        _deltaX: number,
        deltaY: number,
        _deltaZ: number
      ) => {
        let newScrollValue = scrollablePanel.childOY - deltaY;
        if (newScrollValue < scrollablePanel.bottomChildOY) {
          newScrollValue = scrollablePanel.bottomChildOY;
        } else if (newScrollValue > scrollablePanel.topChildOY) {
          newScrollValue = scrollablePanel.topChildOY;
        }
        scrollablePanel.setChildOY(newScrollValue);
      }
    );
    scene.add.existing(scrollablePanel);

    super(scene, scrollablePanel);
  }
}

export default ListDialog;
