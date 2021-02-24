import AddDialog from "../components/AddDialog";
import BackgroundDialog from "../components/BackgroundDialog";
import Button from "../components/Button";
import Fitwick from "../components/Fitwick";
import {
  GAME_WIDTH,
  UI_BUTTON_SIZE,
  TEXTURE_BUTTONS,
  FRAME_BUTTON_SWITCH_REST,
  FRAME_BUTTON_SWITCH_HOVER,
  FRAME_BUTTON_SWITCH_CLICK,
  GAME_HEIGHT,
  FRAME_BUTTON_ADD_REST,
  FRAME_BUTTON_ADD_HOVER,
  FRAME_BUTTON_ADD_CLICK,
} from "../constants";
import RexScene from "./RexScene";

class UIScene extends RexScene {
  private backgroundDialog?: BackgroundDialog;
  private addDialog?: AddDialog;
  private isDialogOpen: boolean;

  constructor() {
    super({ key: "UIScene", active: false });
    this.isDialogOpen = false;
  }

  create() {
    this.input.setTopOnly(false);
    this.createButtons();
  }

  private createButtons() {
    /* const changeBackgroundButton = */ new Button(
      this,
      GAME_WIDTH - 3 * UI_BUTTON_SIZE,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_SWITCH_REST,
      FRAME_BUTTON_SWITCH_HOVER,
      FRAME_BUTTON_SWITCH_CLICK,
      this.onChangeBackground.bind(this)
    );
    /* const addFitwickButton = */ new Button(
      this,
      GAME_WIDTH / 2,
      GAME_HEIGHT - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_ADD_REST,
      FRAME_BUTTON_ADD_HOVER,
      FRAME_BUTTON_ADD_CLICK,
      this.onAddFitwick.bind(this)
    );
  }

  private onChangeBackground() {
    if (this.backgroundDialog) {
      this.isDialogOpen = false;
      this.backgroundDialog.hide();
      this.backgroundDialog = undefined;
      return;
    }

    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    this.backgroundDialog = new BackgroundDialog(
      this,
      (newBackgroundTexture?: string) => {
        if (newBackgroundTexture) {
          this.registry.set("bgTexture", newBackgroundTexture);
        }
        this.isDialogOpen = false;
        this.backgroundDialog!.hide();
        this.backgroundDialog = undefined;
      },
      () => {
        this.isDialogOpen = false;
        this.backgroundDialog!.hide();
        this.backgroundDialog = undefined;
      }
    );
  }

  private onAddFitwick() {
    if (this.addDialog) {
      this.isDialogOpen = false;
      this.addDialog.hide();
      this.addDialog = undefined;
      return;
    }

    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    this.addDialog = new AddDialog(
      this,
      (text: string) => {
        if (Fitwick.exists(text)) {
          const mainScene: Phaser.Scene = this.scene.get("MainScene");
          mainScene.add.existing(new Fitwick(mainScene, 400, 300, text));
        }
        this.isDialogOpen = false;
        this.addDialog!.hide();
        this.addDialog = undefined;
      },
      () => {
        this.isDialogOpen = false;
        this.addDialog!.hide();
        this.addDialog = undefined;
      }
    );
  }
}

export default UIScene;
