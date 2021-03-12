import IFitwick from "../../api/fitwick";
import { TINT_GREEN } from "../colors";
import { SCALE_RATIO } from "../constants";
import { FITWICKS, FITWICKS_AUDIO } from "../fitwicks";

class Fitwick extends Phaser.GameObjects.Sprite implements IFitwick {
  static exists(name: string) {
    return FITWICKS.has(name);
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
    if (!FITWICKS.has(inputName)) {
      throw new Error(`Fitwick ${inputName} not found but created anyway!`);
    }

    const existingFitwick = worldId && atlasTexture && atlasFrame;
    if (!existingFitwick) {
      worldId = `${inputName}/${x}:${y}:${Date.now()}`;
      const randomAtlasElement = Phaser.Utils.Array.GetRandom(
        FITWICKS.get(inputName)!
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
    if (FITWICKS_AUDIO.has(this.name)) {
      this.audio = scene.sound.add(FITWICKS_AUDIO.get(this.name)!);
    }
    // this.scene.add
    //   .graphics()
    //   .strokeRectShape(this.getBounds())
    //   .lineStyle(4, 0xff00ff);
  }

  pickUp() {
    this.state = "move";
    this.setTintFill(TINT_GREEN);
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
