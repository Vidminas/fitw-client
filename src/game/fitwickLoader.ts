import { parse, ParseError } from "jsonc-parser";

type AtlasConfig = {
  key: string;
  type: "atlasXML" | "atlasJSON";
  texture: string;
  layout: string;
};

type FitwickConfig = {
  name: string;
  pronunciation?: string;
  sprites: [string, string][];
};

export type FitwickConfigSection = {
  path: string;
  atlases: AtlasConfig[];
  fitwicks: FitwickConfig[];
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
        if (atlas.type === "atlasXML") {
          this.loader.atlasXML(
            atlas.key,
            `${result.path}/${atlas.texture}`,
            `${result.path}/${atlas.layout}`
          );
        } else if (atlas.type === "atlasJSON") {
          this.loader.atlas(
            atlas.key,
            `${result.path}/${atlas.texture}`,
            `${result.path}/${atlas.layout}`
          );
        } else {
          console.warn(
            `Encountered unimplemented atlas type ${atlas.type} while processing ${this.key}`
          );
        }
      });

      result.fitwicks.forEach((fitwick) => {
        if (fitwick.pronunciation) {
          this.loader.audio(
            fitwick.pronunciation,
            `${result.path}/${fitwick.pronunciation}`
          );
        }
      });

      this.data = {
        atlases: result.atlases.map((atlas) => atlas.key),
        fitwicks: result.fitwicks,
      };

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
