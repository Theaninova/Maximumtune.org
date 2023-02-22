/*
 * This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
 */
import KaitaiStream from 'kaitai-struct/KaitaiStream'
import {Xmd} from './xmd'
import {Nut} from './nut'

export class Tex {
  _is_le?: boolean;

  constructor(
    readonly _io: KaitaiStream,
    readonly _parent?: unknown,
    readonly _root?: Tex,
  ) {
    this._root ??= this;

    this._read();
  }

  _read() {
    this.xmd = (new Xmd(this._io, this, null)) as any
  }

  private _textures: Array<Tex.Texture>;
  get textures(): Array<Tex.Texture> {
    if (typeof this._textures !== 'undefined')
      return this._textures;
    let io = (this._root as any)._io;
    this._textures = [];
    for (let i = 0; i < (this.xmd as any).header.count; i++) {
      this._textures.push(new Tex.Texture(io, this, this._root, i));
    }
    return this._textures;
  }

  xmd: Xmd;
}

export namespace Tex {
  export class Texture {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Tex | undefined,
      readonly _root: Tex | undefined,
      i: number,
    ) {
      this.i = i;

      this._read();
    }

    _read() {
    }

    private _id: number;
    get id(): number {
      if (typeof this._id !== 'undefined')
        return this._id;
      this._id = ((this._root as any).xmd.itemIds[(this.i as any)]) as any
      return this._id;
    }

    private _lenNut: number;
    get lenNut(): number {
      if (typeof this._lenNut !== 'undefined')
        return this._lenNut;
      this._lenNut = ((this._root as any).xmd.lengths[(this.i as any)]) as any
      return this._lenNut;
    }

    private _nut: Nut;
    get nut(): Nut {
      if (typeof this._nut !== 'undefined')
        return this._nut;
      let _pos = this._io.pos;
      this._io.seek((this._root as any).xmd.positions[(this.i as any)]);
      this._raw_nut = (this._io.readBytes((this.lenNut as any))) as any
      let _io__raw_nut = new KaitaiStream(this._raw_nut);
      this._nut = (new Nut(_io__raw_nut, this, null)) as any
      this._io.seek(_pos);
      return this._nut;
    }

    i: number;
    _raw_nut: string;
  }
}
