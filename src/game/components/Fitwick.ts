import { TEXTURE_KENNEY_ASSETS } from "../constants";

const knownFitwicks = ["bush1", "bush2", "bush3", "bush4"];

class Fitwick extends Phaser.GameObjects.Sprite {
  static exists(name: string) {
    return knownFitwicks.includes(name);
  }

  constructor(scene: Phaser.Scene, x: number, y: number, inputName: string) {
    super(scene, x, y, TEXTURE_KENNEY_ASSETS, inputName);
  }
}

export default Fitwick;
