# HANDOFF — v12

## Sessão 1 · 07/10/2026 · Fase 0 (Setup)

### Feito
- Branch `v12` criada a partir de `main` (108f91e).
- `site/` movido inteiro pra `_arquivo/v11/` com `git mv` (histórico preservado).
- `PRD_v12.md` movido da raiz pra `docs/PRD_v12.md`.
- Vite 8 (template vanilla) em `app/`. Demo do Vite removido (counter, logos, CSS).
  O que sobra é uma página de verificação que mostra `v12 · build production · data`,
  com `noindex`. **Não é interface**: a UI só começa depois do mock (Fase 2).
- `netlify.toml` na raiz: `base = "app"`, `npm run build`, `publish = "dist"`, Node 22.
- `npm run build` testado: gera `app/dist/index.html` na raiz do dist, sem source map.
  `npm install`: 0 vulnerabilidades.
- `CLAUDE.md` reescrito pro v12 (PRD §10).
- `/impeccable init`: `PRODUCT.md` na raiz e `.impeccable/config.json` com
  `buildPath: "comp"` (o PRD exige mock em imagem antes de código).

### Decisões
- **Público:** agências/estúdios e marcas diretas, com peso igual.
- **Sucesso:** o visitante brinca no Lab + reconhecimento público (Awwwards/CSSDA).
- **Lab, corrigido:** Dither = **Tonestamp** (`haruway/tonestamp`); Halftone =
  **Halftone Tool** (`haruway/halftonetool`). O PRD §5 tinha os dois invertidos.
  Coloquei uma nota de correção lá, sem reescrever as seções.
- Nenhuma dependência de runtime instalada ainda (GSAP, Lenis, Three entram na Fase 3).
- Assets do v11 ficam em `_arquivo/v11/assets/img/` até serem usados; aí são
  copiados pra `app/public/img/`.

### Deploy: estado atual e risco
O site de hoje (`danilomariani.netlify.app`) é **arrastar e soltar**, sem ligação
com o GitHub. Por isso o push da `v12` não gera preview sozinho.

⚠️ **Não ligue o site atual ao GitHub com o `main` como branch de produção agora.**
O `main` não tem `netlify.toml` nem `index.html` na raiz, e o site no ar ficaria
em branco (o mesmo problema da v10).

Caminho recomendado pro portão da Fase 0:
1. Netlify → Add new project → Import an existing project → GitHub →
   `haruway/danilo_portfolio`.
2. Branch to deploy: **`v12`**. O resto ele lê do `netlify.toml`.
3. Vai nascer um site novo (ex.: `xxxx.netlify.app`). Abrir e ver a linha
   `v12 · build production · …`.
4. Quando o v12 for pro `main`, aponta o domínio pra esse site novo e
   aposenta o de arrastar.

Alternativa sem ligar o GitHub: `cd app && npm run build` e arrastar
`app/dist/` no Netlify.

### Em aberto
- **Interface do Lab — decidido (opção B), detalhar na Fase 7:**
  Lab: Dither (Tonestamp) usa a pele **1-bit** (preto e branco puro, fonte
  bitmap/mono, cursor pixelado), **com um botão pra ligar e desligar** essa pele.
  Desligada, volta a interface normal do Tonestamp.
  Lab: Halftone (Halftone Tool) usa a interface própria dele.
- Halftone Tool: o motor (`engine/*.js`) é JS puro com worker, então é portável.
  O README do repo diz que o plugin do Photoshop ainda não existe; pro site só
  precisa do motor e do harness.
- Skills: `genjutsu` estava baixada em `~/.agents/skills/` mas sem o link em
  `~/.claude/skills/`. Link criado, e a skill já está ativa.
  `grill-me` = `mattpocock-skills:grilling` (já instalada).
- Pendências do Danilo: PRD §11 (sem mudança).
- README do Tonestamp (PRD §5): diz WebM, o export real é MP4. Fica pra Fase 7.

### Portão da Fase 0: ✅ passou
Danilo criou o site novo na Netlify ligado à branch `v12`, e a página de
verificação abre.

## Sessão 1 (cont.) · Fase 1 (Referências e direção)

### Feito
- `docs/DIRECAO.md`: conceito "Retícula ao sol", emoção, arquétipo
  (Criador + Mago), 12 referências com o que pegar e o que não pegar,
  tipografia, cor (com contraste medido), movimento (três verbos: ferver,
  assentar, correr), tese de interação ("você esquenta o que olha"), pele
  de cada seção, layout.
- Pesquisa: a busca do Awwwards estava fora do ar (503). As referências foram
  achadas por busca na web e conferidas pelo preview (og:image) da página de
  cada site no Awwwards. As imagens ficaram só no scratchpad (são do Awwwards,
  não vão pro repo).
- Não rodei o `concept-seed` do impeccable (sorteio de direção): o PRD fixa
  o mundo visual, e no impeccable o brief fixado ganha do sorteio.

### Em aberto (perguntas do portão, DIRECAO.md §10)
1. Aprovação da direção.
2. Three.js (PRD) ou WebGL puro (recomendado: ~150 KB a menos).
3. Seção interna do mock: Manifesto ou Trabalhos.

### Próximo
Portão da Fase 1 → **Fase 2**: mock em imagem da capa (A e B) e de uma
seção interna. Nenhum código de UI antes da aprovação do mock.
