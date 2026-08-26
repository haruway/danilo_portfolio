# 🎨 CONTEXTO REFORMAT VISUAL — Danilo Mariani v10
**Data:** 2026-05-15  
**Status:** Ready for PRD Build → Opus 4.7  
**Objetivo:** Reformat visual TOTAL do portfólio seguindo linha A Love Hate Story

---

## 📋 VISÃO GERAL DO PROJETO

### Situação Atual
- Versão v9 tinha muitos glows, brilho excessivo, vibe muito "profissional/tecnológica"
- Danilo gostou das alterações (especialmente efeito borda em Graphic Design)
- **MAS:** precisa remover o "brilho" e seguir aesthetic **A Love Hate Story** (simples, criativo, brincalhão)

### Direção Visual
- **Referência Principal:** A Love Hate Story (site italiano de branding)
- **Aesthetic:** Minimalista, criativo, brincalhão
- **Vibe:** Menos tecnológico, mais narrativo
- **Inspiração:** Layout da Disruptive Branding (segunda imagem de referência)

---

## 🎨 DESIGN SYSTEM

### Cores (Intercaladas por Seção)
```
--dourado: #FFBE57
--cinza-escuro: #080706
--branco: #FFFFFF
```

**Padrão de Seções:**
1. HERO → Cinza Escuro (fundo)
2. QUEM SOU EU → Branco (fundo)
3. CASES IA → Dourado (fundo)
4. PROCESSO ILUSTRAÇÃO → Branco (fundo para mesclar com foto)
5. IDENTIDADE VISUAL → Cores da marca (Old Town Barber = Verde + Caramelo)
6-8. STACK/EXPERIENCE/GRAPHIC DESIGN → Cinza Escuro com número scrollando

### Tipografia
- **HERO (DANILO MARIANI):** Relaxe font
- **CASES, EXPERIÊNCIA, DESIGN:** Smart Sans font
- **Body/Descrição:** Smart Sans (ou similar clean sans-serif)

**Nota Importante:** Danilo vai confirmar se as fontes estão em Google Fonts ou se precisa enviar arquivos .ttf/.otf

---

## 📐 ESTRUTURA DE SEÇÕES (8 SEÇÕES TOTAIS)

### SEÇÃO 1: HERO
**Visual Reference:** A Love Hate Story hero
- **Conteúdo:** "DANILO MARIANI" escrito GRANDE
- **Posição:** Nome topo-direito, clicável (nav)
- **Interatividade:** Efeito de movimento/hover no nome pra dar "vida" à página
- **Fundo:** Cinza escuro (#080706)
- **Tipografia:** Relaxe font
- **Objetivo:** Apresentação limpa, impactante, navegável

---

### SEÇÃO 2: QUEM SOU EU
**Visual Reference:** Disruptive Branding (layout com foto + texto ao lado)
- **Conteúdo:**
  - Foto do Danilo em frame (ao centro/esquerda)
  - Texto descritivo: "O que gosto, quem sou, o que faço"
  - Pode ser em 2-3 colunas de texto
- **Fundo:** Branco (#FFFFFF)
- **Layout:** Foto esquerda, texto direita (ou alternado)
- **Objetivo:** Humanizar, contar história pessoal

---

### SEÇÃO 3: CASES IA
**Visual Reference:** Disruptive Branding (grid de fotos/vídeos)
- **Conteúdo:** 4 cases de IA (mantém scroll horizontal)
- **Diferença vs v9:** Layout "brincalhão", menos profissional/tech
- **Fundo:** Dourado (#C9923A)
- **Cards:** Simples, creativos (vs. cards "pesados" atuais)
- **Objetivo:** Mostrar casos de forma leve, atrativa

---

### SEÇÃO 4: PROCESSO DE ILUSTRAÇÃO (Brasão Brasil)
**Visual Reference:** Disruptive Branding (título + fotos/vídeos ao redor)
- **Narrativa Visual:**
  1. Recebe briefing (foto/card)
  2. Timelapse montando a arte (vídeo)
  3. Comparação antes/depois (foto grande no MEIO)
  4. Aplicado/pronto (vídeo final)
  
- **Fundo:** Branco (#FFFFFF) — **IMPORTANTE:** mescla com a foto de comparação
- **Layout:** Foto comparação no centro, vídeos em sequência abaixo
- **Objetivo:** Contar processo do zero até entrega

---

### SEÇÃO 5: IDENTIDADE VISUAL (Old Town Barber & Coffee)
**Visual Reference:** Disruptive Branding (brand kit showcase)
- **Conteúdo:**
  - Logo variations
  - Paleta cores (Verde #194B46, Caramelo #6B3F1E, Off-white #F5F0E4, Preto #1A1008)
  - Aplicações/mockups
  - Same narrative structure como Brasão Brasil
  
- **Fundo:** Cores da Old Town (dinâmico, não monótono)
- **Dinamismo:** "Maior" que seção Brasão (mais fotos, mais aplicações)
- **Objetivo:** Apresentar como brand kit professional

---

### SEÇÃO 6-8: STACK / EXPERIENCE / GRAPHIC DESIGN (UNIFICADO)
**Visual Reference:** A Love Hate Story (número scrollando)
- **Mecanismo:** Número grande (99, 78, XX) que **desce junto com scroll** até chegar embaixo
- **Conteúdo Unificado:**
  - 99 → Graphic Design skills/peças
  - 78 → Experience (timeline, companies)
  - XX → Stack (tools, technologies)
  
- **Fundo:** Cinza escuro (#080706)
- **Tipografia:** Smart Sans
- **Interação:** Número "parallax scrolling" com fade-in de conteúdo
- **Objetivo:** Unificar 3 seções em uma experiência coesa

---

## 🎯 ESPECIFICAÇÕES DETALHADAS

### SEÇÃO 1 - HERO
```
Layout: Full viewport
Fundo: #080706
Nome: Relaxe font, MUITO GRANDE (clamp 8rem-25vw-30rem)
Interação: Hover/tilt effect no nome
Nav: "Sobre", "Cases", "Identidade", "Graphic Design", "Contato" → clicáveis
Objetivo: Clean, bold, navegável
```

### SEÇÃO 2 - QUEM SOU EU
```
Layout: 2 colunas (foto | texto) ou alternado
Fundo: #FFFFFF
Foto: Frame centered, aspecto 1:1 ou 16:9
Texto: 2-3 colunas body text, Smart Sans
Objetivo: Contar história de forma pessoal
```

### SEÇÃO 3 - CASES IA
```
Layout: Scroll horizontal (mantém)
Fundo: #C9923A (dourado)
Cards: Simples, sem excesso de detail
Vídeos: Embedded (YouTube IDs existentes)
Objetivo: Apresentar cases de forma leve
```

### SEÇÃO 4 - PROCESSO ILUSTRAÇÃO
```
Layout: Titulo topo → Fotos/vídeos ao redor (Disruptive style)
Fundo: #FFFFFF (CRÍTICO: mesclar com foto comparação)
Sequência:
  1. Briefing/Recebimento
  2. Timelapse
  3. Comparação (FOTO GRANDE NO MEIO)
  4. Aplicado/Final (vídeo)
Objetivo: Narrative visual clara
```

### SEÇÃO 5 - IDENTIDADE VISUAL OLD TOWN
```
Layout: Tipo Seção 4, mas com mais dinamismo
Fundo: Cores Old Town (animado/gradiente?)
Conteúdo: Logo, cores, aplicações, mockups
Brand Kit Focus: Professionalismo + Criatividade
Objetivo: Showcase de brand kit real
```

### SEÇÃO 6-8 - STACK/EXPERIENCE/GRAPHIC DESIGN
```
Layout: Número scrollando (parallax)
Fundo: #080706
Números:
  - 99 (ou custom) → Graphic Design
  - 78 (ou custom) → Experience
  - XX (ou custom) → Stack
Interação: Número desce com scroll, content fades in
Objetivo: Unificar 3 seções em experiência coesa
```

---

## 🔤 TIPOGRAFIA

### Fontes Necessárias
1. **Relaxe** → HERO (DANILO MARIANI)
   - Status: **Confirmar se está em Google Fonts**
   - Se não: Danilo envia .ttf/.otf
   
2. **Smart Sans** → CASES, EXPERIENCE, DESIGN, BODY
   - Status: **Confirmar se está em Google Fonts**
   - Se não: Danilo envia .ttf/.otf

3. **Fallback:** Se nenhuma funcionar, usar **Bebas Neue** + **DM Sans** (atuais)

---

## 🎬 INTERAÇÕES ESPERADAS

### SEÇÃO 1 - HERO
- [ ] Hover no nome → tilt/scale effect
- [ ] Nav items → underline animation (A Love Story style)
- [ ] Smooth scroll to sections

### SEÇÃO 3 - CASES
- [ ] Horizontal scroll com snap points
- [ ] Card hover → shadow/scale

### SEÇÃO 4-5 - PROCESSO/BRAND KIT
- [ ] Fotos reveal on scroll (fade-in)
- [ ] Vídeos play on viewport

### SEÇÃO 6-8 - STACK/EXP/DESIGN
- [ ] **Número parallax scrolling** (desce com scroll)
- [ ] Content fade-in sequencial
- [ ] Timeline experience (para Experience)

---

## 📸 FOTOS DE REFERÊNCIA

### Imagens Enviadas:
1. **A Love Hate Story (Red)** — Referência visual principal (hero, seções)
2. **Danilo Mariani (Yellow/Gold)** — Seu Figma mockup inicial
3. **Disruptive Branding (White)** — Layout de seções com título + fotos/vídeos
4. **A Love Story 99** — Número scrollando (mecanismo)
5. **A Love Story 78** — Número scrollando (mecanismo)

**Nota:** Carregar as 5 imagens no próximo chat para referência visual Opus

---

## 🚀 PRÓXIMOS PASSOS

### Fase 1: PRD Build (Opus)
- [ ] Criar PRD detalhado com specs de cada seção
- [ ] Confirmar tipografia (Google Fonts vs .ttf/.otf)
- [ ] Design tokens finais

### Fase 2: HTML Rewrite
- [ ] Reescrever HTML com nova estrutura (8 seções)
- [ ] Implementar layout Disruptive Branding style
- [ ] Número parallax scrolling

### Fase 3: CSS/Visual
- [ ] Cores (dourado, cinza, branco) intercaladas
- [ ] Tipografia (Relaxe, Smart Sans)
- [ ] Remove glows/brilho excessivo
- [ ] A Love Story aesthetic

### Fase 4: JS/Interações
- [ ] Scroll animations
- [ ] Parallax número
- [ ] Hover effects
- [ ] Nav clickable

---

## ⚠️ QUESTÕES PENDENTES

1. **Tipografia:** Relaxe e Smart Sans estão em Google Fonts? Ou você envia arquivos?
2. **Old Town Brand Kit:** Você vai mandar imagens/specs depois?
3. **Cores Old Town:** Verde #194B46, Caramelo #6B3F1E, Off-white #F5F0E4, Preto #1A1008 — Confirmado?
4. **Números Seção 6-8:** 99, 78, XX — quais números você quer?
5. **Fotos/Vídeos Processo Ilustração:** Você vai mandar os vídeos do timelapse e comparação?

---

## 📝 REFERÊNCIAS DE INSPIRAÇÃO

- **A Love Hate Story** (alovehate story) — aesthetic, scroll effects, minimalismo
- **Disruptive Branding** (disruptivebranding.it) — layout seções com fotos/vídeos
- **Residence Co** (residence.co) — section freeze, parallax
- **Constantine** (constantine.framer.ai) — smooth reveals

---

## 🎯 DESIGN REFERENCES (Do arquivo original)

### Cores System
```css
--bg: #080706        (fundo preto quente)
--cream: #EDE5D4     (texto principal)
--gold: #C9923A      (destaque/acento)
--muted: rgba(237,229,212,.45)
```

### Old Town Barber & Coffee
```css
--otb-green: #194B46    (verde)
--otb-caramel: #6B3F1E  (caramelo)
--otb-offwhite: #F5F0E4 (off-white)
--otb-dark: #1A1008     (preto quente)
```

### Inspirações Visuais (De DESIGN_REFERENCES.md)
1. Constantine — slide reveal texts
2. Gatzara Studio — layout harmonioso, espaçamento
3. By Monday Studio — simplicidade + tecnologia
4. **A Love Hate Story [FAVORITO]** — noise, tilt, freeze seção, tipografia impactante
5. Kuehl + Deng — contraste, positioning
6. Residence Co — section freeze, parallax
7. Midu Design — gradient + noise

---

## 📁 ARQUIVOS ATUAIS

- `danilo-mariani-v9 (2).html` — versão com melhorias (grain, glows, titles centered, reveal, etc.)
- `DESIGN_REFERENCES.md` — referências visuais (original)
- `CLAUDE.md` — instruções do projeto (manter stack puro HTML/CSS/JS, GSAP CDN)

---

## 🎬 PRÓXIMO CHAT

**Carregar:**
1. Este arquivo (CONTEXTO_REFORMAT_v10.md)
2. As 5 fotos de referência (A Love Story, Danilo Figma, Disruptive, 99, 78)
3. DESIGN_REFERENCES.md (original)

**Pedir ao Opus:**
1. Montar PRD v3 completo com specs detalhadas
2. Confirmar tipografia (Relaxe, Smart Sans)
3. Começar rewrite do HTML com nova estrutura

---

**Status:** ✅ Contexto pronto para próximo chat  
**Próximo Responsável:** Opus 4.7  
**Objetivo:** Reformat visual A Love Story style

