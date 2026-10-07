// Mock-only: halftone de LINHA colorido (sol e tipo), pixel a pixel. Descartável.
// Depende de fbm/hash de ht.js.

const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

// tons do escuro pro claro + limiares de luminância
const TONES = {
  auth: { cols: ['#0A0A0A', '#0A0A0A', '#3A0D06', '#C21A0C', '#EC620E', '#FFC21A', '#FBE6B2'], th: [0, 0.07, 0.2, 0.3, 0.37, 0.62, 0.86] },
  tech: { cols: ['#0A0A0A', '#7A2A06', '#E8670E', '#FFC21A', '#FFD21F'], th: [0, 0.18, 0.36, 0.66, 0.9] }
}

function toneAt(L, pal) {
  const { th } = pal
  let i = th.length - 2
  for (let k = 0; k < th.length - 1; k++) if (L < th[k + 1]) { i = k; break }
  const f = Math.min(1, Math.max(0, (L - th[i]) / (th[i + 1] - th[i])))
  return [i, f]
}

// campo de luz do sol (0..1)
function sunField(style, x, y, s) {
  const dx = x - s.cx, dy = y - s.cy
  const r = Math.hypot(dx, dy) / s.R
  const c = dx / (r * s.R + 1e-6), sn = dy / (r * s.R + 1e-6)
  if (style === 'tech') {
    if (r < 1) return 0.97 - 0.12 * r * r
    return 0.92 * Math.exp(-(r - 1) * 1.15)
  }
  // autêntico: raios irregulares — ruído fino no ângulo, grosso no raio
  const n = fbm(c * 5.5 + r * 0.35 + 11, sn * 5.5 - r * 0.25 + 3)
  const n2 = fbm(c * 14 + r * 0.9, sn * 14 - r * 0.7 + 7)
  const rays = Math.pow(Math.max(0, n * 0.8 + n2 * 0.45 - 0.18), 1.6) * 2.1
  const core = r < 0.92 ? 0.78 - 0.1 * r : 0
  const corona = Math.exp(-Math.pow((r - 1.15) / 0.42, 2)) * (0.3 + rays * 1.1)
  const glow = Math.exp(-(r - 0.9) * 0.42) * (0.06 + rays * 0.9)
  return Math.min(1, Math.max(core, corona, glow * (r > 0.85 ? 1 : 0)))
}

// desenha o sol inteiro em linhas
function renderSun(canvas, s) {
  const w = canvas.width, h = canvas.height
  const ctx = canvas.getContext('2d')
  const img = ctx.createImageData(w, h)
  const pal = TONES[s.style], cols = pal.cols.map(hex)
  const a = (s.angle ?? 60) * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a)
  const P = s.period ?? 7
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // miragem: deslocamento vertical, mais forte perto e acima do sol
      const near = Math.exp(-Math.hypot(x - s.cx, y - s.cy) / (s.R * 2.2))
      const hy = (fbm(x * 0.006, y * 0.012 + 5) - 0.5) * (s.heat ?? 40) * near
      let L = sunField(s.style, x, y + hy, s)
      if (s.fade) L *= s.fade(x, y)
      if (s.style === 'auth') L += (hash(x, y) - 0.5) * 0.06 // grão
      L = Math.min(1, Math.max(0, L))
      const [i, f] = toneAt(L, pal)
      // linha: coordenada girada + onda de calor
      const wave = s.style === 'tech'
        ? Math.sin((x * sa - y * ca) * 0.012 + fbm(x * 0.003, y * 0.003) * 4) * 9
        : (fbm(x * 0.004, y * 0.003) - 0.5) * 10
      const v = (x * ca + y * sa + wave + hy * 0.5) / P
      const d = Math.abs((v - Math.floor(v)) - 0.5) * 2
      const k = 1 - sstep(f - 0.12, f + 0.12, d) // 1 = cor de cima
      const lo = cols[i], hi = cols[Math.min(i + 1, cols.length - 1)]
      const o = (y * w + x) * 4
      img.data[o] = lo[0] + (hi[0] - lo[0]) * k
      img.data[o + 1] = lo[1] + (hi[1] - lo[1]) * k
      img.data[o + 2] = lo[2] + (hi[2] - lo[2]) * k
      img.data[o + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
}

// texto renderizado em linhas, com calor (frase "assentando")
function renderTypeLines(canvas, { text, font, x, y, color = '#FFC21A', period = 6, angle = 60, heat = 30, settle = 0.5, region, ls }) {
  const w = canvas.width, h = canvas.height
  const m = document.createElement('canvas'); m.width = w; m.height = h
  const mc = m.getContext('2d'); mc.fillStyle = '#fff'; mc.font = font; mc.textBaseline = 'alphabetic'; if (ls) mc.letterSpacing = ls; mc.fillText(text, x, y)
  const mask = mc.getImageData(0, 0, w, h).data
  const ctx = canvas.getContext('2d')
  const out = ctx.getImageData(0, 0, w, h)
  const col = hex(color)
  const a = angle * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a)
  const [x0, y0, x1, y1] = region || [0, 0, w, h]
  for (let py = y0; py < y1; py++) {
    for (let px = x0; px < x1; px++) {
      const hy = (fbm(px * 0.008, py * 0.02 + 9) - 0.5) * heat
      const sy = Math.round(py + hy), sx = Math.round(px + (fbm(px * 0.01 + 4, py * 0.01) - 0.5) * heat * 0.3)
      if (sx < 0 || sy < 0 || sx >= w || sy >= h) continue
      const al = mask[(sy * w + sx) * 4 + 3] / 255
      if (al < 0.02) continue
      // cobertura cresce de cima pra baixo: a palavra assenta pela base
      const cov = Math.min(1, al * (settle + (py - (y - 200)) / 260))
      const v = (px * ca + py * sa) / period
      const d = Math.abs((v - Math.floor(v)) - 0.5) * 2
      const k = 1 - sstep(cov - 0.1, cov + 0.1, d)
      const o = (py * w + px) * 4
      out.data[o] += (col[0] - out.data[o]) * k
      out.data[o + 1] += (col[1] - out.data[o + 1]) * k
      out.data[o + 2] += (col[2] - out.data[o + 2]) * k
    }
  }
  ctx.putImageData(out, 0, 0)
}
