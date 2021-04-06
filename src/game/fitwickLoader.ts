import { parse, ParseError } from "jsonc-parser";
import { CONFIG_FITWICKS } from "./constants";

type AtlasConfig = {
  key: string;
  type: "atlasXML" | "atlasJSON";
  texture: string;
  layout: string;
};

export type FitwickConfig = {
  name: string;
  pronunciation?: string;
  sprites: [string, string][];
};

export type FitwickConfigSection = {
  path: string;
  atlases: AtlasConfig[];
  fitwicks: FitwickConfig[];
};

export const lazyLoadAtlas = (
  scene: Phaser.Scene,
  atlasTexture: string,
  onLoad: Function
) => {
  const fitwicks = scene.cache.json.get(
    CONFIG_FITWICKS
  ) as FitwickConfigSection;
  if (!fitwicks) {
    return;
  }

  const atlas = fitwicks.atlases.find((atlas) => atlas.key === atlasTexture);
  if (!atlas) {
    console.warn(`Fitwick atlas ${atlasTexture} not found in fitwick config!`);
    return;
  }

  if (atlas.type === "atlasXML") {
    scene.load.atlasXML(
      atlas.key,
      `${fitwicks.path}/${atlas.texture}`,
      `${fitwicks.path}/${atlas.layout}`
    );
  } else if (atlas.type === "atlasJSON") {
    scene.load.atlas(
      atlas.key,
      `${fitwicks.path}/${atlas.texture}`,
      `${fitwicks.path}/${atlas.layout}`
    );
  } else {
    console.warn(
      `Encountered unimplemented atlas type ${atlas.type} of ${atlas.key}`
    );
    return;
  }

  scene.load.once(Phaser.Loader.Events.COMPLETE, onLoad);
  scene.load.start();
};

export const lazyLoadPronunciation = (
  scene: Phaser.Scene,
  pronunciation: string,
  onLoad: Function
) => {
  const fitwicks = scene.cache.json.get(
    CONFIG_FITWICKS
  ) as FitwickConfigSection;
  if (!fitwicks) {
    return;
  }

  scene.load.audio(pronunciation, `${fitwicks.path}/${pronunciation}`);
  scene.load.once(Phaser.Loader.Events.COMPLETE, onLoad);
  scene.load.start();
};

class FitwickConfigFile extends Phaser.Loader.FileTypes.JSONFile {
  constructor(
    loader: Phaser.Loader.LoaderPlugin,
    jsonConfig: Phaser.Types.Loader.FileTypes.JSONFileConfig
  ) {
    if (!jsonConfig.hasOwnProperty("url")) {
      jsonConfig.url = "";
    }
    if (!jsonConfig.hasOwnProperty("key")) {
      jsonConfig.key = new Date().getTime().toString();
    }
    super(loader, jsonConfig);
  }

  onProcess() {
    if (this.state !== Phaser.Loader.FILE_POPULATED) {
      this.state = Phaser.Loader.FILE_PROCESSING;
      const errors: ParseError[] = [];
      const result: FitwickConfigSection = parse(
        this.xhrLoader.responseText,
        errors
      );

      if (errors.length) {
        console.warn(`Encountered parse errors while processing ${this.key}:`);
        console.warn(errors);
        if (!result) {
          this.onProcessError();
          throw new Error("Invalid fitwick config file");
        }
      }

      result.atlases.forEach((atlas) => {
        if (atlas.type !== "atlasXML" && atlas.type !== "atlasJSON") {
          console.warn(
            `Encountered unimplemented atlas type ${atlas.type} while processing ${this.key}`
          );
        }
      });

      this.data = result;
      this.onProcessComplete();
    }
  }
}

class FitwickConfigLoaderPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    pluginManager.registerFileType(
      "fitwickConfig",
      function (
        this: Phaser.Loader.LoaderPlugin,
        config: Phaser.Types.Loader.FileTypes.JSONFileConfig
      ) {
        this.addFile(new FitwickConfigFile(this, config));
        return this;
      }
    );
  }
}

export default FitwickConfigLoaderPlugin;
