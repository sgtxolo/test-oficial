import sys, json
from PIL import Image
import numpy as np
from collections import deque
def blobs(path, xmax):
    im = Image.open(path).convert("RGB"); a = np.asarray(im).astype(int)
    h, w, _ = a.shape; R, G, B = a[...,0], a[...,1], a[...,2]
    mask = (R > 200) & (G < 145) & (B < 165) & ((R - G) > 90)
    mask[:, int(xmax):] = False
    seen = np.zeros_like(mask); out = []
    ys, xs = np.nonzero(mask)
    for y0, x0 in zip(ys, xs):
        if seen[y0, x0]: continue
        q = deque([(y0, x0)]); seen[y0, x0] = True; pts = []
        while q:
            y, x = q.popleft(); pts.append((y, x))
            for dy in (-2,-1,0,1,2):
                for dx in (-2,-1,0,1,2):
                    ny, nx = y+dy, x+dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True; q.append((ny, nx))
        if len(pts) < 25: continue
        py = [p[0] for p in pts]; px = [p[1] for p in pts]
        out.append(dict(x=int(min(px)), y=int(min(py)), w=int(max(px)-min(px)+1), h=int(max(py)-min(py)+1), n=len(pts)))
    return w, h, out
if __name__ == "__main__":
    p, xmax = sys.argv[1], float(sys.argv[2])
    w, h, b = blobs(p, xmax); print(w, h); print(json.dumps(b))
