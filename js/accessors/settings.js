import GameSettings from "@config/game_settings";

class EasyLevelConfig {
  getLevelName() {
    return "easy";
  }
  getSideSize() {
    return GameSettings.easyDifficulty.sideSize;
  }
  getRepetitionNumber() {
    return GameSettings.easyDifficulty.repetition;
  }
  getImages() {
    return GameSettings.easyDifficulty.cells.images;
  }
}

class HardLevelConfig {
  getLevelName() {
    return "hard";
  }
  getSideSize() {
    return GameSettings.hardDifficulty.sideSize;
  }
  getRepetitionNumber() {
    return GameSettings.hardDifficulty.repetition;
  }
  getImages() {
    return GameSettings.hardDifficulty.cells.images;
  }
}

class Defaults {
  getThumbnailUrl() {
    return GameSettings.defaults.thumbnail;
  }
}

const EasyLevelSettings = new EasyLevelConfig();
const HardLevelSettings = new HardLevelConfig();
const DefaultValueSettings = new Defaults();

export { EasyLevelSettings, HardLevelSettings, DefaultValueSettings };
