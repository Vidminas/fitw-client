declare module "*.png" {
  const content: any;
  export default content;
}

declare module "phaser3-rex-plugins/templates/ui/ui-plugin.js" {
  class RexUIPlugin extends Phaser.Plugins.ScenePlugin {}
  export default RexUIPlugin;
}
