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

  constructor() {
    super({ key: "UIScene", active: false });
  }

  create() {
    this.input.setTopOnly(false);
    this.createButtons();
  }

  private createButtons() {
    const changeBackgroundButton = new Button(
      this,
      GAME_WIDTH - 3 * UI_BUTTON_SIZE,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_SWITCH_REST,
      FRAME_BUTTON_SWITCH_HOVER,
      FRAME_BUTTON_SWITCH_CLICK,
      this.onChangeBackground.bind(this)
    );
    // changeBackgroundButton.setScrollFactor(0);
    const addFitwickButton = new Button(
      this,
      GAME_WIDTH / 2,
      GAME_HEIGHT - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_ADD_REST,
      FRAME_BUTTON_ADD_HOVER,
      FRAME_BUTTON_ADD_CLICK,
      this.onAddFitwick.bind(this)
    );
    // addFitwickButton.setScrollFactor(0);
  }

  private onChangeBackground() {
    if (this.backgroundDialog) {
      this.backgroundDialog.hide();
      this.backgroundDialog = undefined;
      return;
    }

    this.backgroundDialog = new BackgroundDialog(
      this,
      (newBackgroundTexture?: string) => {
        if (newBackgroundTexture) {
          this.registry.set("bgTexture", newBackgroundTexture);
        }
        this.backgroundDialog!.hide();
        this.backgroundDialog = undefined;
      },
      () => {
        this.backgroundDialog!.hide();
        this.backgroundDialog = undefined;
      }
    );
  }

  private onAddFitwick() {
    if (this.addDialog) {
      this.addDialog.hide();
      this.addDialog = undefined;
      return;
    }

    this.addDialog = new AddDialog(
      this,
      (text: string) => {
        if (Fitwick.exists(text)) {
          this.add.existing(new Fitwick(this, 400, 300, "buttons", text));
        }
        this.addDialog!.hide();
        this.addDialog = undefined;
      },
      () => {
        this.addDialog!.hide();
        this.addDialog = undefined;
      }
    );
  }
}

export default UIScene;
