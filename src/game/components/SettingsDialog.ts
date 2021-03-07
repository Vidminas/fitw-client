import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { COLOR_DIALOG_BACKGROUND, COLOR_DIALOG_FOREGROUND } from "../colors";
import {
  EVENT_MUSIC_CHANGE,
  EVENT_MUSIC_PAUSE,
  EVENT_MUSIC_PLAY,
  FRAME_BUTTON_CANCEL_CLICK,
  FRAME_BUTTON_CANCEL_HOVER,
  FRAME_BUTTON_CANCEL_REST,
  FRAME_BUTTON_CONFIRM_CLICK,
  FRAME_BUTTON_CONFIRM_HOVER,
  FRAME_BUTTON_CONFIRM_REST,
  FRAME_BUTTON_NOTE_CLICK,
  FRAME_BUTTON_NOTE_HOVER,
  FRAME_BUTTON_NOTE_REST,
  FRAME_BUTTON_PAUSE_CLICK,
  FRAME_BUTTON_PAUSE_HOVER,
  FRAME_BUTTON_PAUSE_REST,
  FRAME_BUTTON_PLAY_CLICK,
  FRAME_BUTTON_PLAY_HOVER,
  FRAME_BUTTON_PLAY_REST,
  GAME_HEIGHT,
  GAME_WIDTH,
  TEXTURE_BUTTONS,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import RexScene from "../scenes/RexScene";
import Button from "./Button";

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
    text: scene.add.text(0, 0, "Settings:", {
      fontSize: UI_FONT_SIZE,
    }),
    space: {
      left: 15,
      right: 15,
      top: 10,
      bottom: 10,
    },
  });

const createSettingsGrid = (scene: RexScene, isMusicPlaying: boolean) => {
  const grid = scene.rexUI.add.gridSizer({
    column: 1,
    row: 5,
  });

  const musicTrack = scene.rexUI.add.label({
    icon: new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_NOTE_REST,
      FRAME_BUTTON_NOTE_HOVER,
      FRAME_BUTTON_NOTE_CLICK,
      () => scene.events.emit(EVENT_MUSIC_CHANGE)
    ),
    text: scene.add.text(0, 0, "Change Music", { fontSize: UI_FONT_SIZE }),
  });

  const playPauseButton = new Button(
    scene,
    0,
    0,
    TEXTURE_BUTTONS,
    isMusicPlaying ? FRAME_BUTTON_PAUSE_REST : FRAME_BUTTON_PLAY_REST,
    isMusicPlaying ? FRAME_BUTTON_PAUSE_HOVER : FRAME_BUTTON_PLAY_HOVER,
    isMusicPlaying ? FRAME_BUTTON_PAUSE_CLICK : FRAME_BUTTON_PLAY_CLICK,
    () => {
      playPauseButton.changeFrames(
        isMusicPlaying ? FRAME_BUTTON_PAUSE_REST : FRAME_BUTTON_PLAY_REST,
        isMusicPlaying ? FRAME_BUTTON_PAUSE_HOVER : FRAME_BUTTON_PLAY_HOVER,
        isMusicPlaying ? FRAME_BUTTON_PAUSE_CLICK : FRAME_BUTTON_PLAY_CLICK
      );
      playPauseButton.setFrame(
        isMusicPlaying ? FRAME_BUTTON_PAUSE_HOVER : FRAME_BUTTON_PLAY_HOVER
      );
      scene.events.emit(isMusicPlaying ? EVENT_MUSIC_PAUSE : EVENT_MUSIC_PLAY);
      isMusicPlaying = !isMusicPlaying;
    }
  );
  const musicPause = scene.rexUI.add.label({
    icon: playPauseButton,
    text: scene.add.text(0, 0, "Play/Pause Music", { fontSize: UI_FONT_SIZE }),
  });

  grid.add(musicTrack);
  grid.add(musicPause);
  return grid;
};

const createPanel = (scene: RexScene, isMusicPlaying: boolean) => {
  const confirmButton = new Button(
    scene,
    0,
    0,
    TEXTURE_BUTTONS,
    FRAME_BUTTON_CONFIRM_REST,
    FRAME_BUTTON_CONFIRM_HOVER,
    FRAME_BUTTON_CONFIRM_CLICK,
    () => {
      console.log("confirm");
    }
  );
  const cancelButton = new Button(
    scene,
    0,
    0,
    TEXTURE_BUTTONS,
    FRAME_BUTTON_CANCEL_REST,
    FRAME_BUTTON_CANCEL_HOVER,
    FRAME_BUTTON_CANCEL_CLICK,
    () => {
      console.log("cancelled");
    }
  );

  return scene.rexUI.add.dialog({
    content: createSettingsGrid(scene, isMusicPlaying),
    actions: [confirmButton, cancelButton],
  });
};

class SettingsDialog extends ScrollablePanel {
  constructor(scene: RexScene, isMusicPlaying: boolean) {
    super(scene, {
      x: 0,
      y: 0,
      anchor: {
        centerX: "center",
        centerY: "center",
      },
      width: GAME_WIDTH - 4 * UI_BUTTON_SIZE,
      height: GAME_HEIGHT - 4 * UI_BUTTON_SIZE,
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
        child: createPanel(scene, isMusicPlaying),
        mask: { padding: 1 },
      },
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

export default SettingsDialog;
