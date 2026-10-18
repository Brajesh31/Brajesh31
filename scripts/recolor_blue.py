#!/usr/bin/env python3
"""Recolor the contribution heatmap greens to a blue palette."""

from __future__ import annotations

import argparse
import os
import re
from pathlib import Path


BLUE_HEX = {
    "#216E39": "#0B4AA2",
    "#30A14E": "#0969DA",
    "#40C463": "#2F81F7",
    "#9BE9A8": "#79C0FF",
    "#0E4429": "#0A2E5A",
    "#006D32": "#0B4AA2",
    "#26A641": "#0969DA",
    "#39D353": "#58A6FF",
    "#57F287": "#79C0FF",
}
BLUE_RGB = {
    tuple(bytes.fromhex(source[1:])): tuple(bytes.fromhex(target[1:]))
    for source, target in BLUE_HEX.items()
}
HEX_COLOR = re.compile(r"(?<![0-9A-Fa-f])#[0-9A-Fa-f]{6}(?![0-9A-Fa-f])")


def recolor_svg(path: Path) -> None:
    source = path.read_text(encoding="utf-8")
    changed = 0

    def replace(match: re.Match[str]) -> str:
        nonlocal changed
        color = match.group(0).upper()
        replacement = BLUE_HEX.get(color)
        if replacement:
            changed += 1
            return replacement
        return match.group(0)

    result = HEX_COLOR.sub(replace, source)
    if changed == 0:
        raise ValueError(f"No expected contribution colors found in {path}")
    path.write_text(result, encoding="utf-8")
    print(f"Recolored {changed} SVG color references in {path}")


def recolor_gif(path: Path) -> None:
    from PIL import Image, ImageSequence

    frames = []
    durations = []
    loop = 0
    changed = 0
    with Image.open(path) as source:
        loop = source.info.get("loop", 0)
        default_duration = source.info.get("duration", 100)
        for frame in ImageSequence.Iterator(source):
            durations.append(frame.info.get("duration", default_duration))
            rgb = frame.convert("RGB")
            pixels = list(rgb.getdata())
            recolored = [BLUE_RGB.get(pixel, pixel) for pixel in pixels]
            changed += sum(before != after for before, after in zip(pixels, recolored))
            rgb.putdata(recolored)
            frames.append(rgb)

    if not frames or changed == 0:
        raise ValueError(f"No expected contribution colors found in {path}")

    temporary_path = path.with_name(f".{path.stem}.blue{path.suffix}")
    frames[0].save(
        temporary_path,
        format="GIF",
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=loop,
        disposal=2,
        optimize=True,
    )
    os.replace(temporary_path, path)
    print(f"Recolored {changed} GIF pixels in {path}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--kind", choices=("svg", "gif"), required=True)
    parser.add_argument("files", nargs="+", type=Path)
    arguments = parser.parse_args()

    recolor = recolor_svg if arguments.kind == "svg" else recolor_gif
    for path in arguments.files:
        recolor(path)


if __name__ == "__main__":
    main()
