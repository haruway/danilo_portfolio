// Mock-only helpers: halftone de pontos e dither em canvas, estático.
// Descartável: serve só pra renderizar as imagens da Fase 2.

function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
function fbm(x, y) {
  let s = 0, a = 0.5
  for (let i = 0; i < 5; i++) { s += a * vnoise(x, y); x *= 2.02; y *= 2.03; a *= 0.5 }
  return s
}

// field(x,y) -> tinta 0..1 ; warp(x,y) -> deslocamento vertical (miragem)
function halftoneDots(canvas, { cell = 12, angle = 45, ink = '#000', field, warp = () => 0 }) {
  const ctx = canvas.getContext('2d')
  const w = canvas.width, h = canvas.height
  const a = angle * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a)
  const R = Math.hypot(w, h)
  ctx.fillStyle = ink
  for (let v = -R; v < R; v += cell) {
    for (let u = -R; u < R; u += cell) {
      const x = w / 2 + u * ca - v * sa
      const y = h / 2 + u * sa + v * ca
      if (x < -cell || y < -cell || x > w + cell || y > h + cell) continue
      const dy = warp(x, y)
      const d = Math.max(0, Math.min(1, field(x, y + dy)))
      if (d < 0.015) continue
      const r = cell * 0.62 * Math.sqrt(d)
      ctx.beginPath()
      ctx.arc(x, y + dy * 0.6, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16)

// Desenha img em "cover" dentro do canvas
function drawCover(ctx, img, w, h) {
  const s = Math.max(w / img.width, h / img.height)
  const iw = img.width * s, ih = img.height * s
  ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih)
}

// Assentar congelado no meio: esquerda dither 1-bit grosso -> fino -> foto
function settleFrame(canvas, img, { split = 0.5, band = 0.22, ink = [10, 10, 10], paper = [255, 255, 255] }) {
  const w = canvas.width, h = canvas.height
  const ctx = canvas.getContext('2d')
  drawCover(ctx, img, w, h)
  const src = ctx.getImageData(0, 0, w, h)
  const out = ctx.createImageData(w, h)
  out.data.set(src.data)
  const lum = (i) => (0.2126 * src.data[i] + 0.7152 * src.data[i + 1] + 0.0722 * src.data[i + 2]) / 255
  for (let y = 0; y < h; y++) {
    // fronteira tremendo com o calor
    const edge = w * split + (fbm(y * 0.012, 3.1) - 0.5) * 160 + Math.sin(y * 0.03) * 18
    for (let x = 0; x < w; x++) {
      if (x > edge) continue
      const t = Math.min(1, (edge - x) / (w * band)) // 0 na borda, 1 longe
      const s = Math.max(2, Math.round(2 + t * 4)) // tamanho do pixel do dither
      const bx = Math.floor(x / s) * s, by = Math.floor(y / s) * s
      const i = (by * w + bx) * 4
      const L = Math.min(1, Math.max(0, (lum(i) - 0.5) * 1.5 + 0.55))
      const th = BAYER4[((by / s) % 4) * 4 + ((bx / s) % 4)]
      const c = L > th ? paper : ink
      const o = (y * w + x) * 4
      out.data[o] = c[0]; out.data[o + 1] = c[1]; out.data[o + 2] = c[2]; out.data[o + 3] = 255
    }
  }
  ctx.putImageData(out, 0, 0)
}

function loadImg(src) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src })
}
