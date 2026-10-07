# Mock — Fase 2

Imagens estáticas pra aprovar layout e hierarquia antes de qualquer código de
interface. **Não é o site.** O movimento (ferver, assentar, a assinatura se
escrevendo) aparece aqui congelado num instante.

## Rodada 4 (atual): protótipo refinado

Como abrir: na **raiz do repo**, `python3 -m http.server 8766` e acesse
`http://127.0.0.1:8766/docs/mock/proto/`. (Mudou: o sol agora lê uma imagem
da pasta de referências, que fica na raiz.)

- **Sol** com forma real: o shader lê uma das fotos de referência do Danilo
  (`fotos halftone e dither tool/`) como fonte de luz e redesenha em
  halftone de linha. Botões **Sol raios** / **Sol pintado** e **Sol em
  cima** / embaixo. ⚠️ As fotos são do Pinterest: ficam fora do git e **não
  podem ir pro site**. Pro site final, a fonte do sol tem que ser material
  próprio (render, vídeo do Veo, pintura) — ver HANDOFF.
- **Nome B** sem contorno; DANILO em Overused **ExtraBold (800)**, nas
  proporções da arte do Danilo (DANILO até ~84% da largura, Mariani de ~16%
  até a margem direita, cruzando a base do DANILO).
- **Menu** virou header horizontal no topo; PT/EN no canto direito.
- **Manifesto** na estrutura do Canals: palavras em caixa-alta, Bold (700),
  alternando entre a margem e um recuo fixo; legendas pequenas nos vãos;
  "Aqui passa / por um." com um fio amarelo correndo da margem até a palavra.
- **Desempenho** (travava num MacBook Pro M4): ruído vem de uma textura
  pronta em vez de ser calculado por pixel; resolução limitada a 1,5x;
  15 quadros/s parado e 30 com cursor/scroll; para quando sai da tela ou a aba
  fica oculta; o filtro de calor do nome some quando a escrita termina. O
  contador "qps" no painel mostra os quadros por segundo.
- "Sombra no sol" (desligado por padrão): as letras escurecem o sol atrás
  delas.

Prints: `proto-capa.jpg`, `proto-capa-mobile.jpg`, `proto-manifesto.jpg`.
Rodada 3 em `v3/`.

## Rodada 3: protótipo interativo

`proto/index.html` — capa + Manifesto rodando de verdade, com:
- sol em **WebGL** (halftone de linha, disco chapado, anel de linhas,
  línguas de fogo creme, raios laranja/vermelho) que ferve com o tempo, com o
  cursor e com a velocidade do scroll;
- assinatura em SVG medida pelo contorno das letras, **se escrevendo** com
  calor que assenta (aproximação: revela da esquerda pra direita; o site final
  segue a ordem do traço);
- **Nome A**: as duas palavras na assinatura, Danilo amarelo, Mariani branco.
  **Nome B** (ideia do Danilo): DANILO em Overused Black de margem a margem,
  Mariani na assinatura em amarelo cruzando por cima, com contorno preto; o
  sol nasce embaixo. "Trocar cores" inverte amarelo/branco;
- **zona limpa**: a textura apaga atrás do menu;
- Manifesto alinhado à esquerda (leitura), cada palavra entra em linhas
  laranja e assenta em branco; o "um." assenta em amarelo.

Como abrir: `cd docs/mock/proto && python3 -m http.server 8766` e acesse
`http://127.0.0.1:8766`. A Mayluna vem do sistema (`local('Mayluna Demo')`);
o `.otf` nunca entra no repo (`.gitignore` bloqueia).
Prints: `proto-A.jpg`, `proto-B.jpg` e as versões `-mobile`.

## Rodada 2

| Arquivo | O que é |
|---|---|
| `capa-auth.jpg` | Capa, sol **autêntico**: halftone de linha, raios irregulares, amarelo + laranja + um fio de vermelho, grão |
| `capa-tech.jpg` | Capa, sol **tecnológico**: halftone de linha limpo, ondas suaves, sem raios |
| `capa-auth-write.jpg` | Um quadro da assinatura se escrevendo ("Mariani" pela metade) |
| `capa-auth-mobile.jpg` · `capa-tech-mobile.jpg` | As duas a 390px |
| `manifesto.jpg` | Seção logo abaixo da capa: a tese em tipo gigante, saindo do calor |
| `trabalhos.jpg` | Seção Trabalhos (da rodada 1, sem mudança) |

A assinatura segue a arte do Danilo no Illustrator (2560×1440, margem de 50px):
"Danilo" encosta na margem de cima e da esquerda, "Mariani" na da direita. O
mock mede o contorno real das letras pra encaixar.

## Rodada 1 (superada)
`v1/`: capa A (campo amarelo) e B (campo preto), sol em retícula de pontos,
assinatura pequena. Feedback do Danilo: nome tem que ser gigante, sol simples
demais, texto da tese "jogado".

## Como foi feito
Não havia ferramenta de geração de imagem na sessão. O mock é HTML estático
renderizado pelo Chrome headless com as fontes reais (Overused Grotesk,
DM Mono, Mayluna) e halftone/dither de verdade desenhados em canvas.
`src/` é **descartável**: não é o código do site. Pra renderizar de novo,
sirva a pasta com as fontes e as imagens de `_arquivo/v11/assets/img/`
(o .otf da Mayluna fica fora do repo).

## Copy rascunho (não está no PRD, revisar)
- Manifesto: os cinco fornecedores riscados ao lado de cada palavra, e a
  frase "A marca sai coerente porque sai da mesma mão."
- Trabalhos: as 4 etapas do brasão, o bloco "O produto aplicado, não o
  conceito.", o título "Original × vetor" e a legenda do efeito.

## O que fica pro código (não é literal no mock)
- A assinatura se desenha seguindo a ordem do traço (máscara animada), não
  como uma cortina da esquerda pra direita.
- O sol ferve e a miragem sobe; no mock está parado.
- "fachada," assenta de linhas pra sólido conforme entra na tela.
- A fronteira dither → foto anda com o cursor e com o tempo.
- O slider do brasão é arrastável e funciona pelo teclado.
