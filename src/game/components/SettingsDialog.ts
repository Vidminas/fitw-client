import {
  Dialog,
  ScrollablePanel,
} from "phaser3-rex-plugins/templates/ui/ui-components.js";
import {
  EVENT_WORLD_EXIT,
  EVENT_MUSIC_CHANGE,
  EVENT_MUSIC_PAUSE,
  EVENT_MUSIC_PLAY,
  EVENT_VOLUME_CHANGE,
} from "../../api/events";
import {
  COLOR_DIALOG_BACKGROUND,
  COLOR_DIALOG_FOREGROUND,
  COLOR_YELLOW,
} from "../colors";
import {
  FRAME_BUTTON_CANCEL_CLICK,
  FRAME_BUTTON_CANCEL_HOVER,
  FRAME_BUTTON_CANCEL_REST,
  FRAME_BUTTON_CONFIRM_CLICK,
  FRAME_BUTTON_CONFIRM_HOVER,
  FRAME_BUTTON_CONFIRM_REST,
  FRAME_BUTTON_EXIT_CLICK,
  FRAME_BUTTON_EXIT_HOVER,
  FRAME_BUTTON_EXIT_REST,
  FRAME_BUTTON_NOTE_CLICK,
  FRAME_BUTTON_NOTE_HOVER,
  FRAME_BUTTON_NOTE_REST,
  FRAME_BUTTON_PAUSE_CLICK,
  FRAME_BUTTON_PAUSE_HOVER,
  FRAME_BUTTON_PAUSE_REST,
  FRAME_BUTTON_PLAY_CLICK,
  FRAME_BUTTON_PLAY_HOVER,
  FRAME_BUTTON_PLAY_REST,
  TEXTURE_BUTTONS,
  UI_BUTTON_SIZE,
  UI_FONT_SIZE,
} from "../constants";
import RexScene from "../scenes/RexScene";
import Button from "./Button";
import ModalDialog from "./ModalDialog";

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
      () => scene.game.events.emit(EVENT_MUSIC_CHANGE)
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
      scene.game.events.emit(EVENT_MUSIC_PAUSE);
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
      scene.game.events.emit(EVENT_MUSIC_PLAY);
    }
  );
  const musicPause = scene.rexUI.add.label({
    icon: scene.rexUI.add.sizer().add(playButton).add(pauseButton),
    text: scene.add.text(0, 0, "Play/Pause Music", { fontSize: UI_FONT_SIZE }),
  });

  const musicVolumeLabel = scene.add.text(0, 0, "Change Music/Sounds Volume", {
    fontSize: UI_FONT_SIZE,
  });

  const musicVolumeSlider = scene.rexUI.add
    .slider({
      height: UI_BUTTON_SIZE / 2,
      width: Math.min(scene.scale.width - UI_BUTTON_SIZE, 3 * UI_BUTTON_SIZE),
      track: scene.rexUI.add.roundRectangle(
        0,
        0,
        0,
        0,
        6,
        COLOR_DIALOG_FOREGROUND
      ),
      thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 25, COLOR_YELLOW),
      value: currentVolume,
      input: "drag",
    })
    .on("valuechange", (newValue: number) => {
      scene.game.events.emit(EVENT_VOLUME_CHANGE, newValue);
    });

  const exitWorld = scene.rexUI.add.label({
    icon: new Button(
      scene,
      0,
      0,
      TEXTURE_BUTTONS,
      FRAME_BUTTON_EXIT_REST,
      FRAME_BUTTON_EXIT_HOVER,
      FRAME_BUTTON_EXIT_CLICK,
      () => scene.game.events.emit(EVENT_WORLD_EXIT)
    ),
    text: scene.add.text(0, 0, "Exit World", { fontSize: UI_FONT_SIZE }),
  });

  grid.add(musicTrack);
  grid.add(musicPause);
  grid.add(musicVolumeLabel);
  grid.add(musicVolumeSlider);
  grid.add(exitWorld);
  return grid;
};

const createPanel = (
  scene: RexScene,
  currentVolume: number,
  onConfirm: Function,
  onCancel: Function
): Dialog => {
  const confirmButton = new Button(
    scene,
    0,
    0,
    TEXTURE_BUTTONS,
    FRAME_BUTTON_CONFIRM_REST,
    FRAME_BUTTON_CONFIRM_HOVER,
    FRAME_BUTTON_CONFIRM_CLICK,
    onConfirm
  );
  const cancelButton = new Button(
    scene,
    0,
    0,
    TEXTURE_BUTTONS,
    FRAME_BUTTON_CANCEL_REST,
    FRAME_BUTTON_CANCEL_HOVER,
    FRAME_BUTTON_CANCEL_CLICK,
    onCancel
  );

  return scene.rexUI.add.dialog({
    content: createSettingsGrid(scene, currentVolume),
    actions: [confirmButton, cancelButton],
  });
};

class SettingsDialog extends ModalDialog {
  constructor(
    scene: RexScene,
    currentVolume: number,
    onConfirm: Function,
    onCancel: Function
  ) {
    const width = Math.max(
      scene.scale.width - 4 * UI_BUTTON_SIZE,
      Math.min(4 * UI_BUTTON_SIZE, scene.scale.width)
    );
    const height = Math.max(
      scene.scale.height * 0.7,
      Math.min(4 * UI_BUTTON_SIZE, scene.scale.height)
    );
    const scrollablePanel = new ScrollablePanel(scene, {
      x: 0,
      y: 0,
      anchor: {
        centerX: "center",
        centerY: "center",
      },
      width,
      height,
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
        child: createPanel(scene, currentVolume, onConfirm, onCancel),
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
    scrollablePanel.layout();
    scene.add.existing(scrollablePanel);

    scrollablePanel.popUp(500);
    scrollablePanel.setInteractive();
    scrollablePanel.on(
      "wheel",
      (
        _pointer: Phaser.Input.Pointer,
        _deltaX: number,
        deltaY: number,
        _deltaZ: number
      ) => {
        let newScrollValue = scrollablePanel.childOY - deltaY;
        if (newScrollValue < scrollablePanel.bottomChildOY) {
          newScrollValue = scrollablePanel.bottomChildOY;
        } else if (newScrollValue > scrollablePanel.topChildOY) {
          newScrollValue = scrollablePanel.topChildOY;
        }
        scrollablePanel.setChildOY(newScrollValue);
      }
    );

    super(scene, scrollablePanel);
  }
}

export default SettingsDialog;
