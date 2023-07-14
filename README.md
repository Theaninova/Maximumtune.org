# Maximumtune.org

![License](https://img.shields.io/github/license/Theaninova/Maximumtune.org)
[![Production Site](https://img.shields.io/badge/Website-Production-blue)](https://maximumtune.org/)
[![Preview Site](https://img.shields.io/badge/Website-Preview-orange)](https://preview.maximumtune.org/)

The preview site includes [experimental Japanese language support](https://preview.maximumtune.org/ja/).

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; max-width: 500px">
<a href="https://maximumtune.org/tools/battle-grade-calculator/" target="_blank"><img src="./static/screenshots/narrow/grade.png"></a>
<a href="https://maximumtune.org/tools/splits-calculator/" target="_blank"><img src="./static/screenshots/narrow/splits.png"></a>
</div>

## Features

* [Battle Grade Calculator](https://maximumtune.org/tools/battle-grade-calculator/)
* [Time Splits tracker](https://maximumtune.org/tools/splits-calculator/)
* [Story Rank Calculator](https://maximumtune.org/tools/story-rank-calculator/)
* [MT Forge](https://preview.maximumtune.org/forge/) (Experimental)
* Works **fully offline** thanks to PWA features and is installable on mobile devices using Chrome. iOS/iPadOS users need to go the more cumbersome route of adding it as a shortcut to the home-screen (thanks Apple), but it works functionally the same.

## Game File Research

As part of the MT Forge and [Sunrise](https://github.com/Theaninova/ProjectSunrise) projects, you can
find some of the research results here.

In particular, there is language-agnostic documentation for some of the binary formats, including
* [`.lmd` Lumen UI Files](https://github.com/Theaninova/Maximumtune.org/blob/master/src/lib/forge/kaitai/lmd.ksy). Also see my [AVM1 Decompiler](https://github.com/Theaninova/avm1-decompiler) (other flash compilers don't work due to LMD being a modified format)
* [`.nub` NU Sound Banks](https://github.com/Theaninova/Maximumtune.org/blob/master/src/lib/forge/kaitai/nub.ksy)
* [`.nut` NU Texture Files](https://github.com/Theaninova/Maximumtune.org/blob/master/src/lib/forge/kaitai/nut.ksy) as well as their [`.tex` wrappers](https://github.com/Theaninova/Maximumtune.org/blob/master/src/lib/forge/kaitai/tex.ksy)
* [`.nud` NU Model Files](https://github.com/Theaninova/Maximumtune.org/blob/master/src/lib/forge/kaitai/nud.ksy) as well as their [`.mdl` wrappers](https://github.com/Theaninova/Maximumtune.org/blob/master/src/lib/forge/kaitai/mdl.ksy)

Also check out [my fork-fork](https://github.com/Theaninova/Smash-Forge) of SmashForge
that is tuned to work better with WMMT game files.
