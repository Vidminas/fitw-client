import IFitwick from "../../api/fitwick";
import { EXTERNAL_TINTS, TINT_GREEN } from "../colors";
import {
  CONFIG_FITWICKS,
  SCALE_RATIO,
  TEXTURE_FITWICK_PLACEHOLDER,
} from "../constants";
import { FitwickConfigSection } from "../fitwickLoader";

class Fitwick extends Phaser.GameObjects.Sprite implements IFitwick {
  static findInConfig(scene: Phaser.Scene, name: string) {
    const fitwicks = scene.cache.json.get(
      CONFIG_FITWICKS
    ) as FitwickConfigSection;
    if (!fitwicks) {
      return undefined;
    }
    return fitwicks.fitwicks.find(
      (fitwick) => fitwick.name === name.toLowerCase()
    );
  }

  private lazyLoadAtlas(atlasTexture: string, atlasFrame: string) {
    const fitwicks = this.scene.cache.json.get(
      CONFIG_FITWICKS
    ) as FitwickConfigSection;
    if (!fitwicks) {
      return undefined;
    }

    const atlas = fitwicks.atlases.find((atlas) => atlas.key === atlasTexture);
    if (!atlas) {
      console.warn(
        `Fitwick atlas ${atlasTexture} not found in fitwick config!`
      );
      return undefined;
    }

    if (atlas.type === "atlasXML") {
      this.scene.load.atlasXML(
        atlas.key,
        `${fitwicks.path}/${atlas.texture}`,
        `${fitwicks.path}/${atlas.layout}`
      );
    } else if (atlas.type === "atlasJSON") {
      this.scene.load.atlas(
        atlas.key,
        `${fitwicks.path}/${atlas.texture}`,
        `${fitwicks.path}/${atlas.layout}`
      );
    } else {
      console.warn(
        `Encountered unimplemented atlas type ${atlas.type} of ${atlas.key}`
      );
      return undefined;
    }

    this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.setTexture(atlasTexture, atlasFrame);
      (this.input.hitArea as Phaser.Geom.Rectangle).setSize(
        this.width,
        this.height
      );
    });
    this.scene.load.start();
  }

  private lazyLoadSound(pronunciation: string) {
    const fitwicks = this.scene.cache.json.get(
      CONFIG_FITWICKS
    ) as FitwickConfigSection;
    if (!fitwicks) {
      return undefined;
    }

    this.scene.load.audio(pronunciation, `${fitwicks.path}/${pronunciation}`);
    this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.audio = this.scene.sound.add(pronunciation);
    });
    this.scene.load.start();
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
      ) as [string, string];
      atlasTexture = randomAtlasElement[0];
      atlasFrame = randomAtlasElement[1];
    }

    if (
      scene.textures.exists(atlasTexture!) &&
      scene.textures.getFrame(atlasTexture!, atlasFrame)
    ) {
      super(scene, x, y, atlasTexture!, atlasFrame);
    } else {
      super(scene, x, y, TEXTURE_FITWICK_PLACEHOLDER);
      if (scene.textures.exists(atlasTexture!)) {
        console.warn(
          `Fitwick ${inputName}, frame ${atlasFrame} not found in atlas ${atlasTexture}!`
        );
      } else {
        this.lazyLoadAtlas(atlasTexture!, atlasFrame!);
      }
    }

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
      if (scene.cache.audio.has(fitwickConfig.pronunciation)) {
        this.audio = scene.sound.add(fitwickConfig.pronunciation);
      } else {
        this.lazyLoadSound(fitwickConfig.pronunciation);
      }
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
