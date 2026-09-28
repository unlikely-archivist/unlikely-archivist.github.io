"""Make the two frame layers from assets/portrait-frame.png (white frame on black).

Rerun after changing the frame:  python3 scripts/make-framed-portrait.py
Writes:
  assets/portrait-frame-black.png  - the frame alone, inverted to black, both backgrounds transparent
  assets/portrait-frame-inner.png  - the frame's inner shape, used in CSS to clip the portrait and color the background

The portrait itself stays a separate file (assets/eryn-portrait.png); index.html stacks the layers.
If the frame changes shape, update the inner-shape percentages in index.html from the numbers this prints.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ASSETS = Path(__file__).resolve().parent.parent / "assets"
SCALE = 2  # the frame source is small; render at 2x so it stays sharp

frame_src = Image.open(ASSETS / "portrait-frame.png").convert("L")
frame_src = frame_src.resize((frame_src.width * SCALE, frame_src.height * SCALE), Image.LANCZOS)

frame = Image.new("RGBA", frame_src.size, (0, 0, 0, 255))
frame.putalpha(frame_src)
frame.save(ASSETS / "portrait-frame-black.png", optimize=True)

# Inner shape: flood-fill the non-frame area from the center, then grow it slightly to tuck under the frame.
binary = frame_src.point(lambda v: 255 if v > 128 else 0)
ImageDraw.floodfill(binary, (binary.width // 2, binary.height // 2), 128)
inner_alpha = binary.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.MaxFilter(9))
inner = Image.new("RGBA", frame_src.size, (0, 0, 0, 255))
inner.putalpha(inner_alpha)
inner.save(ASSETS / "portrait-frame-inner.png", optimize=True)

w, h = frame_src.size
left, top, right, bottom = inner_alpha.getbbox()
print(f"frame {w}x{h}")
print(f"inner width {(right - left) / w:.2%} · inner center x {(left + right) / 2 / w:.2%} · inner bottom {(h - bottom) / h:.2%} from the bottom")
