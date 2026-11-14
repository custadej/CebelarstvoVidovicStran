import os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.subset import Subsetter, Options

src, out = sys.argv[1], sys.argv[2]
chars = (
    "".join(chr(c) for c in range(0x20, 0x7F))
    + "čšžČŠŽćĆđĐ"
    + "„“”‚‘’«»–—…·•°€×½¼¾§©® "
    + "áéíóúàèìòùäöüÄÖÜßñç"
)
font = TTFont(src)
sub = Subsetter(Options(layout_features=["kern", "liga", "lnum", "tnum", "pnum", "frac", "ccmp", "locl", "mark", "mkmk"], notdef_glyph=True, notdef_outline=True, name_IDs=["*"]))
sub.populate(text=chars)
sub.subset(font)
tmp = out + ".tmp.ttf"
font.save(tmp)
font = instancer.instantiateVariableFont(TTFont(tmp), {"wght": (400, 700)})
# The original carries the Reserved Font Name "Source" (SIL OFL 1.1). A modified (subset) build must not use it,
# so the subset is renamed. Licence text is kept next to the file.
NEW = "Vidovic Sans"
for rec in font["name"].names:
    if rec.nameID in (1, 16):
        rec.string = NEW
    elif rec.nameID in (4,):
        rec.string = NEW
    elif rec.nameID in (6, 25):
        rec.string = NEW.replace(" ", "")
    elif rec.nameID == 3:
        rec.string = NEW.replace(" ", "") + "-subset"
font.flavor = "woff2"
font.save(out)
os.remove(tmp)
print(out, [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in font["fvar"].axes], len(font.getGlyphOrder()), "glyphs")
