# Portfólio Danilo Mariani — v6

## Quem sou eu
Danilo Mariani, Creative AI Director & Graphic Designer, Maringá/PR.
Site pessoal de portfólio — dark, cinematic, editorial.

## Arquivo do projeto
Tudo está em um único arquivo: `danilo-mariani-v6.html`
**Nunca quebrar em múltiplos arquivos. Nunca adicionar frameworks.**

## Deploy
Netlify — basta fazer upload do arquivo único.

## Stack
- HTML/CSS/JS puro
- GSAP 3.12.5 + ScrollTrigger via CDN
- Google Fonts: Bebas Neue, DM Sans (400/500), DM Mono
- Imagens todas em base64 WebP embutidas no HTML
- Sem bundler, sem npm, sem dependências locais

## Design System
```
--bg: #080706        (fundo preto quente)
--cream: #EDE5D4     (texto principal)
--gold: #C9923A      (destaque/acento)
--muted: rgba(237,229,212,.45)
```
Referências visuais: Phenomenon Studio, Nixtio, Constantine (Framer).

## Estrutura do HTML (seções em ordem)
1. `#hero` — nome + tagline + CTA
2. `.marquee-wrapper` — frase em loop horizontal
3. `#cases` — 4 cases de AI (scroll horizontal fixado com GSAP)
4. `#identity-visual` — projetos de identidade visual
5. `#graphic-design` — peças gráficas
6. `#experience` — linha do tempo de experiência
7. `#stack` — ferramentas e tecnologias
8. `#formation` — formação
9. `#contact` — contato
10. `footer`

## Cases de AI (seção #cases)
Scroll horizontal — 4 cards. YouTube IDs:
- kT4SD2l2B6Y
- bxw81_XwQ-w
- zyrbPcLW2kg
- zE9DktyO51Q

## Identity Visual
- **Old Town Barber & Coffee** — paleta: #194B46 (verde), #6B3F1E (caramelo), #F5F0E4 (off-white), #1A1008 (preto quente)

## Experiência
- Syncronos Digital — Mar 2025–atual
- Jorik Têxtil — Jan 2025–atual
- Freelance — 2023–atual

## JavaScript principal
- **Cursor customizado** — `.cursor` e `.cursor-follower`
- **Scramble text** — `scramble(el, finalText, duration, delay)` embaralha letras e resolve uma a uma
- **GSAP horizontal scroll** — `casesPin` fixado, `casesTrack` move horizontalmente, `casesProgressFill` barra de progresso
- **IntersectionObserver** — revela elementos com classe `.reveal` ao entrar na tela

## Regras para edição
- Sempre editar o arquivo único `danilo-mariani-v6.html`
- Imagens novas devem ser convertidas para base64 WebP antes de embutir
- Manter a paleta e tipografia do design system acima
- Não introduzir dependências externas além das já existentes (GSAP CDN + Google Fonts)
