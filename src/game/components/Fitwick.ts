import IFitwick from "../../api/fitwick";
import { EXTERNAL_TINTS, TINT_GREEN } from "../colors";
import { CONFIG_FITWICKS, SCALE_RATIO } from "../constants";
import { FitwickConfigSection } from "../fitwickLoader";

class Fitwick extends Phaser.GameObjects.Sprite implements IFitwick {
  static findInConfig(scene: Phaser.Scene, name: string) {
    if (!scene.cache.json.has(CONFIG_FITWICKS)) {
      return undefined;
    }
    const fitwicks = scene.cache.json.get(
      CONFIG_FITWICKS
    ) as FitwickConfigSection;
    return fitwicks.fitwicks.find(
      (fitwick) => fitwick.name === name.toLowerCase()
    );
  }

  public worldId: string;
  public state: "rest" | "move";
  public name: string;
  public atlasTexture: string;
  public atlasFrame: string;

  private audio?: Phaser.Sound.BaseSound;

  constructor(
    scene: Phaser.Scene,
    inputName: string,
    x: number,
    y: number,
    worldId?: string,
    atlasTexture?: string,
    atlasFrame?: string
  ) {
    const fitwickConfig = Fitwick.findInConfig(scene, inputName);
    if (!fitwickConfig) {
      throw new Error(`Fitwick ${inputName} not found but created anyway!`);
    }

    const existingFitwick = worldId && atlasTexture && atlasFrame;
    if (!existingFitwick) {
      worldId = `${inputName}/${x}:${y}:${Date.now()}`;
      const randomAtlasElement = Phaser.Utils.Array.GetRandom(
        fitwickConfig.sprites
      );
      atlasTexture = randomAtlasElement[0];
      atlasFrame = randomAtlasElement[1];
    }

    super(scene, x, y, atlasTexture!, atlasFrame);
    this.setScale(SCALE_RATIO / 3);
    scene.add.existing(this);

    this.name = inputName;
    this.worldId = worldId!;
    this.atlasTexture = atlasTexture!;
    this.atlasFrame = atlasFrame!;
    this.state = "rest";
    this.setInteractive({
      useHandCursor: true,
    });

    if (fitwickConfig.pronunciation) {
      this.audio = scene.sound.add(fitwickConfig.pronunciation);
    }
    // this.scene.add
    //   .graphics()
    //   .strokeRectShape(this.getBounds())
    //   .lineStyle(4, 0xff00ff);
  }

  pickUp(external: boolean) {
    this.state = "move";
    if (!external) {
      this.setTintFill(TINT_GREEN);
      this.audio?.play();
    } else {
      this.setTintFill(Phaser.Utils.Array.GetRandom(EXTERNAL_TINTS));
    }
  }

  placeDown() {
    this.state = "rest";
    this.clearTint();
  }

  playAudio() {
    this.audio?.play();
  }
}

export default Fitwick;
