# PRD v12 — Portfólio Danilo Mariani

**Criado:** 07/10/2026 · **Consolidado:** 07/10/2026, fim da sessão 1 (Fases 0–2)
**Destino:** Claude Code (VS Code), repo `haruway/danilo_portfolio`, branch `v12`
**Substitui:** `docs/PRD_v11_com_copy.md` como direção. A copy do v11 continua valendo onde este PRD apontar pra ela.
**Escopo:** reconstrução total do site. Mesmo repositório, código novo.

> Este documento já incorpora tudo que foi decidido nas Fases 0, 1 e 2 (seis rodadas
> de mock com o Danilo). Onde ele conflita com `docs/DIRECAO.md`, **vale este PRD**.
> A seção 12 lista os erros que já cometemos — leia antes de propor qualquer coisa.

---

## 0. Como usar este documento (leia primeiro, Claude)

1. **Fale com o Danilo em português**, inclusive nas mensagens curtas entre ferramentas.
2. Leia este PRD inteiro e `docs/HANDOFF.md` antes de qualquer código.
3. Trabalhe **por fases** (seção 9). Cada fase termina num **portão**: pare, mostre e espere aprovação.
4. **A referência viva é o protótipo** `docs/mock/proto/index.html`. Ele foi aprovado em
   rodadas e guarda decisões que texto não guarda (proporções, tempos, shader). O site
   novo **porta o comportamento dele**; não reinventa.
5. Mostre resultado **rodando** sempre que puder (protótipo local, preview), não só print.
   O Danilo julga movimento, e print de efeito animado engana.
6. Skills: `impeccable` (direção, auditoria), `genjutsu` (GSAP/shaders/motion),
   `superpowers:brainstorming`/`writing-plans` antes de fase de código,
   `mattpocock-skills:grilling` quando houver decisão aberta,
   e na Fase 9 `web-quality-audit`, `performance`, `accessibility`, `seo`, `web-design-guidelines`.
7. Fim de sessão: atualize `docs/HANDOFF.md`. Depois de cada feature: limpeza.

---

## 1. Projeto

- Repo `haruway/danilo_portfolio`, **branch `v12`**. Merge no `main` só quando substituir o v11.
- v11 arquivado em `_arquivo/v11/` (intacto). Nada do código dele é reaproveitado.
- Reaproveita: imagens de `_arquivo/v11/assets/img/`, copy de Jorik/Bendito/filmes (PRD v11), módulos do Tonestamp.
- Site novo em `app/` (Vite). Deploy: site **novo** na Netlify ligado ao GitHub, branch `v12`
  (o site antigo `danilomariani.netlify.app` é arrastar-e-soltar e continua no ar).
- `FOTOS/` e `fotos halftone e dither tool/` ficam **fora do git** (ver seção 12).

---

## 2. Objetivo e posicionamento

**O que o site é:** a primeira impressão de um possível cliente. Não fecha venda; **encanta**.
Nível Awwwards, e prova que ele é bom no que faz.

**Público (peso igual):** agências/estúdios que contratam parceiro ou freela, e marcas diretas.
**Sucesso:** o visitante brinca no Lab · reconhecimento público (Awwwards/CSSDA). O caminho até o contato continua óbvio.

**Tese:** uma marca precisa virar fachada, embalagem, vídeo, post e site. Normalmente isso
passa por cinco fornecedores — fotógrafo, designer, finalizador, editor e desenvolvedor.
**Aqui passa por um.** O próprio site e o Lab provam o quinto (creative coding).

**Assina:** Danilo Mariani. Sem cargo.

**Não usar:** "Creative AI Director" · "construo marcas do zero" · "não basta ser, precisa
parecer ser" · Motion Design/After Effects como competência · ferramenta de IA como
credencial · identidade da Dzigna (Tomato Grotesk, `#FFFA00`) · idade e faculdade.

---

## 3. Identidade visual (aprovada)

### Conceito
**Retícula ao sol** (detalhes em `docs/DIRECAO.md`). Halftone é o ofício de arte-final dele;
o calor é comportamento: as coisas fervem (miragem) e assentam em nitidez.
Três verbos de movimento: **ferver**, **assentar**, **correr**. Animação que não é um deles não entra.

### Cor
```css
--black:  #0A0A0A;
--white:  #FFFFFF;
--yellow: #FFD21F;   /* aprovado (o #FFC61A saiu) */
--red:    #D9230F;   /* fio do "POR UM." e destaques raros */
```
- Fundo do site: **preto**. Seções brancas continuam previstas (Trabalhos).
- **Rampa térmica do sol** (só no sol, no calor e em efeitos):
  `#0A0A0A → #3A0D06 → #C21A0C (fio) → #EC620E → #FFC21A → #FBE6B2`.
- Amarelo nunca como texto sobre branco (1,45:1). Amarelo sobre preto: 13,7:1.
- Proibido: `#FFFA00` (Dzigna), `#FFBE57` (v11), glow, gradiente decorativo, contorno em texto.

### Tipografia
| Papel | Fonte | Regra |
|---|---|---|
| Nome "DANILO" | **Overused Grotesk ExtraBold (800)**, caixa-alta | Não é Black. Tracking −0,02em |
| Nome "Mariani" | **Mayluna** (assinatura) | Arquivo é **Demo**: nunca no repo; em produção vira **SVG paths/textura** gerada da assinatura. Antes de publicar: licença ou assinatura própria vetorizada |
| Display do Manifesto | **Overused Grotesk Bold (700)**, caixa-alta | Não Black (pesado demais) |
| Texto | Overused Grotesk Book/Regular (~400) | 15–17px, medida curta |
| Rótulos | **DM Mono** 400/500, caixa-alta, 12px, tracking +6% | Nav, legendas, contadores |
| Lab | tipografia da própria ferramenta | ver §5 |

Fontes OFL: Overused (`RandomMaerks/Overused-Grotesk`, licença `LICENSE.txt`), DM Mono (Google Fonts). Self-host com o OFL junto.

### Layout
- Informação ancorada nas margens; nada centralizado por padrão.
- **Alternância rígida esquerda/direita** (estrutura do Canals) quando há sequência de
  títulos grandes. "Diferente não é bagunçado": duas posições fixas, nunca posições aleatórias.
- Margem lateral: 50px a cada 2560px de largura (≈28px em 1440); 16px no mobile.
- Breakpoints 1440 / 1024 / 768 / 480.

### O sol (assinatura visual do site)
- Fonte de luz: **vídeos do Veo 3.1 do Danilo** (sol pintado a óleo sobre fundo azul):
  `video sol surgindo de fundo.mp4` (entrada, 8s, 1920×1080) e
  `video estatico onda de calor.mp4` (loop, 5s, 1284×716).
- O shader **nunca mostra o vídeo cru**. Ele lê o vídeo e redesenha:
  1. **Chave de calor:** só o que é quente vira luz (`r − b` alto ou luminância > 0,72); o fundo azul vira preto.
  2. Curva de tom `pow(L, 1,7)` (puxa meios-tons pro laranja; creme só no miolo).
  3. **Halftone de linha a 60°**, período 7px, ondulação lenta; 7 faixas da rampa térmica.
  4. **Miragem:** deslocamento vertical por ruído subindo; mais forte perto do sol, do cursor, com scroll e na intro.
  5. **Sombra do nome:** o nome escurece o sol atrás dele (mipmap borrado da textura do nome). É o que separa amarelo de amarelo **sem contorno**.
  6. Zona quieta atrás do PT/EN (textura apaga pra leitura).
- O vídeo de entrada tem o sol deslocado (~60% → ~53% da largura). O protótipo compensa
  movendo o centro de leitura com o tempo; se o Danilo regerar o vídeo centralizado, remover a compensação.

---

## 4. Arquitetura

| # | Seção | Estado |
|---|---|---|
| — | **Loading** | Aprovado no conceito (§5.0) |
| 01 | **Capa** | Aprovada no protótipo (§5.1). Falta decidir sol embaixo × ao lado |
| 02 | **Manifesto** | Aprovado no protótipo (§5.2) |
| 03 | **Trabalhos** | Mock estático aprovado na ideia (§5.3); falta versão no mundo novo (fundo, tipo) |
| 04 | **Vídeos IA** | Não iniciado (§5.4) |
| 05 | **Lab: Halftone** | Não iniciado (§5.5) |
| 06 | **Lab: Dither** | Não iniciado (§5.6) |
| 07 | **Contato** | Não iniciado (§5.7) |

**Navegação:** **header horizontal fixo no topo**: índice em DM Mono à esquerda
(`02 Manifesto · 03 Trabalhos · 04 Vídeos · 05 Lab · 07 Contato`), `PT / EN` à direita.
No mobile, só Trabalhos e Contato + idioma. (O índice vertical no canto inferior foi reprovado.)

Previsto e oculto: case Dzigna (`visible: false`), link de app comercial no Contato.

---

## 5. Seções

### 5.0 Loading
- Contador `000 → 100` preso ao carregamento real (fontes + vídeos), mínimo ~1,8s.
- **Testar as duas:** (a) número em **Mayluna amarelo, menor, centralizado** (preferência atual do Danilo);
  (b) número gigante em Overused 800 no canto inferior esquerdo. Barra amarela fina embaixo.
- Rótulos DM Mono nos cantos de cima. Sai deslizando pra cima.

### 5.1 Capa — sequência aprovada (roda sozinha, ~7s)
1. Loading sai.
2. **Vídeo "sol surgindo"** (×1,6) no shader: o sol nasce pequeno lá no fundo e cresce até o centro. Calor forte esfriando. Scroll travado.
3. Troca pro **loop de calor**. **1,2s parado só no sol.**
4. **O nome aparece** (1,8s): DANILO e depois Mariani se escrevem da esquerda pra direita
   com borda tremendo de calor, começam 5% maiores e assentam na posição final;
   ao mesmo tempo o sol desliza pro lugar dele. **Sem girar.**
5. Scroll destrava. Aviso "Role a página" (seta desenhada em SVG) aparece se a pessoa parar.
6. Ao rolar, a capa sobe com a página; o canvas para quando sai da tela.

**Nome (variação B, aprovada):** DANILO em Overused 800 da margem esquerda até ~84% da largura;
Mariani em Mayluna de ~16% até a margem direita, cruzando a base do DANILO (topo do Mariani a
63,5% da altura do DANILO). Proporções da arte do Danilo (2560×1440, margem 50px).
Cores: **DANILO branco, Mariani amarelo** (botão de troca existe no protótipo). Sem contorno.
Calor constante leve nas letras; **hover = só a onda de calor aumenta**, cores intactas.

**Sol — posição final em aberto:** embaixo (nasce atrás do nome, metade visível) ou ao lado
(canto superior direito). Mobile: sol menor, encostado no canto, nunca cobrindo o nome.

### 5.2 Manifesto (aprovado)
- Lead: "Uma marca precisa virar" (Overused 400, ~38px), margem esquerda.
- Palavras em **Overused 700 caixa-alta**, ~12,6vw (máx. 192px), alternando
  **esquerda / direita / esquerda / direita / esquerda**: FACHADA, · EMBALAGEM, · VÍDEO, · POST · E SITE.
- Legenda no lado vazio de cada linha, alinhada à margem desse lado: DM Mono `FORNECEDOR 0N` + nome riscado
  (Fotógrafo, Designer, Finalizador, Editor, Desenvolvedor).
- "Normalmente isso passa por *cinco fornecedores*." à direita.
- "AQUI PASSA" (esquerda) / "POR UM." (direita) em **amarelo**, com **fio vermelho** correndo da
  margem esquerda **por trás** da palavra (cores diferentes = leitura).
- Fecho: "Fotógrafo, designer, finalizador, editor e desenvolvedor. A marca sai coerente porque sai da mesma mão." (copy rascunho, revisar).
- Cada palavra **assenta** ao entrar: começa em linhas finas laranja e fecha em branco (amarelo no "POR UM.").
- Mobile: palavra e legenda empilhadas, mantendo o lado.

### 5.3 Trabalhos
Mock estático em `docs/mock/trabalhos.jpg` (rodada 1, fundo branco) — ideia aprovada:
título gigante, case Jorik inteiro (frame da Copa assentando de dither → foto, comparação
original × vetor arrastável, 4 etapas, frames do filme, carimbo da assinatura), entrada da Bendito
com selo `CONCEITO · NÃO COMISSIONADO`. Precisa ser refeito no sistema atual (pesos 700/800, caixa-alta, alternância).
Copy: PRD v11 §03 e §04. Rodapé obrigatório da Bendito × Antarctica (colab fictícia).
`carta-33.png` é linha de faca; das caixas, usar a `02`. Copy rascunho das etapas: revisar.

### 5.4 Vídeos IA
Faixa horizontal presa ao scroll (verbo **correr**), tipografia e vídeo intercalados (Canals).
4 filmes (Carnan/Copacabana, Camaro, Arden Spa, Guaraná) + outros. Badge `ESTUDO · PRODUZIDO COM IA`.
Arquivos próprios (MP4 H.264 + WebM ≤ 4MB, poster), tocam no hover/centro, link pro YouTube. Sem iframe.

### 5.5 Lab: Halftone = Halftone Tool (`github.com/haruway/halftonetool`)
Motor JS de retícula de impressão (12 padrões, tintas, envelhecimento) com harness de navegador e worker.
Usa a interface própria da ferramenta. Imagem padrão carregada, upload, export.

### 5.6 Lab: Dither = Tonestamp (`github.com/haruway/tonestamp`)
Reaproveitar `renderer.js`, `shapes.js`, `palette.js`, `export.js` sem reescrever.
**Pele 1-bit** (preto e branco, fonte bitmap/mono, cursor pixelado) **com botão pra desligar**
e voltar à interface normal do Tonestamp (Bricolage Grotesque, IBM Plex Mono).
Crédito: inspirado no trabalho de Anton Burmistrov. Corrigir o README do Tonestamp (exporta MP4, não WebM).

### 5.7 Contato
"Vamos conversar…" (v11 §08). WhatsApp primário; e-mail, LinkedIn, Behance. Nome de novo com o calor da capa.
O e-mail antigo com handle de edição de vídeo **não pode aparecer**.

---

## 6. Idiomas
PT principal, EN secundário. Textos em `app/src/i18n/pt.json`/`en.json`, idioma padrão numa constante.
Persistir escolha (localStorage com try/catch), respeitar `?lang=en`, trocar `<html lang>` e meta.

---

## 7. Stack técnica (decidida)
- **Vite** + JavaScript puro. **GSAP + ScrollTrigger** e **Lenis**, um sistema de scroll só.
- **WebGL2 puro** pro shader do sol/nome (decidido: não usar Three.js; ~150KB a menos). Three.js só se uma interação exigir.
- Um canvas fixo pra capa; para fora da tela e com a aba oculta.
- Conteúdo em `app/src/data/*.json` com flag `visible`.
- **Orçamento de desempenho** (o protótipo travou um MacBook Pro M4 antes destas regras):
  - ruído vem de **textura pronta 256²**, nunca fbm calculado por pixel em várias oitavas;
  - DPR do canvas no máximo **1,5**;
  - quadros: **60/s** em movimento (intro, scroll), **30/s** com cursor/hover, **15/s** parado;
  - vídeo sobe pra GPU **só quando há quadro novo** (`requestVideoFrameCallback`);
  - nome desenhado **dentro do shader** (textura com DANILO no canal R e Mariani no G), não com filtro SVG;
  - filtros SVG de deslocamento só por tempo curto, nunca permanentes.
- `prefers-reduced-motion`: sem calor, sem intro animada, estado final direto.
- Deploy: Netlify (`netlify.toml`: base `app`, `npm run build`, publish `dist`, Node 22).

### Qualidade (critério de pronto)
Lighthouse ≥ 90 nas quatro (desktop) · LCP < 2,5s em 4G (o loading não pode esconder um LCP ruim) ·
teclado navega tudo, foco visível · OG com imagem, favicon, 404, sitemap, robots, llms.txt ·
zero erro no console · sem source map · `npm audit` sem alta.

---

## 8. Anti-padrões (reprovam)
Tudo centralizado · cards em cards · seções idênticas empilhadas · texto em gradiente · glow ·
contorno em texto · fade-up genérico · fonte fora da §3 · posições "aleatórias" em layout que
deveria alternar · efeito sem fallback de movimento reduzido · efeito que substitui a cor do
nome por textura · elementos girando sem motivo.

---

## 9. Fases

| Fase | Entrega | Estado |
|---|---|---|
| 0 · Setup | branch, arquivo do v11, Vite, Netlify, CLAUDE.md, PRODUCT.md | ✅ |
| 1 · Referências e direção | `docs/DIRECAO.md` | ✅ |
| 2 · Mock | protótipo `docs/mock/proto/` (capa + manifesto) e mocks estáticos | ✅ quase: faltam as decisões da §11 |
| 3 · Fundação | tokens, fontes, grid, Lenis+ScrollTrigger, i18n, **porte do shader do protótipo** (sol, nome, miragem, linha), vídeos comprimidos, fallback | próximo |
| 4 · Capa | loading + sequência da §5.1 no `app/` | |
| 5 · Manifesto + Trabalhos | §5.2 e §5.3 (refazer Trabalhos no sistema atual, mock antes) | |
| 6 · Vídeos | §5.4 | |
| 7 · Lab | §5.5 e §5.6 | |
| 8 · Contato + acabamento | §5.7, 404, meta/OG, EN | |
| 9 · Auditoria | skills de qualidade, limpeza, HANDOFF final | merge no `main` |

---

## 10. CLAUDE.md
Já reescrito pro v12. Manter em sincronia com este PRD quando decisões mudarem.

---

## 11. Pendências do Danilo
| # | Item | Bloqueia |
|---|---|---|
| 1 | **Sol embaixo ou ao lado** na capa | Fase 4 |
| 2 | **Loading:** Mayluna centralizado ou número gigante | Fase 4 |
| 3 | Licença da Mayluna **ou** assinatura própria vetorizada | Publicação |
| 4 | (Opcional) regerar o vídeo de entrada com o sol centralizado desde o 1º quadro | — |
| 5 | Arquivos MP4 dos 4 filmes | Fase 6 |
| 6 | Confirmar `danilo.jpg` ou foto nova | Fase 5 |
| 7 | E-mail profissional | Fase 8 |
| 8 | Revisar copy rascunho (manifesto, etapas do brasão) | Fase 5 |

---

## 12. Erros que já cometemos (não repetir)

**Processo**
- Responder em inglês. Sempre português.
- Mostrar página inteira alta numa imagem: o Danilo leu como mobile. Mostrar desktop em 1440×900 por tela, ou o protótipo rodando.
- Interpretar referência como troca de fonte. Quando ele manda o Canals, o pedido é **layout, hierarquia e peso**, não a fonte.
- Escrever arquivo grande sem conferir: uma troca de texto que não bateu deixou o protótipo em branco. Depois de editar, rodar e olhar.

**Design**
- Sol "simples demais" (pontos, disco limpo) não encanta. Ele quer sol **pintado, orgânico, com raios irregulares**, em halftone de linha, amarelo/laranja e um fio de vermelho.
- Nome pequeno. O nome é **gigante**, de margem a margem, nas proporções da arte dele.
- **Contorno no nome:** reprovado ("nada a ver"). Separar do fundo com **sombra no sol**, nunca stroke.
- Peso **Black** no DANILO e no manifesto: pesado demais. DANILO 800, manifesto 700.
- Texto todo minúsculo nos títulos: reprovado. Caixa-alta (ou inicial maiúscula).
- Palavras em posições aleatórias: "diferente não é bagunçado". Alternância rígida esq/dir.
- Texto e fio da **mesma cor** (POR UM. amarelo + linha amarela): mata leitura.
- "Acender" o nome trocando a cor por textura de fogo: reprovado. Hover = só mais calor; cores ficam.
- Sol **girando** enquanto se move: reprovado.
- Nome surgindo **só com scroll**: trocado por sequência automática (1,2s no sol, depois o nome).
- Índice vertical no canto inferior direito: reprovado. Header horizontal no topo.
- Tese da capa junto do nome: a capa é **só tipo + sol**; a tese vai pro Manifesto em escala grande.

**Técnico**
- Shader com fbm de 5 oitavas por pixel + DPR 2 + 60 qps sempre: travou um M4. Seguir o orçamento da §7.
- Filtro SVG `feDisplacementMap` permanente em texto gigante: caro. Usar só durante a animação ou levar pro shader.
- Headless Chrome não captura vídeo decodificado de forma confiável nem janela < ~500px: pra print, usar iframe de 390px e conferir vídeo ao vivo.
- `path` como variável no zsh apaga o `PATH`. Não usar.

**Direitos**
- Fotos do Pinterest (`fotos halftone e dither tool/`) e o `.otf` da Mayluna Demo: **nunca no git**
  (já no `.gitignore`). Os vídeos do Veo são do Danilo: entram em `app/public/` na Fase 3, **comprimidos**
  (hoje 17MB e 11MB; meta ≤ 4MB cada, com poster).
