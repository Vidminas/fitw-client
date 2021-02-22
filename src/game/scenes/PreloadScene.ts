import {
  TEXTURE_BACKGROUND_BRIDGE,
  TEXTURE_BACKGROUND_FOREST,
  TEXTURE_BACKGROUND_MOUNTAIN,
  TEXTURE_BACKGROUND_ROAD,
  TEXTURE_BACKGROUND_VALLEY,
  TEXTURE_BUTTONS,
} from "../constants";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene", active: true });
  }

  preload() {
    const progress = this.add.graphics();
    this.load.on("progress", (value: number) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, 270, 800 * value, 60);
    });
    this.load.on("complete", function () {
      progress.destroy();
    });

    this.load.multiatlas(TEXTURE_BUTTONS, "ui/buttons.json", "ui/");
    this.load.image(TEXTURE_BACKGROUND_BRIDGE, "backgrounds/bg_bridge.jpg");
    this.load.image(TEXTURE_BACKGROUND_FOREST, "backgrounds/bg_forest.jpg");
    this.load.image(TEXTURE_BACKGROUND_MOUNTAIN, "backgrounds/bg_mountain.jpg");
    this.load.image(TEXTURE_BACKGROUND_ROAD, "backgrounds/bg_road.jpg");
    this.load.image(TEXTURE_BACKGROUND_VALLEY, "backgrounds/bg_valley.jpg");
  }

  create() {
    this.scene.launch("MainScene");
    this.scene.launch("UIScene");
  }
}

export default PreloadScene;
