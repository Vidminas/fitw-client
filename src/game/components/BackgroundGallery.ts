import { OverlapSizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { COLOR_WHITE, COLOR_YELLOW } from "../colors";
import {
  TEXTURE_BUTTONS,
  FRAME_BUTTON_LEFT_REST,
  FRAME_BUTTON_LEFT_HOVER,
  FRAME_BUTTON_LEFT_CLICK,
  FRAME_BUTTON_RIGHT_REST,
  FRAME_BUTTON_RIGHT_HOVER,
  FRAME_BUTTON_RIGHT_CLICK,
  UI_BUTTON_SIZE,
  GAME_WIDTH,
  BACKGROUND_TEXTURES,
  REGISTRY_BACKGROUND_TEXTURE,
} from "../constants";
import RexScene from "../scenes/RexScene";
import Button from "./Button";

class BackgroundGallery extends OverlapSizer {
  private leftButton!: Button;
  private rightButton!: Button;
  private backgrounds!: Phaser.GameObjects.Image[];
  public newBackgroundTexture?: string;

  constructor(scene: RexScene) {
    const width = GAME_WIDTH - 4 * UI_BUTTON_SIZE;
    const height = 4 * UI_BUTTON_SIZE;
    const bgSize = 4 * UI_BUTTON_SIZE;

    super(scene, 0, 0, width, height, {
      background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_WHITE),
    });

    this.createBackgrounds(scene, bgSize);
    const bgButtons = scene.rexUI.add.buttons({
      orientation: "horizontal",
      space: { item: 10 },
      buttons: this.backgrounds.slice(),
      expand: false,
      type: "radio",
      setValueCallback: (
        button: any, // rexUI label
        value: boolean
      ) => {
        button
          .getElement("icon")
          .setFillStyle(value ? COLOR_YELLOW : undefined);
        if (value) {
          this.newBackgroundTexture = button.name;
        }
      },
    });
    bgButtons.value = scene.registry.get(REGISTRY_BACKGROUND_TEXTURE);

    const panel = scene.rexUI.add
      .scrollablePanel({
        x: 0,
        y: 0,
        width,
        height,
        scrollMode: "horizontal",
        panel: {
          child: bgButtons,
          mask: {
            padding: 1,
          },
        },
        scroller: {
          threshold: 10,
          slidingDeceleration: 5000,
          backDeceleration: 2000,
        },
        space: {
          top: UI_BUTTON_SIZE,
          bottom: UI_BUTTON_SIZE / 2,
        },
      })
      .layout();

    panel.setInteractive();
    panel.on(
      "wheel",
      (
        _pointer: Phaser.Input.Pointer,
        deltaX: number,
        _deltaY: number,
        _deltaZ: number
      ) => {
        let newScrollValue = panel.childOY - deltaX;
        if (newScrollValue < panel.bottomChildOY) {
          newScrollValue = panel.bottomChildOY;
        } else if (newScrollValue > panel.topChildOY) {
          newScrollValue = panel.topChildOY;
        }
        panel.setChildOY(newScrollValue);
      }
    );

    this.add(panel);

    this.createButtons(scene);
    this.add(
      this.leftButton,
      "left",
      "left",
      { top: 0, bottom: 0, left: 0, right: UI_BUTTON_SIZE },
      false
    );
    this.leftButton.onClick(() => {
      // scroll left by 25% (until 0%)
      panel.setT(0 >= panel.t - 0.25 ? 0 : panel.t - 0.25);
    });
    this.add(
      this.rightButton,
      "right",
      "right",
      { top: 0, bottom: 0, left: UI_BUTTON_SIZE, right: 0 },
      false
    );
    this.rightButton.onClick(() => {
      // scroll right by 25% (until 100%)
      panel.setT(1 <= panel.t + 0.25 ? 1 : panel.t + 0.25);
    });
    this.layout();

    scene.add.existing(this);
  }

  private createButtons(scene: RexScene) {
    this.leftButton = new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_LEFT_REST,
      FRAME_BUTTON_LEFT_HOVER,
      FRAME_BUTTON_LEFT_CLICK
    );
    this.rightButton = new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_RIGHT_REST,
      FRAME_BUTTON_RIGHT_HOVER,
      FRAME_BUTTON_RIGHT_CLICK
    );
  }

  private createBackgrounds(scene: RexScene, bgSize: number) {
    this.backgrounds = BACKGROUND_TEXTURES.map((texture) =>
      scene.rexUI.add.label({
        name: texture,
        width: bgSize,
        height: bgSize,
        orientation: "vertical",
        align: "bottom",
        background: scene.add.image(0, 0, texture),
        icon: scene.add.star(0, 0, 5, 15, 30).setStrokeStyle(1, COLOR_WHITE),
      })
    );
  }
}

export default BackgroundGallery;
