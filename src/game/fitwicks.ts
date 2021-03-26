import {
  TEXTURE_MEDIEVAL_TROPICAL_SPRITES,
  TEXTURE_KENNEY_ASSETS,
  TEXTURE_UNDERWATER_SPRITES,
  TEXTURE_DESERT_SPRITES,
  TEXTURE_WINTER_SPRITES,
  AUDIO_FITWICK_BAOBAB,
  AUDIO_FITWICK_FIRE_PIT,
  AUDIO_FITWICK_BUSH,
  TEXTURE_KENNEY_ITEMS,
  AUDIO_FITWICK_AXE,
  AUDIO_FITWICK_BOX_KNIFE,
  AUDIO_FITWICK_BRUSH,
  AUDIO_FITWICK_CHISEL,
  AUDIO_FITWICK_COMPASS,
  AUDIO_FITWICK_CUP,
  AUDIO_FITWICK_DRILL,
  AUDIO_FITWICK_HAMMER,
  AUDIO_FITWICK_MALLET,
  AUDIO_FITWICK_MONKEY_WRENCH,
  AUDIO_FITWICK_NAIL,
  AUDIO_FITWICK_PAINTBRUSH,
  AUDIO_FITWICK_PAINT_ROLLER,
  AUDIO_FITWICK_PEN,
  AUDIO_FITWICK_PENCIL,
  AUDIO_FITWICK_PICKAXE,
  AUDIO_FITWICK_PLIERS,
  AUDIO_FITWICK_QUILL,
  AUDIO_FITWICK_SANDER,
  AUDIO_FITWICK_SAW,
  AUDIO_FITWICK_SCREW,
  AUDIO_FITWICK_SCREWDRIVER,
  AUDIO_FITWICK_SHOVEL,
  AUDIO_FITWICK_SPANNER,
  AUDIO_FITWICK_TAPE_MEASURE,
  AUDIO_FITWICK_WALLET,
  AUDIO_FITWICK_WRENCH,
  AUDIO_FITWICK_DEAD_TREE,
  AUDIO_FITWICK_PALM_TREE,
  AUDIO_FITWICK_PINE_TREE,
  AUDIO_FITWICK_SNOWMAN,
  AUDIO_FITWICK_SNOWY_TREE,
  AUDIO_FITWICK_TREE,
} from "./constants";

// a map of [fitwick name, fitwick audio track key] pairs
export const FITWICKS_AUDIO = new Map<string, string>();
FITWICKS_AUDIO.set("baobab", AUDIO_FITWICK_BAOBAB);
FITWICKS_AUDIO.set("tree", AUDIO_FITWICK_TREE);
FITWICKS_AUDIO.set("dead tree", AUDIO_FITWICK_DEAD_TREE);
FITWICKS_AUDIO.set("pine tree", AUDIO_FITWICK_PINE_TREE);
FITWICKS_AUDIO.set("palm tree", AUDIO_FITWICK_PALM_TREE);
FITWICKS_AUDIO.set("snowy tree", AUDIO_FITWICK_SNOWY_TREE);
FITWICKS_AUDIO.set("snowman", AUDIO_FITWICK_SNOWMAN);
FITWICKS_AUDIO.set("fire pit", AUDIO_FITWICK_FIRE_PIT);
FITWICKS_AUDIO.set("bush", AUDIO_FITWICK_BUSH);
FITWICKS_AUDIO.set("axe", AUDIO_FITWICK_AXE);
FITWICKS_AUDIO.set("box knife", AUDIO_FITWICK_BOX_KNIFE);
FITWICKS_AUDIO.set("brush", AUDIO_FITWICK_BRUSH);
FITWICKS_AUDIO.set("chisel", AUDIO_FITWICK_CHISEL);
FITWICKS_AUDIO.set("compass", AUDIO_FITWICK_COMPASS);
FITWICKS_AUDIO.set("cup", AUDIO_FITWICK_CUP);
FITWICKS_AUDIO.set("drill", AUDIO_FITWICK_DRILL);
FITWICKS_AUDIO.set("hammer", AUDIO_FITWICK_HAMMER);
FITWICKS_AUDIO.set("mallet", AUDIO_FITWICK_MALLET);
FITWICKS_AUDIO.set("monkey wrench", AUDIO_FITWICK_MONKEY_WRENCH);
FITWICKS_AUDIO.set("nail", AUDIO_FITWICK_NAIL);
FITWICKS_AUDIO.set("paint roller", AUDIO_FITWICK_PAINT_ROLLER);
FITWICKS_AUDIO.set("paintbrush", AUDIO_FITWICK_PAINTBRUSH);
FITWICKS_AUDIO.set("pen", AUDIO_FITWICK_PEN);
FITWICKS_AUDIO.set("pencil", AUDIO_FITWICK_PENCIL);
FITWICKS_AUDIO.set("pickaxe", AUDIO_FITWICK_PICKAXE);
FITWICKS_AUDIO.set("pliers", AUDIO_FITWICK_PLIERS);
FITWICKS_AUDIO.set("quill", AUDIO_FITWICK_QUILL);
FITWICKS_AUDIO.set("sander", AUDIO_FITWICK_SANDER);
FITWICKS_AUDIO.set("saw", AUDIO_FITWICK_SAW);
FITWICKS_AUDIO.set("screw", AUDIO_FITWICK_SCREW);
FITWICKS_AUDIO.set("screwdriver", AUDIO_FITWICK_SCREWDRIVER);
FITWICKS_AUDIO.set("shovel", AUDIO_FITWICK_SHOVEL);
FITWICKS_AUDIO.set("spanner", AUDIO_FITWICK_SPANNER);
FITWICKS_AUDIO.set("tape measure", AUDIO_FITWICK_TAPE_MEASURE);
FITWICKS_AUDIO.set("wallet", AUDIO_FITWICK_WALLET);
FITWICKS_AUDIO.set("wrench", AUDIO_FITWICK_WRENCH);

// a map of [fitwick name, array of possible fitwick [texture, frame]] pairs
export const FITWICKS = new Map<string, [string, string][]>();
FITWICKS.set("bush", [
  [TEXTURE_KENNEY_ASSETS, "bush1.png"],
  // these look too much like grass
  // [TEXTURE_KENNEY_ASSETS, "bush2.png"],
  // [TEXTURE_KENNEY_ASSETS, "bush3.png"],
  // [TEXTURE_KENNEY_ASSETS, "bush4.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt1.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushAlt2.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushAlt3.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushAlt4.png"],
  [TEXTURE_KENNEY_ASSETS, "bushOrange1.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushOrange2.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushOrange3.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushOrange4.png"],
]);
FITWICKS.set("green bush", [
  [TEXTURE_KENNEY_ASSETS, "bush1.png"],
  // [TEXTURE_KENNEY_ASSETS, "bush2.png"],
  // [TEXTURE_KENNEY_ASSETS, "bush3.png"],
  // [TEXTURE_KENNEY_ASSETS, "bush4.png"],
  [TEXTURE_KENNEY_ASSETS, "bushAlt1.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushAlt2.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushAlt3.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushAlt4.png"],
]);
FITWICKS.set("orange bush", [
  [TEXTURE_KENNEY_ASSETS, "bushOrange1.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushOrange2.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushOrange3.png"],
  // [TEXTURE_KENNEY_ASSETS, "bushOrange4.png"],
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
  [TEXTURE_KENNEY_ASSETS, "treeOrange.png"],
  [TEXTURE_DESERT_SPRITES, "tree_7.png"],
  [TEXTURE_DESERT_SPRITES, "tree_10.png"],
]);
FITWICKS.set("dead tree", [
  [TEXTURE_KENNEY_ASSETS, "treeDead.png"],
  [TEXTURE_DESERT_SPRITES, "tree_11.png"],
  [TEXTURE_DESERT_SPRITES, "tree_12.png"],
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
FITWICKS.set("snowy tree", [
  [TEXTURE_KENNEY_ASSETS, "treeSnow.png"],
  [TEXTURE_KENNEY_ASSETS, "treeFrozen.png"],
  [TEXTURE_WINTER_SPRITES, "Tree_1.png"],
  [TEXTURE_WINTER_SPRITES, "Tree_2.png"],
]);
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
// TODO: some of these sprites are incorrectly set
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
FITWICKS.set("bowl", [
  [TEXTURE_MEDIEVAL_TROPICAL_SPRITES, "decor_5.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_128.png"],
]);
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
FITWICKS.set("drill", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_001.png"]]);
FITWICKS.set("sander", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_002.png"]]);
FITWICKS.set("cup", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_003.png"]]);
FITWICKS.set("wrench", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_004.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_007.png"],
]);
FITWICKS.set("spanner", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_004.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_007.png"],
]);
FITWICKS.set("screwdriver", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_005.png"],
]);
// TODO: figure out what the "scoop" at _006.png is actually called
FITWICKS.set("monkey wrench", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_008.png"],
]);
FITWICKS.set("pliers", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_009.png"]]);
FITWICKS.set("hammer", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_010.png"]]);
FITWICKS.set("brush", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_011.png"]]);
FITWICKS.set("tape measure", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_012.png"],
]);
FITWICKS.set("box knife", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_013.png"],
]);
FITWICKS.set("paint roller", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_014.png"],
]);
FITWICKS.set("chisel", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_015.png"]]);
FITWICKS.set("saw", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_016.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_017.png"],
]);
FITWICKS.set("screw", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_018.png"]]);
FITWICKS.set("nail", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_019.png"]]);
FITWICKS.set("axe", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_020.png"]]);
FITWICKS.set("pickaxe", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_021.png"]]);
FITWICKS.set("shovel", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_022.png"]]);
FITWICKS.set("mallet", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_023.png"]]);
FITWICKS.set("pencil", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_024.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_026.png"],
]);
FITWICKS.set("pen", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_025.png"]]);
FITWICKS.set("paintbrush", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_027.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_028.png"],
]);
FITWICKS.set("quill", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_029.png"]]);
FITWICKS.set("ink", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_030.png"]]);
FITWICKS.set("palette", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_031.png"]]);
FITWICKS.set("book", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_032.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_033.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_034.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_035.png"],
]);
// skipping item 036 because it's not very clear it's a folder
FITWICKS.set("notepad", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_037.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_038.png"],
]);
// skipping cameras 039-047 because they aren't clear
FITWICKS.set("monitor", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_051.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_052.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_053.png"],
]);
FITWICKS.set("computer", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_054.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_055.png"],
]);
FITWICKS.set("keyboard", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_056.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_057.png"],
]);
FITWICKS.set("mouse", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_058.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_059.png"],
]);
FITWICKS.set("tablet", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_060.png"]]);
// no clue what 061 is
FITWICKS.set("remote", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_062.png"]]);
FITWICKS.set("mobile phone", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_063.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_064.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_065.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_067.png"],
]);
FITWICKS.set("music player", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_066.png"],
]);
// 068 is a casette, kids don't really need this
// 069-072 are unclear
FITWICKS.set("USB", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_073.png"]]);
FITWICKS.set("calculator", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_074.png"],
]);
FITWICKS.set("motherboard", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_075.png"],
]);
FITWICKS.set("RAM", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_076.png"]]);
FITWICKS.set("graphics card", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_077.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_078.png"],
]);
FITWICKS.set("joystick", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_079.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_080.png"],
]);
FITWICKS.set("controller", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_081.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_082.png"],
]);
FITWICKS.set("microphone", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_083.png"],
]);
FITWICKS.set("headphones", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_084.png"],
]);
FITWICKS.set("CD", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_085.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_088.png"],
]);
FITWICKS.set("cursor", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_086.png"]]);
// 087 is unclear
FITWICKS.set("pill", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_089.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_090.png"],
]);
// don't know what 091 is
// 092 is unclear
FITWICKS.set("syringe", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_093.png"]]);
FITWICKS.set("thermometer", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_094.png"],
]);
FITWICKS.set("toothbrush", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_095.png"],
]);
// don't know what 096 and 097 are
// 098 and 099 are pills, too unclear
FITWICKS.set("plaster", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_100.png"]]);
FITWICKS.set("bone", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_101.png"]]);
FITWICKS.set("first aid kit", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_102.png"],
]);
// 103-104 are unclear
FITWICKS.set("vial", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_105.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_108.png"],
]);
FITWICKS.set("test tube", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_106.png"],
]);
FITWICKS.set("beaker", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_107.png"]]);
FITWICKS.set("test tubes", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_109.png"],
]);
FITWICKS.set("stethoscope", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_110.png"],
]);
FITWICKS.set("microscope", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_111.png"],
]);
// 112 is unclear
FITWICKS.set("crutch", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_113.png"]]);
FITWICKS.set("pot", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_114.png"]]);
// 115 is unclear
FITWICKS.set("pan", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_116.png"]]);
// 117 is unclear
FITWICKS.set("glass of water", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_118.png"],
]);
FITWICKS.set("glass of lemonade", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_119.png"],
]);
FITWICKS.set("glass of wine", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_120.png"],
]);
FITWICKS.set("mug", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_121.png"]]);
FITWICKS.set("salt shaker", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_122.png"],
]);
FITWICKS.set("pepper shaker", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_123.png"],
]);
FITWICKS.set("kettle", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_124.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_125.png"],
]);
FITWICKS.set("thermal flask", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_126.png"],
]);
FITWICKS.set("fork", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_129.png"]]);
FITWICKS.set("spoon", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_130.png"]]);
FITWICKS.set("knife", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_131.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_134.png"],
]);
FITWICKS.set("oven glove", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_132.png"],
]);
FITWICKS.set("cutting board", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_133.png"],
]);
FITWICKS.set("spatula", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_135.png"]]);
FITWICKS.set("tongs", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_136.png"]]);
FITWICKS.set("blender", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_137.png"]]);
FITWICKS.set("toaster", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_138.png"]]);
FITWICKS.set("coffee machine", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_139.png"],
]);
FITWICKS.set("rolling pin", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_140.png"],
]);
FITWICKS.set("suitcase", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_141.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_143.png"],
]);
FITWICKS.set("luggage", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_142.png"]]);
FITWICKS.set("purse", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_143.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_144.png"],
]);
FITWICKS.set("school bag", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_146.png"],
]);
FITWICKS.set("steering wheel", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_147.png"],
]);
FITWICKS.set("passport", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_148.png"]]);
FITWICKS.set("ID card", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_149.png"]]);
// 150 is unclear
FITWICKS.set("ID badge", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_151.png"]]);
// 152 is unclear
// don't know what 153 is called
FITWICKS.set("key", [
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_154.png"],
  [TEXTURE_KENNEY_ITEMS, "genericItem_color_155.png"],
]);
// don't know what 156 is
FITWICKS.set("wallet", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_157.png"]]);
FITWICKS.set("money", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_158.png"]]);
// 159-161 are coins, too unclear
FITWICKS.set("compass", [[TEXTURE_KENNEY_ITEMS, "genericItem_color_162.png"]]);
// don't know what 163 is
