declare module "*.png" {
  const content: any;
  export default content;
}

declare module "phaser3-rex-plugins/templates/ui/ui-plugin.js" {
  class RexUIPlugin extends Phaser.Plugins.ScenePlugin {}
  export default RexUIPlugin;
}

declare module "phaser3-rex-plugins/plugins/gestures-plugin.js" {
  class RexGesturesPlugin extends Phaser.Plugins.ScenePlugin {}
  export default RexGesturesPlugin;
}

declare module "phaser3-rex-plugins/plugins/inputtext.js" {
  class InputText extends Phaser.GameObjects.DOMElement {
    constructor(
      scene: Phaser.Scene,
      x: number,
      y: number,
      width: number,
      height: number,
      config: any
    );
    setStyle: (key: string, value: string) => void;
    get text(): string;
  }
  export default InputText;
}
