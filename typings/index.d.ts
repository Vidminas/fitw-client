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
    setFocus();
    get text(): string;
  }
  export default InputText;
}

declare module "phaser3-rex-plugins/plugins/containerlite.js" {
  class ContainerLite extends Phaser.GameObjects.Zone {
    constructor(
      scene: Phaser.Scene,
      x: number,
      y: number,
      width: number,
      height: number,
      children?: Phaser.GameObjects.GameObject[]
    );
    add(child: Phaser.GameObjects.GameObject);
  }
  export default ContainerLite;
}

declare module "phaser3-rex-plugins/templates/ui/ui-components.js" {
  export class BaseSizer extends Phaser.GameObjects.GameObject {
    constructor(scene: Phaser.Scene);
    addBackground(background: any);
    add(child: any);
    add(
      child: any,
      key: string | undefined,
      align: string,
      padding: any,
      expand: boolean
    );
    popUp(duration: number);
    scaleDownDestroy(duration: number);
    drawBounds(graphics: Phaser.GameObjects.Graphics, color?: number);
    setAnchor(config: any);
    layout();
    pushIntoBounds();
  }

  export class Dialog extends BaseSizer {
    constructor(scene: Phaser.Scene, config?: any);

    addAction(child: Phaser.GameObjects.GameObject);
    getElement(name: string): any;
  }

  export class Sizer extends BaseSizer {
    constructor(scene: Phaser.Scene, config?: any);
  }

  export class OverlapSizer extends BaseSizer {
    constructor(
      scene: Phaser.Scene,
      x: number,
      y: number,
      minWidth: number,
      minHeight: number,
      config?: any
    );
  }

  export class ScrollablePanel extends Sizer {
    t: number;
    childOY: number;
    topChildOY: number;
    bottomChildOY: number;
    setT(percentage: number);
    setChildOY(oy: number);
  }
}
