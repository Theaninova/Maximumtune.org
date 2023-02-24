import type {Nud} from "./kaitai/compiled/nud"

export interface Car {
  muffler: string
  aero: string
  rollbar: string
  gtw: string
  bonnet: string
  mirror: string
  rearspoiler: string
  trunk: string
  retra: string
}

export function getInfo(list: string[]) {}

export interface ObjectInfo {
  type: "car" | "polySurface" | "BR"
}

export function indexCar(nud: Nud[]) {
  const meshes = nud.map(({meshes: [mesh]}) => mesh)
  const test = Object.fromEntries(
    ["aero", "muffler", "rollbar", "gtw", "bonnet", "mirror", "rearspoiler", "trunk"].map(it => {
      return [
        it,
        meshes
          .filter(({name}) => name.includes(it))
          .map(({name}) => name.replace(new RegExp(`^.*${it}_`), "").split("_")),
      ]
    }),
  )

  console.log(test)
}

export function filterCar(
  nud: Nud[],
  car: Car = {
    muffler: "N_A",
    aero: "C",
    rollbar: "C",
    gtw: undefined,
    bonnet: "N",
    mirror: "AC",
    rearspoiler: "N_C",
    trunk: "N",
    retra: "open",
  },
): Nud[] {
  return nud.filter(({meshes: [mesh]}) => {
    console.log(mesh.name)
    if (mesh.name.includes("polySurface") && mesh.name.endsWith("NEAR")) return true
    const carThingType = mesh.name.replace(/^([A-Z]{3}_[A-Z0-9]+_)/, "")
    const suffix = carThingType.replace(/_L0$/, "")
    if (carThingType === mesh.name) {
      return false
    } else {
      switch (carThingType.replace(/_.*$/, "")) {
        case "LAMP":
        case "numcover":
        case "inner":
        case "driver":
        case "body":
          return true
        case "bonnet":
          return suffix.endsWith(car.bonnet)
        case "gtw":
          return suffix.endsWith(car.gtw)
        case "aero":
          return suffix.endsWith(car.aero)
        case "rollbar":
          return suffix.endsWith(car.rollbar)
        case "mirror":
          return suffix.endsWith(car.mirror)
        case "muffler":
          return suffix.includes(car.muffler)
        case "rearspoiler":
          return suffix.endsWith(car.rearspoiler)
        case "trunk":
          return suffix.includes(car.trunk)
        case "retra":
          return suffix.includes(car.retra)
        default:
          return false
      }
    }
    return false
  })
}
