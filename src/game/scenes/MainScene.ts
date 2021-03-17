import Phaser from "phaser";
import IWorld from "../../api/world";
import {
  EVENT_DO_FITWICK_NEW,
  EVENT_DO_FITWICK_PLACE,
  EVENT_DO_FITWICK_DELETE,
  EVENT_FITWICK_PICK_UP,
  EVENT_FITWICK_TAP,
  EVENT_WORLD_EXIT,
  EVENT_NAVIGATE_HOME,
  EVENT_DONE_FITWICK_NEW,
  EVENT_DONE_FITWICK_PLACE,
  EVENT_FITWICK_MOVE,
  EVENT_WORLD_CHANGE_BACKGROUND,
  EVENT_DONE_FITWICK_DELETE,
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
  UI_BUTTON_SIZE,
  REGISTRY_BACKGROUND_TEXTURE,
} from "../constants";
import Fitwick from "../components/Fitwick";
import SpeechBubble from "../components/SpeechBubble";
import RexScene from "./RexScene";
import IFitwick from "../../api/fitwick";

class MainScene extends RexScene {
  private background!: Phaser.GameObjects.TileSprite;
  private activeFitwick?: Fitwick;
  private activeSpeechBubble?: SpeechBubble;

  constructor() {
    super({ key: "MainScene", active: false });
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
            // false -> not external event
            this.game.events.emit(EVENT_FITWICK_PICK_UP, false, fitwick);
            if (this.activeSpeechBubble) {
              this.activeSpeechBubble.destroy();
              this.activeSpeechBubble = undefined;
            }
            this.activeFitwick = fitwick;
            this.activeFitwick.pickUp(false);
            this.input.setDraggable(this.activeFitwick);
            this.registerFitwickDrag(this.activeFitwick);
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
                0,
                0,
                speechBubbleWidth,
                SPEECH_BUBBLE_HEIGHT,
                fitwick.name
              );
              this.repositionSpeechBubble();
            }
          }
        }
      );
  }

  private repositionSpeechBubble() {
    if (this.activeSpeechBubble) {
      this.activeSpeechBubble.setScale(1 / this.cameras.main.zoom);
      this.activeSpeechBubble.setPosition(
        this.activeSpeechBubble.parent.x -
          this.activeSpeechBubble.displayWidth / 2,
        this.activeSpeechBubble.parent.y -
          this.activeSpeechBubble.parent.displayHeight / 2 -
          this.activeSpeechBubble.displayHeight
      );
    }
  }

  private setCameraZoom(zoom: number) {
    const cam = this.cameras.main;

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
    this.repositionSpeechBubble();
  }

  private registerFitwickDrag(fitwick: Fitwick) {
    fitwick.on(
      "drag",
      function (
        this: Fitwick,
        _pointer: Phaser.Input.Pointer,
        dragX: number,
        dragY: number
      ) {
        this.x = dragX;
        this.y = dragY;
        // false -> not external event
        this.scene.game.events.emit(EVENT_FITWICK_MOVE, false, this);
      }
    );
    const cam = this.cameras.main;
    cam.setDeadzone(
      Math.min(8 * UI_BUTTON_SIZE, GAME_WIDTH / 2),
      Math.min(4 * UI_BUTTON_SIZE, GAME_HEIGHT / 2)
    );
    const scrollX = cam.scrollX;
    const scrollY = cam.scrollY;
    cam.startFollow(fitwick, true, 0.05);
    // prevent camera from jumping to center fitwick
    // (which is part of the startFollow method)
    // it will still scroll to fit fitwick on screen if needed
    cam.setScroll(scrollX, scrollY);
  }

  create(world?: IWorld) {
    const cam = this.cameras.main;

    this.registry.set(
      REGISTRY_BACKGROUND_TEXTURE,
      world?.background || TEXTURE_BACKGROUND_EMPTY
    );
    this.background = this.add
      .tileSprite(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT,
        this.registry.get(REGISTRY_BACKGROUND_TEXTURE)
      )
      .setOrigin(0);
    // the background scrolls its tile position instead
    this.background.setScrollFactor(0);

    if (world?.fitwicks) {
      for (const fitwickData of world.fitwicks) {
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
      }
    }

    this.game.events.on(
      EVENT_WORLD_CHANGE_BACKGROUND,
      (external: boolean, newBackgroundTexture: string) => {
        this.registry.set(REGISTRY_BACKGROUND_TEXTURE, newBackgroundTexture);
        // the same handling regardless of whether it's external or not
        this.background.setTexture(newBackgroundTexture);
      }
    );

    this.game.events.on(
      EVENT_DO_FITWICK_NEW,
      (external: boolean, fitwick: string | IFitwick) => {
        if (!external) {
          const x = cam.scrollX + GAME_WIDTH / 2;
          const y = cam.scrollY + GAME_HEIGHT / 2;
          this.activeFitwick = new Fitwick(this, fitwick as string, x, y);
          this.game.events.emit(
            EVENT_DONE_FITWICK_NEW,
            external,
            this.activeFitwick
          );
          this.activeFitwick.pickUp(false);
          this.input.setDraggable(this.activeFitwick);
          this.registerFitwickDrag(this.activeFitwick);
        } else {
          const fitwickData = fitwick as IFitwick;
          new Fitwick(
            this,
            fitwickData.name,
            fitwickData.x,
            fitwickData.y,
            fitwickData.worldId,
            fitwickData.atlasTexture,
            fitwickData.atlasFrame
          );
        }
      }
    );

    this.game.events.on(
      EVENT_FITWICK_MOVE,
      (external: boolean, fitwick: IFitwick) => {
        if (!external) {
          // the moving will have already been handled in the drag listener
          return;
        }
        const existingFitwick = this.children.getFirst(
          "worldId",
          fitwick.worldId
        ) as Fitwick;
        if (!existingFitwick) {
          return;
        }
        existingFitwick.x = fitwick.x;
        existingFitwick.y = fitwick.y;
      }
    );

    this.game.events.on(
      EVENT_DO_FITWICK_PLACE,
      (external: boolean, fitwick?: IFitwick) => {
        if (!external) {
          if (!this.activeFitwick) {
            return;
          }
          this.activeFitwick.removeListener("drag");
          this.activeFitwick.placeDown();
          cam.stopFollow();
          this.game.events.emit(
            EVENT_DONE_FITWICK_PLACE,
            external,
            this.activeFitwick
          );
          this.registerFitwickEvents(this.activeFitwick);
          this.activeFitwick = undefined;
        } else {
          if (!fitwick) {
            return;
          }
          const existingFitwick = this.children.getFirst(
            "worldId",
            fitwick.worldId
          ) as Fitwick;
          existingFitwick.placeDown();
          this.registerFitwickEvents(existingFitwick);
        }
      }
    );

    this.game.events.on(
      EVENT_DO_FITWICK_DELETE,
      (external: boolean, fitwick?: IFitwick) => {
        if (!external) {
          cam.stopFollow();
          if (!this.activeFitwick) {
            return;
          }
          this.game.events.emit(
            EVENT_DONE_FITWICK_DELETE,
            external,
            this.activeFitwick
          );
          this.activeFitwick.destroy();
          this.activeFitwick = undefined;
        } else {
          if (!fitwick) {
            return;
          }
          const existingFitwick = this.children.getFirst(
            "worldId",
            fitwick.worldId
          ) as Fitwick;
          existingFitwick.destroy();
        }
      }
    );

    this.game.events.on(
      EVENT_FITWICK_PICK_UP,
      (external: boolean, fitwick: IFitwick) => {
        if (!external) {
          // the picking up logic is already handled in the onpress event
          return;
        }
        const existingFitwick = this.children.getFirst(
          "worldId",
          fitwick.worldId
        ) as Fitwick;
        existingFitwick.pickUp(true);
        if (
          this.activeSpeechBubble &&
          this.activeSpeechBubble.parent.worldId === fitwick.worldId
        ) {
          this.activeSpeechBubble.destroy();
          this.activeSpeechBubble = undefined;
        }
      }
    );

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
        lastPointer: Phaser.Input.Pointer
      ) => {
        // the active fitwick has its own input drag behaviour
        if (
          this.input.getDragState(lastPointer) === 0 &&
          (!gameObject || gameObject !== this.activeFitwick)
        ) {
          cam.setScroll(cam.scrollX - pan.dx, cam.scrollY - pan.dy);
        }
      }
    );

    const pinch = this.rexGestures.add.pinch();
    pinch.on("pinch", (pinch: any) => {
      this.setCameraZoom(cam.zoom * pinch.scaleFactor);
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
          this.setCameraZoom(cam.zoom - deltaY * 0.01);
        } else {
          cam.setScroll(cam.scrollX + deltaX, cam.scrollY + deltaY);
        }
      }
    );
  }

  update(time: any, delta: number) {
    const cam = this.cameras.main;
    // the clamping helps with jitter when scrolling past an edge
    this.background.setTilePosition(
      cam.clampX(cam.scrollX),
      cam.clampY(cam.scrollY)
    );
  }
}

export default MainScene;
