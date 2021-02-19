import Phaser from "phaser";
import { Socket } from "socket.io-client";
import * as dat from "dat.gui";
import IWorld from "../../api/world";
import Button from "../components/Button";
import AddDialog from "../components/AddDialog";
import Fitwick from "../components/Fitwick";

class MainScene extends Phaser.Scene {
  public rexUI: any;
  public rexGestures: any;
  private socket: Socket;
  private world: IWorld;
  private controls?: Phaser.Cameras.Controls.SmoothedKeyControl;

  constructor(socket: Socket, world: IWorld) {
    super("MainScene");
    this.socket = socket;
    this.world = world;
  }

  preload() {
    const progress = this.add.graphics();
    this.load.on("progress", (value: number) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, 270, 800 * value, 60);
    });
    this.load.on("complete", function () {
      progress.destroy();
    });

    this.load.multiatlas("buttons", "ui/buttons.json", "ui/");
  }

  create() {
    let addDialog: AddDialog | undefined = undefined;

    const addButton = new Button(
      this,
      400,
      300,
      "buttons",
      "Button_162.png",
      "Button_163.png",
      "Button_164.png",
      () => {
        addButton.destroy();
        if (addDialog === undefined) {
          addDialog = new AddDialog(this, 400, 300, (text: string) => {
            this.add.existing(new Fitwick(this, 400, 300, "buttons"));
          });
        }
      }
    );

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
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );

    var cam = this.cameras.main;

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

    const gui = new dat.GUI();

    var help = {
      line1: "Cursors to move",
    };

    var f1 = gui.addFolder("Camera");
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
