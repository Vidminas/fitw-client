import {
  BACKGROUND_TEXTURES,
  MUSIC_TRACKS,
  TEXTURE_BUTTONS,
  TEXTURE_DESERT_SPRITES,
  TEXTURE_KENNEY_ASSETS,
  TEXTURE_MEDIEVAL_TROPICAL_SPRITES,
  TEXTURE_UNDERWATER_SPRITES,
  TEXTURE_WINTER_SPRITES,
} from "../constants";
import { FITWICKS_AUDIO } from "../fitwicks";

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

    MUSIC_TRACKS.forEach((track) => this.load.audio(track, `music/${track}`));

    FITWICKS_AUDIO.forEach((track) =>
      this.load.audio(track, `fitwicks/${track}`)
    );

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
    this.load.atlasXML(
      TEXTURE_DESERT_SPRITES,
      "fitwicks/desert_sprites.png",
      "fitwicks/desert_sprites.xml"
    );
    this.load.atlasXML(
      TEXTURE_MEDIEVAL_TROPICAL_SPRITES,
      "fitwicks/medieval_tropical_sprites.png",
      "fitwicks/medieval_tropical_sprites.xml"
    );
    this.load.atlasXML(
      TEXTURE_WINTER_SPRITES,
      "fitwicks/winter_sprites.png",
      "fitwicks/winter_sprites.xml"
    );

    BACKGROUND_TEXTURES.forEach((texture: string) => {
      this.load.image(texture, `backgrounds/${texture}`);
    });
  }

  create() {
    this.scene.launch("MainScene");
    this.scene.launch("UIScene");
  }
}

export default PreloadScene;
