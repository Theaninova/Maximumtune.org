meta:
  id: mdl
  file-extension: [bin, mdl]
  title: XMD.001 3d model archive
  endian: le
  imports:
    - nud
seq:
  - id: header
    type: xmd_header
  - id: positions
    type: u4
    repeat: expr
    repeat-expr: header.count
  - id: lengths
    type: u4
    repeat: expr
    repeat-expr: header.count
  - id: item_ids
    type: u4
    repeat: expr
    repeat-expr: header.count
instances:
  models:
    type: model(_index)
    io: _root._io
    repeat: expr
    repeat-expr: header.count

types:
  xmd_header:
    seq:
      - id: signature
        contents: [0x58, 0x4d, 0x44, 0x00, 0x30, 0x30, 0x31, 0x00]
      - id: layout
        type: u4
        enum: list_counts
        valid:
          any-of:
            - list_counts::pos_len_id
      - id: count
        type: u4
  model:
    params:
      - id: i
        type: s4
    instances:
      id:
        value: _root.item_ids[i]
      size:
        value: _root.lengths[i]
      nud:
        type: nud
        pos: _root.positions[i]
        size: size

enums:
  list_counts:
    3: pos_len_id
