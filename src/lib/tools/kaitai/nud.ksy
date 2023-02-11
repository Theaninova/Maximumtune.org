# largely modeled after the SmashForge implementation

meta:
  id: nud
  file-extension: nud
  title: Bandai Namco NUD file
  endian:
    switch-on: file_type
    cases:
      ndwd: le
      ndp3: be
seq:
  - id: file_type
    type: u4le
    enum: signature
    valid:
      any-of:
        - signature::ndwd
        - signature::ndp3
  - id: header
    type: header
  - id: object_data
    type: object_data
    repeat: expr
    repeat-expr: header.polyset_count
  - id: poly_data
    type: poly_data
    repeat: expr
    repeat-expr: header.polyset_count

types:
  header:
    seq:
      - id: file_size
        type: u4
      - id: version
        type: u2le
        enum: version
        valid:
          any-of:
            - version::v2
      - id: polyset_count
        type: u2
      - id: bone_channels
        type: u2
      - id: bone_count
        type: u2
      - id: poly_clump_offset
        type: u4
      - id: poly_clump_size
        type: u4
      - id: vert_clump_size
        type: u4
      - id: vert_add_clump_size
        type: u4
      - id: bounding_sphere
        type: f4
        repeat: expr
        repeat-expr: 4
    instances:
      poly_clump_start:
        value: poly_clump_offset + 0x30
      vert_clump_start:
        value: poly_clump_start + poly_clump_size
      vert_add_clump_start:
        value: vert_clump_start + vert_clump_size
      name_start:
        value: vert_add_clump_start + vert_add_clump_size
  object_data:
    seq:
      - id: bounding_sphere
        type: f4
        repeat: expr
        repeat-expr: 8
      - id: name_offset
        type: u4
      - id: empty_bytes
        doc: this is just for alignment
        contents: [0, 0]
      - id: bone_flags
        type: u2
      - id: bone_index
        type: s2
      - id: poly_count
        type: u2
      - id: position_b
        type: s4
    instances:
      name:
        id: _root._io
        pos: _parent.header.name_start + name_offset
        type: strz
        encoding: UTF-8
  poly_data:
    seq:
      - id: poly_offset
        type: u4
      - id: vert_offset
        type: u4
      - id: vert_add_offset
        type: u4
      - id: vert_count
        type: u2
      - id: vert_info
        type: u1
      - id: uv_info
        type: u1
      - id: texprop
        type: u4
        repeat: expr
        repeat-expr: 4
      - id: poly_count
        type: u2
      - id: poly_size
        type: u1
      - id: poly_flag # TODO
        doc: Need to determine what this does
        type: u1
        valid:
          any-of:
            - 0
      - id: alignment_padding
        doc: This does nothing it just aligns the file
        size: 0xC
    instances:
      poly_start:
        value: _root.header.poly_clump_start + poly_offset
      vert_start:
        value: _root.header.vert_clump_start + vert_offset
      vert_add_start:
        value: _root.header.vert_add_clump_start + vert_add_offset

      bone_size:
        value: vert_info >> 4
      normal_channel_count:
        value: 'vert_info & 0b11 == 2 ? 1 : vert_info & 0b11'
      normal_size:
        value: '((vert_info & 0b1100) >> 2) != 0 ? 2 : 4'
      uv_channel_count:
        value: uv_info >> 4
      color_size:
        value: (uv_info & 0xf) / 2

      # TODO: read uv
      vertices:
        io: _root._io
        pos: vert_start
        type: vertex_data
        repeat: expr
        repeat-expr: vert_count
      indices:
        io: _root._io
        pos: poly_start
        type: u2
        repeat: expr
        repeat-expr: poly_count
      materials:
        type: material_wrapper(texprop[_index])
        repeat: until
        repeat-until: _index == 4 or texprop[_index] == 0
  vertex_data:
    seq:
      - id: vertex
        type: vector(3, 4)
      - id: vertex_padding
        size: 4
        if: _parent.normal_channel_count > 1
      - id: normal_channels
        type: vector(4, _parent.normal_size)
        repeat: expr
        repeat-expr: _parent.normal_channel_count
      - id: colors
        if: |
          _parent.bone_size == 0 and
          _parent.color_size > 0
        type: vector(4, _parent.color_size)
      - id: uv_channels
        if: _parent.bone_size == 0
        type: vector(2, 2)
        repeat: expr
        repeat-expr: _parent.uv_channel_count
  vector:
    params:
      - id: length
        type: u1
      - id: size
        type: u1
    seq:
      - id: values
        type:
          switch-on: size
          cases:
            1: u1
            2: u2
            4: f4
        repeat: expr
        repeat-expr: length
  material_wrapper:
    params:
      - id: position
        type: u4
    instances:
      material:
        io: _root._io
        type: material
        pos: position
  material:
    seq:
      - id: flags
        type: u4
      - id: padding
        size: 4
      - id: src_factor
        type: u2
      - id: tex_count
        type: u2
      - id: dst_factor
        type: u2
      - id: alpha_test
        type: b1
      - id: alpha_function
        type: u1
        enum: alpha_function
      - id: ref_alpha
        type: u2
      - id: cull_mode
        type: u2
        enum: cull_mode
      - id: padding_2
        size: 8
      - id: z_buffer_offset
        type: s4
      - id: material_textures
        type: material_texture
        repeat: expr
        repeat-expr: tex_count
      - id: material_attributes
        type: material_attribute
        repeat: until
        repeat-until: _.value_count == 0
  material_attribute:
    seq:
      - id: size
        type: u4
      - id: name_offset
        type: u4
      - id: value_count
        type: u4be
      - id: padding
        size: 4
      - id: values
        type: f4
        repeat: expr
        repeat-expr: 4
    instances:
      name:
        type: strz
        if: value_count != 0
        pos: _root.header.name_start + name_offset
        encoding: UTF-8
  material_texture:
    seq:
      - id: hash
        type: s4
      - id: unknown
        size: 6
      - id: map_mode
        type: u2
        enum: map_mode
      - id: wrap_mode_s
        type: u1
        enum: wrap_mode
      - id: wrap_mode_t
        type: u1
        enum: wrap_mode
      - id: min_filter
        type: u1
        enum: filter_mode
      - id: mag_filter
        type: u1
        enum: filter_mode
      - id: mip_detail
        type: u1
        enum: mip_detail
      - id: unknown_2
        size: 7

enums:
  signature:
    1146569806: ndwd # NDWD
    1313099827: ndp3 # NDP3
  version:
    2: v2 # TODO
  bone_flags: # these may actually be bit flags...
    0: unbound
    4: weighted
    8: single_bound
  alpha_function:
    0: no_alpha
    4: alpha_1
    6: alpha_2
  wrap_mode:
    1: repeat
    2: mirrored_repeat
    3: clamp_to_edge
  filter_mode:
    0: linear_mipmap_linear # TODO: fix this...
    1: nearest
    2: linear
    3: nearest_mipmap_linear
  cull_mode:
    0x000: none
    0x002: inside_pokken
    0x404: outside
    0x405: inside
  map_mode:
    0x00: tex_coord
    0x1d00: env_camera
    0x1e00: projection
    0x1ecd: env_light
    0x1f00: env_spec
  mip_detail:
    1: level_1
    2: level_1_off
    3: level_4
    4: level_4_anisotropic
    5: level_4_trilinear
    6: level_4_trilinear_anisotripic
  texture_flag:
    0x00000080: glow
    0x00000040: shadow
    0x00000020: dummy_ramp
    0x00000010: sphere_map
    0x00000008: stage_ao_map
    0x00000004: ramp_cube_map
    0x00000002: normal_map
    0x00000001: diffuse_map
