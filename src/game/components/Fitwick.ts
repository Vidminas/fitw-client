import { TINT_GREEN } from "../colors";
import { TEXTURE_KENNEY_ASSETS } from "../constants";
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
    super(
      scene,
      x,
      y,
      TEXTURE_KENNEY_ASSETS,
      Phaser.Utils.Array.GetRandom(FITWICKS.get(inputName))
    );
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
