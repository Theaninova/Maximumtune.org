/*
 * This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
 */
import KaitaiStream from 'kaitai-struct/KaitaiStream'

export class Xmd {
  _is_le?: boolean;

  constructor(
    readonly _io: KaitaiStream,
    readonly _parent?: unknown,
    readonly _root?: Xmd,
  ) {
    this._root ??= this;

    this._read();
  }

  _read() {
    this.header = (new Xmd.XmdHeader(this._io, this, this._root)) as any
    this.positions = [];
    for (let i = 0; i < (this.header as any).alignedCount; i++) {
      this.positions.push(this._io.readU4le());
    }
    this.lengths = [];
    for (let i = 0; i < (this.header as any).alignedCount; i++) {
      this.lengths.push(this._io.readU4le());
    }
    this.itemIds = [];
    for (let i = 0; i < (this.header as any).alignedCount; i++) {
      this.itemIds.push(this._io.readU4le());
    }
  }

  header: Xmd.XmdHeader;
  positions: Array<number>;
  lengths: Array<number>;
  itemIds: Array<number>;
}

export namespace Xmd {
  export class XmdHeader {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent?: Xmd,
      readonly _root?: Xmd,
    ) {

      this._read();
    }

    _read() {
      this.magic = (this._io.readBytes(8)) as any
      if (!((KaitaiStream.byteArrayCompare((this.magic as any), [88, 77, 68, 0, 48, 48, 49, 0]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([88, 77, 68, 0, 48, 48, 49, 0], (this.magic as any), (this._io as any), "/types/xmd_header/seq/0");
      }
      this.layout = (this._io.readU4le()) as any
      if (!( (((this.layout as any) == Xmd.ListCounts.POS_LEN_ID)) )) {
        throw new KaitaiStream.ValidationNotAnyOfError((this.layout as any), (this._io as any), "/types/xmd_header/seq/1");
      }
      this.count = (this._io.readU4le()) as any
    }

    private _alignedCount: number;
    get alignedCount(): number {
      if (typeof this._alignedCount !== 'undefined')
        return this._alignedCount;
      this._alignedCount = (((this.count as any) + KaitaiStream.mod((4 - (this.count as any)), 4))) as any
      return this._alignedCount;
    }

    magic: string;
    layout: Xmd.ListCounts;
    count: number;
  }
}
export namespace Xmd {
  export const enum ListCounts {
    POS_LEN_ID = 3,
  }
}
