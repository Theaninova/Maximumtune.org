import {FileSystem} from "./file-system"

export class GameInfo {
  readonly fileSystem: FileSystem

  private _stages: Promise<StageInfo[]>

  private _music: Promise<Info[]>

  private _cars: Promise<CarInfo[]>

  get stages(): Promise<StageInfo[]> {
    this._stages ||= this.fileSystem.readdir("data/course/stage").then(stages =>
      stages.map(stage => ({
        fileSystem: stage,
        name: stage.name
          .replace(/^A_/, "")
          .replace(/_(DAY|NGT)_(NML|EXT)$/, "")
          .toLowerCase()
          .toLocaleUpperCase(),
        night: /NGT_(NML|EXT)$/.test(stage.name),
        extreme: stage.name.endsWith("EXT"),
      })),
    )
    return this._stages
  }

  get music(): Promise<Info[]> {
    this._music ||= this.fileSystem.readdir("data/sound/BGM").then(music =>
      music.map(it => ({
        name: it.name,
        fileSystem: it,
      })),
    )
    return this._music
  }

  get cars(): Promise<CarInfo[]> {
    this._cars ||= Promise.all([
      this.fileSystem.readdir("data/car/car_data/playerCar"),
      this.fileSystem.readdir("data/car/car_data/charCar"),
      this.fileSystem.readdir("data/car/car_data/otherCar"),
    ]).then(([player, char, other]) =>
      [
        {cars: player, type: "player"},
        {cars: char, type: "character"},
        {cars: other.filter(it => it.name.endsWith(".mdl")), type: "other"},
      ].flatMap(({cars, type}) =>
        cars.map(car => ({
          name: car.name,
          fileSystem: car,
          type: type as "player" | "character" | "other",
        })),
      ),
    )
    return this._cars
  }

  constructor(entry: FileSystemDirectoryEntry) {
    this.fileSystem = new FileSystem(entry)
  }
}

export interface Info {
  name: string

  fileSystem: FileSystem
}

export interface StageInfo extends Info {
  extreme: boolean
  night: boolean
}

export interface CarInfo extends Info {
  type: "player" | "character" | "other"
}
