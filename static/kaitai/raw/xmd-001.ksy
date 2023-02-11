meta:
  id: xmd_001
  file-extension: bin
  title: XMD.001 3d model archive
  endian: le
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

types:
  xmd_header:
    seq:
      - id: signature
        contents: ['XMD', 0x00, 0x30, 0x30, 0x31, 0x00]
      - id: layout
        type: u4
        enum: list_counts
        valid:
          any-of:
            - list_counts::pos_len_id
      - id: count
        type: u4

enums:
  list_counts:
    3: pos_len_id