/*
 * This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
 */
import KaitaiStream from 'kaitai-struct/KaitaiStream'
import {Xmd} from './xmd'
import {Nud} from './nud'

export class Mdl {
  _is_le?: boolean;

  constructor(
    readonly _io: KaitaiStream,
    readonly _parent?: unknown,
    readonly _root?: Mdl,
  ) {
    this._root ??= this;

    this._read();
  }

  _read() {
    this.xmd = (new Xmd(this._io, this, null)) as any
  }

  private _models: Array<Mdl.Model>;
  get models(): Array<Mdl.Model> {
    if (typeof this._models !== 'undefined')
      return this._models;
    let io = (this._root as any)._io;
    this._models = [];
    for (let i = 0; i < (this.xmd as any).header.count; i++) {
      this._models.push(new Mdl.Model(io, this, this._root, i));
    }
    return this._models;
  }

  xmd: Xmd;
}

export namespace Mdl {
  export class Model {
    _is_le?: boolean;

    constructor(
      readonly _io: KaitaiStream,
      readonly _parent: Mdl | undefined,
      readonly _root: Mdl | undefined,
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

    private _lenNud: number;
    get lenNud(): number {
      if (typeof this._lenNud !== 'undefined')
        return this._lenNud;
      this._lenNud = ((this._root as any).xmd.lengths[(this.i as any)]) as any
      return this._lenNud;
    }

    private _nud: Nud;
    get nud(): Nud {
      if (typeof this._nud !== 'undefined')
        return this._nud;
      let _pos = this._io.pos;
      this._io.seek((this._root as any).xmd.positions[(this.i as any)]);
      this._raw_nud = (this._io.readBytes((this.lenNud as any))) as any
      let _io__raw_nud = new KaitaiStream(this._raw_nud);
      this._nud = (new Nud(_io__raw_nud, this, null)) as any
      this._io.seek(_pos);
      return this._nud;
    }

    i: number;
    _raw_nud: string;
  }
}
