import AddDialog from "../components/AddDialog";
import BackgroundDialog from "../components/BackgroundDialog";
import Button from "../components/Button";
import Fitwick from "../components/Fitwick";
import createSpeechBubble from "../components/SpeechBubble";
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
  FRAME_BUTTON_CONFIRM_REST,
  FRAME_BUTTON_CONFIRM_HOVER,
  FRAME_BUTTON_CONFIRM_CLICK,
  EVENT_FITWICK_PLACE,
  EVENT_FITWICK_NEW,
  FRAME_BUTTON_DELETE_REST,
  FRAME_BUTTON_DELETE_HOVER,
  FRAME_BUTTON_DELETE_CLICK,
  EVENT_FITWICK_DELETE,
  EVENT_FITWICK_MOVE,
  EVENT_FITWICK_TAP,
} from "../constants";
import RexScene from "./RexScene";

class UIScene extends RexScene {
  private backgroundDialog?: BackgroundDialog;
  private addDialog?: AddDialog;
  private isDialogOpen: boolean;
  private changeBackgroundButton!: Button;
  private addFitwickButton!: Button;
  private confirmFitwickButton!: Button;
  private deleteFitwickButton!: Button;

  constructor() {
    super({ key: "UIScene", active: false });
    this.isDialogOpen = false;
  }

  create() {
    this.input.setTopOnly(false);
    this.createButtons();

    this.events.on(EVENT_FITWICK_PLACE, this.onConfirmFitwick.bind(this));
    this.events.on(EVENT_FITWICK_DELETE, this.onDeleteFitwick.bind(this));
    this.events.on(EVENT_FITWICK_MOVE, this.onMoveFitwick.bind(this));
    // this.events.on(EVENT_FITWICK_TAP, this.onTapFitwick.bind(this));
  }

  private createButtons() {
    this.changeBackgroundButton = new Button(
      this,
      GAME_WIDTH - 3 * UI_BUTTON_SIZE,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_SWITCH_REST,
      FRAME_BUTTON_SWITCH_HOVER,
      FRAME_BUTTON_SWITCH_CLICK,
      this.onChangeBackground.bind(this)
    );
    this.addFitwickButton = new Button(
      this,
      GAME_WIDTH / 2,
      GAME_HEIGHT - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_ADD_REST,
      FRAME_BUTTON_ADD_HOVER,
      FRAME_BUTTON_ADD_CLICK,
      this.onAddFitwick.bind(this)
    );
    this.confirmFitwickButton = new Button(
      this,
      GAME_WIDTH / 2 + UI_BUTTON_SIZE / 2,
      GAME_HEIGHT - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_CONFIRM_REST,
      FRAME_BUTTON_CONFIRM_HOVER,
      FRAME_BUTTON_CONFIRM_CLICK,
      () => this.events.emit(EVENT_FITWICK_PLACE)
    );
    this.confirmFitwickButton.setVisible(false);
    this.deleteFitwickButton = new Button(
      this,
      GAME_WIDTH / 2 - UI_BUTTON_SIZE / 2,
      GAME_HEIGHT - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_DELETE_REST,
      FRAME_BUTTON_DELETE_HOVER,
      FRAME_BUTTON_DELETE_CLICK,
      () => this.events.emit(EVENT_FITWICK_DELETE)
    );
    this.deleteFitwickButton.setVisible(false);
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
          // let the main scene handle the addition of a new Fitwick
          this.events.emit(EVENT_FITWICK_NEW, text);
          this.isDialogOpen = false;
          this.addDialog!.hide();
          this.addDialog = undefined;
          this.onMoveFitwick();
        } else {
          this.addDialog!.showError(text);
        }
      },
      () => {
        this.isDialogOpen = false;
        this.addDialog!.hide();
        this.addDialog = undefined;
      }
    );
  }

  private onConfirmFitwick() {
    this.confirmFitwickButton.setVisible(false);
    this.deleteFitwickButton.setVisible(false);
    this.addFitwickButton.setVisible(true);
  }

  private onDeleteFitwick() {
    this.confirmFitwickButton.setVisible(false);
    this.deleteFitwickButton.setVisible(false);
    this.addFitwickButton.setVisible(true);
  }

  private onMoveFitwick() {
    this.confirmFitwickButton.setVisible(true);
    this.deleteFitwickButton.setVisible(true);
    this.addFitwickButton.setVisible(false);
  }
}

export default UIScene;
