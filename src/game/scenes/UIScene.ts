import {
  EVENT_DO_FITWICK_DELETE,
  EVENT_FITWICK_PICK_UP,
  EVENT_DO_FITWICK_PLACE,
  EVENT_DO_FITWICK_NEW,
  EVENT_MUSIC_CHANGE,
  EVENT_MUSIC_PLAY,
  EVENT_MUSIC_PAUSE,
  EVENT_VOLUME_CHANGE,
  EVENT_WORLD_CHANGE_BACKGROUND,
} from "../../api/events";
import AddDialog from "../components/AddDialog";
import BackgroundDialog from "../components/BackgroundDialog";
import Button from "../components/Button";
import Fitwick from "../components/Fitwick";
import ListDialog from "../components/ListDialog";
import SettingsDialog from "../components/SettingsDialog";
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
  FRAME_BUTTON_DELETE_REST,
  FRAME_BUTTON_DELETE_HOVER,
  FRAME_BUTTON_DELETE_CLICK,
  FRAME_BUTTON_LIST_REST,
  FRAME_BUTTON_LIST_HOVER,
  FRAME_BUTTON_LIST_CLICK,
  FRAME_BUTTON_SETTINGS_REST,
  FRAME_BUTTON_SETTINGS_HOVER,
  FRAME_BUTTON_SETTINGS_CLICK,
  MUSIC_TRACKS,
} from "../constants";
import RexScene from "./RexScene";

class UIScene extends RexScene {
  private backgroundDialog?: BackgroundDialog;
  private settingsDialog?: SettingsDialog;
  private listDialog?: ListDialog;
  private addDialog?: AddDialog;
  private isDialogOpen: boolean;
  private changeBackgroundButton!: Button;
  private settingsButton!: Button;
  private listButton!: Button;
  private addFitwickButton!: Button;
  private confirmFitwickButton!: Button;
  private deleteFitwickButton!: Button;

  private musicTrack!: Phaser.Sound.BaseSound;
  private musicTrackIndex!: number;
  private musicVolume: number;
  private isMusicPlaying!: boolean;

  constructor() {
    super({ key: "UIScene", active: false });
    this.isDialogOpen = false;
    this.musicVolume = 0.1;
  }

  create() {
    this.input.setTopOnly(false);
    this.createButtons();
    this.musicTrack = this.sound.add(MUSIC_TRACKS[0], {
      loop: true,
      volume: this.musicVolume,
    });
    this.musicTrackIndex = 0;
    this.musicTrack.play();
    this.isMusicPlaying = true;

    this.game.events.on(
      EVENT_DO_FITWICK_PLACE,
      this.onConfirmFitwick.bind(this)
    );
    this.game.events.on(
      EVENT_DO_FITWICK_DELETE,
      this.onDeleteFitwick.bind(this)
    );
    this.game.events.on(EVENT_FITWICK_PICK_UP, this.onMoveFitwick.bind(this));
    // this.events.on(EVENT_FITWICK_TAP, this.onTapFitwick.bind(this));
    this.game.events.on(EVENT_MUSIC_CHANGE, () => {
      this.musicTrackIndex++;
      this.musicTrackIndex %= MUSIC_TRACKS.length;
      this.musicTrack.destroy();
      this.musicTrack = this.sound.add(MUSIC_TRACKS[this.musicTrackIndex], {
        loop: true,
        volume: this.musicVolume,
      });
      this.isMusicPlaying = true;
      this.musicTrack.play();
    });
    this.game.events.on(EVENT_MUSIC_PLAY, () => {
      if (!this.isMusicPlaying) {
        this.musicTrack.play();
      }
      this.isMusicPlaying = true;
    });
    this.game.events.on(EVENT_MUSIC_PAUSE, () => {
      if (this.isMusicPlaying) {
        this.musicTrack.pause();
      }
      this.isMusicPlaying = false;
    });
    this.game.events.on(EVENT_VOLUME_CHANGE, (newVolume: number) => {
      this.sound.volume = newVolume;
    });
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
    this.settingsButton = new Button(
      this,
      GAME_WIDTH - 2 * UI_BUTTON_SIZE,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_SETTINGS_REST,
      FRAME_BUTTON_SETTINGS_HOVER,
      FRAME_BUTTON_SETTINGS_CLICK,
      this.onOpenSettings.bind(this)
    );
    this.listButton = new Button(
      this,
      GAME_WIDTH / 2 - UI_BUTTON_SIZE / 2,
      GAME_HEIGHT - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_LIST_REST,
      FRAME_BUTTON_LIST_HOVER,
      FRAME_BUTTON_LIST_CLICK,
      this.onListFitwicks.bind(this)
    );
    this.addFitwickButton = new Button(
      this,
      GAME_WIDTH / 2 + UI_BUTTON_SIZE / 2,
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
      () => this.game.events.emit(EVENT_DO_FITWICK_PLACE)
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
      () => this.game.events.emit(EVENT_DO_FITWICK_DELETE)
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
          this.game.events.emit(
            EVENT_WORLD_CHANGE_BACKGROUND,
            newBackgroundTexture
          );
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

  private onOpenSettings() {
    if (this.settingsDialog) {
      this.isDialogOpen = false;
      this.settingsDialog.hide();
      this.settingsDialog = undefined;
      return;
    }

    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    this.settingsDialog = new SettingsDialog(
      this,
      this.sound.volume,
      () => {
        this.settingsDialog!.hide();
        this.isDialogOpen = false;
        this.settingsDialog = undefined;
      },
      () => {
        this.settingsDialog!.hide();
        this.isDialogOpen = false;
        this.settingsDialog = undefined;
      }
    );
  }

  private onListFitwicks() {
    if (this.listDialog) {
      this.isDialogOpen = false;
      this.listDialog.hide();
      this.listDialog = undefined;
      return;
    }

    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    this.listDialog = new ListDialog(this);
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
          this.game.events.emit(EVENT_DO_FITWICK_NEW, text);
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
