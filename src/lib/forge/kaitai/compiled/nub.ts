/*
 * This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
 */
import KaitaiStream from 'kaitai-struct/KaitaiStream'

export class Nub {
  _is_le?: boolean;

  constructor(
    readonly _io: KaitaiStream,
    readonly _parent?: unknown,
    readonly _root?: Nub,
  ) {
    this._root ??= this;

    this._read();
  }

  _read() {
    this.header = (new Nub.Header(this._io, this, this._root)) as any
  }

  header: Nub.Header;
}

export namespace Nub {
  export class Header {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Nub,
      readonly _root?: Nub,
    ) {

      this._read();
    }

    _read() {
      this.magic = (this._io.readBytes(8)) as any
      if (!((KaitaiStream.byteArrayCompare((this.magic as any), [1, 2, 1, 0, 0, 0, 0, 0]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([1, 2, 1, 0, 0, 0, 0, 0], (this.magic as any), (this._io as any), "/types/header/seq/0");
      }
      this.id = (this._io.readU4le()) as any
      this.count = (this._io.readU4le()) as any
      this.dataOffset = (this._io.readU4le()) as any
      this.fileSize = (this._io.readU4le()) as any
      this.bits = (this._io.readU4le()) as any
    }

    magic: Uint8Array;
    id: number;
    count: number;
    dataOffset: number;
    fileSize: number;
    bits: number;
  }
}
