# Portfólio Danilo Mariani — v11

## Quem sou eu
Danilo Mariani — designer gráfico em Maringá/PR.
Aplicação de marca, arte-final e produção de imagem.
Atualmente na Dzigna (agência de branding, Maringá).

**Não usar no site:** título "Creative AI Director" · "construo marcas do zero" ·
"não basta ser, precisa parecer ser" · Motion Design / After Effects ·
nome de ferramenta de IA como credencial.

## Documento de verdade
`docs/PRD_v11_com_copy.md` — contém a **copy final escrita**. Copy nova ou
alterada passa por lá primeiro. PRDs anteriores estão em `_arquivo/`,
só como contexto histórico; não seguir.

## Estrutura de arquivos
```
site/                      ← É ISSO que sobe pro Netlify (arraste a pasta)
  index.html               ← arquivo único: HTML + CSS + JS
  assets/fonts/            Relaxe.ttf, smart-sans-std-bold.otf
  assets/img/              imagens + og + favicons (ver _LEIA-ME.txt)
  _LEIA-ME-DEPLOY.txt
docs/                      documentos de trabalho
  PRD_v11_com_copy.md      copy do site — documento de verdade
  PRD_tonestamp_secao.md   seção Tonestamp (rev. 2)
  AUDITORIA_FASE0.md       auditoria do porte Tonestamp
  DESIGN_REFERENCES.md     referências visuais (ainda válidas)
FOTOS/                     originais em alta — fora do git (.gitignore)
  BRASÃO JORIK/  OLD TOWN (SELECIONAR AS CONDIZENTES)/  SOBRE/
_arquivo/                  não editar
  v9/  v10/  sessoes-antigas/
CLAUDE.md                  fica na raiz — é onde o Claude Code lê
```

**Nunca quebrar o HTML em múltiplos arquivos.**
O arquivo precisa se chamar `index.html` — o Netlify serve a raiz por
esse nome. Foi por isso que a v10 abria em branco no domínio.

## Stack
- HTML/CSS/JS puro, sem bundler, sem npm, sem framework
- GSAP 3.12.5 + ScrollTrigger (cdnjs)
- Lenis 1.3.11 (jsDelivr) — smooth scroll
- DM Sans via Google Fonts; Relaxe e Smart Sans locais em `assets/fonts/`
- Imagens em `assets/img/`, **nunca base64** (estourava contexto)

## Design system
```css
--dark:  #080706   /* fundo escuro */
--gold:  #FFBE57   /* hero, seção processo, acento */
--cream: #EDE5D4   /* texto sobre escuro */
--white: #FFFFFF   /* seções claras */
--ink:   #1A1008   /* texto sobre dourado/branco */
```
Old Town: `#194B46` verde · `#6B3F1E` caramelo · `#F5F0E4` off-white · `#1A1008` preto quente

Tipografia: **Relaxe** display (nome, títulos de seção — usar com restrição) ·
**Smart Sans** utilitário (nav, eyebrows, labels) · **DM Sans** corpo.

⚠️ Os dois `@font-face` de Smart Sans apontam pro mesmo arquivo (400 e 700)
de propósito: o .otf é um "Std Medium", e declarar só `bold` fazia o navegador
não casar em peso normal e cair pra sans-serif genérica.

## Estrutura do site (6 seções)
```
01 #hero       nome + tese. Sem cargo. Letras magnéticas.
02 #faco       O que eu resolvo — 3 blocos
03 #trabalho   CLIENTE (fundo branco) | CONCEITO (fundo escuro)
04 #processo   Como funciona — 4 etapas
05 #sobre      Quem sou + foto
06 #contato    WhatsApp primário
```
A separação Cliente / Conceito é feita pela **troca de fundo** — é
obrigatória e não pode virar só um label.
Todo item de Conceito leva badge `CONCEITO · NÃO COMISSIONADO`.

Fora do site (vai pro LinkedIn): Formação, Stack de IA, timeline de Experiência.

## Princípio visual
**Ousadia no que se vê, clareza no que se usa.**
Radical em tipografia, escala, cor, textura, ritmo.
Nunca radical em navegação, leitura do que ele faz, caminho até o contato.

## Regras de edição
- Editar `site/index.html`. Só ele.
- Nada de texto abaixo de 12px. Nada de `rgba(...,.45)` em texto pequeno.
- Breakpoints: 1440 / 1024 / 768 / 480
- Um mecanismo de scroll só (Lenis). Não reintroduzir hijack de `wheel`
  com `preventDefault` — era o que brigava com ScrollTrigger e sticky.
- Animação de grain só em `transform`.
- `cursor:none` só via classe adicionada por JS (`html.has-cursor`),
  pra não sumir o cursor se o JS falhar.
- Imagens novas: JPG ≤ 400 KB em `assets/img/`.

## Cases — YouTube IDs (estudos de direção, seção CONCEITO)
- kT4SD2l2B6Y — Carnan × Copacabana Palace
- bxw81_XwQ-w — Chevrolet Camaro ZL1
- zyrbPcLW2kg — Arden Spa
- zE9DktyO51Q — Guaraná Antarctica

## Slots de imagem com detecção automática
Todo slot pendente já existe no HTML. Basta salvar o arquivo com o nome
exato em `assets/img/` — o JS detecta e troca sozinho. Não editar HTML.

- `img[data-fallback]` → some se faltar e revela um bloco tipográfico
  desenhado no lugar (case Copa, comparação do brasão)
- `img[data-optional]` → some se faltar; a fileira inteira
  (`[data-optional-row]`) só aparece se pelo menos uma imagem carregar,
  e `[data-optional-host]` ganha `.has-img` pra esconder o stand-in
  tipográfico (logo Old Town)

## Pendências do Danilo
Lista completa e detalhada em `site/assets/img/_LEIA-ME.txt`.

1. `brasao-original.jpg` + `brasao-vetor.jpg` — o slider precisa do **par**;
   mesmo enquadramento, exportados do mesmo artboard
2. `jorik-copa.jpg` — frame do vídeo da Copa (case principal)
3. `otb-logo.png` — a marca Old Town de verdade. Hoje o site mostra o nome
   escrito em Smart Sans, que **não é o desenho dele**
4. `otb-app-1/2/3.jpg` — aplicações Old Town (opcional)
5. E-mail profissional (bloco comentado em `#contato`; **não** reativar o
   endereço antigo com handle de edição de vídeo)
6. Trocar `danilomariani.netlify.app` pelo domínio real nas meta tags
7. Opcional: redesenhar o logo Old Town no Illustrator — se fizer, a copy do
   case muda para "o posicionamento, o desenho da marca e a vetorização são meus"
