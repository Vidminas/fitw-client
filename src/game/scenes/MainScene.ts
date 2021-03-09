import Phaser from "phaser";
import * as dat from "dat.gui";
import IWorld from "../../api/world";
import {
  EVENT_DO_FITWICK_NEW,
  EVENT_DO_FITWICK_PLACE,
  EVENT_FITWICK_DELETE,
  EVENT_FITWICK_PICK_UP,
  EVENT_FITWICK_TAP,
  EVENT_WORLD_EXIT,
  EVENT_NAVIGATE_HOME,
  EVENT_DONE_FITWICK_NEW,
  EVENT_DONE_FITWICK_PLACE,
  EVENT_FITWICK_MOVE,
  EVENT_WORLD_CHANGE_BACKGROUND,
} from "../../api/events";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  MAX_SCROLL_X,
  MAX_SCROLL_Y,
  MAX_ZOOM_FACTOR,
  TEXTURE_BACKGROUND_EMPTY,
  SPEECH_BUBBLE_HEIGHT,
  SPEECH_BUBBLE_MIN_WIDTH,
} from "../constants";
import Fitwick from "../components/Fitwick";
import SpeechBubble from "../components/SpeechBubble";
import RexScene from "./RexScene";

class MainScene extends RexScene {
  private background!: Phaser.GameObjects.TileSprite;
  private activeFitwick?: Fitwick;
  private activeSpeechBubble?: SpeechBubble;
  private world: IWorld;

  constructor(world: IWorld) {
    super({ key: "MainScene", active: false });
    // create scene using world fitwicks
    this.world = world;
  }

  private registerFitwickEvents(fitwick: Fitwick) {
    // TODO: there is probably a memory leak when this is not cleaned up on delete
    this.rexGestures.add
      .press(fitwick)
      .on(
        "pressstart",
        (
          _press: any,
          _gameObject: Phaser.GameObjects.GameObject | undefined,
          _lastPointer: Phaser.Input.Pointer
        ) => {
          if (!this.activeFitwick && fitwick.state === "rest") {
            this.game.events.emit(EVENT_FITWICK_PICK_UP, fitwick);
          }
        }
      );
    // TODO: same as with rexGestures.press
    this.rexGestures.add
      .tap(fitwick)
      .on(
        "tap",
        (
          _tap: any,
          _gameObject: Phaser.GameObjects.GameObject | undefined,
          _lastPointer: Phaser.Input.Pointer
        ) => {
          if (!this.activeFitwick && fitwick.state === "rest") {
            this.game.events.emit(EVENT_FITWICK_TAP, fitwick);

            if (
              this.activeSpeechBubble &&
              this.activeSpeechBubble.parent !== fitwick
            ) {
              this.activeSpeechBubble.destroy();
              this.activeSpeechBubble = undefined;
            }

            if (!this.activeSpeechBubble) {
              const speechBubbleWidth = Math.max(
                SPEECH_BUBBLE_MIN_WIDTH,
                fitwick.displayWidth
              );
              this.activeSpeechBubble = new SpeechBubble(
                this,
                fitwick,
                fitwick.x - speechBubbleWidth / 2,
                fitwick.y - fitwick.displayHeight / 2 - SPEECH_BUBBLE_HEIGHT,
                speechBubbleWidth,
                SPEECH_BUBBLE_HEIGHT,
                fitwick.name
              );
            }
          }
        }
      );
  }

  create() {
    this.background = this.add
      .tileSprite(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT,
        this.world.background || TEXTURE_BACKGROUND_EMPTY
      )
      .setOrigin(0);
    this.background.setScrollFactor(0);

    for (const fitwickData of this.world.fitwicks) {
      console.log(fitwickData);
      const fitwick = new Fitwick(
        this,
        fitwickData.name,
        fitwickData.x,
        fitwickData.y,
        fitwickData.worldId,
        fitwickData.atlasTexture,
        fitwickData.atlasFrame
      );
      this.registerFitwickEvents(fitwick);
      this.input.setDraggable(fitwick);
    }

    this.game.events.on(
      EVENT_WORLD_CHANGE_BACKGROUND,
      (newBackgroundTexture: string) => {
        this.background.setTexture(newBackgroundTexture);
      }
    );

    const cam = this.cameras.main;

    this.game.events.on(EVENT_DO_FITWICK_NEW, (fitwickName: string) => {
      const x = cam.scrollX + GAME_WIDTH / 2;
      const y = cam.scrollY + GAME_HEIGHT / 2;
      this.activeFitwick = new Fitwick(this, fitwickName, x, y);
      this.activeFitwick.pickUp();
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
      cam.startFollow(this.activeFitwick, true, 0.5);
      this.game.events.emit(EVENT_DONE_FITWICK_NEW, this.activeFitwick);
    });
    this.game.events.on(EVENT_DO_FITWICK_PLACE, () => {
      if (!this.activeFitwick) {
        return;
      }
      this.activeFitwick.removeListener("drag");
      this.activeFitwick.placeDown();
      cam.stopFollow();
      this.game.events.emit(EVENT_DONE_FITWICK_PLACE, this.activeFitwick);
      this.registerFitwickEvents(this.activeFitwick);
      this.activeFitwick = undefined;
    });
    this.game.events.on(EVENT_FITWICK_DELETE, () => {
      this.activeFitwick?.removeListener("drag");
      this.activeFitwick?.destroy();
      cam.stopFollow();
      this.activeFitwick = undefined;
    });
    this.game.events.on(EVENT_FITWICK_PICK_UP, (fitwick: Fitwick) => {
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
          this.scene.game.events.emit(EVENT_FITWICK_MOVE, this);
        }
      );
      cam.startFollow(this.activeFitwick, true, 0.05);
      this.activeFitwick.pickUp();
    });
    this.game.events.on(EVENT_WORLD_EXIT, () => {
      // save world state ...
      this.game.events.emit(EVENT_NAVIGATE_HOME);
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
