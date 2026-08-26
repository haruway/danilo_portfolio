# Design References — Portfólio Danilo Mariani v9

## Inspirações Visuais

### 1. Constantine (https://constantine.framer.ai/)
**O que apreciou:** Slide reveal effect nos textos específicos — quando o texto aparece, ele faz um slide suave revelando de forma muito cinematográfica.
**Aplicar em:** Headlines e copy da página — mais movimento de entrada.

---

### 2. Gatzara Studio (https://gatzara.studio/)
**O que apreciou:** Layout extremamente harmonioso e equilibrado. Toda a composição visual funciona como um sistema coerente.
**Aplicar em:** Espaçamento, grid, proporções entre seções. Revisar alinhamento geral.

---

### 3. By Monday Studio (https://bymondaystudio.com/)
**O que apreciou:** Simplicidade + tecnologia. Design minimalista mas com peso tecnológico.
**Aplicar em:** Tipografia e hierarchy. Menos é mais, mas com impacto.

---

### 4. A Love Hate Story (https://alovehatestory.com/) **[FAVORITO]**
**O que apreciou:**
- **Noise/grain no fundo** — efeito de textura muito presente
- **Scroll com tilt nas letras** — as letras inclinam conforme o scroll
- **Freeze de seção** — cada seção fica "congelada" visualmente enquanto a próxima entra
- **Tipografia impactante** — fontes grandes, bold, com muito caráter
- **Harmonia visual total** — tudo junto cria uma experiência sensorial muito forte

**Aplicar em:** 
- Adicionar noise/grain ao fundo (especialmente hero e seções chave)
- Tilt nas letras do título durante scroll
- Efeito de "freeze" nas transições de seção
- Tipografia mais agressiva e impactante

---

### 5. Kuehl + Deng (https://kuehlunddeng.ch/)
**O que apreciou:** Posicionamento de texto, contraste e visuais — tudo trabalha junto criando legibilidade + impacto.
**Aplicar em:**
- Melhorar contraste (texto x fundo)
- Reposicionar textos para mais impacto visual
- Visuais mais fortes (cores, gradientes)

---

### 6. Residence Co (https://www.residence.co/)
**O que apreciou:** Interação de scroll. Freeze de seção — quando a página muda de seção, a seção anterior fica "parada" até a nova seção a cobrir completamente.
**Aplicar em:** Transições entre seções (cases → identity visual → graphic design, etc.). Efeito de paralaxe + freeze.

---

### 7. Midu Design (https://midu.design/)
**O que apreciou:** Gradiente com noise no fundo de texto. Textura + cor = impacto visual.
**Aplicar em:** Background das headlines, seções principais. Gradiente dinâmico + grain.

---

## 🎯 Sugestões de Melhoria — Danilo v9

### Hero
- [ ] **Muito escura** — aumentar luminosidade/contraste
- [ ] **Layout de texto não está top** — revisar posicionamento e tamanho das letras
- [ ] **Adicionar efeito visual** — gradiente, noise, ou glow

### Navegação / Header
- [ ] **"Sobre mim" e "Contato"** muito apagados (low contrast)
- [ ] Deixar mais visível/destacado

### Tipografia Geral
- [ ] Fontes muito simples, pouco destaque/foco
- [ ] Aumentar weight em headlines principais
- [ ] Adicionar efeitos visuais (glow, shadow, gradient text)
- [ ] Melhorar hierarchy — título principal vs secundário vs body

### Reveal Text (Clip-Path)
- [ ] Alguns pontos `~^` estão sendo cortados/sumindo
- [ ] Revisar padding/overflow dos headlines com reveal

### Visual Geral
- [ ] Cores estão boas MAS faltam **efeitos visuais**
- [ ] Adicionar: gradientes, noise/grain, glows, sombras
- [ ] Criar "tesão visual" — sensação de movimento, profundidade, texture

---

## 📋 Plano de Polimento

### Fase 1: Hero & Header
- Aumentar contraste do hero
- Revisar tipografia (size, weight, color)
- Adicionar gradiente/noise ao fundo
- Deixar nav items mais visíveis

### Fase 2: Tipografia & Effects
- Aumentar font-weight nas headlines
- Adicionar text-shadow / glow em pontos-chave
- Gradient text em elementos principais
- Revisar spacing/padding para melhor hierarchy

### Fase 3: Noise & Texture
- Adicionar background-image (noise/grain) em seções principais
- Gradientes mais dinâmicos
- Efeito de depth com shadows

### Fase 4: Transições & Scroll Effects
- Melhorar efeito freeze de seção (residence.co style)
- Tilt em letras durante scroll (love hate story style)
- Slide reveal suave (constantine style)

### Fase 5: Refinamento
- Revisar contraste geral (accessibility)
- Testar em mobile
- Polir micro-interações

---

## 🎨 Design System Updates Needed

```
[CORES] — Manter paleta existente
--bg: #080706
--cream: #EDE5D4
--gold: #C9923A
--muted: rgba(237,229,212,.45)

[EFEITOS NOVOS A ADICIONAR]
- Noise/grain overlay (opacity ~3-5%)
- Gradientes em hero e headlines
- Text-shadow/glow em pontos-chave
- Melhor contraste (WCAG AA+)
```

---

**Próximo passo:** Claude analisa este documento + inspeciona os sites e propõe implementações concretas.
