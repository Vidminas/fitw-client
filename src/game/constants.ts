// logic from https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
export const SCALE_RATIO = window.devicePixelRatio * 1.5;

console.log("SCALE RATIO = " + SCALE_RATIO);

export const UI_BUTTON_SIZE = 48 * SCALE_RATIO;
console.log("UI BUTTON SIZE = " + UI_BUTTON_SIZE);
export const UI_ICON_SIZE = 32 * SCALE_RATIO;
export const UI_FONT_SIZE = `${16 * SCALE_RATIO}px`;
export const UI_BIG_FONT_SIZE = `${24 * SCALE_RATIO}px`;

export const REGISTRY_BACKGROUND_TEXTURE = "current-background-texture";

// limits on camera scroll should be consistent for all screen sizes
export const MAX_SCROLL_X = 1024 * 5;
// limits on camera zoom (besides limiting to game height and width)
export const MAX_ZOOM_FACTOR = 4;

export const SPEECH_BUBBLE_MIN_WIDTH = UI_BUTTON_SIZE * 2;
export const SPEECH_BUBBLE_MIN_HEIGHT = UI_BUTTON_SIZE + 10 * SCALE_RATIO;
export const SPEECH_BUBBLE_PADDING = 10;

const MUSIC_CALM_BEAR = "16-Dark Fantasy Studio- Calm bear.wav";
const MUSIC_PLAYING_IN_WATER = "26-Dark Fantasy Studio- Playing in water.wav";
const MUSIC_TREASURE = "29-Dark Fantasy Studio- Treasure.wav";
export const MUSIC_TRACKS = [
  MUSIC_CALM_BEAR,
  MUSIC_PLAYING_IN_WATER,
  MUSIC_TREASURE,
];

export const CONFIG_FITWICKS = "fitwicks";

export const TEXTURE_BUTTONS = "buttons";

export const TEXTURE_BACKGROUND_EMPTY = "backgroundEmpty.png";
const TEXTURE_BACKGROUND_FALL = "backgroundColorFall.png";
const TEXTURE_BACKGROUND_FOREST = "backgroundColorForest.png";
const TEXTURE_BACKGROUND_GRASS = "backgroundColorGrass.png";
const TEXTURE_BACKGROUND_DESERT = "backgroundColorDesert.png";
const TEXTURE_BACKGROUND_SCIFI = "scifi_background.jpg";
const TEXTURE_BACKGROUND_FLOATING_ISLANDS = "floating_islands.jpg";
// these backgrounds contain too much decoration that is non-clickable
// const TEXTURE_BACKGROUND_UNDERWATER1 = "underwater_background_1.png";
// const TEXTURE_BACKGROUND_UNDERWATER2 = "underwater_background_2.png";
// const TEXTURE_BACKGROUND_UNDERWATER3 = "underwater_background_3.png";
// const TEXTURE_BACKGROUND_UNDERWATER4 = "underwater_background_4.png";
const TEXTURE_BACKGROUND_WINTER = "winter_background.png";
const TEXTURE_BACKGROUND_CAVE = "back_cave.png";
const TEXTURE_BACKGROUND_ABANDONED_CITY = "Background city Seamless.png";

export const BACKGROUND_TEXTURES = [
  TEXTURE_BACKGROUND_EMPTY,
  TEXTURE_BACKGROUND_FALL,
  TEXTURE_BACKGROUND_FOREST,
  TEXTURE_BACKGROUND_GRASS,
  TEXTURE_BACKGROUND_DESERT,
  TEXTURE_BACKGROUND_SCIFI,
  TEXTURE_BACKGROUND_FLOATING_ISLANDS,
  // these contain too much background decoration:
  // TEXTURE_BACKGROUND_UNDERWATER1,
  // TEXTURE_BACKGROUND_UNDERWATER2,
  // TEXTURE_BACKGROUND_UNDERWATER3,
  // TEXTURE_BACKGROUND_UNDERWATER4,
  TEXTURE_BACKGROUND_WINTER,
  TEXTURE_BACKGROUND_CAVE,
  TEXTURE_BACKGROUND_ABANDONED_CITY,
];

export const FRAME_BUTTON_ADD_REST = "Button_162.png";
export const FRAME_BUTTON_ADD_HOVER = "Button_163.png";
export const FRAME_BUTTON_ADD_CLICK = "Button_164.png";
export const FRAME_BUTTON_CONFIRM_REST = "Button_042.png";
export const FRAME_BUTTON_CONFIRM_HOVER = "Button_043.png";
export const FRAME_BUTTON_CONFIRM_CLICK = "Button_044.png";
export const FRAME_BUTTON_CANCEL_REST = "Button_021.png";
export const FRAME_BUTTON_CANCEL_HOVER = "Button_022.png";
export const FRAME_BUTTON_CANCEL_CLICK = "Button_023.png";
export const FRAME_BUTTON_SWITCH_REST = "Button_154.png";
export const FRAME_BUTTON_SWITCH_HOVER = "Button_155.png";
export const FRAME_BUTTON_SWITCH_CLICK = "Button_156.png";
export const FRAME_BUTTON_LEFT_REST = "Button_174.png";
export const FRAME_BUTTON_LEFT_HOVER = "Button_175.png";
export const FRAME_BUTTON_LEFT_CLICK = "Button_176.png";
export const FRAME_BUTTON_RIGHT_REST = "Button_158.png";
export const FRAME_BUTTON_RIGHT_HOVER = "Button_159.png";
export const FRAME_BUTTON_RIGHT_CLICK = "Button_160.png";
export const FRAME_BUTTON_DELETE_REST = "Button_114.png";
export const FRAME_BUTTON_DELETE_HOVER = "Button_115.png";
export const FRAME_BUTTON_DELETE_CLICK = "Button_116.png";
export const FRAME_BUTTON_SPEAKER_REST = "Button_134.png";
export const FRAME_BUTTON_SPEAKER_HOVER = "Button_135.png";
export const FRAME_BUTTON_SPEAKER_CLICK = "Button_136.png";
export const FRAME_BUTTON_LIST_REST = "Button_110.png";
export const FRAME_BUTTON_LIST_HOVER = "Button_111.png";
export const FRAME_BUTTON_LIST_CLICK = "Button_112.png";
export const FRAME_BUTTON_SETTINGS_REST = "Button_029.png";
export const FRAME_BUTTON_SETTINGS_HOVER = "Button_030.png";
export const FRAME_BUTTON_SETTINGS_CLICK = "Button_031.png";
export const FRAME_BUTTON_NOTE_REST = "Button_118.png";
export const FRAME_BUTTON_NOTE_HOVER = "Button_119.png";
export const FRAME_BUTTON_NOTE_CLICK = "Button_120.png";
export const FRAME_BUTTON_PLAY_REST = "Button_046.png";
export const FRAME_BUTTON_PLAY_HOVER = "Button_047.png";
export const FRAME_BUTTON_PLAY_CLICK = "Button_048.png";
export const FRAME_BUTTON_PAUSE_REST = "Button_142.png";
export const FRAME_BUTTON_PAUSE_HOVER = "Button_143.png";
export const FRAME_BUTTON_PAUSE_CLICK = "Button_144.png";
export const FRAME_BUTTON_EXIT_REST = "Button_086.png";
export const FRAME_BUTTON_EXIT_HOVER = "Button_087.png";
export const FRAME_BUTTON_EXIT_CLICK = "Button_088.png";
export const FRAME_BUTTON_INFO_REST = "Button_066.png";
export const FRAME_BUTTON_INFO_HOVER = "Button_067.png";
export const FRAME_BUTTON_INFO_CLICK = "Button_068.png";
