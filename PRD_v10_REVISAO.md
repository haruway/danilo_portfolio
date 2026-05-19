# PRD — Portfólio Danilo Mariani v10 (Revisão pós-feedback)
**Data:** 2026-05-16
**Arquivo-alvo:** `danilo-mariani-v10.html`
**Status:** Em implementação

---

## 🎯 Objetivo

Revisar o v10 com base no feedback do Danilo após primeira build. Foco: alinhar ainda mais com a aesthetic **A Love Hate Story** (noise constante, freeze de seção, tipografia Relaxe em pontos-chave, interatividade criativa).

---

## ✅ Mudanças por Seção

### SEÇÃO 1 — HERO
| Item | Antes (v10 build 1) | Depois |
|---|---|---|
| Fundo | `#080706` (escuro) | **Dourado `#FFBE57`** (igual Figma mockup) |
| Cor do nome DANILO MARIANI | Cream | **Escuro `#080706`** (contraste com dourado) |
| Nav logo "DM — Portfolio" | DM Sans | **Smart Sans** |
| Noise | Sutil (.65 opacity) | **Bem visível e constante (animado)** |
| Interatividade no nome | Tilt 3D global | **Letras individuais reagem ao mouse (magnético + scale + rotação)** |

**Implementação interatividade:**
- Cada letra de "DANILO MARIANI" vira `<span class="hero-letter">`
- No `mousemove`, calcular distância de cada letra ao cursor
- Dentro de raio (200px): translate em direção ao mouse + scale up + rotação suave
- Fora do raio: volta à posição natural

---

### SEÇÃO 2 — QUEM SOU EU
| Item | Antes | Depois |
|---|---|---|
| Título "Quem sou eu" | Eyebrow pequeno em DM Sans + headline "Dirijo marcas que deixam marca" | **"Quem sou eu" GRANDE em Relaxe (mesmo peso visual do hero)** |
| Headline "Dirijo marcas..." | Smart Sans grande | **REMOVIDO** |
| Body text | Texto genérico sobre branding | **Texto reescrito — mais direto, autêntico** |
| Fonte body | DM Sans | **Mantém DM Sans (normal)** |

**Novo texto sugerido:**
> "Há mais de um ano trabalho com IA generativa em campanhas visuais. Direção de arte, prompt engineering e pós-produção num único pipeline.
>
> Foco em criar visuais que não parecem feitos por IA — e em desenhar identidades que duram além do trend do mês."

---

### SEÇÃO 3 — CASES IA
| Item | Antes | Depois |
|---|---|---|
| Estilo dos cards | v10 build 1 (overlay slide) | **Manter v9 (com badge, descrição, chips, tilt 3D)** |
| Tamanho dos cards | `clamp(260px, 28vw, 400px)` | **`clamp(360px, 36vw, 540px)` — maiores** |
| Quantidade de cards | 4 | **5 (adicionar "Em Breve")** |

**Card "Em Breve":**
- Fundo escuro/dourado pattern
- Texto: "Em Construção" / "Em Breve" / "Novo case em produção"
- Sem link (não clicável)

---

### SEÇÃO 4 — BRASÃO BRASIL (Processo)
| Item | Antes | Depois |
|---|---|---|
| Posição do título | Topo, lateral esquerda | **CENTRO da seção (entre os cards superiores e inferiores)** |
| Fonte do título | Smart Sans | **Relaxe** |
| Bloco de comparação | Bloco grande no meio (quebrando o layout) | **Vira card normal na posição "Arte vetorizada final"** |
| Layout final | 2 cards + comparação grande + 2 cards | **2x2 uniforme: Briefing, Timelapse, Comparação, Aplicação** |

**Nova estrutura:**
```
┌──────────────────────────────┐
│  Card 01: Briefing recebido  │
│  Card 02: Timelapse          │
└──────────────────────────────┘
        ┌──────────────┐
        │ BRASÃO       │  ← Título Relaxe centralizado
        │ BRASIL       │
        └──────────────┘
┌──────────────────────────────┐
│  Card 03: Original×Vetorizado│
│  Card 04: Patch têxtil       │
└──────────────────────────────┘
```

---

### SEÇÃO 5 — OLD TOWN BARBER & COFFEE
| Item | Antes | Depois |
|---|---|---|
| Posição do título | Topo lateral | **CENTRO da seção** |
| Fonte do título | Smart Sans | **Relaxe** |
| Brand kit | Placeholder | **Pendente — Danilo vai enviar assets** |

---

### SEÇÃO 6 — TRIPLE (Stack / Experiência / Mais Serviços)
| Item | Antes | Depois |
|---|---|---|
| Layout | 2 colunas (label esquerda + content direita) | **Label PINNED no centro + content gira/aparece** |
| Painéis | Design, Experience, Stack | **Stack, Experiência, Mais Serviços (NOVO)** |

**Painel "Mais Serviços" (NOVO):**
- Heading: "Mais que isso"
- Descrição: "Além de campanhas com IA generativa, também faço:"
- Lista: Vídeo IA · Gráficos Digitais · Direção de Arte · Motion · Identidade Visual
- CTA: Link para Behance

**Layout novo:**
- Center-pinned: label gigante (STACK / EXPER. / MAIS+) em Smart Sans ou Relaxe
- Content abaixo: painel atual do conteúdo
- Dots à direita pra nav manual

---

### SEÇÃO 7 — CONTATO
| Item | Antes | Depois |
|---|---|---|
| Fonte do título | Smart Sans + italic DM Sans | **Relaxe (palavras-chave) + DM Sans italic (contraste)** |

**Exemplo:**
> "**Vamos construir** *algo que ninguém espera*"
> (Relaxe)        (DM Sans italic)

---

## 🎬 EFEITOS GLOBAIS (A Love Story Style)

### 1. Noise Constante e Visível
- Aumentar opacidade do grain (de .65 → 1)
- Adicionar animação de "shift" sutil (film grain alive)
- Usar SVG noise com baseFrequency maior para mais detalhe

### 2. Section Freeze
- Cada seção principal: `position: sticky; top: 0; min-height: 100vh`
- Sections empilham — a próxima sobe sobre a anterior
- Background sólido em cada seção pra cobrir corretamente

### 3. Section Divider
- Barra horizontal fina entre seções (como A Love Story)
- Pode ter texto/marca centralizada
- Aplica antes de cada seção principal

### 4. Reveal mais Cinematográfico
- Manter intersection observer atual mas:
- Adicionar clip-path reveal nos títulos principais
- Slide-up suave nos elementos secundários

---

## 🛠️ Stack Técnico (sem mudanças)
- HTML/CSS/JS puro (arquivo único `danilo-mariani-v10.html`)
- GSAP 3.12.5 + ScrollTrigger via CDN
- Fontes locais: `Relaxe.ttf`, `smart-sans-std-bold.otf`
- DM Sans via Google Fonts

---

## 📋 Checklist de Implementação

- [ ] Hero: bg dourado, name escuro, Smart Sans no nav, noise animado, letras magnéticas
- [ ] Sobre: "Quem sou eu" gigante em Relaxe, novo texto, sem headline secundário
- [ ] Cases: cards maiores + card "Em Breve" no final
- [ ] Brasão: layout 2x2 + título centralizado em Relaxe
- [ ] Old Town: título centralizado em Relaxe
- [ ] Triple: redesign center-pinned + painel "Mais Serviços"
- [ ] Contato: título em Relaxe com fonte contraste
- [ ] Section freeze (sticky) entre seções
- [ ] Section divider com noise
- [ ] Noise animado constante

---

**Status final esperado:** Site com aesthetic forte de A Love Hate Story, mantendo identidade Danilo Mariani — dourado/escuro/cream, tipografia Relaxe em destaque, freeze cinematográfico entre seções.
