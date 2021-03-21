import { EVENT_WORLD_DATA } from "../../api/events";
import IWorld from "../../api/world";
import { COLOR_STRING_WHITE } from "../colors";
import {
  BACKGROUND_TEXTURES,
  MUSIC_TRACKS,
  TEXTURE_BUTTONS,
  TEXTURE_DESERT_SPRITES,
  TEXTURE_KENNEY_ASSETS,
  TEXTURE_KENNEY_ITEMS,
  TEXTURE_MEDIEVAL_TROPICAL_SPRITES,
  TEXTURE_UNDERWATER_SPRITES,
  TEXTURE_WINTER_SPRITES,
  UI_BIG_FONT_SIZE,
  UI_BUTTON_SIZE,
} from "../constants";
import { FITWICKS_AUDIO } from "../fitwicks";

class PreloadScene extends Phaser.Scene {
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  private percentText!: Phaser.GameObjects.Text;
  private worldData?: IWorld;

  private progressBoxWidth!: number;
  private progressBoxHeight!: number;
  private progressBoxPadding!: number;

  constructor() {
    super({ key: "PreloadScene", active: true });
  }

  preload() {
    this.progressBoxWidth = this.scale.width / 2;
    this.progressBoxHeight = UI_BUTTON_SIZE;
    this.progressBoxPadding = UI_BUTTON_SIZE / 2;

    this.game.events.once(EVENT_WORLD_DATA, (world: IWorld) => {
      this.worldData = world;
    });

    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(
      (this.scale.width - this.progressBoxWidth) / 2,
      (this.scale.height - this.progressBoxHeight) / 2,
      this.progressBoxWidth,
      this.progressBoxHeight
    );

    this.percentText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      "0%",
      {
        fontSize: UI_BIG_FONT_SIZE,
        color: COLOR_STRING_WHITE,
      }
    );
    this.percentText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value: number) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(0xffffff, 1);
      this.progressBar.fillRect(
        (this.scale.width - this.progressBoxWidth + this.progressBoxPadding) /
          2,
        (this.scale.height - this.progressBoxHeight + this.progressBoxPadding) /
          2,
        (this.progressBoxWidth * (0.8 + (this.worldData ? 0.2 : 0)) -
          this.progressBoxPadding) *
          value,
        this.progressBoxHeight - this.progressBoxPadding
      );
      // 0-80% for loading local assets
      // 80-100% for getting world data from server
      this.percentText.setText(
        Math.round(value * (80 + (this.worldData ? 20 : 0))) + "%"
      );
    });

    this.load.on("complete", () => {
      if (this.worldData) {
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.percentText.destroy();
      }
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
    if (process.env.REACT_APP_DEBUG) {
      // This assumes that running on localhost, loading assets would take longer
      // than getting world data from the server.
      // This way, when the code reaches this point, if there is no world data
      // probably the server is not running and we can just go with undefined
      this.scene.launch("MainScene", this.worldData);
      this.scene.launch("GUIScene");
      this.scene.launch("ModalScene");
    } else if (this.worldData) {
      this.scene.launch("MainScene", this.worldData);
      this.scene.launch("GUIScene");
      this.scene.launch("ModalScene");
    } else {
      this.game.events.off(EVENT_WORLD_DATA);
      this.game.events.once(EVENT_WORLD_DATA, (world: IWorld) => {
        this.worldData = world;
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(
          (this.scale.width - this.progressBoxWidth + this.progressBoxPadding) /
            2,
          (this.scale.height -
            this.progressBoxHeight +
            this.progressBoxPadding) /
            2,
          this.progressBoxWidth - this.progressBoxPadding,
          this.progressBoxHeight - this.progressBoxPadding
        );
        this.percentText.setText("100%");

        this.scene.launch("MainScene", this.worldData);
        this.scene.launch("GUIScene");
        this.scene.launch("ModalScene");

        this.progressBar.destroy();
        this.progressBox.destroy();
        this.percentText.destroy();
      });
    }
  }
}

export default PreloadScene;
