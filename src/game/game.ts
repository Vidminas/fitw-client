import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

export const initGame = (parent: string) => {
  const game = new Phaser.Game({
    parent,
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainScene],
    plugins: {
      scene: [
        {
          key: "rexUI",
          plugin: RexUIPlugin,
          mapping: "rexUI",
        },
      ],
    },
  });
  return game;
};
