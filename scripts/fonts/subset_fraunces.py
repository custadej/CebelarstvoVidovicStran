import sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.subset import Subsetter, Options

src_dir, out_dir = sys.argv[1], sys.argv[2]
# Basic Latin + Slovenian letters + the punctuation the site uses
chars = (
    "".join(chr(c) for c in range(0x20, 0x7F))
    + "čšžČŠŽćĆđĐ"
    + "„“”‚‘’«»–—…·•°€×½¼¾§©® "
    + "áéíóúàèìòùäöüÄÖÜßñç"
)
jobs = [
    ("Fraunces[SOFT,WONK,opsz,wght].ttf", "fraunces-roman.woff2"),
    ("Fraunces-Italic[SOFT,WONK,opsz,wght].ttf", "fraunces-italic.woff2"),
]
for src, out in jobs:
    font = TTFont(f"{src_dir}/{src}")
    # Pin softness (the look chosen in the design brief) and the wonk switch; keep optical size; trim weight range.
    sub0 = Subsetter(Options(layout_features=["*"], notdef_glyph=True, notdef_outline=True, name_IDs=["*"]))
    sub0.populate(text=chars)
    sub0.subset(font)
    tmp = f"{out_dir}/_tmp.ttf"
    font.save(tmp)
    font = TTFont(tmp)
    # The italic is only used at display sizes, so its optical size is pinned as well (saves ~25 KB).
    pins = {"SOFT": 70, "WONK": 0, "wght": (300, 700)}
    if "Italic" in src:
        pins["opsz"] = 110
    font = instancer.instantiateVariableFont(font, pins)
    font.save(tmp)
    font = TTFont(tmp)
    opts = Options()
    opts.layout_features = ["kern", "liga", "lnum", "tnum", "onum", "pnum", "frac", "ccmp", "locl", "mark", "mkmk", "calt"]
    opts.flavor = "woff2"
    has_notdef = ".notdef" in font.getGlyphOrder()
    opts.notdef_glyph = has_notdef
    opts.notdef_outline = has_notdef
    opts.name_IDs = [1, 2, 3, 4, 6, 13, 14]
    sub = Subsetter(opts)
    sub.populate(text=chars)
    sub.subset(font)
    font.flavor = "woff2"
    font.save(f"{out_dir}/{out}")
    axes = [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in font["fvar"].axes]
    import os
    os.remove(tmp)
    print(out, axes, len(font.getGlyphOrder()), "glyphs")
