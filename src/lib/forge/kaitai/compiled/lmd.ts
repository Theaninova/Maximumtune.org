/*
 * This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
 */
import KaitaiStream from 'kaitai-struct/KaitaiStream'
import {Xmd} from './xmd'

export class Lmd {
  _is_le?: boolean;

  constructor(
    readonly _io: KaitaiStream,
    readonly _parent?: unknown,
    readonly _root?: Lmd,
  ) {
    this._root ??= this;

    this._read();
  }

  _read() {
    this.xmd = (new Xmd(this._io, this, null)) as any
  }

  private _references: Uint8Array;
  get references(): Uint8Array {
    if (typeof this._references !== 'undefined')
      return this._references;
    let _pos = this._io.pos;
    this._io.seek((this.xmd as any).positions[2]);
    this._references = (this._io.readBytes((this.xmd as any).lengths[2])) as any
    this._io.seek(_pos);
    return this._references;
  }

  private _textures: Lmd.Textures;
  get textures(): Lmd.Textures {
    if (typeof this._textures !== 'undefined')
      return this._textures;
    let _pos = this._io.pos;
    this._io.seek((this.xmd as any).positions[1]);
    this._raw_textures = (this._io.readBytes((this.xmd as any).lengths[1])) as any
    let _io__raw_textures = new KaitaiStream(this._raw_textures);
    this._textures = (new Lmd.Textures(_io__raw_textures, this, this._root)) as any
    this._io.seek(_pos);
    return this._textures;
  }

  private _lmb: Lmd.Lmb;
  get lmb(): Lmd.Lmb {
    if (typeof this._lmb !== 'undefined')
      return this._lmb;
    let _pos = this._io.pos;
    this._io.seek((this.xmd as any).positions[0]);
    this._raw_lmb = (this._io.readBytes((this.xmd as any).lengths[0])) as any
    let _io__raw_lmb = new KaitaiStream(this._raw_lmb);
    this._lmb = (new Lmd.Lmb(_io__raw_lmb, this, this._root)) as any
    this._io.seek(_pos);
    return this._lmb;
  }

  xmd: Xmd;
  _raw_textures: Uint8Array;
  _raw_lmb: Uint8Array;
}

export namespace Lmd {
  export class RemoveObject {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.unknown1 = (this._io.readU4le()) as any
      this.depth = (this._io.readU2le()) as any
      this.unknown2 = (this._io.readU2le()) as any
    }

    unknown1: number;
    depth: number;
    unknown2: number;
  }
}

export namespace Lmd {
  export class DynamicText {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.characterId = (this._io.readU4le()) as any
      this.unknown1 = (this._io.readU4le()) as any
      this.placeholderText = (this._io.readU4le()) as any
      this.unknown2 = (this._io.readU4le()) as any
      this.strokeColorId = (this._io.readU4le()) as any
      this.unknown3 = [];
      for (let i = 0; i < 3; i++) {
        this.unknown3.push(this._io.readU4le());
      }
      this.alignment = (this._io.readU2le()) as any
      this.unknown4 = (this._io.readU2le()) as any
      this.unknown5 = [];
      for (let i = 0; i < 2; i++) {
        this.unknown5.push(this._io.readU4le());
      }
      this.size = (this._io.readF4le()) as any
      this.unknown6 = [];
      for (let i = 0; i < 4; i++) {
        this.unknown6.push(this._io.readU4le());
      }
    }

    characterId: number;
    unknown1: number;
    placeholderText: number;
    unknown2: number;
    strokeColorId: number;
    unknown3: Array<number>;
    alignment: Lmd.DynamicText.TextAlignment;
    unknown4: number;
    unknown5: Array<number>;
    size: number;
    unknown6: Array<number>;
  }
}
export namespace Lmd.DynamicText {
  export enum TextAlignment {
    LEFT = 0,
    RIGHT = 1,
    CENTER = 2,
  }
}

export namespace Lmd {
  export class Graphic {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.atlasId = (this._io.readU4le()) as any
      this.fillType = (this._io.readU2le()) as any
      this.numVertices = (this._io.readU2le()) as any
      this.numIndices = (this._io.readU4le()) as any
      this.vertices = [];
      for (let i = 0; i < (this.numVertices as any); i++) {
        this.vertices.push(new Lmd.Graphic.Vertex(this._io, this, this._root));
      }
      this.indices = [];
      for (let i = 0; i < (this.numIndices as any); i++) {
        this.indices.push(this._io.readU2le());
      }
    }

    atlasId: number;
    fillType: number;
    numVertices: number;
    numIndices: number;
    vertices: Array<Lmd.Graphic.Vertex>;
    indices: Array<number>;
  }
}

export namespace Lmd.Graphic {
  export class Vertex {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Graphic,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.x = (this._io.readF4le()) as any
      this.y = (this._io.readF4le()) as any
      this.u = (this._io.readF4le()) as any
      this.v = (this._io.readF4le()) as any
    }

    x: number;
    y: number;
    u: number;
    v: number;
  }
}

export namespace Lmd {
  export class Tag {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Lmd.Lmb | undefined,
      readonly _root: Lmd | undefined,
      index: number,
    ) {
      this.index = index;

      this._read();
    }

    _read() {
      this.tagType = (this._io.readU2le()) as any
      this.offset = (this._io.readU2le()) as any
      if (!( (((this.offset as any) == 0)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.offset as any), (this._io as any), "/types/tag/seq/1");
      }
      this.dataLen = (this._io.readU4le()) as any
      switch ((this.tagType as any)) {
        case Lmd.Tag.TagType.PROPERTIES: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Properties(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.DEFINES: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Defines(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.KEYFRAME: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Frame(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.ACTION_SCRIPT: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.ActionScript(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.DYNAMIC_TEXT: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.DynamicText(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.COLORS: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Colors(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.TRANSFORMS: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Transforms(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.SHAPE: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Shape(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.BOUNDS: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Bounds(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.DO_ACTION: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.DoAction(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.TEXTURE_ATLASES: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.TextureAtlases(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.GRAPHIC: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Graphic(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.SHOW_FRAME: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Frame(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.FRAME_LABEL: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.FrameLabel(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.POSITIONS: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Positions(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.PLACE_OBJECT: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.PlaceObject(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.SYMBOLS: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Symbols(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.REMOVE_OBJECT: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.RemoveObject(_io__raw_data, this, this._root)) as any
          break;
        }
        case Lmd.Tag.TagType.DEFINE_SPRITE: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.DefineSprite(_io__raw_data, this, this._root)) as any
          break;
        }
        default: {
          this._raw_data = (this._io.readBytes(((this.dataLen as any) * 4))) as any
          let _io__raw_data = new KaitaiStream(this._raw_data);
          this.data = (new Lmd.Nothing(_io__raw_data, this, this._root)) as any
          break;
        }
      }
    }

    tagType: Lmd.Tag.TagType;
    offset: number;
    dataLen: number;
    data: Lmd.Properties | Lmd.Defines | Lmd.Frame | Lmd.ActionScript | Lmd.DynamicText | Lmd.Colors | Lmd.Transforms | Lmd.Shape | Lmd.Bounds | Lmd.DoAction | Lmd.TextureAtlases | Lmd.Graphic | Lmd.Frame | Lmd.Nothing | Lmd.FrameLabel | Lmd.Positions | Lmd.PlaceObject | Lmd.Symbols | Lmd.RemoveObject | Lmd.DefineSprite;
    index: number;
    _raw_data: Uint8Array;
  }
}
export namespace Lmd.Tag {
  export enum TagType {
    INVALID = 0,
    SHOW_FRAME = 1,
    PLACE_OBJECT = 4,
    REMOVE_OBJECT = 5,
    FONTS = 10,
    DO_ACTION = 12,
    DYNAMIC_TEXT = 37,
    DEFINE_SPRITE = 39,
    FRAME_LABEL = 43,
    SYMBOLS = 61441,
    COLORS = 61442,
    TRANSFORMS = 61443,
    BOUNDS = 61444,
    ACTION_SCRIPT = 61445,
    TEXTURE_ATLASES = 61447,
    UNKNOWN_F008 = 61448,
    UNKNOWN_F009 = 61449,
    UNKNOWN_F00A = 61450,
    UNKNOWN_F00B = 61451,
    PROPERTIES = 61452,
    DEFINES = 61453,
    SHAPE = 61474,
    GRAPHIC = 61476,
    COLOR_MATRIX = 61495,
    POSITIONS = 61699,
    KEYFRAME = 61701,
    END = 65280,
    ACTION_SCRIPT_2 = 65285,
  }
}

export namespace Lmd {
  export class ActionScript {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.numActions = (this._io.readU4le()) as any
    }

    numActions: number;
  }
}

export namespace Lmd.ActionScript {
  export class Action {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: unknown,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.size = (this._io.readU2le()) as any
      this._raw_actionData = (this._io.readBytes((2 * (this.size as any)))) as any
      let _io__raw_actionData = new KaitaiStream(this._raw_actionData);
      this.actionData = (new Lmd.Nothing(_io__raw_actionData, this, this._root)) as any
    }

    size: number;
    actionData: Lmd.Nothing;
    _raw_actionData: Uint8Array;
  }
}

export namespace Lmd {
  export class DoAction {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.actionId = (this._io.readU4le()) as any
      this.unknown = (this._io.readU4le()) as any
    }

    actionId: number;
    unknown: number;
  }
}

export namespace Lmd {
  export class Lmb {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.magic = (this._io.readBytes(4)) as any
      if (!((KaitaiStream.byteArrayCompare((this.magic as any), [76, 77, 66, 0]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([76, 77, 66, 0], (this.magic as any), (this._io as any), "/types/lmb/seq/0");
      }
      this.textureId = (this._io.readU4le()) as any
      this.resourceId = (this._io.readU4le()) as any
      this._raw_xmdPadding = (this._io.readBytes(4)) as any
      let _io__raw_xmdPadding = new KaitaiStream(this._raw_xmdPadding);
      this.xmdPadding = (new Lmd.Nothing(_io__raw_xmdPadding, this, this._root)) as any
      this.numPadding = (this._io.readU4le()) as any
      this.unknown4 = (this._io.readU4le()) as any
      this.unknown5 = (this._io.readU4le()) as any
      this.totalFileLen = (this._io.readU4le()) as any
      this.padding = [];
      for (let i = 0; i < (this.numPadding as any); i++) {
        this.padding.push(this._io.readBytes(16));
      }
      this.tags = [];
      let i = 0;
      while (!this._io.isEof()) {
        this.tags.push(new Lmd.Tag(this._io, this, this._root, i));
        i++;
      }
    }

    magic: Uint8Array;
    textureId: number;
    resourceId: number;
    xmdPadding: Lmd.Nothing;
    numPadding: number;
    unknown4: number;
    unknown5: number;
    totalFileLen: number;
    padding: Array<Uint8Array>;
    tags: Array<Lmd.Tag>;
    _raw_xmdPadding: Uint8Array;
  }
}

export namespace Lmd {
  export class FrameLabel {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.nameId = (this._io.readU4le()) as any
      this.startFrame = (this._io.readU4le()) as any
    }

    nameId: number;
    startFrame: number;
  }
}

export namespace Lmd {
  export class Bounds {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.numValues = (this._io.readU4le()) as any
      this.values = [];
      for (let i = 0; i < (this.numValues as any); i++) {
        this.values.push(new Lmd.Bounds.Rect(this._io, this, this._root));
      }
    }

    numValues: number;
    values: Array<Lmd.Bounds.Rect>;
  }
}

export namespace Lmd.Bounds {
  export class Rect {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Bounds,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.x = (this._io.readF4le()) as any
      this.y = (this._io.readF4le()) as any
      this.width = (this._io.readF4le()) as any
      this.height = (this._io.readF4le()) as any
    }

    x: number;
    y: number;
    width: number;
    height: number;
  }
}

export namespace Lmd {
  export class Frame {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.id = (this._io.readU4le()) as any
      this.numChildren = (this._io.readU4le()) as any
    }

    id: number;

    /**
     * children directly follow this tag, they may be place/remove object or do_action
     */
    numChildren: number;
  }
}

export namespace Lmd {
  export class Symbols {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.numValues = (this._io.readU4le()) as any
      this.values = [];
      for (let i = 0; i < (this.numValues as any); i++) {
        this.values.push(new Lmd.Symbols.String(this._io, this, this._root));
      }
    }

    numValues: number;
    values: Array<Lmd.Symbols.String>;
  }
}

export namespace Lmd.Symbols {
  export class String {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Symbols,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.len = (this._io.readU4le()) as any
      this.value = (KaitaiStream.bytesToStr(this._io.readBytes((this.len as any)), "utf-8")) as any
      this._raw_padding = (this._io.readBytes((4 - KaitaiStream.mod((this.len as any), 4)))) as any
      let _io__raw_padding = new KaitaiStream(this._raw_padding);
      this.padding = (new Lmd.Nothing(_io__raw_padding, this, this._root)) as any
    }

    len: number;
    value: string;
    padding: Lmd.Nothing;
    _raw_padding: Uint8Array;
  }
}

export namespace Lmd {
  export class Colors {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.numValues = (this._io.readU4le()) as any
      this._raw_values = [];
      this.values = [];
      for (let i = 0; i < (this.numValues as any); i++) {
        this._raw_values = (this._io.readBytes(8)) as any
        let _io__raw_values = new KaitaiStream(this._raw_values);
        this.values.push(new Lmd.Colors.Color(_io__raw_values, this, this._root));
      }
    }

    numValues: number;
    values: Array<Lmd.Colors.Color>;
    _raw_values: Array<Uint8Array>;
  }
}

export namespace Lmd.Colors {
  export class Color {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Colors,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.r = (this._io.readU2le()) as any
      this.g = (this._io.readU2le()) as any
      this.b = (this._io.readU2le()) as any
      this.a = (this._io.readU2le()) as any
    }

    r: number;
    g: number;
    b: number;
    a: number;
  }
}

export namespace Lmd {
  export class Nothing {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: unknown,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
    }

  }
}

export namespace Lmd {
  export class Positions {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.numValues = (this._io.readU4le()) as any
      this.values = [];
      for (let i = 0; i < (this.numValues as any); i++) {
        this.values.push(new Lmd.Positions.Position(this._io, this, this._root));
      }
    }

    numValues: number;
    values: Array<Lmd.Positions.Position>;
  }
}

export namespace Lmd.Positions {
  export class Position {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Positions,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.x = (this._io.readF4le()) as any
      this.y = (this._io.readF4le()) as any
    }

    x: number;
    y: number;
  }
}

export namespace Lmd {
  export class Properties {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.unknown = (this._io.readBytes((3 * 4))) as any
      this.maxCharacterId = (this._io.readU4le()) as any
      this.unknown2 = (this._io.readU4le()) as any
      this.maxCharacterId2 = (this._io.readU4le()) as any
      this.maxDepth = (this._io.readU2le()) as any
      this.unknown3 = (this._io.readU2le()) as any
      this.framerate = (this._io.readF4le()) as any
      this.width = (this._io.readF4le()) as any
      this.height = (this._io.readF4le()) as any
      this.unknown4 = (this._io.readBytes((2 * 4))) as any
    }

    unknown: Uint8Array;
    maxCharacterId: number;
    unknown2: number;
    maxCharacterId2: number;
    maxDepth: number;
    unknown3: number;
    framerate: number;
    width: number;
    height: number;
    unknown4: Uint8Array;
  }
}

export namespace Lmd {
  export class TextureAtlases {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.numValues = (this._io.readU4le()) as any
      this.values = [];
      for (let i = 0; i < (this.numValues as any); i++) {
        this.values.push(new Lmd.TextureAtlases.TextureAtlas(this._io, this, this._root));
      }
    }

    numValues: number;
    values: Array<Lmd.TextureAtlases.TextureAtlas>;
  }
}

export namespace Lmd.TextureAtlases {
  export class TextureAtlas {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.TextureAtlases,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.id = (this._io.readU4le()) as any
      this.nameId = (this._io.readU4le()) as any
      this.width = (this._io.readF4le()) as any
      this.height = (this._io.readF4le()) as any
    }

    id: number;
    nameId: number;
    width: number;
    height: number;
  }
}

export namespace Lmd {
  export class DefineSprite {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.characterId = (this._io.readU4le()) as any
      this.unknown1 = (this._io.readBytes(8)) as any
      this.numFrameLabels = (this._io.readU4le()) as any
      this.numFrames = (this._io.readU4le()) as any
      this.numKeyframes = (this._io.readU4le()) as any
      this.unknown2 = (this._io.readU4le()) as any
    }

    characterId: number;
    unknown1: Uint8Array;

    /**
     * labels follow this tag, their respective index is the keyframe id
     */
    numFrameLabels: number;

    /**
     * frames and keyframes may be mixed and come directly after this tag
     */
    numFrames: number;
    numKeyframes: number;
    unknown2: number;
  }
}

export namespace Lmd {
  export class Shape {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.characterId = (this._io.readU4le()) as any
      this.unknown1 = (this._io.readU4le()) as any
      this.boundsId = (this._io.readU4le()) as any
      this.unknown2 = (this._io.readU4le()) as any
      this.numGraphics = (this._io.readU4le()) as any
    }

    characterId: number;
    unknown1: number;
    boundsId: number;
    unknown2: number;

    /**
     * graphics are the following tags
     */
    numGraphics: number;
  }
}

export namespace Lmd {
  export class Transforms {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.numValues = (this._io.readU4le()) as any
      this.values = [];
      for (let i = 0; i < (this.numValues as any); i++) {
        this.values.push(new Lmd.Transforms.Matrix(this._io, this, this._root));
      }
    }

    numValues: number;
    values: Array<Lmd.Transforms.Matrix>;
  }
}

export namespace Lmd.Transforms {
  export class Matrix {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Transforms,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.a = (this._io.readF4le()) as any
      this.b = (this._io.readF4le()) as any
      this.c = (this._io.readF4le()) as any
      this.d = (this._io.readF4le()) as any
      this.x = (this._io.readF4le()) as any
      this.y = (this._io.readF4le()) as any
    }

    a: number;
    b: number;
    c: number;
    d: number;
    x: number;
    y: number;
  }
}

export namespace Lmd {
  export class Textures {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.textureHashes = [];
      let i = 0;
      while (!this._io.isEof()) {
        this.textureHashes.push(this._io.readU4le());
        i++;
      }
    }

    textureHashes: Array<number>;
  }
}

export namespace Lmd {
  export class PlaceObject {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.characterId = (this._io.readU4le()) as any
      this.placementId = (this._io.readU4le()) as any
      this.unknown1 = (this._io.readU4le()) as any
      this.nameId = (this._io.readU4le()) as any
      this.placementMode = (this._io.readU2le()) as any
      this.blendMode = (this._io.readU2le()) as any
      this.depth = (this._io.readU2le()) as any
      this.unknown2 = [];
      for (let i = 0; i < 3; i++) {
        this.unknown2.push(this._io.readU2le());
      }
      this.positionFlags = (this._io.readU2le()) as any
      this.positionId = (this._io.readU2le()) as any
      this.colorMultId = (this._io.readU4le()) as any
      this.colorAddId = (this._io.readU4le()) as any
      this.hasColorMatrix = (this._io.readU4le()) as any
      this.hasUnknownF014 = (this._io.readU4le()) as any
    }

    characterId: number;
    placementId: number;
    unknown1: number;
    nameId: number;
    placementMode: Lmd.PlaceObject.PlacementMode;
    blendMode: Lmd.PlaceObject.BlendMode;
    depth: number;
    unknown2: Array<number>;
    positionFlags: number;
    positionId: number;
    colorMultId: number;
    colorAddId: number;
    hasColorMatrix: number;
    hasUnknownF014: number;
  }
}
export namespace Lmd.PlaceObject {
  export enum PlacementMode {
    PLACE = 1,
    MOVE = 2,
  }
}
export namespace Lmd.PlaceObject {
  export enum BlendMode {
    NORMAL = 0,
    LAYER = 2,
    MULTIPLY = 3,
    SCREEN = 4,
    LIGHTEN = 5,
    DARKEN = 6,
    DIFFERENCE = 7,
    ADD = 8,
    SUBTRACT = 9,
    INVERT = 10,
    ALPHA = 11,
    ERASE = 12,
    OVERLAY = 13,
    HARD_LIGHT = 14,
  }
}

export namespace Lmd {
  export class Defines {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Lmd.Tag,
      readonly _root?: Lmd,
    ) {

      this._read();
    }

    _read() {
      this.numShapes = (this._io.readU4le()) as any
      this.unknown1 = (this._io.readU4le()) as any
      this.numSprites = (this._io.readU4le()) as any
      this.unknown2 = (this._io.readU4le()) as any
      this.numTexts = (this._io.readU4le()) as any
      this.unknown3 = [];
      for (let i = 0; i < 3; i++) {
        this.unknown3.push(this._io.readU4le());
      }
    }

    numShapes: number;
    unknown1: number;
    numSprites: number;
    unknown2: number;
    numTexts: number;
    unknown3: Array<number>;
  }
}
