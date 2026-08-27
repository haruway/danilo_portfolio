# PRD — Seção Interativa Tonestamp

**Revisão 2** · 26/08/2026 — corrigido contra a auditoria da Fase 0
**Alvo:** `site/index.html` (1519 linhas) — o arquivo no ar
**Escopo:** adicionar UMA seção. Não mexer em nenhuma outra.
**Fonte:** https://github.com/haruway/tonestamp · demo: https://haruway.github.io/tonestamp/

---

## 0. O que mudou nesta revisão

A rev. 1 foi escrita contra a **v9/v10** do portfólio, não contra o arquivo que está no ar.
A auditoria (`AUDITORIA_FASE0.md`) encontrou sete divergências. Todas corrigidas aqui.

| § | Estava escrito | Realidade |
|---|---|---|
| 2 | 4 módulos reaproveitáveis | **7** — faltavam `state.js` e `shape-sets.js` |
| 2 | descartar `sources.js` | é **dependência dura** do `renderer.js` |
| 3 | "depois de Identidade Visual, antes de Experiência" | **essas seções não existem** — entra na linha 1156 |
| 4 | `--gold: #C9923A` | o site usa **`#FFBE57`** |
| 6.1 | grain em `z-index:9000` + `hard-light` | **`z-index:900`** + **`overlay`** |
| 6.3 | site faz hijack de `wheel` com `preventDefault` | **não faz** — é Lenis |
| 6.4 | seções usam sticky + ScrollTrigger pin | **não usam** — zero sticky, zero pin |

**Decisões travadas em 26/08:** 3 modos de cor mantidos · webcam fora · eyebrow em frase.

---

## 1. Por que esta seção existe

O portfólio prova design. Não prova que o Danilo **constrói as ferramentas** que usa. Essa é a lacuna que esta seção fecha.

Vale mais que um case visual por um motivo específico: código aberto com histórico de commits é autoria verificável. Não existe a dúvida "foi você ou foi o modelo?". É a peça de atribuição mais forte do site.

**Job da seção, em ordem:**
1. O visitante entende em ~5 segundos que aquilo é uma ferramenta de verdade, funcionando ali
2. Ele mexe e vê o resultado mudar
3. Ele exporta um SVG e percebe que abre no Illustrator
4. Só então ele lê o texto

Se ele precisar ler antes de entender, a seção falhou.

---

## 2. Decisão de arquitetura

### ✅ Fazer: "Portfolio Edition" inline

Reaproveitar os módulos do repo e escrever **uma casca de controles nova**, com os tokens do portfólio.

O README declara que `renderer.js`, `palette.js` e `shapes.js` não tocam o DOM da página além de um canvas recebido por parâmetro. **Isso é verdade e é o que torna o porte viável** — mas "não toca o DOM" não é o mesmo que "entra sem adaptação". Ver §2.2.

### 2.1 — O inventário real: 7 módulos

```
shape-sets.js ───► shapes.js ───► state.js
                        │              │
palette.js  (folha)     │              │
sources.js  (folha)     │              │
     │                  │              │
     └──────┬───────────┴──────────────┘
            ▼
       renderer.js  ← state, shapes, palette, sources
            │
            ▼
        export.js   ← state, shapes, palette, renderer
```

**Ordem topológica de concatenação** — é nessa ordem que vão pro `<script>`:

```
1. shape-sets.js   2. shapes.js   3. state.js   4. palette.js
5. sources.js      6. renderer.js  7. export.js
```

⚠️ **`sources.js` não pode ser descartado.** `renderer.js:15` importa `getSource` e usa em
`sample()`, `outputSize()` e no loop. Entra enxuto — só imagem e upload — mas entra.

**Descartar por inteiro:** `main.js` (687 ln, UI densa demais) · `i18n.js` (420, site é PT only) ·
`theme.js` (83, site já é dark) · `presets.js` (193, excesso pro visitante).

### 2.2 — O que sai verbatim, e o que não sai

| Módulo | Origem | Alvo | O que muda |
|---|---|---|---|
| `palette.js` | 224 | **~180** | ✅ verbatim — zero imports, funções puras |
| `shape-sets.js` | 94 | **~55** | ✅ verbatim, os 5 conjuntos |
| `shapes.js` | 203 | ~150 | corta `tintCacheSize`; troca chaves i18n |
| `state.js` | 163 | ~70 | corta `STATE_META`, `resetParams`, `defaults`, `get` |
| `sources.js` | 270 | ~55 | só `getSource`/`setImage`/`loadFile`; sem vídeo, sem webcam, sem `initDropZone` |
| `renderer.js` | 314 | ~230 | **reescrever o loop** — ver §2.3 |
| `export.js` | 328 | ~130 | corta as linhas 190-328 (gravação de vídeo) |

### 2.3 — 🔴 `renderer.js` viola a §7.1 por construção

A regra não-negociável do §7 é: *imagem estática não usa `requestAnimationFrame`*.
O loop atual (`renderer.js:268-291`) faz exatamente o oposto:

```js
function frame(now) {
  rafId = requestAnimationFrame(frame);
  const info = getSource();
  if (!info) return;
  if (info.type !== 'image' && !S.playing && lastCells) { paint(now); return; }  // ← só vídeo/cam
  if (!sample()) return;   // ← imagem estática CAI AQUI
  paint(now);
}
```

O atalho de pausa exige `type !== 'image'`. Com o brasão parado, o módulo **reamostra a imagem
inteira e repinta a 60 fps, para sempre** — `drawImage` + `getImageData` + loop de luminância +
carimbo de N células, por quadro, sem nada mudar.

**Correção:** matar o `frame()` e ligar o render ao `subscribe()` que **já existe** em `state.js`.
O pub/sub está pronto e o renderer simplesmente não usa. Esse é o maior item da Fase 1.

### ❌ Não fazer: iframe do GitHub Pages

Rejeitado por quatro motivos:
1. A UI completa é um painel denso — vira corpo estranho num layout editorial
2. Dependência externa: repo muda de lugar, seção do portfólio quebra
3. Impossível aplicar os tokens do site
4. Container de scroll aninhado conflita com o Lenis

*Fallback:* se o inline travar, hospedar `dist/index.html` em `/tonestamp/` **no próprio Netlify** e iframear de lá. Nunca apontar pro GitHub Pages.

---

## 3. Posicionamento na página

⚠️ **Correção.** A rev. 1 dizia "depois de Identidade Visual, antes de Experiência".
**Nenhuma das duas existe** — são da v9/v10, hoje em `_arquivo/`. O `CLAUDE.md` registra a remoção
de Experiência ("vai pro LinkedIn"). Old Town virou o bloco `.tr-block.tr-conceito` **dentro** de
`#trabalho`.

A intenção original se mantém: *depois da prova de design, antes da credencial.*

```
linha 1156   </section>          ← fim de #trabalho (termina no Old Town)
─────────────────────────────────────────────────────────
                                 ← ✅ AQUI: divider + <section id="tonestamp">
─────────────────────────────────────────────────────────
linha 1158   <div class="divider">◆ Como funciona</div>
linha 1164   <section id="processo">
```

**Junto com a inserção:**
- Renumerar os comentários: `04 · COMO FUNCIONA` → 05, `05 · QUEM SOU` → 06, `06 · CONTATO` → 07
- Nova seção vira `04 · FERRAMENTA`
- Nav ganha o 6º link: `<li><a href="#tonestamp">Ferramenta</a></li>` (~linha 880)
- Seção recebe `data-nav-theme="dark"` pra participar do `updateTheme()`
- Divider novo no padrão dos existentes: `◆ Ferramenta` · subtítulo · `↓ …`

---

## 4. Direção visual

**Decisão: mesclar com um único movimento de contraste.**

O site inteiro é `#080706`. A seção herda esse fundo, tipografia e ritmo — mas o **palco do canvas é claro** (`#EDE5D4`, o cream do site), com a tinta do halftone em `#080706`.

Justificativa: meio-tom nasceu de impressão e lê melhor sobre papel. Palco claro (a) faz a área interativa se destacar como "aqui você mexe", (b) referencia impresso — que é justo o eixo de posicionamento do Danilo, (c) não introduz nenhuma cor nova.

```
┌─────────────────────────────────────────────┐
│  #080706                                     │
│                                              │
│  A ferramenta que eu construí   [eyebrow]    │
│  Tonestamp                      [Relaxe]     │
│                                              │
│  ┌────────────────────────┐  ┌────────────┐ │
│  │                        │  │ CONTROLES  │ │
│  │   CANVAS               │  │            │ │
│  │   fundo #EDE5D4        │  │ célula ▮▮▯ │ │
│  │   tinta #080706        │  │ formas ○□◆ │ │
│  │                        │  │ cor    ▮▯▯ │ │
│  │                        │  │            │ │
│  │                        │  │ [fonte]    │ │
│  └────────────────────────┘  │ [PNG][SVG] │ │
│                              └────────────┘ │
│  texto curto + links                        │
└─────────────────────────────────────────────┘
```

Mobile: controles empilham abaixo do canvas.

### Tokens — só os que já existem no site

```css
--dark:  #080706
--cream: #EDE5D4
--gold:  #FFBE57              /* ⚠️ corrigido: a rev.1 dizia #C9923A, que não existe no site */
--ink:   #1A1008              /* tinta do halftone sobre o palco cream */
--cream-55: rgba(237,229,212,.62)   /* ⚠️ corrigido: use este, não rgba(...,.45) */
```

⚠️ A rev. 1 propunha `--muted: rgba(237,229,212,.45)`. O `CLAUDE.md` **proíbe** `rgba(...,.45)` em
texto pequeno, e o site já tem `--cream-55` a `.62`. Usar o token existente.

**Tipografia:** Relaxe no título da seção. Smart Sans nos labels de controle. DM Sans no corpo.
As fontes do Tonestamp (Bricolage Grotesque, IBM Plex Mono) **não entram**.

---

## 5. Superfície de controle

7 controles. A versão completa fica no link.

| Controle | Tipo | Padrão | Por quê |
|---|---|---|---|
| Tamanho da célula | slider | médio | Mais dramático visualmente. É o que faz a pessoa entender na hora |
| Conjunto de formas | 5 botões | densidade | Mostra que a forma é customizável |
| Modo de cor | 3 botões | state | `quantize` dá o look serigrafia — é o mais bonito, mas `state` é o mais legível |
| **Inverter** | toggle | desligado | ver 5.3 |
| Fonte | Obra / Enviar | Obra | ver 5.1 |
| Exportar | PNG · SVG | — | ver 5.2 |

> **Revisão 27/08 — de 5 para 7 controles.** A rev. 2 fechava em 5 e em 3
> conjuntos de formas. Ao ver a coisa funcionando o Danilo pediu os 5 conjuntos
> e o inverter. Registrado aqui pra a contagem do documento não descolar do que
> está na página — foi exatamente esse tipo de deriva que a Fase 0 encontrou.

**Cortar da versão do site:** brilho, contraste, gamma, escala, rotação, presets, i18n, tema,
gravação de vídeo, **webcam**.

> **Decisão 26/08 — webcam fora.** A rev. 1 previa Obra/Enviar/Webcam com opt-in. Cortada: elimina
> `getUserMedia`, o mapa de erros de permissão e a obrigação de parar tracks no `IntersectionObserver`.
> `sources.js` cai de ~90 pra ~55 linhas e a §7 fica mais simples. A webcam é citada como recurso da
> ferramenta completa, no link.

> **Decisão 26/08 — 3 modos de cor mantidos.** Chegou-se a considerar fixar em `state` e cortar
> `palette.js` de ~180 pra ~15 linhas. Rejeitado: perderia o look serigrafia, que é o mais bonito
> da ferramenta, e derrubaria a superfície de 5 pra 4 controles.

### 5.1 — Fonte padrão: uma obra dele

O canvas **abre já renderizado**, sem exigir ação. A imagem padrão é o **brasão vetorizado da Jorik**.

Isso faz a seção trabalhar duas vezes: o brinquedo demonstra a ferramenta *e* mostra o trabalho vetorial. E halftone sobre um vetor de traço limpo fica visivelmente melhor que sobre foto qualquer.

**Arquivo:** `site/assets/img/brasao-vetor.jpg` já existe — 1800×1200, 108 KB. A compressão é
agressiva pra um export de vetor, mas a 80 colunas o amostrador reduz ~22 px por célula, o que
dissolve quase todo artefato. Conferir visualmente na Fase 1; se não servir, reexportar de
`FOTOS/BRASÃO JORIK/VETORIZADO.pdf`.

Segunda opção, se o brasão não render bem em meio-tom: um mockup do Old Town, alto contraste.

### 5.2 — Exportar é obrigatório

O botão SVG é o mais importante da seção inteira. Ele prova, em um clique, a frase que o portfólio usa em outro lugar: *arquivo pronto pra produção, aberto e editável*. Não é decoração — é a demonstração do argumento comercial.

**✅ Verificado na Fase 0.** O aviso da interface (de que o export SVG só carrega formas reais após
upload) está mesmo **desatualizado**, como o Danilo suspeitava. `state.js:84` popula
`slot.svgText = DEFAULT_SVG[i]` no boot dos 7 slots, e `exportSVG()` só exige `slot.on && slot.svgText`.
**Funciona com os conjuntos embutidos, sem upload nenhum. Nenhuma pré-condição.**

**Como o SVG é gerado** (`export.js:66-188`): não é traçado do canvas. Reconstrói célula a célula —
um `<g id="sN">` em `<defs>` por combinação de shape e cor, e um `<use>` por célula. Duas decisões
deliberadas, comentadas no fonte: `<g>` em vez de `<symbol>` (o Illustrator trata `symbol` com
viewBox de forma inconsistente) e `xlink:href` antes de `href` (o Illustrator só entende o primeiro).

**O que sai:** a primitiva original de cada SVG — `<circle>`, `<rect>` ou `<path>`, conforme o
conjunto. Nenhuma é bitmap. A copy do §8 está correta.

⚠️ **Mas cada célula é um `<use>`**, que o Illustrator materializa como **símbolo/instância**.
Clicar numa célula seleciona uma instância, não um path solto. É vetor legítimo e editável, mas o
critério de aceite precisa dizer isso — ver §10.

⚠️ **Armadilha de configuração.** Em `groupFor()` o `fill` só é sobrescrito se `S.fill === true`.
As shapes embutidas vêm com `fill="#fff"` hardcoded. Com `S.fill = false`, o SVG sai **branco sobre
o palco cream** — invisível. Fixar `S.fill = true` e `slots[i].color = '#080706'`.

**PNG:** capar em 2000px na versão do site.

### 5.3 — 🔴 Inverter: o palco claro EXIGE `S.invert = true`

Descoberto na Fase 2, e é correção de bug, não preferência.

A rampa de formas do repo vai da mais **cheia** no realce até a quase vazia na
sombra — os arquivos são literais quanto a isso:

```
shapes/bitmap-4/01-highlights-16de16.svg   ← realce, 16/16 preenchido
shapes/bitmap-4/07-shadows-01de16.svg      ← sombra,  1/16 preenchido
```

Isso pressupõe o padrão do repo (`state.js`): `bg: '#000000'` com tinta
`'#ffffff'` — **tinta clara sobre fundo escuro, onde mais tinta = mais claro.**

A §4 deste PRD pede o oposto: palco cream com tinta `#080706`. E no papel
**mais tinta = mais escuro.** Sem inverter, o realce recebe o borrão cheio e a
composição sai como **negativo** — foi o que a Fase 1 subiu, sem ninguém notar
de imediato.

**`S.invert = true` é o estado correto do palco claro**, não um efeito. O
controle "Inverter" da §5 existe pra ligar o negativo de propósito, então o
botão nasce **desligado com a flag ligada** — ele fala a língua do visitante,
não a da flag.

**Gravação de vídeo: cortar** — mas não por incompatibilidade. A ferramenta grava MP4 hoje
(confirmado em `export.js:207-214`: tenta `avc1` antes de WebM; 30 fps, bitrate proporcional à área).
Fica fora porque (a) ninguém grava vídeo numa interação de 30 segundos num portfólio, (b) a própria
UI avisa pra não trocar de aba durante a gravação, o que conflita direto com a regra de pausar o
render fora da viewport (§7.2). O recurso é citado no texto e vive no link da ferramenta completa.

---

## 6. Conflitos com o site atual

⚠️ **Esta seção foi reescrita.** A rev. 1 descrevia quatro conflitos; **dois não existem** no arquivo
no ar, e um tem números errados. O que segue foi verificado linha a linha.

### 6.1 — Grain por cima do canvas `[real, mas mais barato que parecia]`

`site/index.html:124-136`:

```css
.grain{
  position:fixed; inset:-20%;
  pointer-events:none;
  z-index:900;              /* ⚠️ a rev.1 dizia 9000 */
  opacity:.15;
  mix-blend-mode:overlay;   /* ⚠️ a rev.1 dizia hard-light */
  animation:grain 1.2s steps(6) infinite;   /* só transform */
}
```

Ele **vai** tingir o output do halftone e sujar a leitura tonal. Mas como está em `z-index:900` e
não 9000, **não precisa de `mask`**: basta o palco ter `position:relative; z-index:901` +
`isolation:isolate`.

Teto de referência no arquivo: cursor 9998/9999 · nav 5000 · grain 900 · conteúdo de seção 100.
**A faixa 901–4999 está livre.** Testar visualmente, não confiar no código.

### 6.2 — `cursor:none` global `[real]`

```css
html.has-cursor body, html.has-cursor a, html.has-cursor button{cursor:none}   /* 113-116 */
```

Aplicado por JS na 1384, só sob `pointer:fine`, desligado em ≤768px.

⚠️ **Correção de abordagem.** A rev. 1 mandava restaurar `cursor:auto` na seção. Mas o site **já
resolveu isso** — o comparador do brasão tem um `<input type=range>` e a decisão foi **manter** o
cursor custom sobre ele:

```css
html.has-cursor .compare input[type=range]{cursor:none}   /* 482 */
```

E `.compare` já está registrado como alvo de hover do cursor custom (1403). **Seguir o precedente
do site**, não a rev. 1 — senão ficam dois comportamentos de slider na mesma página.

### 6.3 — ❌ Scroll hijack — **não existe**

A rev. 1 dizia que o site faz `preventDefault` no `wheel` e reposiciona via `requestAnimationFrame`.
**Isso é a v9/v10.** O arquivo no ar tem um comentário explícito na linha 1474:
*"SCROLL: Lenis + ScrollTrigger (uma coisa só). Sem hijack de wheel, sem preventDefault."*
E o `CLAUDE.md` **proíbe** reintroduzir aquilo.

O que existe (1474-1505):
```js
var lenis = new Lenis({ duration: 1.05, smoothWheel: true, smoothTouch: false });
```
Só liga se `!reduce` **e** `pointer:fine`. O único `preventDefault` do arquivo inteiro está em
clique de âncora (1500).

**O conflito real, com outra causa:** `smoothWheel:true` faz o Lenis capturar `wheel` na janela.
- Não usar wheel pra nada dentro do módulo (regra mantida)
- Qualquer área rolável interna precisa de `data-lenis-prevent` — o CSS já suporta (96) e o markup
  já usa uma vez
- Se o upload por arrastar entrar, **prender os handlers ao elemento do palco**. `initDropZone()`
  do `sources.js` registra em `window`, escopo global demais pra uma seção
- Sliders devem responder a teclado (setas)

### 6.4 — ❌ Sticky + ScrollTrigger — **não existe**

`grep 'position:sticky'` → 0 resultados. `grep 'pin:'` → 0 resultados.

O único ScrollTrigger do arquivo é parallax `yPercent` em `.case-media img` (1507-1512).
O reveal de conteúdo é `IntersectionObserver` + classe `.rev`/`.rev.on` (761-765, 1425-1440), com
delays escalonados `.rev-1/2/3`.

**A seção nova segue esse padrão** — e de quebra resolve metade da §7.2, porque o IO já está montado
ali. A seção ainda precisa de background sólido e contexto de empilhamento próprio.

---

## 7. Performance

O site já roda três loops contínuos (grain animado, Lenis, letras magnéticas). Um quarto loop derruba o framerate.

**Regras não negociáveis:**

1. **Imagem estática não usa `requestAnimationFrame`.** Renderiza uma vez, e de novo só quando um
   parâmetro muda. Um `rAF` infinito aqui é erro, não otimização. **→ exige a reescrita da §2.3.**
2. **`IntersectionObserver` obrigatório.** Fora da viewport, zero trabalho. Sem webcam, isso é só
   parar de repintar — bem mais simples que na rev. 1.
3. ~~Webcam só sob clique explícito~~ — **cortada** (§5).
4. **Mobile degrada:** célula mínima maior, resolução capada.
5. **`prefers-reduced-motion`:** sem transições de re-render. (O Lenis já nem liga nesse caso.)
6. Nada de `OffscreenCanvas` ou worker nesta fase. Overkill.

---

## 8. Copy final

> **A ferramenta que eu construí**
> ## Tonestamp
>
> Meio-tom tonal: a ferramenta lê o brilho de cada célula da imagem e carimba no lugar uma forma vetorial. Não é ASCII art nem pixel art — é retícula de verdade, com controle sobre qual forma ocupa cada faixa de luz e sombra.
>
> Mexe aí. O que você exportar em SVG abre editável no Illustrator, não como bitmap traçado.
>
> **[nota técnica, corpo menor]**
> Sete formas, da mais clara à mais escura. Pra imagem funcionar, a área preenchida precisa crescer sem inverter em nenhum passo — se um estado escuro tem menos tinta que o anterior, o olho lê um relevo que não existe na foto. Em vez de conferir no olhômetro, escrevi um script que mede a área de cada SVG e reprova o build se a rampa quebrar. Ele pegou duas inversões que eu não tinha visto.
>
> Arquivo HTML único. Abre com duplo clique, roda offline, não instala nada.
>
> `[Abrir ferramenta →]`  `[Código no GitHub →]`
>
> **[rodapé da seção, `--cream-55`]**
> Técnica original de Anton Burmistrov (@antoncreations). Implementação independente, com controles adicionais. MIT, sem fins comerciais.

**Regras de escrita:**
- ⚠️ **Eyebrow em frase, não numerado.** A rev. 1 abria com `05 — FERRAMENTA`. **Nenhum eyebrow do
  site é numerado** ("O que eu resolvo", "Quem sou", "Contato") e o separador do site é `·`, não `—`.
  A numeração vive só nos comentários HTML.
- ✅ Pode dizer **MP4** — verificado em `export.js:207-214`. O README ainda diz WebM e está desatualizado
- ⚠️ Mas a gravação não existe *nesta seção* — citar como recurso da ferramenta completa, nunca como botão da página
- ✅ **"5 conjuntos de shapes" está correto** — verificado em `shape-sets.js`: `default`, `dots`,
  `blocks`, `bitmap-4`, `complexity`. (A seção do site expõe 3.)
- ✅ **"Sete formas" está correto** — `N = 7` em `state.js:16`
- ✅ **O script da rampa existe** — `scripts/check-ramp.mjs`
- ✅ O crédito ao Anton é obrigatório e fica visível, não escondido no repo
- ✅ A história da rampa monotônica é o melhor parágrafo. É o que mostra critério, não só execução

---

## 9. Fases

**Fase 1 — Motor** · ~580 ln
Portar os 7 módulos na ordem topológica da §2.1, com os cortes da §2.2. O trabalho de verdade é a
reescrita do loop (§2.3). Renderizar o brasão num canvas fixo, sem controles, sem estilo.
Só provar que desenha.

**Fase 2 — Controles** · ~250 ln
Os 7 controles da §5. `S.fill = true`, `slots[i].color = '#080706'`. Ainda sem estilo final.

**Fase 3 — Visual** · ~240 ln
Tokens, tipografia, layout, palco claro. Inserção na 1156, divider, renumeração, link na nav.
Resolver o grain (6.1).

**Fase 4 — Guardas** · ~150 ln
`IntersectionObserver`, mobile, teclado, `data-lenis-prevent`, reduced-motion.

**Fase 5 — Copy e links** · ~55 ln

⚠️ **Revisar entre cada fase.** Não rodar ponta a ponta.

### Tamanho estimado

**~1265 linhas** somadas ao `index.html`. O arquivo vai de **1519 → ~2785 linhas** (~105 KB).
Não é bloqueio — a regra do arquivo único continua valendo e 105 KB de HTML é aceitável. Mas é uma
seção que passa a ser ~45% do arquivo, num site de 6 seções. Registrado aqui pra não ser surpresa.

---

## 10. Aceite

**Funciona**
- [ ] Canvas abre já renderizado, sem clique
- [ ] Slider muda o resultado com resposta imediata
- [ ] SVG exportado abre no Illustrator, e **ao expandir**, a célula vira traçado com pontos de
      âncora — não imagem embutida
      *(corrigido: cada célula é um `<use>`, que chega como símbolo/instância — ver §5.2)*
- [ ] PNG exporta, capado em 2000px
- [ ] ~~Webcam só sob clique~~ — cortada

**Não quebrou nada**
- [ ] Scroll horizontal dos cases continua funcionando
- [ ] Letras magnéticas do hero continuam funcionando
- [ ] Parallax das imagens de case continua funcionando
- [ ] Cursor customizado se comporta como no `.compare`
- [ ] Nenhuma outra seção mudou de aparência

**Performance**
- [ ] Sem `rAF` rodando com imagem estática *(o item que a §2.3 endereça)*
- [ ] Aba parada não consome CPU
- [ ] Fora da viewport, zero trabalho
- [ ] Lighthouse performance não caiu mais que 5 pontos

**Visual**
- [ ] Grain não tinge o canvas
- [ ] Nenhuma cor fora dos tokens da §4 — em especial, **nenhum `#C9923A`**
- [ ] A composição abre como positivo, não negativo (§5.3): sombra recebe a
      forma cheia, realce recebe o pontinho
- [ ] Nenhuma fonte nova
- [ ] 375 / 768 / 1440

**Honestidade**
- [ ] Crédito ao Anton Burmistrov visível na página
- [ ] Nada prometido que não funcione na própria página
- [ ] Todo recurso citado no texto foi verificado **na interface ou no fonte**, não no README

---

## 11. Regras do projeto

- Arquivo único: `site/index.html`. Sem framework, sem bundler, sem npm
- GSAP e Lenis via CDN são as únicas dependências externas permitidas
- Imagem padrão em `site/assets/img/`, **não** em base64
- Deploy: arrastar a pasta `site/` no Netlify
- Módulo autocontido — precisa migrar pro v11 sem reescrita

---

**Ver também:** `AUDITORIA_FASE0.md` (auditoria completa, com assinaturas e números de linha) ·
`PRD_v11_com_copy.md` (documento de verdade da copy do site) · `CLAUDE.md` (regras de edição)
