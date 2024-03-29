import {FileSystem} from "./file-system"

export class GameInfo {
  readonly fileSystem: FileSystem

  private _stages: Promise<StageInfo[]>

  private _music: Promise<Info<"music">[]>

  private _cars: Promise<CarInfo[]>

  get stages(): Promise<StageInfo[]> {
    this._stages ||= this.fileSystem.getDirectory("data/course/stage").then(areas =>
      Promise.all(
        areas.map(area =>
          area.getDirectory("./").then(stages =>
            stages
              .filter(it => it.name !== "COMMON")
              .map<StageInfo>(stage => ({
                fileSystem: stage,
                area: area.name
                  .replace(/^A_/, "")
                  .replace(/_(DAY|NGT)_(NML|EXT)$/, "")
                  .toLowerCase()
                  .toLocaleUpperCase(),
                name: `${area.name}/${stage.name}`,
                path: stage.name,
                night: /NGT_(NML|EXT)$/.test(stage.name),
                extreme: stage.name.endsWith("EXT"),
                type: "stage",
              })),
          ),
        ),
      ).then(it => it.flat()),
    )
    return this._stages
  }

  get music(): Promise<Info[]> {
    this._music ||= this.fileSystem.getDirectory("data/sound/BGM").then(music =>
      music.map(it => ({
        name: it.name,
        fileSystem: it,
        type: "music",
      })),
    )
    return this._music
  }

  get cars(): Promise<CarInfo[]> {
    this._cars ||= Promise.all([
      this.fileSystem.getDirectory("data/car/car_data/playerCar"),
      this.fileSystem.getDirectory("data/car/car_data/charCar"),
      this.fileSystem.getDirectory("data/car/car_data/otherCar"),
    ]).then(([player, char, other]) =>
      [
        {cars: player, type: "player"},
        {cars: char, type: "character"},
        {cars: other.filter(it => it.name.endsWith(".mdl")), type: "other"},
      ].flatMap(({cars, type}) =>
        cars.map(car => ({
          name: car.name,
          fileSystem: car,
          carType: type as "player" | "character" | "other",
          type: "car",
        })),
      ),
    )
    return this._cars
  }

  constructor(entry: FileSystemDirectoryEntry) {
    this.fileSystem = new FileSystem(entry)
  }
}

export interface Info<T extends string = string> {
  name: string

  fileSystem: FileSystem

  type: T
}

export interface StageInfo extends Info<"stage"> {
  path: string
  area: string
  extreme: boolean
  night: boolean
}

export interface LumenInfo extends Info<"lumen"> {
  path: string
}

export interface CarInfo extends Info<"car"> {
  carType: "player" | "character" | "other"
}
