export type SolvedStatus = "yes" | "no" | "wip" | "partial"

export type FileFormatCategory =
  | "video"
  | "config"
  | "translation"
  | "menus"
  | "scripting"
  | "font"
  | "sound"
  | "texture"
  | "model"
  | "shading"
  | "motion"
  | "engine"
  | "savestate"

export interface FileFormat {
  title?: string
  extension: Lowercase<`.${string}`>
  category?: FileFormatCategory
  description?: string
  solved: SolvedStatus
  import: SolvedStatus
  export: SolvedStatus
  kaitai?: string
  binary?: true
  container?: true
  compressed?: "yes" | "sometimes"
  overrides?: Partial<FileFormat>[]
}

export const tableOrder: Array<{
  field: keyof FileFormat
  type?: "solved state" | "link" | "code" | "download"
  title?: string
  transform?: (field: string) => string
}> = [
  {field: "title", title: ""},
  {field: "extension", type: "code"},
  {field: "category"},
  {field: "solved", type: "solved state"},
  {field: "import", type: "solved state"},
  {field: "export", type: "solved state"},
  {field: "kaitai", type: "link", title: "", transform: () => "ksy"},
]

export const fileFormats: FileFormat[] = [
  {
    title: "Lua Script",
    extension: ".lua",
    category: "scripting",
    solved: "partial",
    import: "yes",
    export: "yes",
  },
  {
    title: "Flash-based Menus",
    extension: ".lmd",
    category: "menus",
    solved: "no",
    import: "no",
    export: "no",
    binary: true,
  },
  {
    title: "Excel Translation Map",
    extension: ".xlsm",
    category: "translation",
    solved: "yes",
    import: "yes",
    export: "yes",
  },
  {
    extension: ".xmlt",
    category: "config",
    solved: "no",
    import: "no",
    export: "no",
  },
  {
    title: "Config Bin",
    extension: ".bin",
    category: "config",
    solved: "no",
    import: "no",
    export: "no",
    binary: true,
  },
  {
    title: "Index Map",
    extension: ".bin",
    category: "config",
    description: "Record `int => string`",
    solved: "yes",
    import: "yes",
    export: "wip",
    binary: true,
  },
  {
    title: "String Map",
    extension: ".bin",
    category: "config",
    description: "Record `int => string`",
    solved: "yes",
    import: "yes",
    export: "wip",
    binary: true,
  },
  {
    title: "Windows Media Video",
    extension: ".wmv",
    category: "video",
    solved: "yes",
    import: "yes",
    export: "yes",
    binary: true,
  },
  {
    title: "Namco WAV Sound Bank",
    extension: ".nub",
    category: "sound",
    solved: "partial",
    import: "partial",
    export: "no",
    kaitai: "/file-formats/kaitai/nub.ksy",
    binary: true,
  },
  {
    extension: ".tbl",
    category: "sound",
    solved: "no",
    import: "no",
    export: "no",
  },
  {
    title: "Namco Font Descriptor",
    extension: ".nuf",
    category: "font",
    solved: "no",
    import: "no",
    export: "no",
    binary: true,
  },
  {
    title: "Namco DirectDraw Surface",
    extension: ".nut",
    category: "texture",
    solved: "yes",
    import: "wip",
    export: "no",
    binary: true,
    compressed: "sometimes",
    overrides: [{title: "Compressed", extension: ".tex", compressed: "yes"}],
  },
  {
    title: "Namco 3D Model",
    extension: ".nud",
    category: "model",
    solved: "yes",
    import: "wip",
    export: "wip",
    binary: true,
    kaitai: "/file-formats/kaitai/nud.ksy",
    overrides: [
      {
        title: "XMD Model Archive",
        extension: ".mdl",
        compressed: "yes",
        kaitai: "/file-formats/kaitai/xmd-001.ksy",
        container: true,
      },
    ],
  },
  {
    title: "Path",
    extension: ".bin",
    category: "model",
    solved: "yes",
    import: "yes",
    export: "wip",
    binary: true,
  },
  {
    title: "Namco Shader",
    extension: ".nsh",
    category: "shading",
    solved: "no",
    import: "no",
    export: "no",
    binary: true,
  },
  {
    extension: ".act",
    category: "shading",
    solved: "no",
    import: "no",
    export: "no",
    binary: true,
  },
  {
    extension: ".med",
    category: "motion",
    solved: "no",
    import: "no",
    export: "no",
    binary: true,
  },
  {
    extension: ".ess",
    solved: "no",
    import: "no",
    export: "no",
    binary: true,
  },
  {
    title: "Network Config",
    extension: ".conf",
    category: "config",
    solved: "partial",
    import: "no",
    export: "no",
  },
  {
    title: "Network Certificate",
    extension: ".pem",
    category: "config",
    solved: "yes",
    import: "yes",
    export: "yes",
  },
  {
    title: "Enma Engine Config",
    extension: ".txt",
    category: "engine",
    solved: "no",
    import: "no",
    export: "no",
  },
  {
    title: "Ghost Save",
    extension: ".bin",
    category: "savestate",
    solved: "no",
    import: "no",
    export: "no",
    binary: true,
  },
]
