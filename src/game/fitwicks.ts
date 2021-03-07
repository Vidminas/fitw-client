import {
  TEXTURE_MEDIEVAL_TROPICAL_SPRITES,
  TEXTURE_KENNEY_ASSETS,
  TEXTURE_UNDERWATER_SPRITES,
  TEXTURE_DESERT_SPRITES,
  TEXTURE_WINTER_SPRITES,
} from "./constants";

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
  [TEXTURE_DESERT_SPRITES, "greenery_1.png"],
  [TEXTURE_DESERT_SPRITES, "greenery_2.png"],
  [TEXTURE_DESERT_SPRITES, "greenery_3.png"],
  [TEXTURE_DESERT_SPRITES, "greenery_4.png"],
  [TEXTURE_DESERT_SPRITES, "greenery_5.png"],
  // greenery 6 is a shrub
  [TEXTURE_DESERT_SPRITES, "greenery_7.png"],
  [TEXTURE_DESERT_SPRITES, "greenery_8.png"],
  [TEXTURE_DESERT_SPRITES, "greenery_9.png"],
  // greenery 10 is a shrub
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
  [TEXTURE_DESERT_SPRITES, "tree_7.png"],
  [TEXTURE_DESERT_SPRITES, "tree_10.png"],
  [TEXTURE_DESERT_SPRITES, "tree_11.png"],
  [TEXTURE_DESERT_SPRITES, "tree_12.png"],
  [TEXTURE_WINTER_SPRITES, "Tree_1.png"],
  [TEXTURE_WINTER_SPRITES, "Tree_2.png"],
]);
FITWICKS.set("pine tree", [
  [TEXTURE_KENNEY_ASSETS, "treePine.png"],
  [TEXTURE_KENNEY_ASSETS, "treePineFrozen.png"],
  [TEXTURE_KENNEY_ASSETS, "treePineOrange.png"],
  [TEXTURE_KENNEY_ASSETS, "treePineSnow.png"],
]);
FITWICKS.set("palm tree", [
  [TEXTURE_KENNEY_ASSETS, "treePalm.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "tree_1.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "tree_2.png"],
  [TEXTURE_DESERT_SPRITES, "tree_1.png"],
  [TEXTURE_DESERT_SPRITES, "tree_2.png"],
  [TEXTURE_DESERT_SPRITES, "tree_3.png"],
  [TEXTURE_DESERT_SPRITES, "tree_4.png"],
  [TEXTURE_DESERT_SPRITES, "tree_5.png"],
  [TEXTURE_DESERT_SPRITES, "tree_6.png"],
  [TEXTURE_DESERT_SPRITES, "tree_9.png"],
]);
FITWICKS.set("baobab", [[TEXTURE_DESERT_SPRITES, "tree_8.png"]]);
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
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_17.png"],
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
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "stones_1.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "stones_2.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "stones_3.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "stones_4.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "stones_5.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "stones_6.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "stones_7.png"],
  [TEXTURE_DESERT_SPRITES, "stones_1.png"],
  [TEXTURE_DESERT_SPRITES, "stones_2.png"],
  [TEXTURE_DESERT_SPRITES, "stones_3.png"],
  [TEXTURE_DESERT_SPRITES, "stones_4.png"],
  [TEXTURE_DESERT_SPRITES, "stones_5.png"],
  [TEXTURE_DESERT_SPRITES, "stones_6.png"],
  [TEXTURE_DESERT_SPRITES, "stones_7.png"],
  [TEXTURE_DESERT_SPRITES, "stones_8.png"],
  [TEXTURE_DESERT_SPRITES, "stones_9.png"],
  [TEXTURE_DESERT_SPRITES, "stones_10.png"],
  [TEXTURE_DESERT_SPRITES, "stones_11.png"],
  [TEXTURE_DESERT_SPRITES, "stones_12.png"],
  [TEXTURE_WINTER_SPRITES, "Stone.png"],
]);
// TODO: this is incorrect
FITWICKS.set("tropical building", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_1.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_2.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_3.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_4.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_5.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_6.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_7.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_8.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_9.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_10.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "building_11.png"],
]);
FITWICKS.set("torch", [[TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_1.png"]]);
FITWICKS.set("mud pool", [[TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_2.png"]]);
FITWICKS.set("tree stump", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_3.png"],
]);
FITWICKS.set("sign", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_4.png"],
  [TEXTURE_DESERT_SPRITES, "decor_3.png"],
  [TEXTURE_WINTER_SPRITES, "Sign_1.png"],
  [TEXTURE_WINTER_SPRITES, "Sign_2.png"],
]);
FITWICKS.set("bowl", [[TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_5.png"]]);
FITWICKS.set("fire pit", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_6.png"],
  [TEXTURE_DESERT_SPRITES, "decor_7.png"],
]);
FITWICKS.set("carved stone", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_7.png"],
]);
FITWICKS.set("mystical pool", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_8.png"],
]);
FITWICKS.set("canvas", [[TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_9.png"]]);
FITWICKS.set("stone flowerbed", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_10.png"],
]);
FITWICKS.set("stone bowl", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_11.png"],
]);
// TODO: figure it out
// FITWICKS.set("IDK what this is", [
//   [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_12.png"],
// ]);
FITWICKS.set("window sill", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_13.png"],
]);
FITWICKS.set("wooden cart", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_14.png"],
]);
FITWICKS.set("tray with potatoes", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_15.png"],
]);
FITWICKS.set("mud vase", [[TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_16.png"]]);
// decor_17.png is a barrel (included above)
FITWICKS.set("wooden crate", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_18.png"],
  [TEXTURE_WINTER_SPRITES, "Crate.png"],
]);
FITWICKS.set("shrub", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "greenery_1.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "greenery_2.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "greenery_3.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "greenery_4.png"],
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "greenery_5.png"],
  [TEXTURE_DESERT_SPRITES, "greenery_6.png"],
  [TEXTURE_DESERT_SPRITES, "greenery_10.png"],
]);
FITWICKS.set("desert building", [
  [TEXTURE_DESERT_SPRITES, "building_1.png"],
  [TEXTURE_DESERT_SPRITES, "building_2.png"],
  [TEXTURE_DESERT_SPRITES, "building_3.png"],
  [TEXTURE_DESERT_SPRITES, "building_4.png"],
  [TEXTURE_DESERT_SPRITES, "building_5.png"],
]);
FITWICKS.set("small pyramid", [[TEXTURE_DESERT_SPRITES, "decor_1.png"]]);
FITWICKS.set("tent", [[TEXTURE_DESERT_SPRITES, "decor_2.png"]]);
// decor_3.png is a sign (included above)
FITWICKS.set("log", [[TEXTURE_DESERT_SPRITES, "decor_4.png"]]);
// TODO: figure it out
// FITWICKS.set("IDK what this is", [
//   [TEXTURE_DESERT_SPRITES, "decor_5.png"],
// ])
FITWICKS.set("skull", [[TEXTURE_DESERT_SPRITES, "decor_6.png"]]);
// decor_7.png is a lit fire pit (included above)
FITWICKS.set("merchant wagon", [[TEXTURE_DESERT_SPRITES, "decor_8.png"]]);
FITWICKS.set("lake", [[TEXTURE_DESERT_SPRITES, "lake.png"]]);
FITWICKS.set("stairs", [
  [TEXTURE_DESERT_SPRITES, "land_4.png"],
  [TEXTURE_DESERT_SPRITES, "land_8.png"],
]);
FITWICKS.set("crystal", [[TEXTURE_WINTER_SPRITES, "Crystal.png"]]);
FITWICKS.set("block of ice", [[TEXTURE_WINTER_SPRITES, "IceBox.png"]]);
FITWICKS.set("igloo", [[TEXTURE_WINTER_SPRITES, "Igloo.png"]]);
FITWICKS.set("snowman", [[TEXTURE_WINTER_SPRITES, "SnowMan.png"]]);

export default FITWICKS;
