import { Label } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import {
  TEXTURE_FITWICK_PLACEHOLDER,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import { FitwickConfig, lazyLoadAtlas } from "../fitwickLoader";
import RexScene from "../scenes/RexScene";

class FitwickListItem extends Label {
  static ITEM_ICON_WIDTH = UI_BUTTON_SIZE;
  static ITEM_TEXT_WIDTH = 2 * UI_BUTTON_SIZE;
  static ITEM_ICON_GAP = 3;
  static ITEM_PADDING_END = 0; //UI_BUTTON_SIZE - FitwickListItem.ITEM_ICON_GAP;
  static ITEM_WIDTH =
    FitwickListItem.ITEM_ICON_WIDTH +
    FitwickListItem.ITEM_TEXT_WIDTH +
    FitwickListItem.ITEM_ICON_GAP +
    FitwickListItem.ITEM_PADDING_END;
  static ITEM_HEIGHT = UI_BUTTON_SIZE;

  private fitwick: FitwickConfig;

  constructor(scene: RexScene, fitwick: FitwickConfig) {
    const icon = scene.add
      .image(0, 0, TEXTURE_FITWICK_PLACEHOLDER)
      .setDisplaySize(
        FitwickListItem.ITEM_ICON_WIDTH,
        FitwickListItem.ITEM_HEIGHT
      );

    const text = scene.add.text(0, 0, fitwick.name, {
      fontSize: UI_FONT_SIZE,
      wordWrap: {
        width: FitwickListItem.ITEM_TEXT_WIDTH,
      },
    });

    super(scene, {
      icon,
      text,
      space: {
        icon: FitwickListItem.ITEM_ICON_GAP,
        right: FitwickListItem.ITEM_PADDING_END,
      },
    });
    this.fitwick = fitwick;
    scene.add.existing(this);

    icon.setInteractive();
    icon.on("pointerdown", () => {
      this.loadImage();
      icon.removeListener("pointerdown");
      icon.removeInteractive();
    });
  }

  getIcon() {
    return this.getElement("icon") as Phaser.GameObjects.Image;
  }

  loadImage() {
    const firstTexture = this.fitwick.sprites[0][0];
    const firstFrame = this.fitwick.sprites[0][1];
    if (this.scene.textures.exists(firstTexture)) {
      this.getIcon()
        .setTexture(firstTexture, firstFrame)
        .setDisplaySize(
          FitwickListItem.ITEM_ICON_WIDTH,
          FitwickListItem.ITEM_HEIGHT
        );
    } else {
      lazyLoadAtlas(this.scene, firstTexture, () => {
        this.getIcon()
          .setTexture(firstTexture, firstFrame)
          .setDisplaySize(
            FitwickListItem.ITEM_ICON_WIDTH,
            FitwickListItem.ITEM_HEIGHT
          );
      });
    }
  }
}

export default FitwickListItem;
