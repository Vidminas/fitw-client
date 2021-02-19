const knownFitwicks = ["duck"];

class Fitwick extends Phaser.GameObjects.Sprite {
  static exists(name: string) {
    return knownFitwicks.includes(name);
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    inputName: string
  ) {
    super(scene, x, y, texture);
  }
}

export default Fitwick;
