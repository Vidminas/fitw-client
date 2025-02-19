import {
  Dialog,
  ScrollablePanel,
} from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { COLOR_MODAL_BACKGROUND, OPACITY_MODAL_BACKGROUND } from "../colors";

class ModalDialog extends Phaser.GameObjects.Group {
  protected dialog;

  constructor(scene: Phaser.Scene, dialog: ScrollablePanel | Dialog) {
    const background = scene.add.rectangle(
      0,
      0,
      scene.scale.width,
      scene.scale.height,
      COLOR_MODAL_BACKGROUND,
      OPACITY_MODAL_BACKGROUND
    );
    background.setOrigin(0, 0);
    background.setInteractive();
    background.on(
      "pointerdown",
      (
        pointer: Phaser.Input.Pointer,
        _localX: number,
        _localY: number,
        event: Phaser.Types.Input.EventData
      ) => {
        if (dialog.isInTouching()) {
          return;
        }
        event.stopPropagation();
        pointer.event.stopImmediatePropagation();
        pointer.event.stopPropagation();
        pointer.event.preventDefault();
        this.scene.input.stopPropagation();
        this.hide();
      }
    );
    background.on(
      "pointerup",
      (
        pointer: Phaser.Input.Pointer,
        _localX: number,
        _localY: number,
        event: Phaser.Types.Input.EventData
      ) => {
        // prevent any buttons under modal getting clicked
        // except none of them work
        // and they also break background selection
        // event.stopPropagation();
        // pointer.event.stopImmediatePropagation();
        // pointer.event.stopPropagation();
        // pointer.event.preventDefault();
        // this.scene.input.stopPropagation();
      }
    );

    super(scene);
    this.add(background);
    this.add(dialog);
    // because the background is created first, it should be below
    // but for some reason it goes above the dialog
    background.setDepth(1);
    dialog.setDepth(2);
    this.dialog = dialog;
  }

  public hide() {
    this.dialog.scaleDown(100);
    this.destroy(true);
  }
}

export default ModalDialog;
