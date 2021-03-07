import {
  BACKGROUND_TEXTURES,
  TEXTURE_BUTTONS,
  TEXTURE_KENNEY_ASSETS,
  TEXTURE_UNDERWATER_SPRITES,
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
    this.load.atlasXML(
      TEXTURE_KENNEY_ASSETS,
      "fitwicks/kenney_spritesheet.png",
      "fitwicks/kenney_spritesheet.xml"
    );
    this.load.atlasXML(
      TEXTURE_UNDERWATER_SPRITES,
      "fitwicks/underwater_sprites.png",
      "fitwicks/underwater_sprites.xml"
    );

    BACKGROUND_TEXTURES.forEach((texture: string) => {
      this.load.image(texture, `backgrounds/${texture}.png`);
    });
  }

  create() {
    this.scene.launch("MainScene");
    this.scene.launch("UIScene");
  }
}

export default PreloadScene;
