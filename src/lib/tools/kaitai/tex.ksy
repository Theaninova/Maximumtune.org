meta:
  id: tex
  file-extension: tex
  imports:
    - xmd
    - nut
seq:
  - id: xmd
    type: xmd
instances:
  textures:
    type: texture(_index)
    io: _root._io
    repeat: expr
    repeat-expr: xmd.header.count

types:
  texture:
    params:
      - id: i
        type: s4
    instances:
      id:
        value: _root.xmd.item_ids[i]
      size:
        value: _root.xmd.lengths[i]
      nud:
        type: nut
        pos: _root.xmd.positions[i]
        size: size
