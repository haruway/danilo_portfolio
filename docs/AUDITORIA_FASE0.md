# Fase 0 — Auditoria · Tonestamp → Portfólio

**Data:** 25/08/2026
**Repo motor:** `/Users/danilomariani/Documents/DITHERING REPO /tonestamp` (HEAD `2daad2b`)
**Alvo:** `site/index.html` — 1519 linhas, 63 KB

---

## Resumo executivo

A decisão de arquitetura do PRD (inline, sem iframe) está **certa** e é viável. Mas o inventário
técnico que sustenta ela está desatualizado em cinco pontos concretos. Nenhum é fatal; todos mudam
o plano das fases seguintes.

| # | Achado | Impacto |
|---|---|---|
| 1 | São **7 módulos**, não 4. `state.js` e `shape-sets.js` nem aparecem no PRD | Escopo |
| 2 | `sources.js`, marcado pra descarte, é **dependência dura** do renderer | Escopo |
| 3 | `renderer.js` viola a regra §7.1 **por construção** — não dá pra reusar verbatim | Fase 1 |
| 4 | 3 dos 4 conflitos do §6 descrevem a **v9/v10**, não o arquivo no ar | Fase 3 |
| 5 | O ponto de inserção do §3 **não existe** no site atual | Fase 3 |

---

# PARTE 1 — O motor

## 1.1 Assinaturas públicas

### `shape-sets.js` — 94 linhas · **ARQUIVO GERADO**
Gerado por `scripts/gen-shape-sets.mjs` a partir de `shapes/`. Não editar à mão.

```js
SHAPE_SETS: ShapeSet[]        // ShapeSet = { id, labels:{pt,en}, svgs: string[7] }
findShapeSet(id) -> ShapeSet|undefined
```

**São 5 conjuntos**, confirmado no fonte — resolve a dúvida do PRD §8:
`default` (densidade) · `dots` (por tamanho) · `blocks` (quadrados) · `bitmap-4` (dithering) · `complexity`.

### `shapes.js` — 203 linhas
```js
TINT_PX = 128
DEFAULT_SVG = SHAPE_SETS[0].svgs
parseSvg(text)                        -> { el, viewBox }     // lança CHAVE de i18n
svgToImage(text)                      -> Promise<HTMLImageElement>
buildSlotImage(slot)                  -> Promise<string|null>
makeTint(img, color, solid)           -> HTMLCanvasElement
getTint(slotIndex, img, hex, solid)   -> HTMLCanvasElement|null
clearTints() · tintCacheSize()
```

### `state.js` — 163 linhas
```js
N = 7
STATE_META: [rótulo, subtítulo][7]
S: {                                  // 20 parâmetros de render, objeto MUTÁVEL
  cols:80, bg:'#000000', fill:true, invert:false, scale:false, minS:30, maxS:100,
  rot:false, rotInt:400, bri:0, con:0, gam:1, res:1440, alpha:false, square:false,
  playing:true, cmode:'state', palN:5, sat:0, autoPal:true
}
slots: Slot[7]                        // { on, color, svgText, img, dirtyImg, name, error }
subscribe(fn) -> unsubscribe
emit(key, value) · get(key) · set(key, value)
getPalette() -> number[][] · setPalette(next)
resetParams() · defaults()
```

### `palette.js` — 224 linhas · **zero imports**
```js
lum(r,g,b) · hex2rgb(h) · rgb2hex(r,g,b) · saturate(r,g,b,amt)
extractPalette(source, k)                        -> number[][]   // k = 2..8
nearestPal(palette, r, g, b)                     -> [r,g,b]
spreadOverStates(palette, n)                     -> string[]     // hex por estado
cellColor(mode, stateColor, rgb, ci, palette, sat) -> string     // mode: state|pixel|quant
```

### `sources.js` — 270 linhas · **zero imports**
```js
getSource() -> { el, type:'image'|'video'|'cam', w, h } | null
setImage(url) · setVideo(url, playing) · startCam() -> Promise<boolean>
stopCam() · releaseAll() · setPlaying(playing)
loadFile(file, playing) -> boolean
initDropZone(overlayEl, isPlaying)
onChange(fn) · onError(fn)
```

### `renderer.js` — 314 linhas
```js
init(canvas)                     // única superfície de DOM do módulo
getFrame()    -> { geo, cells, rgb } | null     // último quadro amostrado
tonemap(l)    -> 0..1            // brilho/contraste/gamma ANTES da classificação
geometry(srcW, srcH) -> { sx,sy,sw,sh, cols,rows, outW,outH, cs }
outputSize()  -> { w, h }
paint(now, opts?)                // opts.transparent limpa em vez de pintar fundo
start() · stop() · isRunning() · onStats(fn)
```

### `export.js` — 328 linhas
```js
init(canvas)
exportPNG()                      // toDataURL, síncrono
exportSVG()   -> string|null     // null = sucesso; string = mensagem de erro
isRecording() · recordingInfo(w,h) · toggleRecording(onState)
```

---

## 1.2 Grafo de dependência

```
shape-sets.js ───► shapes.js ───► state.js
                        │              │
palette.js  (folha)     │              │
sources.js  (folha)     │              │
     │                  │              │
     └──────┬───────────┴──────────────┘
            ▼
       renderer.js  ← state, shapes(getTint), palette(cellColor), sources(getSource)
            │
            ▼
        export.js   ← state, shapes(parseSvg), palette(cellColor), renderer(tonemap,getFrame,paint)
```

**Ordem topológica** (DFS de `build.mjs`, com `export.js` como entrada):

```
1. shape-sets.js
2. shapes.js
3. state.js
4. palette.js
5. sources.js
6. renderer.js
7. export.js
```

Sem ciclos. `shapes.js` não importa `state.js` — é isso que impede o ciclo, e é intencional
(comentado no topo do arquivo).

> ### ⚠️ Achado 1 — o PRD conta 4 módulos; são 7
> A tabela do §2 lista `renderer · shapes · palette · export`. Faltam `state.js` e `shape-sets.js`,
> que são dependências duras de todos eles.
>
> ### ⚠️ Achado 2 — `sources.js` não pode ser descartado
> O §2 manda descartar `sources.js` ("só o pedaço de upload/webcam"). Mas
> `renderer.js:15` importa `getSource` e chama em `sample()`, `outputSize()` e no loop `frame()`.
> Sem ele o renderer não roda. Tem que entrar — enxuto, mas tem que entrar.

---

## 1.3 Onde o estado vive

Tudo em `state.js`, como **singleton de módulo**. Três formas distintas:

| O quê | Forma | Como os módulos leem |
|---|---|---|
| `S` (params) | objeto exportado, mutável | **por referência direta** — `S.cols`, `S.bg` |
| `slots` | array exportado, mutável | **por referência direta** — `slots[idx].color` |
| `palette` | `let` privado | **por getter** — `getPalette()` |

A paleta é getter e não export direto porque `build.mjs` **proíbe** `export let`/`export var`
(o bundle copia o valor no import; uma ligação mutável se comportaria diferente do ES module).

**O detalhe que decide a Fase 1:** existe um pub/sub (`subscribe`/`emit`), mas **o renderer não se
inscreve nele**. Ele lê `S` cru a cada quadro dentro do `requestAnimationFrame`. Mudar um controle
não dispara render nenhum — o loop simplesmente enxerga o valor novo no próximo frame.

> ### 🔴 Achado 3 — `renderer.js` viola a §7.1 por construção
> A regra não-negociável do PRD: *"Imagem estática não usa `requestAnimationFrame`. Renderiza uma
> vez, e de novo só quando um parâmetro muda."*
>
> O loop atual (`renderer.js:268-291`) faz o oposto:
> ```js
> function frame(now) {
>   rafId = requestAnimationFrame(frame);
>   const info = getSource();
>   if (!info) return;
>   if (info.type !== 'image' && !S.playing && lastCells) { paint(now); return; }  // ← só vídeo/cam
>   if (!sample()) return;   // ← imagem estática CAI AQUI
>   paint(now);
> }
> ```
> O atalho de pausa exige `type !== 'image'`. Ou seja: com o brasão parado na tela, o módulo
> **reamostra a imagem inteira e repinta a 60 fps, para sempre.** Isso é `drawImage` + `getImageData`
> + loop de luminância + carimbo de N células, por quadro, sem nada mudar.
>
> **Consequência:** `renderer.js` é o módulo que exige mais adaptação, não o mais reaproveitável.
> A Fase 1 precisa trocar o `frame()` por render sob demanda — ou inscrevendo o renderer no
> `subscribe()` que já existe, ou expondo um `renderOnce()` que a casca chama.

---

## 1.4 Como o `export.js` gera o SVG

Não é traçado do canvas. Reconstrói a composição célula a célula (`export.js:66-188`):

1. Pré-parseia os 7 SVGs uma vez (`parseSvg`) → `{ el, viewBox }`
2. Pra cada par **(shape, cor)** cria um `<g id="sN">` em `<defs>` com o `innerHTML` original
3. Normaliza o `viewBox` pra origem, se tiver `minX`/`minY`
4. Cada célula vira um `<use xlink:href="#sN" href="#sN" transform="translate(x y) scale(kx ky)"/>`

Duas decisões deliberadas, ambas comentadas no fonte:
- **`<g>` e não `<symbol>`** — o Illustrator lê SVG 1.1 e trata `symbol` com viewBox de forma inconsistente
- **`xlink:href` antes de `href`** — o Illustrator só entende o primeiro; era a causa de abrir vazio lá e certo no Preview

### As shapes bundled saem como path?

**Saem como geometria vetorial nativa — mas nem sempre `<path>`.** O que vai pro `<defs>` é a
primitiva original de cada SVG:

| Conjunto | Primitivas |
|---|---|
| `default` | `<circle>`, `<rect>`, `<path>` (mistura) |
| `dots` | só `<circle>` |
| `blocks` | só `<rect>` |
| `bitmap-4` | só `<rect>` |
| `complexity` | só `<path>` |

Nenhuma é bitmap. No Illustrator, `<circle>`/`<rect>` chegam como elipse/retângulo editáveis e
`<path>` como traçado — todos objetos vetoriais de verdade. A copy do PRD ("abre editável no
Illustrator, não como bitmap traçado") está **correta**.

> ### ⚠️ Achado 4 — o teste de aceite pode dar falso negativo
> O critério do §10 diz: *"clicar numa e confirmar que não é imagem embutida"*.
>
> Como cada célula é um `<use>`, o Illustrator materializa isso como **símbolo/instância**, não como
> path solto. Clicar numa célula seleciona uma instância. É vetor legítimo e editável, mas exige
> **Expandir** pra chegar no traçado individual.
>
> **Reescrever o critério:** *"abrir o SVG, expandir, e confirmar que a célula vira traçado com
> pontos de âncora — não imagem embutida."*

### Confirmado: o aviso do §5.2 está mesmo desatualizado

`state.js:84` popula `slot.svgText = DEFAULT_SVG[i]` no boot dos 7 slots. `exportSVG()` só exige
`slot.on && slot.svgText`. **O export funciona com os conjuntos embutidos, sem upload nenhum.**
Nenhuma pré-condição é necessária, como o Danilo já tinha observado no teste.

### Armadilha de configuração pro palco claro

Em `groupFor()`, o `fill` só é sobrescrito se `S.fill === true`. As shapes embutidas vêm com
`fill="#fff"` hardcoded. Então com `S.fill = false` o SVG sai **branco sobre o palco cream** —
invisível. A Fase 1 precisa fixar `S.fill = true` e `slots[i].color = '#080706'`.

---

## 1.5 O que o `scripts/build` faz

`build.mjs` (~470 linhas, Node puro, zero dependência) faz três coisas: inlina CSS, resolve o grafo
de ES modules a partir de `js/main.js` e concatena em ordem topológica num `<script>`, e escreve
`dist/index.html`.

O bundle gerado é um IIFE com registro manual:

```js
(function () {
  'use strict';
  var __m = {};
  /* ---------- js/shapes.js ---------- */
  __m["js/shapes.js"] = (function () {
    const { SHAPE_SETS } = __m["js/shape-sets.js"];   // prelude
    /* corpo sem import/export */
    return { TINT_PX, DEFAULT_SVG, parseSvg, /* ... */ };
  })();
  // ...
})();
```

Restrições que ele impõe (e que valem como contrato do código-fonte):
sem `export default`, sem `export let`/`var`, sem `import()` dinâmico, sem import de pacote.

**Não vamos rodar esse build.** Mas a ordem que ele produz é exatamente a ordem de concatenação que
o `<script>` do portfólio precisa, e o padrão do IIFE é um bom molde pro escopo do módulo.

---

# PARTE 2 — O portfólio

## 2.1 Tokens e tipografia

Bloco `:root` em `site/index.html:65-88`:

```css
--dark:#080706   --gold:#FFBE57   --cream:#EDE5D4   --white:#FFFFFF   --ink:#1A1008
--ink-70:rgba(26,16,8,.72)       --ink-55:rgba(26,16,8,.58)
--cream-75:rgba(237,229,212,.78) --cream-55:rgba(237,229,212,.62)
--line-d:rgba(237,229,212,.16)   --line-l:rgba(26,16,8,.16)
--otb-green:#194B46  --otb-caramel:#6B3F1E  --otb-off:#F5F0E4  --otb-dark:#1A1008
--pad:clamp(1.25rem,5vw,4rem)
--disp:'Relaxe',Impact,sans-serif
--ui:'Smart Sans','DM Sans',sans-serif
--body:'DM Sans',system-ui,sans-serif
```

> ### ⚠️ Achado 5 — o dourado do PRD não existe
> O §4 declara `--gold: #C9923A`. O site usa **`#FFBE57`**, e o `CLAUDE.md` confirma.
> `#C9923A` seria **cor nova** — o que o próprio critério de aceite proíbe ("Nenhuma cor fora dos 4 tokens").
>
> Além disso o §4 propõe `--muted: rgba(237,229,212,.45)`. O site já tem `--cream-55` a `.62`, e o
> `CLAUDE.md` proíbe explicitamente `rgba(...,.45)` em texto pequeno. **Usar `--cream-55`.**

---

## 2.2 Grain

`site/index.html:124-136`:

```css
.grain{
  position:fixed; inset:-20%; width:140%; height:140%;
  background-image:url("data:image/svg+xml,…feTurbulence…");
  background-size:170px 170px;
  pointer-events:none;
  z-index:900;              /* ← PRD diz 9000 */
  opacity:.15;
  mix-blend-mode:overlay;   /* ← PRD diz hard-light */
  will-change:transform;
  animation:grain 1.2s steps(6) infinite;
}
```

Elemento único: `<div class="grain" aria-hidden="true">` na linha 871. Desligado em
`prefers-reduced-motion` (863). Anima só `transform` ✅.

**O conflito do §6.1 é real, mas os números estão errados.** Como está em `z-index:900` e não 9000,
a solução é bem mais barata que o PRD imagina: basta o palco ter `position:relative; z-index:901`
(ou qualquer valor acima de 900) com `isolation:isolate`. Não precisa de `mask`.

Referência de teto atual: cursor em 9998/9999, nav em 5000, grain em 900, conteúdo de seção em 100.
**A faixa 901–4999 está livre.**

---

## 2.3 Scroll

> ### 🔴 Achado 6 — não existe hijack de wheel
> O §6.3 do PRD diz: *"O site faz `preventDefault` no `wheel` e reposiciona via `requestAnimationFrame`."*
> **Isso é a v9/v10.** O arquivo no ar tem um comentário explícito na linha 1474:
> *"SCROLL: Lenis + ScrollTrigger (uma coisa só). Sem hijack de wheel, sem preventDefault."*
> E o `CLAUDE.md` proíbe reintroduzir isso.

O que existe de fato (1474-1505):

```js
if (!reduce && typeof window.Lenis === 'function' && fine) {
  var lenis = new Lenis({ duration: 1.05, smoothWheel: true, smoothTouch: false });
  if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', function () { updateTheme(); });
}
```

- Só liga se `!reduce` **e** `pointer:fine` — em mobile e reduced-motion não há Lenis
- O único `preventDefault` do arquivo inteiro está em clique de âncora (1500)
- CSS de suporte já presente (94-97), incluindo a regra pra `[data-lenis-prevent]`

**O conflito continua existindo, com outra causa:** `smoothWheel:true` faz o Lenis capturar `wheel`
na janela. Sobre o canvas isso é irrelevante (não vamos usar wheel), mas qualquer área rolável
interna precisa de `data-lenis-prevent` — o markup já usa esse atributo uma vez, então o padrão está
estabelecido.

**Drag-and-drop:** a preocupação do §6.3 se mantém por outro motivo. O Lenis não come `drop`, mas
`initDropZone()` do `sources.js` registra em `window` — escopo global demais pra uma seção. Se o
upload entrar, prender os handlers ao elemento do palco.

---

## 2.4 Sticky, pin e numeração

> ### 🔴 Achado 7 — não existe sticky nem pin
> `grep 'position:sticky'` → **0 resultados**. `grep 'pin:'` → **0 resultados**.
> O §6.4 descreve um mecanismo que não está no arquivo.

O único ScrollTrigger é parallax nas imagens de case (1507-1512):
```js
gsap.utils.toArray('.case-media img').forEach(function (img) {
  gsap.fromTo(img, { yPercent: -4 }, { /* ... */ });
});
```

Reveal de conteúdo é `IntersectionObserver` + classe `.rev`/`.rev.on` (761-765, 1425-1440), com
delays escalonados `.rev-1/2/3`. **Esse é o padrão que a seção nova deve seguir** — e de quebra já
resolve metade da §7.2, porque o IO já está montado ali.

### Numeração

Seções numeradas **em comentário HTML**, não em texto visível:

```
01 · HERO   02 · O QUE EU FAÇO   03 · TRABALHO
04 · COMO FUNCIONA   05 · QUEM SOU   06 · CONTATO
```

Eyebrows visíveis são **frases**, não números: "O que eu resolvo", "Quem sou", "Contato".
Entre seções há `.divider` com três spans: `◆ Nome` · subtítulo · `↓ N etapas`.

> ### ⚠️ Achado 8 — a copy do §8 quebra a convenção
> O PRD abre com `05 — FERRAMENTA` como eyebrow. **Nenhum eyebrow do site é numerado**, e o
> separador do site é `·`, não `—`. Ou o eyebrow vira uma frase ("A ferramenta que eu construí"),
> ou a convenção muda no site inteiro. Recomendo a primeira.

---

## 2.5 `cursor:none`

Confirmado (113-116) — o §6.2 do PRD está **certo**:

```css
html.has-cursor body, html.has-cursor a, html.has-cursor button{cursor:none}
```

Aplicado por JS na 1384, e só sob `pointer:fine`. Desligado em ≤768px (837).

**E já existe precedente pronto pra copiar.** O site tem um slider — o comparador do brasão:

```css
.compare input[type=range]{ position:absolute;inset:0;width:100%;height:100%;
  opacity:0;cursor:ew-resize;z-index:5;margin:0;touch-action:pan-y }
html.has-cursor .compare input[type=range]{cursor:none}     /* 482 */
```

E `.compare` já está registrado como alvo de hover do cursor custom (1403). Ou seja: **a decisão do
site é manter o cursor custom sobre o slider, não restaurar o nativo.** O §6.2 propõe o contrário
(`cursor:auto`). Vale seguir o precedente do site em vez do PRD, pra não ter dois comportamentos de
slider na mesma página.

---

## 2.6 Onde inserir

> ### 🔴 Achado 9 — o ponto de inserção do PRD não existe
> O §3 diz: *"Entra depois de Old Town / Identidade Visual, antes de Experiência."*
>
> **Não existe seção "Identidade Visual" nem "Experiência" no site atual.** São da v9/v10, que estão
> em `_arquivo/`. O `CLAUDE.md` registra a remoção: *"Fora do site (vai pro LinkedIn): Formação,
> Stack de IA, timeline de Experiência."*
>
> Old Town hoje é o bloco `.tr-block.tr-conceito` **dentro** de `#trabalho` (linha 1062).

**Tradução da intenção pro arquivo atual.** A intenção — *depois da prova de design, antes da
credencial* — se mantém: entra logo após `#trabalho`, que termina em Old Town.

```
linha 1156   </section>          ← fim de #trabalho (termina no bloco Old Town)
─────────────────────────────────────────────────────────────
                                 ← ✅ AQUI: divider novo + <section id="tonestamp">
─────────────────────────────────────────────────────────────
linha 1158   <div class="divider">◆ Como funciona</div>
linha 1164   <section id="processo">
```

**Renumeração necessária:**

| Antes | Depois |
|---|---|
| — | `04 · FERRAMENTA` ← nova |
| `04 · COMO FUNCIONA` | `05 · COMO FUNCIONA` |
| `05 · QUEM SOU` | `06 · QUEM SOU` |
| `06 · CONTATO` | `07 · CONTATO` |

São comentários HTML — renumerar é cosmético, mas deve ser feito pra não desalinhar a leitura do
arquivo. Além disso: **nav ganha um 6º link** (`<li><a href="#tonestamp">Ferramenta</a></li>`,
linha ~880) e a seção precisa de `data-nav-theme="dark"` pra participar do `updateTheme()`.

---

# PARTE 3 — Veredito

## 3.1 Reaproveitável verbatim

Só dois, e ambos pequenos:

| Módulo | Ln | Por quê |
|---|---|---|
| `palette.js` | 224 | Zero imports, funções puras, nenhum DOM. Copia e cola. |
| `shape-sets.js` | 94 | Dados puros. Verbatim se ficarem os 5 conjuntos. |

Do resto, **nada sai intacto.** A frase do README ("não tocam o DOM da página além de um canvas
recebido por parâmetro") é verdadeira e é o que torna o porte viável — mas "não toca o DOM" não é o
mesmo que "não precisa de adaptação".

## 3.2 Precisa de adaptação

| Módulo | Ln | O que muda |
|---|---|---|
| `renderer.js` | 314 | **Reescrever o loop.** `frame()` sai; entra render sob demanda + `IntersectionObserver`. Trocar `getSource()` por fonte injetada. Manter `sample`/`paint`/`geometry`/`tonemap` intactos. |
| `export.js` | 328 | Cortar **linhas 190-328 inteiras** (toda a gravação de vídeo). Fixar `S.res` em 2000 no `exportPNG`. Manter `exportSVG` como está. |
| `state.js` | 163 | Cortar `STATE_META`, `resetParams`, `defaults`, `get` (só o `set` é usado). Manter `S`, `slots`, `subscribe`/`emit` — o pub/sub passa a ser o gatilho do render. |
| `shapes.js` | 203 | Cortar `tintCacheSize`. Trocar as chaves de erro i18n (`err.svg.*`) por string ou silenciar. |
| `sources.js` | 270 | Reduzir a `getSource`/`setImage`/`startCam`/`stopCam`/`releaseAll`. Cortar vídeo, `initDropZone` (escopo `window`) e as chaves i18n. |

**Descartar por inteiro:** `main.js` (687) · `i18n.js` (420) · `theme.js` (83) · `presets.js` (193).

## 3.3 Conflitos concretos

| # | Conflito | Real? | Nota |
|---|---|---|---|
| 6.1 | Grain por cima do canvas | ✅ **sim** | Mas `z-index:900` + `overlay`, não 9000 + `hard-light`. Fix barato: `z-index:901` + `isolation:isolate`. |
| 6.2 | `cursor:none` global | ✅ **sim** | Mas o site já resolveu isso pro slider do `.compare` — seguir o precedente, não o PRD. |
| 6.3 | Scroll hijack de wheel | ❌ **não** | Não existe. É Lenis. Conflito real vira: `data-lenis-prevent` + drop handlers no elemento, não em `window`. |
| 6.4 | Sticky + ScrollTrigger | ❌ **não** | Zero sticky, zero pin no arquivo. Só parallax em `.case-media img`. |
| — | `--gold` `#C9923A` | 🆕 **novo** | Cor não existe no site. Usar `#FFBE57`. |
| — | Eyebrow numerado | 🆕 **novo** | Quebra a convenção do site. |
| — | Ponto de inserção | 🆕 **novo** | Seções citadas não existem. |
| — | `S.fill` + `fill="#fff"` | 🆕 **novo** | Shape sai branca no palco cream se `S.fill=false`. |
| — | `renderer` rAF infinito | 🆕 **novo** | Viola §7.1 por construção. É o maior item da Fase 1. |

## 3.4 Estimativa de linhas

| Peça | Origem | Estimado | Nota |
|---|---|---|---|
| `shape-sets` | 94 | **~30** | Só `default` + 2 conjuntos |
| `shapes` | 203 | **~150** | Corta cache debug e i18n |
| `state` | 163 | **~70** | Corta META, presets, reset |
| `palette` | 224 | **~180** | Precisa quase tudo (3 modos de cor) |
| `sources` | 270 | **~90** | Só imagem + webcam |
| `renderer` | 314 | **~230** | Corta loop, adiciona render sob demanda |
| `export` | 328 | **~130** | Corta 138 linhas de gravação |
| Casca nova | — | **~200** | Controles, wiring, IO, guardas |
| **JS total** | 1596 | **~1080** | |
| CSS da seção | — | **~180** | |
| HTML da seção | — | **~60** | |
| **TOTAL** | | **~1320** | |

> ### ⚠️ Achado 10 — o arquivo quase dobra
> `site/index.html` tem **1519 linhas / 63 KB**. A seção adiciona **~1320 linhas**.
>
> O resultado é **~2840 linhas, ~105 KB** — uma seção que é ~46% do arquivo, pra um site de 6 seções.
> Não é bloqueio: 105 KB de HTML é aceitável, e a regra do arquivo único vale. Mas é uma mudança de
> escala que vale o Danilo saber **antes** da Fase 1, não depois.
>
> Se o número incomodar, o corte mais barato é `palette.js`: fixar o modo de cor em `state` e
> descartar `pixel`/`quant` derruba `palette` de ~180 pra ~15 linhas e tira um dos 5 controles.
> Custo: perde o look serigrafia, que o próprio PRD chama de "o mais bonito".

---

## 3.5 Pendências antes da Fase 1

1. **Imagem padrão.** O §5.1 pede o brasão vetorizado da Jorik. Existe `site/assets/img/brasao-vetor.jpg`
   ✅ — mas convém testar em meio-tom antes, porque JPG de vetor costuma ter artefato de compressão
   que a amostragem amplifica. `FOTOS/BRASÃO JORIK/VETORIZADO.pdf` é a origem em alta.
2. **Decidir o eyebrow** (achado 8) — muda a copy do §8.
3. **Decidir o corte de `palette`** (achado 10) — muda o escopo da Fase 2.
4. **Confirmar o teste do Illustrator** com o critério corrigido (achado 4).

---

## Índice de referências

**Motor** — `/Users/danilomariani/Documents/DITHERING REPO /tonestamp`
`src/js/{shape-sets,shapes,state,palette,sources,renderer,export}.js` · `scripts/build.mjs`

**Portfólio** — `site/index.html`
tokens `65-88` · grain `124-136` · cursor `113-116`, `1384` · compare/slider `477-486`, `1411`
reveal `761-765`, `1425-1440` · nav `877-886` · **inserção `1156`** · divider `1158-1162`
Lenis `1474-1505` · ScrollTrigger `1507-1512` · IIFE abre `1251`
