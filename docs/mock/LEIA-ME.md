# Mock — Fase 2

Imagens estáticas pra aprovar layout e hierarquia antes de qualquer código de
interface. **Não é o site.** O movimento (ferver, assentar, a assinatura se
escrevendo) aparece aqui congelado num instante.

## Rodada 3 (atual): protótipo interativo

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
