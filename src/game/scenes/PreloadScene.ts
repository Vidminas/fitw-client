import {
  BACKGROUND_TEXTURES,
  GAME_HEIGHT,
  GAME_WIDTH,
  MUSIC_TRACKS,
  TEXTURE_BUTTONS,
  TEXTURE_DESERT_SPRITES,
  TEXTURE_KENNEY_ASSETS,
  TEXTURE_KENNEY_ITEMS,
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
    const progressBoxWidth = GAME_WIDTH / 2;
    const progressBoxHeight = 50;
    const progressBoxPadding = 20;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(
      (GAME_WIDTH - progressBoxWidth) / 2,
      (GAME_HEIGHT - progressBoxHeight) / 2,
      progressBoxWidth,
      progressBoxHeight
    );

    const percentText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "0%", {
      font: "18px monospace",
      color: "#ffffff",
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        (GAME_WIDTH - progressBoxWidth + progressBoxPadding) / 2,
        (GAME_HEIGHT - progressBoxHeight + progressBoxPadding) / 2,
        (progressBoxWidth - progressBoxPadding) * value,
        progressBoxHeight - progressBoxPadding
      );
      percentText.setText(Math.round(value * 100) + "%");
    });

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
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
    this.load.atlasXML(
      TEXTURE_KENNEY_ITEMS,
      "fitwicks/genericItems_spritesheet_colored.png",
      "fitwicks/genericItems_spritesheet_colored.xml"
    );

    BACKGROUND_TEXTURES.forEach((texture: string) => {
      this.load.image(texture, `backgrounds/${texture}`);
    });
  }

  create() {
    this.scene.launch("MainScene");
    this.scene.launch("GUIScene");
    this.scene.launch("ModalScene");
  }
}

export default PreloadScene;
