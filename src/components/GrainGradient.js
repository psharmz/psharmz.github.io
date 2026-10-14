import React, { useEffect, useRef } from 'react';

// Colours come from the --brand-* tokens in public/css/fonts.css so the gradient
// and the style guide can't drift. The literals are only a fallback for the
// first paint if the stylesheet hasn't applied yet.
const FALLBACK = {
  pink: '#F7B9C8',
  green: '#1F4D3A',
  caramel: '#B9703F',
  red: '#A32A2A',
  blush: '#F3D6DD',
};

function readColor(name) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(`--brand-${name}`).trim() || FALLBACK[name];
  const hex = raw.replace('#', '');
  const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

// Static anchors in 0-1 hero space; `d` is pointer-parallax depth, `c` is the
// token name. Pink glows high, caramel bridges pink -> green so they don't go
// grey, green sits under the headline (white type needs it dark), red is a
// small hot spot in the corner.
const BLOB_DEFS = [
  { c: 'pink',    x: 0.38, y: 0.04, r: 0.56, a: 1.0,  d: 1.8 },
  { c: 'caramel', x: 0.50, y: 0.58, r: 0.38, a: 0.9,  d: 1.2 },
  { c: 'green',   x: 0.06, y: 0.80, r: 0.62, a: 1.0,  d: 1.0 },
  { c: 'green',   x: 0.94, y: 0.10, r: 0.42, a: 0.8,  d: 0.6 },
  { c: 'red',     x: 0.00, y: 1.00, r: 0.26, a: 0.8,  d: 1.4 },
];

function makeGrainTile(size = 160) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL('image/png');
}

export default function GrainGradient() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const grainRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const BLOBS = BLOB_DEFS.map((b) => ({ ...b, c: readColor(b.c) }));
    const BLUSH = readColor('blush');
    grainRef.current.style.backgroundImage = `url(${makeGrainTile()})`;

    const SCALE = 0.25; // render at quarter-res; CSS upscales = free softness
    let w = 0, h = 0;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.round(r.width * SCALE));
      h = canvas.height = Math.max(1, Math.round(r.height * SCALE));
    };
    resize();
    const ro = new ResizeObserver(() => { resize(); draw(); }); // resizing clears the canvas
    ro.observe(wrap);

    // Pointer in 0-1 hero space. Everything is static until the pointer moves;
    // the rAF loop only runs while the eased position is still catching up.
    const target = { x: 0.35, y: 0.55 };
    const cur = { x: 0.35, y: 0.55 };
    let glow = 0, glowTarget = 0, raf = 0;

    const draw = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, w, h);
      const px = cur.x - 0.5, py = cur.y - 0.5;
      const size = Math.max(w, h);
      for (const b of BLOBS) {
        const x = (b.x + px * 0.16 * b.d) * w;
        const y = (b.y + py * 0.16 * b.d) * h;
        const r = b.r * size;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.a})`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      if (glow > 0.01) {
        // Shimmer: blush pool under the cursor, fades out once it stops.
        ctx.globalCompositeOperation = 'screen';
        const gx = cur.x * w, gy = cur.y * h, gr = 0.24 * size;
        const gg = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        gg.addColorStop(0, `rgba(${BLUSH[0]},${BLUSH[1]},${BLUSH[2]},${0.38 * glow})`);
        gg.addColorStop(1, `rgba(${BLUSH[0]},${BLUSH[1]},${BLUSH[2]},0)`);
        ctx.fillStyle = gg;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.1;
      cur.y += (target.y - cur.y) * 0.1;
      glow += (glowTarget - glow) * 0.08;
      draw();
      const settled = Math.abs(target.x - cur.x) < 0.0008 && Math.abs(target.y - cur.y) < 0.0008 && Math.abs(glowTarget - glow) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => { if (!raf && !reduced) raf = requestAnimationFrame(tick); };

    let calm = 0;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      glowTarget = 1;
      clearTimeout(calm);
      calm = setTimeout(() => { glowTarget = 0; wake(); }, 120);
      wake();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(calm);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className="grain-gradient" ref={wrapRef} aria-hidden="true">
      <canvas className="grain-gradient__canvas" ref={canvasRef} />
      <div className="grain-gradient__grain" ref={grainRef} />
      <div className="grain-gradient__vignette" />
      <svg className="grain-gradient__wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,70 C240,10 480,110 760,70 C1040,30 1240,100 1440,60 L1440,120 L0,120 Z" fill="#000" />
      </svg>
    </div>
  );
}
