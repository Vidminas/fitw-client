import { TEXTURE_KENNEY_ASSETS, TEXTURE_UNDERWATER_SPRITES } from "./constants";

// a map of [fitwick name, array of possible fitwick [texture, frame]] pairs
const FITWICKS = new Map<string, [string, string][]>();
FITWICKS.set("bush", [
  [TEXTURE_KENNEY_ASSETS, "bush1.png"],
  [TEXTURE_KENNEY_ASSETS, "bush2.png"],
  [TEXTURE_KENNEY_ASSETS, "bush3.png"],
  [TEXTURE_KENNEY_ASSETS, "bush4.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt1.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt2.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt3.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt4.png"],
  [TEXTURE_KENNEY_ASSETS, "bushOrange1.png"],
  [TEXTURE_KENNEY_ASSETS, "bushOrange2.png"],
  [TEXTURE_KENNEY_ASSETS, "bushOrange3.png"],
  [TEXTURE_KENNEY_ASSETS, "bushOrange4.png"],
]);
FITWICKS.set("green bush", [
  [TEXTURE_KENNEY_ASSETS, "bush1.png"],
  [TEXTURE_KENNEY_ASSETS, "bush2.png"],
  [TEXTURE_KENNEY_ASSETS, "bush3.png"],
  [TEXTURE_KENNEY_ASSETS, "bush4.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt1.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt2.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt3.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt4.png"],
]);
FITWICKS.set("orange bush", [
  [TEXTURE_KENNEY_ASSETS, "bushOrange1.png"],
  [TEXTURE_KENNEY_ASSETS, "bushOrange2.png"],
  [TEXTURE_KENNEY_ASSETS, "bushOrange3.png"],
  [TEXTURE_KENNEY_ASSETS, "bushOrange4.png"],
]);
FITWICKS.set("house", [
  [TEXTURE_KENNEY_ASSETS, "house1.png"],
  [TEXTURE_KENNEY_ASSETS, "house2.png"],
  [TEXTURE_KENNEY_ASSETS, "houseAlt1.png"],
  [TEXTURE_KENNEY_ASSETS, "houseAlt2.png"],
]);
FITWICKS.set("small house", [
  [TEXTURE_KENNEY_ASSETS, "houseSmall1.png"],
  [TEXTURE_KENNEY_ASSETS, "houseSmall2.png"],
  [TEXTURE_KENNEY_ASSETS, "houseSmallAlt1.png"],
  [TEXTURE_KENNEY_ASSETS, "houseSmallAlt2.png"],
]);
FITWICKS.set("small castle", [
  [TEXTURE_KENNEY_ASSETS, "castleSmall.png"],
  [TEXTURE_KENNEY_ASSETS, "castleSmallAlt.png"],
]);
FITWICKS.set("castle wall", [
  [TEXTURE_KENNEY_ASSETS, "castleWall.png"],
  [TEXTURE_KENNEY_ASSETS, "castleWallAlt.png"],
]);
FITWICKS.set("cactus", [
  [TEXTURE_KENNEY_ASSETS, "cactus1.png"],
  [TEXTURE_KENNEY_ASSETS, "cactus2.png"],
  [TEXTURE_KENNEY_ASSETS, "cactus3.png"],
]);
FITWICKS.set("moon", [
  [TEXTURE_KENNEY_ASSETS, "moon.png"],
  [TEXTURE_KENNEY_ASSETS, "moonFull.png"],
]);
FITWICKS.set("full moon", [[TEXTURE_KENNEY_ASSETS, "moonFull.png"]]);
FITWICKS.set("tree", [
  [TEXTURE_KENNEY_ASSETS, "tree.png"],
  [TEXTURE_KENNEY_ASSETS, "treeDead.png"],
  [TEXTURE_KENNEY_ASSETS, "treeFrozen.png"],
  [TEXTURE_KENNEY_ASSETS, "treeOrange.png"],
  [TEXTURE_KENNEY_ASSETS, "treeSnow.png"],
]);
FITWICKS.set("pine tree", [
  [TEXTURE_KENNEY_ASSETS, "treePine.png"],
  [TEXTURE_KENNEY_ASSETS, "treePineFrozen.png"],
  [TEXTURE_KENNEY_ASSETS, "treePineOrange.png"],
  [TEXTURE_KENNEY_ASSETS, "treePineSnow.png"],
]);
FITWICKS.set("palm tree", [[TEXTURE_KENNEY_ASSETS, "treePalm.png"]]);
FITWICKS.set("pyramid", [[TEXTURE_KENNEY_ASSETS, "pyramid.png"]]);
FITWICKS.set("Mayan pyramid", [[TEXTURE_KENNEY_ASSETS, "pyramidMayan.png"]]);
FITWICKS.set("sun", [[TEXTURE_KENNEY_ASSETS, "sun.png"]]);
FITWICKS.set("tower", [
  [TEXTURE_KENNEY_ASSETS, "tower.png"],
  [TEXTURE_KENNEY_ASSETS, "towerAlt.png"],
]);
FITWICKS.set("small tower", [
  [TEXTURE_KENNEY_ASSETS, "towerSmall.png"],
  [TEXTURE_KENNEY_ASSETS, "towerSmallAlt.png"],
]);
FITWICKS.set("fence", [[TEXTURE_KENNEY_ASSETS, "fence.png"]]);
FITWICKS.set("iron fence", [[TEXTURE_KENNEY_ASSETS, "fenceIron.png"]]);
FITWICKS.set("seahorse", [[TEXTURE_UNDERWATER_SPRITES, "Acceleration.png"]]);
FITWICKS.set("anchor", [[TEXTURE_UNDERWATER_SPRITES, "Anchor.png"]]);
FITWICKS.set("barrel", [
  [TEXTURE_UNDERWATER_SPRITES, "Barrel_1.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Barrel_2.png"],
]);
FITWICKS.set("bomb", [[TEXTURE_UNDERWATER_SPRITES, "Bomb.png"]]);
FITWICKS.set("small bomb", [[TEXTURE_UNDERWATER_SPRITES, "Small-bomb.png"]]);
FITWICKS.set("bubble", [
  [TEXTURE_UNDERWATER_SPRITES, "Bubble_1.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Bubble_2.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Bubble_3.png"],
]);
FITWICKS.set("chain", [[TEXTURE_UNDERWATER_SPRITES, "Chain.png"]]);
FITWICKS.set("chest", [
  [TEXTURE_UNDERWATER_SPRITES, "Chest_ajar.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Chest_closed.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Chest_open.png"],
]);
FITWICKS.set("coin", [[TEXTURE_UNDERWATER_SPRITES, "Coin.png"]]);
FITWICKS.set("crown", [[TEXTURE_UNDERWATER_SPRITES, "Crown.png"]]);
FITWICKS.set("heart", [[TEXTURE_UNDERWATER_SPRITES, "Heart.png"]]);
FITWICKS.set("magnet", [[TEXTURE_UNDERWATER_SPRITES, "Magnet.png"]]);
FITWICKS.set("mast", [[TEXTURE_UNDERWATER_SPRITES, "Mast.png"]]);
FITWICKS.set("net", [[TEXTURE_UNDERWATER_SPRITES, "Net.png"]]);
FITWICKS.set("pearl", [[TEXTURE_UNDERWATER_SPRITES, "Pearl.png"]]);
FITWICKS.set("seaweed", [
  [TEXTURE_UNDERWATER_SPRITES, "Seaweed_1.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Seaweed_2.png"],
]);
FITWICKS.set("shield", [[TEXTURE_UNDERWATER_SPRITES, "Shield.png"]]);
FITWICKS.set("steering wheel", [
  [TEXTURE_UNDERWATER_SPRITES, "Steering-wheel.png"],
]);
FITWICKS.set("stone", [
  [TEXTURE_UNDERWATER_SPRITES, "Stone_1.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Stone_2.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Stone_3.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Stone_4.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Stone_5.png"],
  [TEXTURE_UNDERWATER_SPRITES, "Stone_6.png"],
]);

export default FITWICKS;
