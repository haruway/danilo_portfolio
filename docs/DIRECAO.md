# Direção de arte — v12

**Fase 1 · 07/10/2026** · Status: **aprovado pelo Danilo (07/10/2026)**
Respostas do portão: direção aprovada · WebGL puro pro shader (Three.js só se
uma interação exigir) · mock interno = Trabalhos.
Base: `docs/PRD_v12.md` §2–§5 e `PRODUCT.md`. Este documento não muda o que o
PRD já fixou (paleta, fontes, arquitetura). Ele dá a razão por trás, o
comportamento e as regras pra que o mock (Fase 2) e o código saiam coerentes.

---

## 1. A ideia em uma frase

**Retícula ao sol.** O site é uma peça impressa deixada no calor do meio-dia:
tudo que aparece é retícula (o ofício de arte-final do Danilo), e o calor faz
a retícula tremer, estourar e então assentar em imagem nítida.

Por que essa e não outra:
- **Halftone é o ofício dele, não um efeito escolhido.** Arte-final é o lugar
  onde imagem vira ponto e linha pra ir pra gráfica. O site mostra o bastidor
  do trabalho como superfície.
- **Calor é ele.** Solar (PRD §3). E calor tem um comportamento físico preciso
  (ar quente sobe, a imagem ondula na vertical, a luz estoura), o que vira uma
  gramática de movimento concreta em vez de "vibe".
- **Miragem → nitidez é a tese do site em movimento.** De longe parece truque;
  quando você chega perto, é real e preciso. É o "aqui passa por um" provado
  na interação: a mesma mão que distorce é a que assenta.

## 2. Emoção e arquétipo

**Emoção-alvo:** *ofuscamento que vira foco.* O primeiro segundo é luz demais
(amarelo, sol, calor tremendo); o segundo seguinte é clareza total (quem é,
o que faz, onde clicar). Deslumbrar e, logo depois, deixar tudo legível.

**Arquétipo:** **Criador**, com traço de **Mago**.
- Criador: o valor está no ofício e no controle do resultado, peça por peça.
- Mago: transforma uma coisa em cinco (marca → fachada, embalagem, vídeo,
  post, site), e o site mostra isso acontecendo, não diz.
- **Não é:** Rebelde (nada de grito, glitch e caos pelo caos) nem Bobo da Corte
  (sem piada visual, sem mascote).

**Tom de voz** (pra copy nova): curto, direto, primeira pessoa, sem adjetivo
vendedor. Frases que soam como um designer explicando o próprio trabalho na
mesa, não como agência no LinkedIn.

## 3. O lugar-comum que a gente recusa

Portfólio de designer em 2026 tende a cair em um destes três:
1. Fundo quase preto, um neon brilhando nas bordas, grid de cards de projeto.
2. Creme + serifa itálica + filete fino, cara de revista.
3. Cena 3D pesada como hero, com o trabalho escondido atrás dela.

**Nosso risco real é o nº 1**, porque a paleta é preto + amarelo. Defesas:
- **O amarelo é tinta, não luz.** Aparece como ponto de retícula impresso e
  como campo chapado (capa, contato). Nunca como glow, borda brilhante,
  sombra colorida ou gradiente luminoso.
- **Metade do site é branco puro.** A proporção 40/40/20 é pra valer: Trabalhos
  é uma seção clara, editorial.
- **Nada de grid de cards.** São dois cases contados por inteiro.

## 4. Referências (Fase 1 do PRD: mín. 10)

Vi o preview de cada uma marcada com ✓ pela página do Awwwards (a busca do
Awwwards estava fora do ar hoje, 503, e o Chrome não tinha permissão pra
capturar os sites externos). As sem ✓ são referências técnicas ou que conheço
só pela descrição: confira antes de usar como argumento.

| # | Referência | O que pegar | O que **não** pegar |
|---|---|---|---|
| 1 | **CANALS** ✓ — [awwwards](https://www.awwwards.com/sites/canals) · Site of the Month dez/2019 · Marcus Brown & Aristide Benoist | Papéis tipográficos fixos: display gigante ocupando a largura, texto corrido pequeno, rótulos verticais correndo nas margens (o "trilho" lateral com o nome e a cidade). Layout de spread de revista, tipo e imagem se alternando. O movimento lateral contínuo. **→ Seção 04 (faixa horizontal) e o sistema de margens.** | A serifa condensada do corpo e o vermelho. |
| 2 | **Lando Norris** ✓ — [awwwards](https://www.awwwards.com/sites/lando-norris) · SOTD 17/11/2025, 8.18 | Marca pessoal levada por **uma** cor saturada contra o preto, usada como assinatura e não como decoração. A marca da pessoa (capacete/assinatura) volta várias vezes. **→ Como o amarelo e a Mayluna se comportam.** | O 3D do capacete e o peso de WebGL. |
| 3 | **Half of Eight** ✓ — [awwwards](https://www.awwwards.com/sites/half-of-eight) · SOTD | Informação técnica ancorada nas bordas: régua com marcações numeradas, índice, seletor de idioma no canto (日本語/ENG), dica de uso ("scroll, drag or use keyboard arrows") pequena num canto. **→ Nav nos cantos, índice em DM Mono, PT/EN, dica de teclado.** | A grade infinita de cards e o excesso de molduras. |
| 4 | **Igloo Inc** ✓ — [awwwards](https://www.awwwards.com/sites/igloo-inc) · SOTD | Microtipografia mono nos quatro cantos, manifesto em bloco curto no canto superior direito, e o **material como chão da página** (a neve é o fundo; não há cor chapada). **→ A textura de retícula como fundo das seções (PRD §3).** | A cena 3D e o cinza frio. |
| 5 | **Type Dither** ✓ — [awwwards](https://www.awwwards.com/sites/type-dither) · Nominee mar/2024 · Reed Hollett | A ferramenta *é* a página: painel de controle compacto num canto, export PNG, a palavra surgindo de dentro do campo de pontos. **→ Lab (seções 05 e 06) e a ideia da assinatura emergindo da retícula na capa.** | O lilás e o painel com cara de dat.GUI cru. |
| 6 | **ASTRODITHER** ✓ — [awwwards](https://www.awwwards.com/sites/astrodither) · SOTD + Dev Award mai/2026 · Robert Borghesi | Dither como superfície **viva e reativa** (lá, ao áudio; aqui, ao cursor, ao scroll e ao calor). O rótulo "LAB" assumido como laboratório pessoal. **→ Shader de textura reagindo a `uMouse`/`uScrollVel`.** | O neon multicolorido, o bloom, as partículas. |
| 7 | **Bruno Simon** ✓ — [awwwards](https://www.awwwards.com/sites/bruno-simon-portfolio) · SOTD | Prova jogável: você entende que ele programa porque está brincando, não porque leu. Uma única instrução na tela ("use as setas") e pronto. **→ Lab funcionando na primeira visita, com uma dica só.** | Transformar o site inteiro num jogo. Aqui o jogo fica no Lab; o resto é leitura clara. |
| 8 | **Jesper Landberg** ✓ — [awwwards](https://www.awwwards.com/sites/jesper-landberg-4) · SOTD | Projetos numa faixa contínua com alternância "FEATURED / FULL" no rodapé; rótulos mínimos nos cantos. E, por acaso, o projeto "Casa di Solare": o sol como esfera quieta e brilhante, centro de gravidade da cena. **→ Faixa de vídeos e o sol da capa como objeto calmo, não explosão.** | O carrossel curvo em 3D. |
| 9 | **Justin Jefferson** ✓ — [awwwards](https://www.awwwards.com/sites/justin-jefferson) · Nominee | A **assinatura como marca recorrente**: aparece pequena ao lado do texto, em várias seções, como um carimbo. Tipo gigante fantasma atrás do retrato. **→ Mayluna voltando pequena (fim de seção, contato, favicon) e a foto do Sobre.** | O roxo, os cards arredondados, a densidade. |
| 10 | **Paper Shaders** — [shaders.paper.design](https://shaders.paper.design/dithering) · biblioteca técnica | Um conjunto de shaders com **modos** e parâmetros (dither 2×2/4×4/8×8, halftone, dots, waves) em WebGL2 puro, sem Three.js. **→ Modelo de arquitetura do nosso shader único com `uMode`.** Ver §8, pergunta 2. | Usar a lib pronta: o shader é nosso, porque o efeito é a assinatura. |
| 11 | **Animated Heat Distortion Effects with WebGL** — [Codrops](https://tympanus.net/codrops/2016/05/03/animated-heat-distortion-effects-webgl/) · Lucas Bebber, 2016 · técnica | O deslocamento de coordenadas por mapa de ruído que imita ar quente sobre imagem e texto. **→ A miragem: base do `uHeat`.** | O look de fogo/chama dos demos. |
| 12 | **Signature View** — [awwwards element](https://www.awwwards.com/inspiration/signature-view-belanger-salach-architecture) · Bélanger Salach Architecture · *não vi o vídeo* | Assinatura desenhada com SVG animado. **→ Revelação da Mayluna por máscara, traço na ordem da escrita (PRD §5.01).** | — |

**Da lista antiga (`DESIGN_REFERENCES.md`, v9), o que continua valendo:**
A Love Hate Story (grão presente, seção que "congela" enquanto a próxima
entra) e Residence (o mesmo freeze). O grão agora vive dentro do shader; o
freeze vira candidato pra transição Manifesto → Trabalhos.

## 5. Tipografia

| Papel | Fonte | Regra |
|---|---|---|
| Assinatura | Mayluna (SVG paths) | Só o nome. Grande na capa, pequena como carimbo (fim de seção, contato, favicon). Nunca em título de seção. |
| Display | Overused Grotesk **Black (900)** | Títulos de seção e palavras-chave. Escala extrema: `clamp()` chegando a ~16–20vw no título de abertura de cada seção. Entrelinha 0,85–0,9; tracking levemente negativo. |
| Texto | Overused Grotesk **Book/Roman (~400)** | Corpo 16–18px, medida de 45–65 caracteres, entrelinha 1,5. Pequeno e arejado, contra o display gigante. |
| Rótulos | DM Mono 400/500 | Índices (`01 — Trabalhos`), fichas técnicas, legendas, nav. Caixa-alta, 12–13px, tracking +4–8%. Nunca abaixo de 12px. |

- **Sem meio-termo:** nada de 500–700 na Overused. O contraste é Black contra Book.
- **Hierarquia por escala e peso, não por cor.** A cor não é usada pra separar
  níveis de texto (o amarelo não vira "cor de link").
- Lab é a exceção (PRD §3): cada ferramenta usa a tipografia da própria
  interface.

## 6. Cor

```
--black   #0A0A0A   chão das seções escuras, texto sobre branco e amarelo
--white   #FFFFFF   chão de Trabalhos, texto sobre preto
--yellow  #FFD21F ou #FFC61A   (decidir no mock, lado a lado na capa)
```

**Onde o amarelo pode aparecer:** campo da capa e do contato · tinta da
retícula sobre preto · sol · hover e foco · marcador de índice ativo ·
seleção de texto.
**Onde não pode:** fundo de outras seções · texto sobre branco · glow,
sombra, gradiente.

**Contraste, regra dura:**
- Amarelo sobre preto: OK pra qualquer tamanho (13,7:1 com `#FFD21F`, 12,6:1 com `#FFC61A`).
- Preto sobre amarelo: OK (mesmos números).
- **Amarelo sobre branco: proibido** (1,45:1 e 1,57:1, ilegível). Em Trabalhos, o
  amarelo só aparece como mancha de retícula, nunca como texto ou ícone.
- Texto sobre textura viva: a textura roda em baixo contraste (tinta a ~6–12%
  de diferença do papel) pra o texto passar AA sempre.

**Paleta térmica** (preto → vermelho → laranja → amarelo): só dentro de
efeito, por frações de segundo (o pico de calor de um hover, uma transição).
Nunca em layout.

## 7. Movimento

### O modelo físico
Ar quente sobe. Então:
- **Direção:** a distorção é **vertical, de baixo pra cima** (fbm subindo).
  Nunca horizontal, nunca giratória.
- **Energia vem de fora:** a página parada é quase parada. O calor aumenta
  com o cursor perto e com a velocidade do scroll, e esfria sozinho
  (decaimento de ~1,2s). Nada pulsa em loop por conta própria, exceto o sol.
- **Assentar, não quicar:** tudo termina em ease-out longo (expo/quart). Zero
  bounce, zero elastic, zero overshoot.

### Três verbos, e só três
| Verbo | O que é | Onde |
|---|---|---|
| **Ferver** | Distorção ambiente da retícula, de baixa amplitude, reagindo a cursor e scroll. | Fundo de todas as seções com textura; sol da capa. |
| **Assentar** | O elemento entra estourado (retícula grossa, deslocado pelo calor, alto contraste) e converge pra nitidez: a amplitude do calor vai a zero, a retícula fecha e vira foto ou texto limpo. | Revelação da assinatura, imagens de Trabalhos (dither → foto), títulos de seção "esquentando" no Manifesto. |
| **Correr** | Movimento lateral contínuo, preso ao scroll. | Só a faixa de Vídeos (04). |

Qualquer animação nova precisa ser um desses três. Se não for, não entra.
É isso que impede o "fade up em tudo" (PRD §8).

### Tempos
- Assentar: 900–1400ms, ease-out expo. Disparado uma vez por elemento.
- Hover: entrada 180–250ms, saída 400–600ms (o calor demora mais pra ir
  embora do que pra chegar).
- Nav e controles: 150ms, sem efeito de calor. **A navegação nunca treme.**

### Movimento reduzido
Com `prefers-reduced-motion`: textura vira imagem estática pré-renderizada do
mesmo modo; "assentar" vira corte direto pro estado final; a faixa horizontal
vira lista vertical com scroll normal. Nada se perde de conteúdo.

## 8. Tese de interação

**Você esquenta o que olha.** O cursor e o scroll são fontes de calor. Onde
a atenção do visitante pousa, a retícula ferve; quando a atenção fica, a
imagem assenta e fica nítida. O site responde à presença, e quanto mais você
fica, mais claro tudo fica (o contrário de um efeito que distrai).

**Momento memorável** (o que alguém descreve uma hora depois): a capa
amarela, um sol de retícula fervendo, e o nome dele "escrito" pela luz,
saindo de dentro do calor. Depois, nos cases, cada foto aparecendo como se
estivesse sendo revelada no sol, de pontos grossos até a imagem final.

**O que nunca é radical** (PRD §2, princípio do v11): navegação fixa e
quieta nos cantos, índice legível, contato a um clique de qualquer lugar,
texto sempre parado na hora de ler.

### Pele de cada seção

| # | Seção | Chão | Retícula | Verbo dominante |
|---|---|---|---|---|
| 01 | Capa | amarelo | pontos, tinta preta (versão A) ou chão preto com pontos amarelos (B) | ferver + assentar (assinatura) |
| 02 | Manifesto | preto | linhas diagonais (~60°) em tinta quase preta | assentar (títulos esquentam) |
| 03 | Trabalhos | branco | só nas imagens: dither → foto | assentar |
| 04 | Vídeos IA | preto | nenhuma no fundo; o vídeo é o protagonista | correr |
| 05 | Lab: Halftone | interface da Halftone Tool | a própria ferramenta | — (o visitante manda) |
| 06 | Lab: Dither | pele 1-bit, com botão pra desligar | a própria ferramenta (Tonestamp) | — |
| 07 | Contato | amarelo ou preto (mock) | pontos, como a capa | ferver (o calor volta) |

## 9. Layout

- Grid de 12 colunas, margem lateral de 16px (mobile) a ~48px (1440).
- **Ancorado nas margens:** blocos de texto encostam na margem esquerda ou
  direita; o meio fica vazio de propósito. Centralizar exige motivo.
- Trilhos verticais nas margens (à la Canals) com rótulo DM Mono: número
  da seção, nome, cidade.
- Ritmo: seção densa seguida de seção vazia. Uma escala de espaçamento só,
  com mais espaço acima de um título do que abaixo.
- Breakpoints: 1440 / 1024 / 768 / 480 (herdado).

## 10. Perguntas pro portão

1. **Direção aprovada?** "Retícula ao sol", com os três verbos (ferver,
   assentar, correr) e a tese "você esquenta o que olha".
2. **Three.js ou WebGL puro?** O PRD pede Three.js como tela pros shaders. A
   referência 10 mostra que dá pra fazer os quatro modos em WebGL2 puro: são
   ~150 KB a menos de JS e melhora o LCP da capa. Minha recomendação é WebGL
   puro, mas é decisão de stack, sua.
3. **Mock da Fase 2:** gero imagens das versões A e B da capa e de uma seção
   interna. Qual seção interna você quer ver: **Manifesto** (pele preta com
   retícula de linhas) ou **Trabalhos** (pele branca, dither → foto)?
