import {
  EVENT_DO_FITWICK_DELETE,
  EVENT_FITWICK_PICK_UP,
  EVENT_DO_FITWICK_PLACE,
  EVENT_DO_FITWICK_NEW,
  EVENT_MUSIC_CHANGE,
  EVENT_MUSIC_PLAY,
  EVENT_MUSIC_PAUSE,
  EVENT_VOLUME_CHANGE,
} from "../../api/events";
import Button from "../components/Button";
import {
  UI_BUTTON_SIZE,
  TEXTURE_BUTTONS,
  FRAME_BUTTON_SWITCH_REST,
  FRAME_BUTTON_SWITCH_HOVER,
  FRAME_BUTTON_SWITCH_CLICK,
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
import {
  LOCAL_EVENT_OPEN_ADD_FITWICK_DIALOG,
  LOCAL_EVENT_OPEN_BACKGROUND_DIALOG,
  LOCAL_EVENT_OPEN_FITWICK_LIST,
  LOCAL_EVENT_OPEN_SETTINGS_DIALOG,
} from "../localEvents";
import RexScene from "./RexScene";

class GUIScene extends RexScene {
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
    super({ key: "GUIScene", active: false });
    this.musicVolume = 0.1;
  }

  create() {
    this.createButtons();
    this.musicTrack = this.sound.add(MUSIC_TRACKS[0], {
      loop: true,
      volume: this.musicVolume,
    });
    this.musicTrackIndex = 0;

    if (!this.sound.locked) {
      // already unlocked so play
      this.musicTrack.play();
      this.isMusicPlaying = true;
    } else {
      // wait for 'unlocked' to fire and then play
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.musicTrack.play();
        this.isMusicPlaying = true;
      });
    }

    this.game.events.on(
      EVENT_DO_FITWICK_PLACE,
      this.onConfirmFitwick.bind(this)
    );
    this.game.events.on(
      EVENT_DO_FITWICK_DELETE,
      this.onDeleteFitwick.bind(this)
    );
    this.game.events.on(EVENT_DO_FITWICK_NEW, this.onMoveFitwick.bind(this));
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
    const modalScene = this.scene.get("ModalScene");

    this.changeBackgroundButton = new Button(
      this,
      this.scale.width - 2 * UI_BUTTON_SIZE,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_SWITCH_REST,
      FRAME_BUTTON_SWITCH_HOVER,
      FRAME_BUTTON_SWITCH_CLICK,
      () => modalScene.events.emit(LOCAL_EVENT_OPEN_BACKGROUND_DIALOG)
    );
    this.settingsButton = new Button(
      this,
      this.scale.width - 1 * UI_BUTTON_SIZE,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_SETTINGS_REST,
      FRAME_BUTTON_SETTINGS_HOVER,
      FRAME_BUTTON_SETTINGS_CLICK,
      () =>
        modalScene.events.emit(
          LOCAL_EVENT_OPEN_SETTINGS_DIALOG,
          this.sound.volume
        )
    );
    this.listButton = new Button(
      this,
      this.scale.width / 2 - UI_BUTTON_SIZE / 2,
      this.scale.height - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_LIST_REST,
      FRAME_BUTTON_LIST_HOVER,
      FRAME_BUTTON_LIST_CLICK,
      () => modalScene.events.emit(LOCAL_EVENT_OPEN_FITWICK_LIST)
    );
    this.addFitwickButton = new Button(
      this,
      this.scale.width / 2 + UI_BUTTON_SIZE / 2,
      this.scale.height - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_ADD_REST,
      FRAME_BUTTON_ADD_HOVER,
      FRAME_BUTTON_ADD_CLICK,
      () => modalScene.events.emit(LOCAL_EVENT_OPEN_ADD_FITWICK_DIALOG)
    );
    this.confirmFitwickButton = new Button(
      this,
      this.scale.width / 2 + UI_BUTTON_SIZE / 2,
      this.scale.height - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_CONFIRM_REST,
      FRAME_BUTTON_CONFIRM_HOVER,
      FRAME_BUTTON_CONFIRM_CLICK,
      // false -> not external event
      () => this.game.events.emit(EVENT_DO_FITWICK_PLACE, false)
    );
    this.confirmFitwickButton.setVisible(false);
    this.deleteFitwickButton = new Button(
      this,
      this.scale.width / 2 - UI_BUTTON_SIZE / 2,
      this.scale.height - UI_BUTTON_SIZE,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_DELETE_REST,
      FRAME_BUTTON_DELETE_HOVER,
      FRAME_BUTTON_DELETE_CLICK,
      // false -> not external event
      () => this.game.events.emit(EVENT_DO_FITWICK_DELETE, false)
    );
    this.deleteFitwickButton.setVisible(false);
  }

  private onConfirmFitwick(external: boolean) {
    if (!external) {
      this.confirmFitwickButton.setVisible(false);
      this.deleteFitwickButton.setVisible(false);
      this.addFitwickButton.setVisible(true);
    }
  }

  private onDeleteFitwick(external: boolean) {
    if (!external) {
      this.confirmFitwickButton.setVisible(false);
      this.deleteFitwickButton.setVisible(false);
      this.addFitwickButton.setVisible(true);
    }
  }

  private onMoveFitwick(external: boolean) {
    if (!external) {
      this.confirmFitwickButton.setVisible(true);
      this.deleteFitwickButton.setVisible(true);
      this.addFitwickButton.setVisible(false);
    }
  }
}

export default GUIScene;
