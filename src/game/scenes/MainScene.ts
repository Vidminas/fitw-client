import Phaser from "phaser";
import { Socket } from "socket.io-client";
import * as dat from "dat.gui";
import IWorld from "../../api/world";
import { RexScene } from "./RexScene";
import {
  GAME_BG_HEIGHT,
  GAME_BG_WIDTH,
  MAX_ZOOM_FACTOR,
  MIN_ZOOM_FACTOR,
} from "../constants";

class MainScene extends RexScene {
  private socket: Socket;
  private world: IWorld;
  private controls?: Phaser.Cameras.Controls.SmoothedKeyControl;
  private backgroundTexture?: string;
  private background?: Phaser.GameObjects.Image;

  constructor(socket: Socket, world: IWorld) {
    super({ key: "MainScene", active: false });
    this.socket = socket;
    this.world = world;
  }

  setBackground(backgroundTexture: string) {
    this.backgroundTexture = backgroundTexture;
    if (!this.background?.visible) {
      this.background?.setVisible(true);
    }
    this.background?.setTexture(backgroundTexture);
  }

  updateData(_parent: Phaser.Game, key: string, data: any) {
    if (key === "bgTexture") {
      this.setBackground(data);
    }
  }

  create() {
    this.background = this.add.image(0, 0, "").setOrigin(0).setVisible(false);
    this.registry.set("bgTexture", undefined);
    this.registry.events.on("changedata", this.updateData, this);
    // this.scene.launch("UIScene");
    // const txt = this.rexUI.add.BBCodeText(
    //   100,
    //   200,
    //   `[color=yellow]Connected to [/color][color=green]${SERVER_ADDRESS}[/color]`
    // );
    // console.log(txt);
    // this.socket.emit("Hey from MainScene");
    // const keys = this.textures.getTextureKeys();

    // for (let i = 0; i < keys.length; i++) {
    //   const x = Phaser.Math.Between(0, 800);
    //   const y = Phaser.Math.Between(0, 600);
    //   const image = this.add.image(x, y, keys[i]).setInteractive();
    //   this.input.setDraggable(image);
    // }

    // this.input.on(
    //   "drag",
    //   function (
    //     pointer: any,
    //     gameObject: { x: any; y: any },
    //     dragX: any,
    //     dragY: any
    //   ) {
    //     gameObject.x = dragX;
    //     gameObject.y = dragY;
    //   }
    // );

    //  From here down is just camera controls and feedback
    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.02,
      drag: 0.0005,
      maxSpeed: 1.0,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );

    const cam = this.cameras.main;

    // this prevents camera from scrolling out of bounds
    cam.setBounds(0, 0, GAME_BG_WIDTH, GAME_BG_HEIGHT, true);

    const pan = this.rexGestures.add.pan();
    pan.on(
      "pan",
      (
        pan: any,
        _gameObject: Phaser.GameObjects.GameObject,
        _lastPointer: Phaser.Input.Pointer
      ) => {
        cam.setScroll(cam.scrollX - pan.dx, cam.scrollY - pan.dy);
      }
    );

    const pinch = this.rexGestures.add.pinch();
    pinch.on("pinch", (pinch: any) => {
      const zoom = cam.zoom * pinch.scaleFactor;
      if (
        zoom > MIN_ZOOM_FACTOR &&
        zoom < MAX_ZOOM_FACTOR &&
        cam.height / zoom < GAME_BG_HEIGHT &&
        cam.width / zoom < GAME_BG_WIDTH
      ) {
        cam.setZoom(zoom);
      }
    });

    const gui = new dat.GUI();

    const help = {
      line1: "Cursors to move",
    };

    const f1 = gui.addFolder("Camera");
    f1.add(cam, "x").listen();
    f1.add(cam, "y").listen();
    f1.add(cam, "scrollX").listen();
    f1.add(cam, "scrollY").listen();
    f1.add(cam, "rotation").min(0).step(0.01).listen();
    f1.add(help, "line1");
    f1.open();
  }

  update(time: any, delta: number) {
    this.controls?.update(delta);
  }
}

export default MainScene;
