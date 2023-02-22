/*
 * This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
 */
import KaitaiStream from 'kaitai-struct/KaitaiStream'

export class Nud {
  _is_le?: boolean;

  constructor(
    readonly _io: KaitaiStream,
    readonly _parent?: unknown,
    readonly _root?: Nud,
  ) {
    this._root ??= this;

    this._read();
  }

  _read() {
    this.magic = (this._io.readU4le()) as any
    if (!( (((this.magic as any) == Nud.Signature.NDWD)) )) {
      throw new KaitaiStream.ValidationNotAnyOfError((this.magic as any), (this._io as any), "/seq/0");
    }
    this.header = (new Nud.Header(this._io, this, this._root)) as any
    this.meshes = [];
    for (let i = 0; i < (this.header as any).polysetCount; i++) {
      this.meshes.push(new Nud.Mesh(this._io, this, this._root, i));
    }
    this.parts = [];
    for (let i = 0; i < (this.header as any).polysetCount; i++) {
      this.parts.push(new Nud.Parts(this._io, this, this._root, (this.meshes as any)[i].partCount));
    }
  }

  magic: Nud.Signature;
  header: Nud.Header;
  meshes: Array<Nud.Mesh>;
  parts: Array<Nud.Parts>;
}

export namespace Nud {
  export class Vertex {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Nud.Part,
      readonly _root?: Nud,
    ) {

      this._read();
    }

    _read() {
      this.position = [];
      for (let i = 0; i < 3; i++) {
        this.position.push(this._io.readF4le());
      }
      if ( (((this._parent as any).normalType == Nud.NormalType.NO_NORMALS) || ( (((this._parent as any).normalType == Nud.NormalType.NORMALS_TAN_BITAN) && (!((this._parent as any).normalHalfFloat))) )) ) {
        this.padding = (this._io.readBytes(4)) as any
      }
      if ((this._parent as any).normalType != Nud.NormalType.NO_NORMALS) {
        this.normal = [];
        for (let i = 0; i < 4; i++) {
          switch ((this._parent as any).normalHalfFloat) {
            case true: {
              this.normal.push(this._io.readU2le());
              break;
            }
            case false: {
              this.normal.push(this._io.readF4le());
              break;
            }
          }
        }
      }
      if ( (( (((this._parent as any).normalType == Nud.NormalType.NORMALS_R1) || ((this._parent as any).normalType == Nud.NormalType.NORMALS_FLOAT)) ) && (!((this._parent as any).normalHalfFloat))) ) {
        this.r1 = [];
        for (let i = 0; i < ((this._parent as any).normalType == Nud.NormalType.NORMALS_FLOAT ? 1 : 8); i++) {
          this.r1.push(this._io.readBytes(4));
        }
      }
      if ((this._parent as any).normalType == Nud.NormalType.NORMALS_TAN_BITAN) {
        this.tan = [];
        for (let i = 0; i < 4; i++) {
          switch ((this._parent as any).normalHalfFloat) {
            case true: {
              this.tan.push(this._io.readU2le());
              break;
            }
            case false: {
              this.tan.push(this._io.readF4le());
              break;
            }
          }
        }
      }
      if ((this._parent as any).normalType == Nud.NormalType.NORMALS_TAN_BITAN) {
        this.bitan = [];
        for (let i = 0; i < 4; i++) {
          switch ((this._parent as any).normalHalfFloat) {
            case true: {
              this.bitan.push(this._io.readU2le());
              break;
            }
            case false: {
              this.bitan.push(this._io.readF4le());
              break;
            }
          }
        }
      }
      if ( (((this._parent as any).boneSize == Nud.BoneSize.NO_BONES) && ((this._parent as any).vertexColorSize != Nud.VertexColorSize.NO_VERTEX_COLORS)) ) {
        this.colors = [];
        for (let i = 0; i < 4; i++) {
          this.colors.push(this._io.readU1());
        }
      }
      if ((this._parent as any).boneSize == Nud.BoneSize.NO_BONES) {
        this.uv = [];
        for (let i = 0; i < ((this._parent as any).uvChannelCount * 2); i++) {
          switch ((this._parent as any).uvFloat) {
            case true: {
              this.uv.push(this._io.readF4le());
              break;
            }
            case false: {
              this.uv.push(this._io.readU2le());
              break;
            }
          }
        }
      }
      if ((this._parent as any).boneSize != Nud.BoneSize.NO_BONES) {
        this.boneId = [];
        for (let i = 0; i < 4; i++) {
          switch ((this._parent as any).boneSize) {
            case Nud.BoneSize.FLOAT: {
              this.boneId.push(this._io.readU4le());
              break;
            }
            case Nud.BoneSize.HALF_FLOAT: {
              this.boneId.push(this._io.readU2le());
              break;
            }
            case Nud.BoneSize.BYTE: {
              this.boneId.push(this._io.readU1());
              break;
            }
          }
        }
      }
      if ((this._parent as any).boneSize != Nud.BoneSize.NO_BONES) {
        this.boneWeight = [];
        for (let i = 0; i < 4; i++) {
          switch ((this._parent as any).boneSize) {
            case Nud.BoneSize.FLOAT: {
              this.boneWeight.push(this._io.readF4le());
              break;
            }
            case Nud.BoneSize.HALF_FLOAT: {
              this.boneWeight.push(this._io.readU2le());
              break;
            }
            case Nud.BoneSize.BYTE: {
              this.boneWeight.push(this._io.readU1());
              break;
            }
          }
        }
      }
    }

    position: Array<number>;
    padding: string | undefined;
    normal: Array<number | undefined | number | undefined | undefined> | undefined;

    /**
     * no idea what this is
     */
    r1: Array<string | undefined> | undefined;
    tan: Array<number | undefined | number | undefined | undefined> | undefined;
    bitan: Array<number | undefined | number | undefined | undefined> | undefined;
    colors: Array<number | undefined> | undefined;
    uv: Array<number | undefined | number | undefined | undefined> | undefined;
    boneId: Array<number | undefined | number | undefined | number | undefined | undefined> | undefined;
    boneWeight: Array<number | undefined | number | undefined | number | undefined | undefined> | undefined;
  }
}

export namespace Nud {
  export class MaterialTexture {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Nud.Material,
      readonly _root?: Nud,
    ) {

      this._read();
    }

    _read() {
      this.hash = (this._io.readS4le()) as any
      this.unknown = (this._io.readBytes(6)) as any
      this.mapMode = (this._io.readU2le()) as any
      this.wrapModeS = (this._io.readU1()) as any
      this.wrapModeT = (this._io.readU1()) as any
      this.minFilter = (this._io.readU1()) as any
      this.magFilter = (this._io.readU1()) as any
      this.mipDetail = (this._io.readU1()) as any
      this.unknown2 = (this._io.readBytes(7)) as any
    }

    hash: number;
    unknown: string;
    mapMode: Nud.MapMode;
    wrapModeS: Nud.WrapMode;
    wrapModeT: Nud.WrapMode;
    minFilter: Nud.FilterMode;
    magFilter: Nud.FilterMode;
    mipDetail: Nud.MipDetail;
    unknown2: string;
  }
}

export namespace Nud {
  export class MaterialWrapper {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nud.Part | undefined,
      readonly _root: Nud | undefined,
      position: number,
    ) {
      this.position = position;

      this._read();
    }

    _read() {
    }

    private _material: Nud.Material;
    get material(): Nud.Material {
      if (typeof this._material !== 'undefined')
        return this._material;
      let io = (this._root as any)._io;
      let _pos = io.pos;
      io.seek((this.position as any));
      this._material = (new Nud.Material(io, this, this._root)) as any
      io.seek(_pos);
      return this._material;
    }

    position: number;
  }
}

export namespace Nud {
  export class MaterialAttribute {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Nud.Material,
      readonly _root?: Nud,
    ) {

      this._read();
    }

    _read() {
      this.size = (this._io.readU4le()) as any
      this.nameOffset = (this._io.readU4le()) as any
      this.numValues = (this._io.readU4be()) as any
      this.padding = (this._io.readBytes(4)) as any
      this.values = [];
      for (let i = 0; i < (this.numValues as any); i++) {
        this.values.push(this._io.readF4le());
      }
    }

    private _name: string | undefined;
    get name(): string | undefined {
      if (typeof this._name !== 'undefined')
        return this._name;
      if ((this.numValues as any) != 0) {
        let _pos = this._io.pos;
        this._io.seek(((this._root as any).header.nameStart + (this.nameOffset as any)));
        this._name = (KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "UTF-8")) as any
        this._io.seek(_pos);
      }
      return this._name;
    }

    size: number;
    nameOffset: number;
    numValues: number;
    padding: string;
    values: Array<number>;
  }
}

export namespace Nud {
  export class Mesh {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nud | undefined,
      readonly _root: Nud | undefined,
      i: number,
    ) {
      this.i = i;

      this._read();
    }

    _read() {
      this.boundingSphere = [];
      for (let i = 0; i < 8; i++) {
        this.boundingSphere.push(this._io.readF4le());
      }
      this.nameOffset = (this._io.readU4le()) as any
      this.emptyBytes = (this._io.readBytes(2)) as any
      if (!((KaitaiStream.byteArrayCompare((this.emptyBytes as any), [0, 0]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([0, 0], (this.emptyBytes as any), (this._io as any), "/types/mesh/seq/2");
      }
      this.boneFlags = (this._io.readU2le()) as any
      this.boneIndex = (this._io.readS2le()) as any
      this.partCount = (this._io.readU2le()) as any
      this.positionB = (this._io.readS4le()) as any
    }

    private _name: string;
    get name(): string {
      if (typeof this._name !== 'undefined')
        return this._name;
      let _pos = this._io.pos;
      this._io.seek(((this._parent as any).header.nameStart + (this.nameOffset as any)));
      this._name = (KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "UTF-8")) as any
      this._io.seek(_pos);
      return this._name;
    }

    private _parts: Array<Nud.Part>;
    get parts(): Array<Nud.Part> {
      if (typeof this._parts !== 'undefined')
        return this._parts;
      this._parts = ((this._root as any).parts[(this.i as any)].parts) as any
      return this._parts;
    }

    boundingSphere: Array<number>;
    nameOffset: number;

    /**
     * this is just for alignment
     */
    emptyBytes: string;
    boneFlags: number;
    boneIndex: number;
    partCount: number;
    positionB: number;
    i: number;
  }
}

export namespace Nud {
  export class Header {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Nud,
      readonly _root?: Nud,
    ) {

      this._read();
    }

    _read() {
      this.fileSize = (this._io.readU4le()) as any
      this.version = (this._io.readU2le()) as any
      if (!( (((this.version as any) == Nud.Version.V2)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.version as any), (this._io as any), "/types/header/seq/1");
      }
      this.polysetCount = (this._io.readU2le()) as any
      this.boneChannels = (this._io.readU2le()) as any
      this.boneCount = (this._io.readU2le()) as any
      this.partClumpSize = (this._io.readU4le()) as any
      this.indicesClumpSize = (this._io.readU4le()) as any
      this.vertClumpSize = (this._io.readU4le()) as any
      this.vertAddClumpSize = (this._io.readU4le()) as any
      this.boundingSphere = [];
      for (let i = 0; i < 4; i++) {
        this.boundingSphere.push(this._io.readF4le());
      }
    }

    private _partClumpStart: number;
    get partClumpStart(): number {
      if (typeof this._partClumpStart !== 'undefined')
        return this._partClumpStart;
      this._partClumpStart = (48) as any
      return this._partClumpStart;
    }

    private _vertClumpStart: number;
    get vertClumpStart(): number {
      if (typeof this._vertClumpStart !== 'undefined')
        return this._vertClumpStart;
      this._vertClumpStart = (((this.indicesClumpStart as any) + (this.indicesClumpSize as any))) as any
      return this._vertClumpStart;
    }

    private _nameStart: number;
    get nameStart(): number {
      if (typeof this._nameStart !== 'undefined')
        return this._nameStart;
      this._nameStart = (((this.vertAddClumpStart as any) + (this.vertAddClumpSize as any))) as any
      return this._nameStart;
    }

    private _vertAddClumpStart: number;
    get vertAddClumpStart(): number {
      if (typeof this._vertAddClumpStart !== 'undefined')
        return this._vertAddClumpStart;
      this._vertAddClumpStart = (((this.vertClumpStart as any) + (this.vertClumpSize as any))) as any
      return this._vertAddClumpStart;
    }

    private _indicesClumpStart: number;
    get indicesClumpStart(): number {
      if (typeof this._indicesClumpStart !== 'undefined')
        return this._indicesClumpStart;
      this._indicesClumpStart = (((this.partClumpStart as any) + (this.partClumpSize as any))) as any
      return this._indicesClumpStart;
    }

    fileSize: number;
    version: Nud.Version;
    polysetCount: number;
    boneChannels: number;
    boneCount: number;
    partClumpSize: number;
    indicesClumpSize: number;
    vertClumpSize: number;
    vertAddClumpSize: number;
    boundingSphere: Array<number>;
  }
}

export namespace Nud {
  export class Material {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Nud.MaterialWrapper,
      readonly _root?: Nud,
    ) {

      this._read();
    }

    _read() {
      this.flags = (this._io.readU4le()) as any
      this.padding = (this._io.readBytes(4)) as any
      this.srcFactor = (this._io.readU2le()) as any
      this.numMaterialTextures = (this._io.readU2le()) as any
      this.dstFactor = (this._io.readU2le()) as any
      this.alphaTest = (this._io.readBitsIntBe(1) != 0) as any
      this._io.alignToByte();
      this.alphaFunction = (this._io.readU1()) as any
      this.refAlpha = (this._io.readU2le()) as any
      this.cullMode = (this._io.readU2le()) as any
      this.padding2 = (this._io.readBytes(8)) as any
      this.zBufferOffset = (this._io.readS4le()) as any
      this.materialTextures = [];
      for (let i = 0; i < (this.numMaterialTextures as any); i++) {
        this.materialTextures.push(new Nud.MaterialTexture(this._io, this, this._root));
      }
      this.materialAttributes = [];
      {
        let _, _buf, i = 0;
        do {
          _ = new Nud.MaterialAttribute(this._io, this, this._root);
          this.materialAttributes.push(_);
          i++;
        } while (!(_.size == 0));
      }
    }

    flags: number;
    padding: string;
    srcFactor: number;
    numMaterialTextures: number;
    dstFactor: number;
    alphaTest: boolean;
    alphaFunction: Nud.AlphaFunction;
    refAlpha: number;
    cullMode: Nud.CullMode;
    padding2: string;
    zBufferOffset: number;
    materialTextures: Array<Nud.MaterialTexture>;
    materialAttributes: Array<Nud.MaterialAttribute>;
  }
}

export namespace Nud {
  export class Part {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Nud.Parts,
      readonly _root?: Nud,
    ) {

      this._read();
    }

    _read() {
      this.polyOffset = (this._io.readU4le()) as any
      this.vertOffset = (this._io.readU4le()) as any
      this.vertAddOffset = (this._io.readU4le()) as any
      this.numVertices = (this._io.readU2le()) as any
      this.boneSize = (this._io.readBitsIntBe(4)) as any
      this.unusedBit = (this._io.readBitsIntBe(1) != 0) as any
      if (!( (((this.unusedBit as any) == false)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.unusedBit as any), (this._io as any), "/types/part/seq/5");
      }
      this.normalHalfFloat = (this._io.readBitsIntBe(1) != 0) as any
      this.normalType = (this._io.readBitsIntBe(2)) as any
      this.uvChannelCount = (this._io.readBitsIntBe(4)) as any
      this.vertexColorSize = (this._io.readBitsIntBe(3)) as any
      this.uvFloat = (this._io.readBitsIntBe(1) != 0) as any
      this._io.alignToByte();
      this.texprop = [];
      for (let i = 0; i < 4; i++) {
        this.texprop.push(this._io.readU4le());
      }
      this.numIndices = (this._io.readU2le()) as any
      this.polySize = (this._io.readU1()) as any
      this.polyFlag = (this._io.readU1()) as any
      if (!( (((this.polyFlag as any) == 0)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.polyFlag as any), (this._io as any), "/types/part/seq/14");
      }
    }

    private _indicesStart: number;
    get indicesStart(): number {
      if (typeof this._indicesStart !== 'undefined')
        return this._indicesStart;
      this._indicesStart = (((this._root as any).header.indicesClumpStart + (this.polyOffset as any))) as any
      return this._indicesStart;
    }

    private _vertAddStart: number;
    get vertAddStart(): number {
      if (typeof this._vertAddStart !== 'undefined')
        return this._vertAddStart;
      this._vertAddStart = (((this._root as any).header.vertAddClumpStart + (this.vertAddOffset as any))) as any
      return this._vertAddStart;
    }

    private _indices: Array<number>;
    get indices(): Array<number> {
      if (typeof this._indices !== 'undefined')
        return this._indices;
      let io = (this._root as any)._io;
      let _pos = io.pos;
      io.seek((this.indicesStart as any));
      this._indices = [];
      for (let i = 0; i < (this.numIndices as any); i++) {
        this._indices.push(io.readU2le());
      }
      io.seek(_pos);
      return this._indices;
    }

    private _vertices: Array<Nud.Vertex>;
    get vertices(): Array<Nud.Vertex> {
      if (typeof this._vertices !== 'undefined')
        return this._vertices;
      let io = (this._root as any)._io;
      let _pos = io.pos;
      io.seek((this.vertStart as any));
      this._vertices = [];
      for (let i = 0; i < (this.numVertices as any); i++) {
        this._vertices.push(new Nud.Vertex(io, this, this._root));
      }
      io.seek(_pos);
      return this._vertices;
    }

    private _vertStart: number;
    get vertStart(): number {
      if (typeof this._vertStart !== 'undefined')
        return this._vertStart;
      this._vertStart = (((this._root as any).header.vertClumpStart + (this.vertOffset as any))) as any
      return this._vertStart;
    }

    private _materials: Array<Nud.MaterialWrapper>;
    get materials(): Array<Nud.MaterialWrapper> {
      if (typeof this._materials !== 'undefined')
        return this._materials;
      this._materials = [];
      {
        let _, _buf, i = 0;
        do {
          _ = new Nud.MaterialWrapper(this._io, this, this._root, (this.texprop as any)[i]);
          this._materials.push(_);
          i++;
        } while (!( ((i == 4) || ((this.texprop as any)[i] == 0)) ));
      }
      return this._materials;
    }

    polyOffset: number;
    vertOffset: number;
    vertAddOffset: number;
    numVertices: number;
    boneSize: Nud.BoneSize;
    unusedBit: boolean;
    normalHalfFloat: boolean;
    normalType: Nud.NormalType;
    uvChannelCount: number;
    vertexColorSize: Nud.VertexColorSize;
    uvFloat: boolean;
    texprop: Array<number>;
    numIndices: number;
    polySize: number;

    /**
     * Need to determine what this does
     */
    polyFlag: number;
  }
}

export namespace Nud {
  export class Parts {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nud | undefined,
      readonly _root: Nud | undefined,
      numParts: number,
    ) {
      this.numParts = numParts;

      this._read();
    }

    _read() {
      this._raw_parts = [];
      this.parts = [];
      for (let i = 0; i < (this.numParts as any); i++) {
        this._raw_parts = (this._io.readBytes(48)) as any
        let _io__raw_parts = new KaitaiStream(this._raw_parts);
        this.parts.push(new Nud.Part(_io__raw_parts, this, this._root));
      }
    }

    parts: Array<Nud.Part>;
    numParts: number;
    _raw_parts: Array<string>;
  }
}
export namespace Nud {
  export const enum BoneFlags {
    UNBOUND = 0,
    WEIGHTED = 4,
    SINGLE_BOUND = 8,
  }
}
export namespace Nud {
  export const enum FilterMode {
    LINEAR_MIPMAP_LINEAR = 0,
    NEAREST = 1,
    LINEAR = 2,
    NEAREST_MIPMAP_LINEAR = 3,
  }
}
export namespace Nud {
  export const enum AlphaFunction {
    NO_ALPHA = 0,
    ALPHA_1 = 4,
    ALPHA_2 = 6,
  }
}
export namespace Nud {
  export const enum MipDetail {
    LEVEL_1 = 1,
    LEVEL_1_OFF = 2,
    LEVEL_4 = 3,
    LEVEL_4_ANISOTROPIC = 4,
    LEVEL_4_TRILINEAR = 5,
    LEVEL_4_TRILINEAR_ANISOTRIPIC = 6,
  }
}
export namespace Nud {
  export const enum BoneSize {
    NO_BONES = 0,
    FLOAT = 1,
    HALF_FLOAT = 2,
    BYTE = 4,
  }
}
export namespace Nud {
  export const enum Signature {
    NDWD = 1146569806,
    NDP3 = 1313099827,
  }
}
export namespace Nud {
  export const enum Version {
    V2 = 2,
  }
}
export namespace Nud {
  export const enum TextureFlag {
    DIFFUSE_MAP = 1,
    NORMAL_MAP = 2,
    RAMP_CUBE_MAP = 4,
    STAGE_AO_MAP = 8,
    SPHERE_MAP = 16,
    DUMMY_RAMP = 32,
    SHADOW = 64,
    GLOW = 128,
  }
}
export namespace Nud {
  export const enum WrapMode {
    REPEAT = 1,
    MIRRORED_REPEAT = 2,
    CLAMP_TO_EDGE = 3,
  }
}
export namespace Nud {
  export const enum MapMode {
    TEX_COORD = 0,
    ENV_CAMERA = 7424,
    PROJECTION = 7680,
    ENV_LIGHT = 7885,
    ENV_SPEC = 7936,
  }
}
export namespace Nud {
  export const enum CullMode {
    NONE = 0,
    INSIDE_POKKEN = 2,
    OUTSIDE = 1028,
    INSIDE = 1029,
  }
}
export namespace Nud {
  export const enum VertexColorSize {
    NO_VERTEX_COLORS = 0,
    BYTE = 1,
    HALF_FLOAT = 2,
  }
}
export namespace Nud {
  export const enum NormalSize {
    FLOAT = 0,
    HALF_FLOAT = 1,
  }
}
export namespace Nud {
  export const enum NormalType {
    NO_NORMALS = 0,
    NORMALS_FLOAT = 1,
    NORMALS_R1 = 2,
    NORMALS_TAN_BITAN = 3,
  }
}
