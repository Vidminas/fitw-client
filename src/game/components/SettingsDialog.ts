import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import {
  COLOR_DIALOG_BACKGROUND,
  COLOR_DIALOG_FOREGROUND,
  COLOR_YELLOW,
} from "../colors";
import {
  EVENT_MUSIC_CHANGE,
  EVENT_MUSIC_PAUSE,
  EVENT_MUSIC_PLAY,
  EVENT_VOLUME_CHANGE,
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

const createSettingsGrid = (scene: RexScene, currentVolume: number) => {
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

  const pauseButton = new Button(
    scene,
    0,
    0,
    TEXTURE_BUTTONS,
    FRAME_BUTTON_PAUSE_REST,
    FRAME_BUTTON_PAUSE_HOVER,
    FRAME_BUTTON_PAUSE_CLICK,
    () => {
      scene.events.emit(EVENT_MUSIC_PAUSE);
    }
  );
  const playButton = new Button(
    scene,
    0,
    0,
    TEXTURE_BUTTONS,
    FRAME_BUTTON_PLAY_REST,
    FRAME_BUTTON_PLAY_HOVER,
    FRAME_BUTTON_PLAY_CLICK,
    () => {
      scene.events.emit(EVENT_MUSIC_PLAY);
    }
  );
  const musicPause = scene.rexUI.add.label({
    icon: scene.rexUI.add.sizer().add(playButton).add(pauseButton),
    text: scene.add.text(0, 0, "Play/Pause Music", { fontSize: UI_FONT_SIZE }),
  });

  const musicVolume = scene.rexUI.add.sizer();
  musicVolume.add(
    scene.add.text(0, 0, "Change Music Volume", { fontSize: UI_FONT_SIZE })
  );
  musicVolume.add(
    scene.rexUI.add
      .slider({
        width: UI_BUTTON_SIZE * 3,
        track: scene.rexUI.add.roundRectangle(
          0,
          0,
          0,
          0,
          6,
          COLOR_DIALOG_FOREGROUND
        ),
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_YELLOW),
        value: currentVolume,
        input: "drag",
      })
      .on("valuechange", (newValue: number) => {
        scene.events.emit(EVENT_VOLUME_CHANGE, newValue);
      })
  );

  grid.add(musicTrack);
  grid.add(musicPause);
  grid.add(musicVolume);
  return grid;
};

const createPanel = (scene: RexScene, currentVolume: number) => {
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
    content: createSettingsGrid(scene, currentVolume),
    actions: [confirmButton, cancelButton],
  });
};

class SettingsDialog extends ScrollablePanel {
  constructor(scene: RexScene, currentVolume: number) {
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
        child: createPanel(scene, currentVolume),
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
