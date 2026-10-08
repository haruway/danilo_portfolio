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

### Portão da Fase 1: ✅ passou
- Direção aprovada pelo Danilo.
- **Stack:** "o que for melhor". Decidido: **WebGL puro** pro shader de
  textura (sem Three.js). Three.js entra só se alguma interação específica
  precisar dele. Isso substitui o "Three.js como tela" do PRD §7.
- Seção interna do mock: **Trabalhos**.

## Sessão 1 (cont.) · Fase 2 (Mock)

### Feito
- `docs/mock/`: capa A (`#FFD21F` e `#FFC61A`), capa B, as duas no mobile,
  e Trabalhos (case Jorik inteiro + entrada da Bendito). Detalhes e copy
  rascunho em `docs/mock/LEIA-ME.md`.
- Sem ferramenta de geração de imagem na sessão: o mock é HTML estático
  renderizado no Chrome headless (fontes reais, retícula e dither reais em
  canvas). Fontes do mock em `docs/mock/src/`, descartáveis.

### Rodada 2 do mock (feedback do Danilo)
Rodada 1 foi pra `docs/mock/v1/`. Mudanças (detalhe em DIRECAO.md, nota de
revisão no topo): assinatura gigante de margem a margem, sol em halftone de
linha com amarelo/laranja/pouco vermelho, capa só tipo + sol, tese em tipo
gigante na seção de baixo. Novos: `capa-auth`, `capa-tech`,
`capa-auth-write`, mobiles e `manifesto`.

### Rodada 3: protótipo interativo (feedback do Danilo)
- Sol: **autêntico** escolhido, mas o render da rodada 2 estava "bugado"
  (linhas com cara de tecido, coroa em contas). Refeito em WebGL com formas
  definidas e antialias. `docs/mock/proto/`.
- Nome: um amarelo e um branco (não branco nos dois). Variação B = ideia
  dele (DANILO em bloco + Mariani script por cima).
- Manifesto: alinhado à esquerda (zigue-zague prejudicava leitura).
- Os mocks de Manifesto e Trabalhos **eram desktop** (1440 de largura); a
  imagem da página inteira parecia mobile por ser alta.
- Exceção do hook do impeccable: `gradient-text` só em
  `docs/mock/proto/index.html` (é o halftone de linha dentro da letra).
- `.gitignore` agora bloqueia qualquer arquivo com "Mayluna" no nome.

### Rodada 4 (feedback do Danilo)
- Sol "sem sal": agora o shader lê as fotos de referência dele como fonte de
  luz (pasta `fotos halftone e dither tool/`, adicionada ao `.gitignore`:
  são do Pinterest e não podem ser publicadas).
- Canals: ele não quer outra fonte; quer o **layout/hierarquia** do Canals
  com caixa-alta (ou inicial maiúscula) e peso menor. Feito: Overused 700,
  caixa-alta, estrutura margem/recuo, legendas nos vãos, fio amarelo.
- Nome: B ganhou (o Mariani cruzando o DANILO), **sem contorno**; DANILO em
  ExtraBold (800), não Black. Posição do sol: no alto à direita, como no A.
- Menu: sai do canto inferior direito, vira header horizontal no topo.
- Desempenho: o protótipo travava num MacBook Pro M4. Otimizado (ver
  LEIA-ME do mock). Testar de novo na máquina dele.
- A Libre Caslon Condensed (OFL) chegou a ser testada e foi descartada.

### Pendência nova
- **Fonte do sol pro site final:** precisa ser material próprio (as refs são
  de terceiros). Opções: vídeo do sol gerado no Veo (já previsto no PRD como
  `uSource`), um render/pintura do próprio Danilo, ou um sol procedural
  desenhado pra imitar as refs.

### Rodada 5 (feedback do Danilo)
- Manifesto: alternância rígida esq/dir como o Canals ("coisas diferentes
  não significam coisa bagunçada"). "POR UM." e o fio tinham a mesma cor:
  fio agora vermelho.
- Sol: **pintado** escolhido (o de raios saiu). Duas posições pra comparar:
  embaixo e ao lado.
- Nome: mais calor e "acende" no hover.
- Nova sequência de abertura: loading com contador (ref. chunkychunks.com.br,
  não consegui abrir o site: o Chrome desconectou), sol vindo de longe em
  zoom, scroll leva o sol pro lugar enquanto o nome se escreve, aviso de
  scroll no fim.
- **Danilo está gerando o vídeo do sol no Veo 3.1** a partir da ref pintada.
  Quando chegar, ele vira a fonte do shader (`uSrc` com vídeo) no lugar da
  imagem do Pinterest.

### Em aberto (portão da Fase 2)
1. ~~Sol autêntico ou tecnológico~~ → autêntico. ~~Nome A ou B~~ → B.
   ~~Raios ou pintado~~ → pintado. Embaixo ou ao lado?
2. Manifesto aprovado? Copy rascunho dos fornecedores riscados.
3. Trabalhos aprovado? Copy rascunho (etapas, bloco do filme).
4. "O trabalhos já pode ir para a sessão 2": só a escolha do mock, ou
   reordenar (Trabalhos antes do Manifesto)? Com a tese virando seção própria
   logo abaixo da capa, a ordem atual (Capa → Manifesto → Trabalhos) parece a
   natural.
5. Amarelo exato: no sol o amarelo virou parte de uma rampa (`#FFC21A`); o
   `#FFD21F` ficou no "um." do Manifesto. Fechar um só na Fundação.
6. Contato amarelo ou preto (PRD §4).
7. Mobile da capa: o nome cabe menor (limitado pela largura). Alternativa a
   testar: nome na vertical.

### Próximo
Portão da Fase 2 → **Fase 3** (Fundação): tokens, fontes, grid, Lenis +
ScrollTrigger, i18n, shader com 4 modos + fallback. Primeiro código de UI.
