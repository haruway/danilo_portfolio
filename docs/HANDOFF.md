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
- **Interface do Lab:** o PRD diz "Tonestamp com interface própria (Bricolage/Plex)"
  e "Dither com interface 1-bit". Com a troca de nomes, qual vai em qual?
  Opções: Tonestamp mantém a interface dele, e a 1-bit fica com a Halftone Tool
  ou sai do plano. Decidir até a Fase 7.
- Halftone Tool: o motor (`engine/*.js`) é JS puro com worker, então é portável.
  O README do repo diz que o plugin do Photoshop ainda não existe; pro site só
  precisa do motor e do harness.
- Skills que o PRD pede e não estão instaladas: **`genjutsu`** (GSAP/shaders).
  `grill-me` não existe com esse nome; o equivalente instalado é
  `mattpocock-skills:grilling`.
- Pendências do Danilo: PRD §11 (sem mudança).
- README do Tonestamp (PRD §5): diz WebM, o export real é MP4. Fica pra Fase 7.

### Próximo
Portão da Fase 0 → Danilo confirma que o preview abre → **Fase 1**: pesquisa no
Awwwards (mín. 10 referências) e `docs/DIRECAO.md`.
