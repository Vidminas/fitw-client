import {
  EVENT_DO_FITWICK_NEW,
  EVENT_WORLD_CHANGE_BACKGROUND,
} from "../../api/events";
import AddDialog from "../components/AddDialog";
import BackgroundDialog from "../components/BackgroundDialog";
import Fitwick from "../components/Fitwick";
import ListDialog from "../components/ListDialog";
import SettingsDialog from "../components/SettingsDialog";
import {
  LOCAL_EVENT_OPEN_ADD_FITWICK_DIALOG,
  LOCAL_EVENT_OPEN_BACKGROUND_DIALOG,
  LOCAL_EVENT_OPEN_FITWICK_LIST,
  LOCAL_EVENT_OPEN_SETTINGS_DIALOG,
} from "../localEvents";
import RexScene from "./RexScene";

class ModalScene extends RexScene {
  constructor() {
    super({ key: "ModalScene", active: false });
  }

  create() {
    this.input.setTopOnly(false);

    this.events.on(
      LOCAL_EVENT_OPEN_BACKGROUND_DIALOG,
      this.onOpenBackgroundDialog.bind(this)
    );
    this.events.on(
      LOCAL_EVENT_OPEN_SETTINGS_DIALOG,
      this.onOpenSettings.bind(this)
    );
    this.events.on(
      LOCAL_EVENT_OPEN_FITWICK_LIST,
      this.onOpenFitwickList.bind(this)
    );
    this.events.on(
      LOCAL_EVENT_OPEN_ADD_FITWICK_DIALOG,
      this.onOpenAddFitwickDialog.bind(this)
    );
  }

  private onOpenBackgroundDialog() {
    const backgroundDialog = new BackgroundDialog(
      this,
      (newBackgroundTexture?: string) => {
        if (newBackgroundTexture) {
          // false -> not external event
          this.game.events.emit(
            EVENT_WORLD_CHANGE_BACKGROUND,
            false,
            newBackgroundTexture
          );
        }
        backgroundDialog.hide();
      },
      () => {
        backgroundDialog.hide();
      }
    );
  }

  private onOpenSettings(currentVolume: number) {
    const settingsDialog = new SettingsDialog(
      this,
      currentVolume,
      () => {
        settingsDialog.hide();
      },
      () => {
        settingsDialog.hide();
      }
    );
  }

  private onOpenFitwickList() {
    new ListDialog(this);
  }

  private onOpenAddFitwickDialog() {
    const addDialog = new AddDialog(
      this,
      (text: string) => {
        if (Fitwick.findInConfig(this, text)) {
          // let the main scene handle the addition of a new Fitwick
          // false -> not external event
          this.game.events.emit(EVENT_DO_FITWICK_NEW, false, text);
          addDialog.hide();
        } else {
          addDialog.showError(this, text);
        }
      },
      () => {
        addDialog.hide();
      }
    );
  }
}

export default ModalScene;
