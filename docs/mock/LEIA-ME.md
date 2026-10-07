# Mock — Fase 2

Imagens estáticas pra aprovar layout e hierarquia antes de qualquer código de
interface. **Não é o site.** O movimento (ferver, assentar, a assinatura se
escrevendo) aparece aqui congelado num instante.

## Rodada 2 (atual)

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
