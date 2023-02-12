meta:
  id: mdl
  file-extension: mdl
  imports:
    - xmd
    - nud
seq:
  - id: xmd
    type: xmd
instances:
  models:
    type: model(_index)
    io: _root._io
    repeat: expr
    repeat-expr: xmd.header.count

types:
  model:
    params:
      - id: i
        type: s4
    instances:
      id:
        value: _root.xmd.item_ids[i]
      size:
        value: _root.xmd.lengths[i]
      nud:
        type: nud
        pos: _root.xmd.positions[i]
        size: size
