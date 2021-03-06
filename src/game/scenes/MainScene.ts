import Phaser from "phaser";
import { Socket } from "socket.io-client";
import * as dat from "dat.gui";
import IWorld from "../../api/world";
import { RexScene } from "./RexScene";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  MAX_SCROLL_X,
  MAX_SCROLL_Y,
  MAX_ZOOM_FACTOR,
  EVENT_FITWICK_NEW,
  TEXTURE_BACKGROUND_EMPTY,
  EVENT_FITWICK_PLACE,
  EVENT_FITWICK_DELETE,
  EVENT_FITWICK_MOVE,
  EVENT_FITWICK_TAP,
  SPEECH_BUBBLE_HEIGHT,
} from "../constants";
import Fitwick from "../components/Fitwick";
import SpeechBubble from "../components/SpeechBubble";

class MainScene extends RexScene {
  private socket: Socket;
  private world: IWorld;
  private controls?: Phaser.Cameras.Controls.SmoothedKeyControl;
  private backgroundTexture!: string;
  private background!: Phaser.GameObjects.TileSprite;

  private activeFitwick?: Fitwick;
  private activeSpeechBubble?: SpeechBubble;

  constructor(socket: Socket, world: IWorld) {
    super({ key: "MainScene", active: false });
    this.socket = socket;
    this.world = world;
  }

  setBackground(backgroundTexture: string) {
    this.backgroundTexture = backgroundTexture;
    this.background?.setTexture(backgroundTexture);
  }

  updateData(_parent: Phaser.Game, key: string, data: any) {
    if (key === "bgTexture") {
      this.setBackground(data);
    }
  }

  create() {
    this.backgroundTexture = TEXTURE_BACKGROUND_EMPTY;
    this.background = this.add
      .tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, TEXTURE_BACKGROUND_EMPTY)
      .setOrigin(0);
    this.background.setScrollFactor(0);

    this.registry.set("bgTexture", TEXTURE_BACKGROUND_EMPTY);
    this.registry.events.on("changedata", this.updateData, this);

    const cam = this.cameras.main;

    const uiScene = this.scene.get("UIScene");
    uiScene.events.on(EVENT_FITWICK_NEW, (fitwickName: string) => {
      this.activeFitwick = new Fitwick(
        this,
        cam.scrollX + GAME_WIDTH / 2,
        cam.scrollY + GAME_HEIGHT / 2,
        fitwickName
      );
      this.activeFitwick.setInteractive();
      this.input.setDraggable(this.activeFitwick);
      this.activeFitwick.on(
        "drag",
        function (
          this: Fitwick,
          _pointer: Phaser.Input.Pointer,
          dragX: number,
          dragY: number
        ) {
          this.x = dragX;
          this.y = dragY;
        }
      );
      cam.startFollow(this.activeFitwick, true, 0.05);
    });
    uiScene.events.on(EVENT_FITWICK_PLACE, () => {
      this.activeFitwick!.removeListener("drag");
      this.activeFitwick!.placeDown();
      cam.stopFollow();
      // TODO: there is probably a memory leak when this is not cleaned up on delete
      this.rexGestures.add
        .press(this.activeFitwick)
        .on(
          "pressstart",
          (
            _press: any,
            gameObject: Phaser.GameObjects.GameObject | undefined,
            _lastPointer: Phaser.Input.Pointer
          ) => {
            if (!this.activeFitwick && gameObject?.state === "rest") {
              uiScene.events.emit(EVENT_FITWICK_MOVE, gameObject);
            }
          }
        );
      // TODO: same as with rexGestures.press
      this.rexGestures.add
        .tap(this.activeFitwick)
        .on(
          "tap",
          (
            _tap: any,
            gameObject: Phaser.GameObjects.GameObject | undefined,
            _lastPointer: Phaser.Input.Pointer
          ) => {
            if (!this.activeFitwick && gameObject?.state === "rest") {
              uiScene.events.emit(EVENT_FITWICK_TAP, gameObject);
              const fitwick = gameObject as Fitwick;

              if (
                this.activeSpeechBubble &&
                this.activeSpeechBubble.parent !== fitwick
              ) {
                this.activeSpeechBubble.destroy();
                this.activeSpeechBubble = undefined;
              }

              if (!this.activeSpeechBubble) {
                this.activeSpeechBubble = new SpeechBubble(
                  this,
                  fitwick,
                  fitwick.x - fitwick.displayWidth / 2,
                  fitwick.y - fitwick.displayHeight / 2 - SPEECH_BUBBLE_HEIGHT,
                  fitwick.displayWidth,
                  SPEECH_BUBBLE_HEIGHT,
                  fitwick.name
                );
              }
            }
          }
        );
      this.activeFitwick = undefined;
    });
    uiScene.events.on(EVENT_FITWICK_DELETE, () => {
      this.activeFitwick?.removeListener("drag");
      this.activeFitwick?.destroy();
      cam.stopFollow();
      this.activeFitwick = undefined;
    });
    uiScene.events.on(EVENT_FITWICK_MOVE, (fitwick: Fitwick) => {
      if (this.activeSpeechBubble) {
        this.activeSpeechBubble.destroy();
        this.activeSpeechBubble = undefined;
      }

      this.activeFitwick = fitwick;
      this.activeFitwick.on(
        "drag",
        function (
          this: Fitwick,
          _pointer: Phaser.Input.Pointer,
          dragX: number,
          dragY: number
        ) {
          this.x = dragX;
          this.y = dragY;
        }
      );
      cam.startFollow(this.activeFitwick, true, 0.05);
      this.activeFitwick.pickUp();
    });

    // this prevents camera from scrolling out of bounds
    cam.setBounds(0, 0, MAX_SCROLL_X, MAX_SCROLL_Y, false);

    const pan = this.rexGestures.add.pan();
    pan.on(
      "pan",
      (
        pan: any,
        gameObject: Phaser.GameObjects.GameObject,
        _lastPointer: Phaser.Input.Pointer
      ) => {
        // the active fitwick has its own input drag behaviour
        if (!gameObject || gameObject !== this.activeFitwick) {
          cam.setScroll(cam.scrollX - pan.dx, cam.scrollY - pan.dy);
        }
      }
    );

    const pinch = this.rexGestures.add.pinch();
    pinch.on("pinch", (pinch: any) => {
      let zoom = cam.zoom * pinch.scaleFactor;
      if (zoom > MAX_ZOOM_FACTOR) {
        zoom = MAX_ZOOM_FACTOR;
      } else {
        if (zoom < cam.height / GAME_HEIGHT) {
          zoom = cam.height / GAME_HEIGHT;
        }
        if (zoom < cam.width / GAME_WIDTH) {
          zoom = cam.width / GAME_WIDTH;
        }
      }
      cam.setZoom(zoom);
    });

    this.input.on(
      "pointerdown",
      (
        _pointer: Phaser.Input.Pointer,
        currentlyOver: Phaser.GameObjects.GameObject[]
      ) => {
        if (
          this.activeSpeechBubble &&
          !currentlyOver.includes(this.activeSpeechBubble) &&
          !currentlyOver.includes(this.activeSpeechBubble.speakerButton) &&
          !currentlyOver.includes(this.activeSpeechBubble.parent)
        ) {
          this.activeSpeechBubble.destroy();
          this.activeSpeechBubble = undefined;
        }
      }
    );

    this.input.on(
      "wheel",
      (
        pointer: Phaser.Input.Pointer,
        _currentlyOver: Phaser.GameObjects.GameObject[],
        deltaX: number,
        deltaY: number,
        _deltaZ: number
      ) => {
        // for touchpads, event control key indicates zoom gestures
        if (pointer.event.ctrlKey) {
          let zoom = cam.zoom - deltaY * 0.01;
          if (zoom > MAX_ZOOM_FACTOR) {
            zoom = MAX_ZOOM_FACTOR;
          } else {
            if (zoom < cam.height / GAME_HEIGHT) {
              zoom = cam.height / GAME_HEIGHT;
            }
            if (zoom < cam.width / GAME_WIDTH) {
              zoom = cam.width / GAME_WIDTH;
            }
          }
          cam.setZoom(zoom);
        } else {
          cam.setScroll(cam.scrollX + deltaX, cam.scrollY + deltaY);
        }
      }
    );

    const gui = new dat.GUI();

    const help = {
      line1: "Cursors to move",
    };

    const f1 = gui.addFolder("Camera");
    f1.add(cam, "x").listen();
    f1.add(cam, "y").listen();
    f1.add(cam, "scrollX").listen();
    f1.add(cam, "scrollY").listen();
    f1.add(cam, "zoom").min(0).step(0.01).listen();
    f1.add(help, "line1");
    f1.open();
  }

  update(time: any, delta: number) {
    const cam = this.cameras.main;
    // the clamping helps with jitter when scrolling past an edge
    this.background.setTilePosition(
      cam.clampX(cam.scrollX),
      cam.clampY(cam.scrollY)
    );
    // this.background.setTileScale(cam.zoom);
  }
}

export default MainScene;
