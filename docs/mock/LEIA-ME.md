# Mock — Fase 2

Imagens estáticas pra aprovar layout e hierarquia antes de qualquer código de
interface. **Não é o site.** O movimento (ferver, assentar) aparece aqui
congelado num instante.

| Arquivo | O que é |
|---|---|
| `capa-A-FFD21F.jpg` | Capa versão A: campo amarelo `#FFD21F`, sol em retícula preta |
| `capa-A-FFC61A.jpg` | A mesma, com o amarelo `#FFC61A` (mais quente, puxa pro laranja) |
| `capa-B-FFD21F.jpg` | Capa versão B: campo preto, sol em retícula amarela |
| `capa-A-mobile.jpg` · `capa-B-mobile.jpg` | As duas a 390px |
| `trabalhos.jpg` | Seção Trabalhos, case Jorik inteiro + entrada da Bendito |

## Como foi feito
Não havia ferramenta de geração de imagem na sessão. O mock é uma composição
HTML estática renderizada pelo Chrome headless com as fontes reais (Overused
Grotesk, DM Mono, Mayluna) e retícula/dither de verdade desenhados em canvas.
Os fontes estão em `src/` e são **descartáveis**: não são o código do site.
Pra renderizar de novo, sirva a pasta com as fontes e as imagens do
`_arquivo/v11/assets/img/` (o .otf da Mayluna fica fora do repo).

## Copy rascunho (não está no PRD, revisar)
- As 4 etapas do processo do brasão (Referência, Traçado, Cor e fechamento, Patch).
- O bloco ao lado dos frames do filme ("O produto aplicado, não o conceito.").
- A legenda "A imagem assenta quando você para em cima".
- O título "Original × vetor".

## O que fica pro código (não é literal no mock)
- A **zona limpa** sob a nav e os textos pequenos: no shader vira uma máscara
  suave, sem recorte visível.
- O sol ferve e a miragem sobe; no mock está parado.
- A fronteira dither → foto anda com o cursor e com o tempo.
- O slider do brasão é arrastável e funciona pelo teclado.
