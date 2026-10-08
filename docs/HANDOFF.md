# HANDOFF — v12

## Onde paramos (07/10/2026, fim da sessão 1)

Fases 0, 1 e 2 feitas. Tudo que foi decidido está consolidado em **`docs/PRD_v12.md`**
(inclusive a seção 12, "Erros que já cometemos"). Este arquivo é só o ponto de partida.

### Estado
- Branch `v12`, último commit da sessão: protótipo rodada 6 + PRD consolidado.
- Netlify: site novo ligado à branch `v12` (página de verificação do Vite no ar).
- `app/` ainda é só o scaffold do Vite (sem UI). **Nenhum código do site foi escrito.**
- **Referência viva:** `docs/mock/proto/index.html` — capa + manifesto funcionando.
  Abrir: na raiz do repo, `python3 -m http.server 8766` → `http://127.0.0.1:8766/docs/mock/proto/`.
  Depende de arquivos locais fora do git: os dois vídeos do Veo em
  `fotos halftone e dither tool/` e a Mayluna Demo instalada no sistema.
- Prints: `docs/mock/intro/` (atual), rodadas antigas em `docs/mock/v1`…`v5`.
- Mocks estáticos: `docs/mock/trabalhos.jpg` (Trabalhos, rodada 1).

### Falta o Danilo decidir (PRD §11)
1. Sol **embaixo** ou **ao lado** na capa.
2. Loading em **Mayluna centralizado** ou **número gigante**.
3. (Opcional) regerar o vídeo de entrada com o sol centralizado.

### Próximo passo: Fase 3 (Fundação)
Com as duas decisões acima, começar o `app/`:
1. `superpowers:brainstorming` + `writing-plans` pra Fase 3.
2. Tokens, fontes self-hosted (Overused, DM Mono + OFL), header, i18n, Lenis + ScrollTrigger.
3. **Portar o shader do protótipo** pra um módulo (`app/src/gl/sun.js`): sol a partir de vídeo,
   chave de calor, linha a 60°, miragem, nome na textura, sombra do nome, zona quieta,
   orçamento de quadros (PRD §7). Fallback estático pra movimento reduzido.
4. Comprimir os vídeos do Veo (≤ 4MB cada, poster) e colocar em `app/public/video/`.
   Não há ffmpeg na máquina: usar `avconvert` do macOS ou pedir ao Danilo.
5. Mayluna: decidir como entra em produção (SVG/textura gerada da assinatura, nunca o .otf).

### Prompt sugerido pro chat novo
> Leia `CLAUDE.md`, `docs/PRD_v12.md` (inteiro, principalmente §5.1, §7 e §12) e
> `docs/HANDOFF.md`. Abra o protótipo `docs/mock/proto/index.html` pra entender o
> comportamento aprovado. Decisões pendentes: [sol embaixo/ao lado] e [loading].
> Comece a Fase 3 e pare no portão.
