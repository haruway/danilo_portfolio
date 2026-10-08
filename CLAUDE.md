# Portfólio Danilo Mariani — v12

## Documento de verdade
**`docs/PRD_v12.md`** — direção, arquitetura, fases e portões.
A copy de Jorik, Bendito, filmes e contato vem de `docs/PRD_v11_com_copy.md`
onde o PRD v12 apontar pra ela. Copy nova ou alterada passa pelo PRD primeiro.
`docs/HANDOFF.md` diz onde a última sessão parou — leia antes de começar.
**Referência viva aprovada:** `docs/mock/proto/index.html` (capa + manifesto). O site
porta o comportamento dele. Leia também PRD §12 (erros que já cometemos).
**Fale com o Danilo em português.**

## Quem é e o que o site é
Danilo Mariani, designer em Maringá/PR. Atualmente na Dzigna (agência de branding).
O site é a primeira impressão de um possível cliente: não fecha venda, **encanta**.
Nível Awwwards, e prova que ele é bom no que faz.

Tese: uma marca precisa virar fachada, embalagem, vídeo, post e site. Normalmente
isso passa por cinco fornecedores (fotógrafo, designer, finalizador, editor,
desenvolvedor). **Aqui passa por um.** O próprio site e o Lab provam o quinto
(creative coding). Assina só "Danilo Mariani", sem cargo no hero.

## Fluxo obrigatório
Trabalhe **por fase** (PRD §9). Cada fase acaba num **portão**: pare, mostre e
espere aprovação do Danilo.

referências → direção de arte → hierarquia → **mock em imagem aprovado** →
tese de interação → código → auditoria → limpeza.

**Nenhum código de interface antes do mock aprovado (Fase 2).**
Decisão aberta? Pergunte ao Danilo em vez de assumir.
No fim de cada sessão, atualize `docs/HANDOFF.md`.
Depois de cada feature: limpeza (código morto, duplicação, complexidade que você criou).

## Estrutura de pastas
```
app/                       projeto Vite — é isso que vai pro ar
  index.html
  src/                     JS, CSS, shaders
    i18n/pt.json en.json   textos (idioma padrão numa constante só)
    data/                  cases.json, videos.json (flag `visible`)
  public/
    fonts/                 fontes self-hosted (.woff2) + OFL.txt
    img/                   imagens (JPG ≤ 400 KB)
netlify.toml               base = app, build = npm run build, publish = dist
docs/
  PRD_v12.md               documento de verdade
  PRD_v11_com_copy.md      fonte de copy
  PRD_tonestamp_secao.md   porte do Tonestamp (consultar onde ainda servir)
  DIRECAO.md               direção de arte (Fase 1)
  HANDOFF.md               estado da última sessão
FOTOS/                     originais em alta — fora do git
fotos halftone e dither tool/  refs do Pinterest + vídeos do Veo — fora do git
_arquivo/                  não editar
  v11/                     site anterior inteiro (index.html único + assets)
  v9/ v10/ sessoes-antigas/
```
Assets reaproveitáveis do v11 (Jorik, Bendito, filmes, `danilo.jpg`) estão em
`_arquivo/v11/assets/img/`. Copie pra `app/public/img/` quando forem usados.
Nada do HTML/CSS/JS do v11 é reaproveitado.

## Comandos
```bash
cd app
npm run dev        # servidor local
npm run build      # gera app/dist/
npm run preview    # serve o dist/ localmente
```
Deploy: Netlify lê `netlify.toml` na raiz. Branch de trabalho: `v12`.
Merge no `main` só quando o v12 estiver pronto pra substituir o v11.

## Stack
- Vite + JavaScript puro, sem framework de UI
- GSAP + ScrollTrigger e Lenis. **Um único sistema de scroll.** Nada de hijack
  de `wheel` com `preventDefault`.
- Shader de textura em **WebGL puro** (decidido na Fase 1; substitui o
  Three.js do PRD §7). Three.js só se uma interação específica exigir.
- Grain e textura **dentro do shader**, nunca overlay com z-index alto
- Um canvas WebGL compartilhado, ou um por seção visível pausado fora da tela
  (IntersectionObserver). Nenhum loop rodando em seção invisível.

## Design system
```css
--black:  #0A0A0A;
--white:  #FFFFFF;
--yellow: #FFD21F;
--red:    #D9230F;   /* fio do "POR UM." */
```
Proporção ~40% preto · 40% branco · 20% amarelo. Amarelo é detalhe (efeito,
hover, sol, marcador). Fundo amarelo só na capa e no contato.
Rampa térmica (preto → vinho → vermelho → laranja → amarelo → creme) só no sol,
no calor e em efeitos. Fundo do site: preto.
**Proibido:** `#FFFA00` (Dzigna) e `#FFBE57` (v11).

Conceito: **solar**. Calor como comportamento — miragem, luz estourada, as coisas
tremem e se revelam como sob sol forte.

Layout: informação ancorada nas margens, vazio no meio, **nada centralizado por
padrão**. Sequência de títulos grandes alterna esquerda/direita em duas posições
fixas (Canals). Nunca posições aleatórias. Sem contorno em texto, sem glow.

### Fontes e licenças
| Papel | Fonte | Regra |
|---|---|---|
| Assinatura (só o nome) | Mayluna — provisória | Arquivo é **Demo**. Entra só como **SVG paths**; o .otf nunca entra no repo. Antes de publicar: licença ou assinatura real vetorizada |
| Nome "DANILO" | Overused Grotesk **ExtraBold 800** | Caixa-alta. Não é Black |
| Títulos (manifesto etc.) | Overused Grotesk **Bold 700**, caixa-alta | Black é pesado demais |
| Texto | Overused Grotesk ~400 | OFL, self-host com a licença |
| Rótulos técnicos | DM Mono | OFL, self-host |
| Lab: Dither (Tonestamp) | pele 1-bit (bitmap/mono), com botão pra desligar e voltar à interface do Tonestamp (Bricolage Grotesque, IBM Plex Mono) | Só dentro da seção do Tonestamp |
| Lab: Halftone (Halftone Tool) | a da interface própria da ferramenta | Só dentro da seção da Halftone Tool |

Lab: **Dither = Tonestamp** (`github.com/haruway/tonestamp`) ·
**Halftone = Halftone Tool** (`github.com/haruway/halftonetool`).
O PRD §5 tinha os dois invertidos (ver a nota de correção lá).

**Nunca** sobe nenhum arquivo de fonte licenciada: Tomato Grotesk, P22 Morris
Troy (estão em `FOTOS/BENDITO/`) e o .otf da Mayluna.

## Não usar
- "Creative AI Director" · "Construo marcas do zero" ·
  "Não basta ser, precisa parecer ser"
- Motion Design / After Effects vendido como competência
- Nome de ferramenta de IA como credencial
- Qualquer elemento da Dzigna (Tomato Grotesk, `#FFFA00`)
- Idade e faculdade

## Anti-padrões (reprovam a entrega)
- Tudo centralizado; cards dentro de cards; seções idênticas empilhadas
- Texto em gradiente; gradiente roxo-azul; borda lateral colorida em card;
  ícone em quadradinho arredondado em cima de título
- "Fade up" genérico em todo elemento
- Inter, Roboto ou qualquer fonte fora da tabela acima
- Amarelo de fundo fora da capa e do contato
- Efeito sem fallback de `prefers-reduced-motion`

## Regras de conteúdo
- Bendito × Antarctica: rodapé **obrigatório** (projeto acadêmico, marca
  fictícia, colab hipotética, sem relação com a Antarctica).
  `carta-33.png` é linha de faca, não carta; das caixas, usar a `02`.
- Vídeos IA: badge `ESTUDO · PRODUZIDO COM IA` em todos. Nunca
  "Campanha publicitária visando…". Arquivos próprios (MP4 + WebM ≤ 4 MB,
  com poster), sem iframe do YouTube na faixa.
- Contato: o e-mail antigo com handle de edição de vídeo **não pode** aparecer.

## Regras técnicas
- `FOTOS/` fora do git. Imagens nunca em base64.
- Nada de texto abaixo de 12px. Contraste de texto sobre textura passa WCAG AA.
- `prefers-reduced-motion` respeitado em tudo. Teclado navega tudo, foco visível.
- `cursor: none` só via classe adicionada por JS.
- localStorage sempre com try/catch.
- Sem source maps em produção.
