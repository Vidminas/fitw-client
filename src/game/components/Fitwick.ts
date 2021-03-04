import { TINT_GREEN } from "../colors";
import { TEXTURE_KENNEY_ASSETS } from "../constants";
import RexScene from "../scenes/RexScene";

const knownFitwicks = ["bush1", "bush2", "bush3", "bush4"];

type FitwickState = "rest" | "move";

class Fitwick extends Phaser.GameObjects.Sprite {
  static exists(name: string) {
    return knownFitwicks.includes(name);
  }

  state: FitwickState;

  constructor(scene: RexScene, x: number, y: number, inputName: string) {
    super(scene, x, y, TEXTURE_KENNEY_ASSETS, inputName);
    scene.add.existing(this);
    this.state = "move";
    this.setTintFill(TINT_GREEN);
  }

  placeDown() {
    this.state = "rest";
    this.clearTint();
  }
}

export default Fitwick;
