"""Put assets/eryn-portrait.png inside assets/portrait-frame.png.

Rerun after changing either image:  python3 scripts/make-framed-portrait.py
Writes:
  assets/portrait-frame-black.png  - the frame inverted to black, both backgrounds transparent
  assets/eryn-portrait-framed.png  - the portrait clipped to the frame's inner shape, frame on top
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ASSETS = Path(__file__).resolve().parent.parent / "assets"
SCALE = 2          # the frame source is small; render at 2x so it stays sharp
PORTRAIT_ZOOM = 1.15  # portrait width relative to the frame's inner width
FACE_Y = 0.36      # where the face sits in the portrait, as a fraction of its height

frame_src = Image.open(ASSETS / "portrait-frame.png").convert("L")
frame_src = frame_src.resize((frame_src.width * SCALE, frame_src.height * SCALE), Image.LANCZOS)

# Invert (white frame -> black) and make everything that isn't frame transparent.
frame = Image.new("RGBA", frame_src.size, (0, 0, 0, 255))
frame.putalpha(frame_src)
frame.save(ASSETS / "portrait-frame-black.png", optimize=True)

# Inner shape: flood-fill the non-frame area from the center, then grow it slightly to tuck under the frame.
binary = frame_src.point(lambda v: 255 if v > 128 else 0)
center = (binary.width // 2, binary.height // 2)
ImageDraw.floodfill(binary, center, 128)
inner = binary.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.MaxFilter(9))
left, top, right, bottom = inner.getbbox()

portrait = Image.open(ASSETS / "eryn-portrait.png").convert("RGBA")
width = int((right - left) * PORTRAIT_ZOOM)
portrait = portrait.resize((width, int(portrait.height * width / portrait.width)), Image.LANCZOS)
x = (left + right) // 2 - width // 2
y = (top + bottom) // 2 - int(portrait.height * FACE_Y)

layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
layer.paste(portrait, (x, y), portrait)
clipped = Image.new("RGBA", frame.size, (0, 0, 0, 0))
clipped.paste(layer, (0, 0), inner)
clipped.alpha_composite(frame)
clipped.save(ASSETS / "eryn-portrait-framed.png", optimize=True)
print("wrote", clipped.size, f"{(ASSETS / 'eryn-portrait-framed.png').stat().st_size // 1024} KB")
