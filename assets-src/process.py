"""Turn cream-paper linocut PNGs into alpha ink masks (black RGB + alpha) as WebP."""
import sys, os
from PIL import Image, ImageOps
src_dir = os.path.expanduser('~/workspace/journey/assets-src')
out_dir = os.path.expanduser('~/workspace/journey/public/img')
names = sys.argv[1:] or sorted(f for f in os.listdir(src_dir) if f.endswith('.png'))
for f in names:
    p = os.path.join(src_dir, f)
    im = Image.open(p).convert('L')
    w, h = im.size
    # crop: 6% sides/top, 10% bottom (signatures and frame lines live there)
    im = im.crop((int(w*.06), int(h*.06), int(w*.94), int(h*.90)))
    # square it again from the centre
    w, h = im.size; s = min(w, h)
    im = im.crop(((w-s)//2, (h-s)//2, (w-s)//2+s, (h-s)//2+s))
    im = im.resize((800, 800), Image.LANCZOS)
    # levels: paper (>=200) -> transparent, ink (<=70) -> opaque
    lo, hi = 70, 200
    alpha = im.point(lambda v: 255 if v <= lo else (0 if v >= hi else int(255 * (hi - v) / (hi - lo))))
    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    out.putalpha(alpha)
    name = os.path.splitext(os.path.basename(f))[0]
    out.save(os.path.join(out_dir, name + '.webp'), 'WEBP', quality=80, method=6)
    print(name, os.path.getsize(os.path.join(out_dir, name + '.webp')))
