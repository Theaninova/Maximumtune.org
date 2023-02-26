/*
 * This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
 */
import KaitaiStream from 'kaitai-struct/KaitaiStream'

export class Nut {
  _is_le?: boolean;

  constructor(
    readonly _io: KaitaiStream,
    readonly _parent?: unknown,
    readonly _root?: Nut,
  ) {
    this._root ??= this;

    this._read();
  }

  _read() {
    this.signature = (this._io.readU4be()) as any
    if (!( (((this.signature as any) == Nut.Signature.NTP3) || ((this.signature as any) == Nut.Signature.NTWD) || ((this.signature as any) == Nut.Signature.NTLX)) )) {
      throw new KaitaiStream.ValidationNotAnyOfError((this.signature as any), (this._io as any), "/seq/0");
    }
    this.body = (new Nut.NutBody(this._io, this, this._root)) as any
  }

  signature: Nut.Signature;
  body: Nut.NutBody;
}

export namespace Nut {
  export class Nothing {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: unknown,
      readonly _root?: Nut,
    ) {

      this._read();
    }

    _read() {
    }

  }
}

export namespace Nut {
  export class NutBody {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Nut,
      readonly _root?: Nut,
    ) {

      this._read();
    }

    _read() {
      switch ((this._root as any).signature) {
        case Nut.Signature.NTWD: {
          this._is_le = (true) as any
          break;
        }
        case Nut.Signature.NTLX: {
          this._is_le = (true) as any
          break;
        }
        default: {
          this._is_le = (false) as any
          break;
        }
      }

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
      this._raw_header = (this._io.readBytes(12)) as any
      let _io__raw_header = new KaitaiStream(this._raw_header);
      this.header = (new Nut.NutBody.Header(_io__raw_header, this, this._root, this._is_le)) as any
      this.textures = [];
      for (let i = 0; i < (this.header as any).count; i++) {
        this.textures.push(new Nut.NutBody.Texture(this._io, this, this._root, this._is_le, i));
      }
    }

    _readBE() {
      this._raw_header = (this._io.readBytes(12)) as any
      let _io__raw_header = new KaitaiStream(this._raw_header);
      this.header = (new Nut.NutBody.Header(_io__raw_header, this, this._root, this._is_le)) as any
      this.textures = [];
      for (let i = 0; i < (this.header as any).count; i++) {
        this.textures.push(new Nut.NutBody.Texture(this._io, this, this._root, this._is_le, i));
      }
    }

    header: Nut.NutBody.Header;
    textures: Array<Nut.NutBody.Texture>;
    _raw_header: Uint8Array;
  }
}

export namespace Nut.NutBody {
  export class Cubemap {
    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nut.NutBody.TextureInfo | undefined,
      readonly _root: Nut | undefined,
      public _is_le: boolean,
    ) {

      this._read();
    }

    _read() {

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
      this.padding = (this._io.readBitsIntBe(5)) as any
      this.isCubemap = (this._io.readBitsIntBe(1) != 0) as any
      this.sides = [];
      for (let i = 0; i < 6; i++) {
        this.sides.push(this._io.readBitsIntBe(1) != 0);
      }
    }

    _readBE() {
      this.padding = (this._io.readBitsIntBe(5)) as any
      this.isCubemap = (this._io.readBitsIntBe(1) != 0) as any
      this.sides = [];
      for (let i = 0; i < 6; i++) {
        this.sides.push(this._io.readBitsIntBe(1) != 0);
      }
    }

    padding: number;
    isCubemap: boolean;

    /**
     * +x -x +y -y +z -z
     */
    sides: Array<boolean>;
  }
}

export namespace Nut.NutBody {
  export class Surfaces {
    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nut.NutBody.TextureData | undefined,
      readonly _root: Nut | undefined,
      public _is_le: boolean,
    ) {

      this._read();
    }

    _read() {

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
      this.surfaces = [];
      for (let i = 0; i < (this._parent as any)._parent.textureInfo.surfaceCount; i++) {
        this.surfaces.push(new Nut.NutBody.TextureSurface(this._io, this, this._root, this._is_le));
      }
    }

    _readBE() {
      this.surfaces = [];
      for (let i = 0; i < (this._parent as any)._parent.textureInfo.surfaceCount; i++) {
        this.surfaces.push(new Nut.NutBody.TextureSurface(this._io, this, this._root, this._is_le));
      }
    }

    surfaces: Array<Nut.NutBody.TextureSurface>;
  }
}

export namespace Nut.NutBody {
  export class Gidx {
    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nut.NutBody.Texture | undefined,
      readonly _root: Nut | undefined,
      public _is_le: boolean,
    ) {

      this._read();
    }

    _read() {

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
      this.signature = (this._io.readBytes(4)) as any
      if (!((KaitaiStream.byteArrayCompare((this.signature as any), [101, 88, 116, 0]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([101, 88, 116, 0], (this.signature as any), (this._io as any), "/types/nut_body/types/gidx/seq/0");
      }
      this.version = (this._io.readU4le()) as any
      this.version2 = (this._io.readU4le()) as any
      this._raw_unknown = (this._io.readBytes(4)) as any
      let _io__raw_unknown = new KaitaiStream(this._raw_unknown);
      this.unknown = (new Nut.Nothing(_io__raw_unknown, this, this._root)) as any
      this.type = (this._io.readBytes(4)) as any
      if (!((KaitaiStream.byteArrayCompare((this.type as any), [71, 73, 68, 88]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([71, 73, 68, 88], (this.type as any), (this._io as any), "/types/nut_body/types/gidx/seq/4");
      }
      this._raw_unknown2 = (this._io.readBytes(4)) as any
      let _io__raw_unknown2 = new KaitaiStream(this._raw_unknown2);
      this.unknown2 = (new Nut.Nothing(_io__raw_unknown2, this, this._root)) as any
      this.hashId = (this._io.readU4le()) as any
    }

    _readBE() {
      this.signature = (this._io.readBytes(4)) as any
      if (!((KaitaiStream.byteArrayCompare((this.signature as any), [101, 88, 116, 0]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([101, 88, 116, 0], (this.signature as any), (this._io as any), "/types/nut_body/types/gidx/seq/0");
      }
      this.version = (this._io.readU4be()) as any
      this.version2 = (this._io.readU4be()) as any
      this._raw_unknown = (this._io.readBytes(4)) as any
      let _io__raw_unknown = new KaitaiStream(this._raw_unknown);
      this.unknown = (new Nut.Nothing(_io__raw_unknown, this, this._root)) as any
      this.type = (this._io.readBytes(4)) as any
      if (!((KaitaiStream.byteArrayCompare((this.type as any), [71, 73, 68, 88]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([71, 73, 68, 88], (this.type as any), (this._io as any), "/types/nut_body/types/gidx/seq/4");
      }
      this._raw_unknown2 = (this._io.readBytes(4)) as any
      let _io__raw_unknown2 = new KaitaiStream(this._raw_unknown2);
      this.unknown2 = (new Nut.Nothing(_io__raw_unknown2, this, this._root)) as any
      this.hashId = (this._io.readU4be()) as any
    }

    signature: Uint8Array;
    version: number;
    version2: number;
    unknown: Nut.Nothing;
    type: Uint8Array;
    unknown2: Nut.Nothing;
    hashId: number;
    _raw_unknown: Uint8Array;
    _raw_unknown2: Uint8Array;
  }
}

export namespace Nut.NutBody {
  export class Header {
    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nut.NutBody | undefined,
      readonly _root: Nut | undefined,
      public _is_le: boolean,
    ) {

      this._read();
    }

    _read() {

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
      this.version = (this._io.readU2le()) as any
      if (!( (((this.version as any) == 2)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.version as any), (this._io as any), "/types/nut_body/types/header/seq/0");
      }
      this.count = (this._io.readU2le()) as any
    }

    _readBE() {
      this.version = (this._io.readU2be()) as any
      if (!( (((this.version as any) == 2)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.version as any), (this._io as any), "/types/nut_body/types/header/seq/0");
      }
      this.count = (this._io.readU2be()) as any
    }

    version: number;
    count: number;
  }
}

export namespace Nut.NutBody {
  export class TextureInfo {
    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nut.NutBody.Texture | undefined,
      readonly _root: Nut | undefined,
      public _is_le: boolean,
    ) {

      this._read();
    }

    _read() {

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
      this._raw_padding = (this._io.readBytes(1)) as any
      let _io__raw_padding = new KaitaiStream(this._raw_padding);
      this.padding = (new Nut.Nothing(_io__raw_padding, this, this._root)) as any
      this.mipmapCount = (this._io.readU1()) as any
      this._raw_padding3 = (this._io.readBytes(1)) as any
      let _io__raw_padding3 = new KaitaiStream(this._raw_padding3);
      this.padding3 = (new Nut.Nothing(_io__raw_padding3, this, this._root)) as any
      this.pixelFormat = (this._io.readU1()) as any
      if (!( (((this.pixelFormat as any) == Nut.PixelFormat.DXT1) || ((this.pixelFormat as any) == Nut.PixelFormat.DXT3) || ((this.pixelFormat as any) == Nut.PixelFormat.DXT5)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.pixelFormat as any), (this._io as any), "/types/nut_body/types/texture_info/seq/3");
      }
      this.width = (this._io.readU2le()) as any
      this.height = (this._io.readU2le()) as any
      this.textureType = (this._io.readU4le()) as any
      if (!( (((this.textureType as any) == Nut.TextureType.DDS)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.textureType as any), (this._io as any), "/types/nut_body/types/texture_info/seq/6");
      }
      this._raw_cubemap = (this._io.readBytes(4)) as any
      let _io__raw_cubemap = new KaitaiStream(this._raw_cubemap);
      this.cubemap = (new Nut.NutBody.Cubemap(_io__raw_cubemap, this, this._root, this._is_le)) as any
      this.dataOffset = (this._io.readU4le()) as any
      this._raw_padding4 = (this._io.readBytes(12)) as any
      let _io__raw_padding4 = new KaitaiStream(this._raw_padding4);
      this.padding4 = (new Nut.Nothing(_io__raw_padding4, this, this._root)) as any
      this.mipmapSizes = [];
      for (let i = 0; i < ((this.mipmapCount as any) - 1); i++) {
        this.mipmapSizes.push(this._io.readU4le());
      }
    }

    _readBE() {
      this._raw_padding = (this._io.readBytes(1)) as any
      let _io__raw_padding = new KaitaiStream(this._raw_padding);
      this.padding = (new Nut.Nothing(_io__raw_padding, this, this._root)) as any
      this.mipmapCount = (this._io.readU1()) as any
      this._raw_padding3 = (this._io.readBytes(1)) as any
      let _io__raw_padding3 = new KaitaiStream(this._raw_padding3);
      this.padding3 = (new Nut.Nothing(_io__raw_padding3, this, this._root)) as any
      this.pixelFormat = (this._io.readU1()) as any
      if (!( (((this.pixelFormat as any) == Nut.PixelFormat.DXT1) || ((this.pixelFormat as any) == Nut.PixelFormat.DXT3) || ((this.pixelFormat as any) == Nut.PixelFormat.DXT5)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.pixelFormat as any), (this._io as any), "/types/nut_body/types/texture_info/seq/3");
      }
      this.width = (this._io.readU2be()) as any
      this.height = (this._io.readU2be()) as any
      this.textureType = (this._io.readU4be()) as any
      if (!( (((this.textureType as any) == Nut.TextureType.DDS)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.textureType as any), (this._io as any), "/types/nut_body/types/texture_info/seq/6");
      }
      this._raw_cubemap = (this._io.readBytes(4)) as any
      let _io__raw_cubemap = new KaitaiStream(this._raw_cubemap);
      this.cubemap = (new Nut.NutBody.Cubemap(_io__raw_cubemap, this, this._root, this._is_le)) as any
      this.dataOffset = (this._io.readU4be()) as any
      this._raw_padding4 = (this._io.readBytes(12)) as any
      let _io__raw_padding4 = new KaitaiStream(this._raw_padding4);
      this.padding4 = (new Nut.Nothing(_io__raw_padding4, this, this._root)) as any
      this.mipmapSizes = [];
      for (let i = 0; i < ((this.mipmapCount as any) - 1); i++) {
        this.mipmapSizes.push(this._io.readU4be());
      }
    }

    private _surfaceCount: number;
    get surfaceCount(): number {
      if (typeof this._surfaceCount !== 'undefined')
        return this._surfaceCount;
      this._surfaceCount = (((((((1 + ((this.cubemap as any).sides[0] | 0)) + ((this.cubemap as any).sides[1] | 0)) + ((this.cubemap as any).sides[2] | 0)) + ((this.cubemap as any).sides[3] | 0)) + ((this.cubemap as any).sides[4] | 0)) + ((this.cubemap as any).sides[5] | 0))) as any
      return this._surfaceCount;
    }

    padding: Nut.Nothing;
    mipmapCount: number;
    padding3: Nut.Nothing;
    pixelFormat: Nut.PixelFormat;
    width: number;
    height: number;

    /**
     * It's a little unclear if this is actually that
     */
    textureType: Nut.TextureType;
    cubemap: Nut.NutBody.Cubemap;
    dataOffset: number;
    padding4: Nut.Nothing;
    mipmapSizes: Array<number>;
    _raw_padding: Uint8Array;
    _raw_padding3: Uint8Array;
    _raw_cubemap: Uint8Array;
    _raw_padding4: Uint8Array;
  }
}

export namespace Nut.NutBody {
  export class TextureSurface {
    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nut.NutBody.Surfaces | undefined,
      readonly _root: Nut | undefined,
      public _is_le: boolean,
    ) {

      this._read();
    }

    _read() {

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
      this.mipmaps = (this._io.readBytes((this._parent as any)._parent._parent.dataSize)) as any
    }

    _readBE() {
      this.mipmaps = (this._io.readBytes((this._parent as any)._parent._parent.dataSize)) as any
    }

    mipmaps: Uint8Array;
  }
}

export namespace Nut.NutBody {
  export class Texture {
    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nut.NutBody | undefined,
      readonly _root: Nut | undefined,
      public _is_le: boolean,
      i: number,
    ) {
      this.i = i;

      this._read();
    }

    _read() {

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
      this.size = (this._io.readU4le()) as any
      this._raw_padding = (this._io.readBytes(4)) as any
      let _io__raw_padding = new KaitaiStream(this._raw_padding);
      this.padding = (new Nut.Nothing(_io__raw_padding, this, this._root)) as any
      this.dataSize = (this._io.readU4le()) as any
      this.headerSize = (this._io.readU2le()) as any
      this._raw_textureData = (this._io.readBytes(2)) as any
      let _io__raw_textureData = new KaitaiStream(this._raw_textureData);
      this.textureData = (new Nut.NutBody.TextureData(_io__raw_textureData, this, this._root, this._is_le, (this._root as any)._io.pos)) as any
      this._raw_textureInfo = (this._io.readBytes((((this.headerSize as any) - 16) - 32))) as any
      let _io__raw_textureInfo = new KaitaiStream(this._raw_textureInfo);
      this.textureInfo = (new Nut.NutBody.TextureInfo(_io__raw_textureInfo, this, this._root, this._is_le)) as any
      this._raw_gidx = (this._io.readBytes(32)) as any
      let _io__raw_gidx = new KaitaiStream(this._raw_gidx);
      this.gidx = (new Nut.NutBody.Gidx(_io__raw_gidx, this, this._root, this._is_le)) as any
    }

    _readBE() {
      this.size = (this._io.readU4be()) as any
      this._raw_padding = (this._io.readBytes(4)) as any
      let _io__raw_padding = new KaitaiStream(this._raw_padding);
      this.padding = (new Nut.Nothing(_io__raw_padding, this, this._root)) as any
      this.dataSize = (this._io.readU4be()) as any
      this.headerSize = (this._io.readU2be()) as any
      this._raw_textureData = (this._io.readBytes(2)) as any
      let _io__raw_textureData = new KaitaiStream(this._raw_textureData);
      this.textureData = (new Nut.NutBody.TextureData(_io__raw_textureData, this, this._root, this._is_le, (this._root as any)._io.pos)) as any
      this._raw_textureInfo = (this._io.readBytes((((this.headerSize as any) - 16) - 32))) as any
      let _io__raw_textureInfo = new KaitaiStream(this._raw_textureInfo);
      this.textureInfo = (new Nut.NutBody.TextureInfo(_io__raw_textureInfo, this, this._root, this._is_le)) as any
      this._raw_gidx = (this._io.readBytes(32)) as any
      let _io__raw_gidx = new KaitaiStream(this._raw_gidx);
      this.gidx = (new Nut.NutBody.Gidx(_io__raw_gidx, this, this._root, this._is_le)) as any
    }

    size: number;
    padding: Nut.Nothing;
    dataSize: number;
    headerSize: number;
    textureData: Nut.NutBody.TextureData;
    textureInfo: Nut.NutBody.TextureInfo;
    gidx: Nut.NutBody.Gidx;
    i: number;
    _raw_padding: Uint8Array;
    _raw_textureData: Uint8Array;
    _raw_textureInfo: Uint8Array;
    _raw_gidx: Uint8Array;
  }
}

export namespace Nut.NutBody {
  export class TextureData {
    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Nut.NutBody.Texture | undefined,
      readonly _root: Nut | undefined,
      public _is_le: boolean,
      offset: number,
    ) {
      this.offset = offset;

      this._read();
    }

    _read() {

      if (this._is_le === true) {
        this._readLE();
      } else if (this._is_le === false) {
        this._readBE();
      } else {
        throw new KaitaiStream.UndecidedEndiannessError();
      }
    }

    _readLE() {
    }

    _readBE() {
    }

    private _dataOffset: number;
    get dataOffset(): number {
      if (typeof this._dataOffset !== 'undefined')
        return this._dataOffset;
      this._dataOffset = ((((this.offset as any) - 16) + (this._parent as any).textureInfo.dataOffset)) as any
      return this._dataOffset;
    }

    private _surfaces: Nut.NutBody.Surfaces;
    get surfaces(): Nut.NutBody.Surfaces {
      if (typeof this._surfaces !== 'undefined')
        return this._surfaces;
      let io = (this._root as any)._io;
      let _pos = io.pos;
      io.seek((this.dataOffset as any));
      if (this._is_le) {
        this._raw_surfaces = (io.readBytes((this._parent as any).dataSize)) as any
        let _io__raw_surfaces = new KaitaiStream(this._raw_surfaces);
        this._surfaces = (new Nut.NutBody.Surfaces(_io__raw_surfaces, this, this._root, this._is_le)) as any
      } else {
        this._raw_surfaces = (io.readBytes((this._parent as any).dataSize)) as any
        let _io__raw_surfaces = new KaitaiStream(this._raw_surfaces);
        this._surfaces = (new Nut.NutBody.Surfaces(_io__raw_surfaces, this, this._root, this._is_le)) as any
      }
      io.seek(_pos);
      return this._surfaces;
    }

    offset: number;
    _raw_surfaces: Uint8Array;
  }
}
export namespace Nut {
  export enum Signature {
    NTLX = 1314147416,
    NTP3 = 1314148403,
    NTWD = 1314150212,
    NTWU = 1314150229,
  }
}
export namespace Nut {
  export enum PixelFormat {
    DXT1 = 0,
    DXT3 = 1,
    DXT5 = 2,
    RGB16 = 8,
    RGBA16 = 12,
    RGBA = 14,
    ARGB = 15,
  }
}
export namespace Nut {
  export enum TextureType {
    DDS = 0,
    GXT = 1,
  }
}
