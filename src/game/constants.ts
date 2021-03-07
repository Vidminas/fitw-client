// logic from https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
export const GAME_WIDTH = window.innerWidth * window.devicePixelRatio;
export const GAME_HEIGHT = window.innerHeight * window.devicePixelRatio;
export const SCALE_RATIO = window.devicePixelRatio;

export const UI_BUTTON_SIZE = 64 * SCALE_RATIO;
export const UI_FONT_SIZE = `${20 * SCALE_RATIO}px`;

// the smallest width and height of all images (it's okay to have bigger)
const GAME_BG_WIDTH = 1024;
const GAME_BG_HEIGHT = 1024;
// limits on camera scroll
export const MAX_SCROLL_X = GAME_BG_WIDTH * 5;
export const MAX_SCROLL_Y = GAME_BG_HEIGHT;
// limits on camera zoom (besides limiting to game height and width)
export const MAX_ZOOM_FACTOR = 4;

export const SPEECH_BUBBLE_MIN_WIDTH = UI_BUTTON_SIZE * 2;
export const SPEECH_BUBBLE_HEIGHT = UI_BUTTON_SIZE + 10 * SCALE_RATIO;

export const EVENT_FITWICK_NEW = "fitwick/new";
export const EVENT_FITWICK_PLACE = "fitwick/place";
export const EVENT_FITWICK_DELETE = "fitwick/delete";
export const EVENT_FITWICK_MOVE = "fitwick/move";
export const EVENT_FITWICK_TAP = "fitwick/tap";

export const TEXTURE_BUTTONS = "buttons";
export const TEXTURE_KENNEY_ASSETS = "kenney_assets";
export const TEXTURE_UNDERWATER_SPRITES = "underwater_sprites";
export const TEXTURE_DESERT_SPRITES = "desert_sprites";
export const TEXTURE_MEDIEVAL_TROPICAL_SPRITES = "medieval_tropical_sprites";
export const TEXTURE_WINTER_SPRITES = "winter_sprites";

export const TEXTURE_BACKGROUND_EMPTY = "backgroundEmpty";
const TEXTURE_BACKGROUND_FALL = "backgroundColorFall";
const TEXTURE_BACKGROUND_FOREST = "backgroundColorForest";
const TEXTURE_BACKGROUND_GRASS = "backgroundColorGrass";
const TEXTURE_BACKGROUND_DESERT = "backgroundColorDesert";
const TEXTURE_BACKGROUND_UNDERWATER1 = "underwater_background_1";
const TEXTURE_BACKGROUND_UNDERWATER2 = "underwater_background_2";
const TEXTURE_BACKGROUND_UNDERWATER3 = "underwater_background_3";
const TEXTURE_BACKGROUND_UNDERWATER4 = "underwater_background_4";
const TEXTURE_BACKGROUND_WINTER = "winter_background";
export const BACKGROUND_TEXTURES = [
  TEXTURE_BACKGROUND_EMPTY,
  TEXTURE_BACKGROUND_FALL,
  TEXTURE_BACKGROUND_FOREST,
  TEXTURE_BACKGROUND_GRASS,
  TEXTURE_BACKGROUND_DESERT,
  TEXTURE_BACKGROUND_UNDERWATER1,
  TEXTURE_BACKGROUND_UNDERWATER2,
  TEXTURE_BACKGROUND_UNDERWATER3,
  TEXTURE_BACKGROUND_UNDERWATER4,
  TEXTURE_BACKGROUND_WINTER,
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
