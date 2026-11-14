"""Builds assets/derived/logo-clean.png (2x) from the original 497x223 logo.

The artwork is not redrawn. Three things change:
  1. the baked-in drop shadow and white outer glow are removed,
  2. edges are re-antialiased by working at 4x and saving at 2x,
  3. the canvas is trimmed to the artwork so the logo can be centred optically in the header.

How: the wordmark is pure dark ink, so right of SPLIT only ink pixels are kept. The bee is a closed dark
outline, so left of SPLIT everything reachable from the canvas edge without crossing ink or solid colour
is cleared (flood fill), which removes shadow and glow but keeps the inside of the bee untouched.
Run: python3 -I scripts/logo-clean.py
"""
from collections import deque
from PIL import Image

SRC = "assets/original/old-site/Logo.png"
OUT = "assets/derived/logo-clean.png"
SCALE = 4
SPLIT = 153 * SCALE  # x where the bee ends and the wordmark begins
INK_L = 86  # ink is ~33, the shadow/glow blend next to it starts at ~98

src = Image.open(SRC).convert("RGBA")
im = src.resize((src.width * SCALE, src.height * SCALE), Image.LANCZOS)
w, h = im.size
px = im.load()


def lum(p):
    return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]


def is_ink(p):
    return p[3] > 200 and lum(p) < INK_L


def passable(p):
    if is_ink(p):
        return False
    if p[3] < 235:
        return True
    sat = max(p[:3]) - min(p[:3])
    return sat < 24 and 60 < lum(p) < 170  # opaque grey = shadow blended with glow


background = bytearray(w * h)
queue = deque()
for x in range(w):
    queue.append((x, 0))
    queue.append((x, h - 1))
for y in range(h):
    queue.append((0, y))
    queue.append((w - 1, y))
while queue:
    x, y = queue.popleft()
    i = y * w + x
    if background[i] or not passable(px[x, y]):
        continue
    background[i] = 1
    if x > 0:
        queue.append((x - 1, y))
    if x < w - 1:
        queue.append((x + 1, y))
    if y > 0:
        queue.append((x, y - 1))
    if y < h - 1:
        queue.append((x, y + 1))

for y in range(h):
    for x in range(w):
        p = px[x, y]
        if x >= SPLIT:
            px[x, y] = (35, 31, 32, 255) if is_ink(p) else (35, 31, 32, 0)
        elif background[y * w + x]:
            px[x, y] = (p[0], p[1], p[2], 0)
        else:
            px[x, y] = (p[0], p[1], p[2], 255)

im = im.crop(im.getbbox())
out = im.resize((im.width // 2, im.height // 2), Image.LANCZOS)
out.save(OUT, optimize=True)
print("clean logo", out.size)
