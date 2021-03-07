import { TINT_GREEN } from "../colors";
import { SCALE_RATIO } from "../constants";
import FITWICKS from "../fitwicks";
import RexScene from "../scenes/RexScene";

type FitwickState = "rest" | "move";

class Fitwick extends Phaser.GameObjects.Sprite {
  static exists(name: string) {
    return FITWICKS.has(name);
  }

  state!: FitwickState;
  name: string;

  constructor(scene: RexScene, x: number, y: number, inputName: string) {
    if (!FITWICKS.has(inputName)) {
      throw new Error(`Fitwick ${inputName} not found but created anyway!`);
    }
    const randomAtlasElement = Phaser.Utils.Array.GetRandom(
      FITWICKS.get(inputName)!
    );
    const texture = randomAtlasElement[0];
    const frame = randomAtlasElement[1];
    super(scene, x, y, texture, frame);
    this.setScale(SCALE_RATIO / 3);
    scene.add.existing(this);
    this.name = inputName;
    this.pickUp();
  }

  pickUp() {
    this.state = "move";
    this.setTintFill(TINT_GREEN);
  }

  placeDown() {
    this.state = "rest";
    this.clearTint();
    // this.scene.add
    //   .graphics()
    //   .strokeRectShape(this.getBounds())
    //   .lineStyle(4, 0xff00ff);
  }
}

export default Fitwick;
