meta:
  id: nub
  title: WMMT5 NUB sound bank
  file-extension: nub
  endian: le
seq:
  - id: header
    type: header

types:
  header:
    seq:
      - id: magic
        contents: [0x01, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00]
      - id: id
        type: u4
      - id: count
        type: u4
      - id: data_offset
        type: u4
      - id: file_size
        type: u4
      - id: bits
        type: u4