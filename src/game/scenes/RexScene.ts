import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import RexGesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin.js";

// Template class with minimal phaser3-rex-plugins
class RexScene extends Phaser.Scene {
  public rexUI: any;
  public rexGestures: any;

  preload() {
    this.load.scenePlugin("rexUI", RexUIPlugin);
    this.load.scenePlugin("rexGestures", RexGesturesPlugin);
  }
}

export default RexScene;
