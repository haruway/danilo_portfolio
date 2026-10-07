# PRD v12 — Portfólio Danilo Mariani

**Data:** 07/10/2026
**Destino:** Claude Code (VS Code), dentro do repo `haruway/danilo_portfolio`
**Substitui:** `docs/PRD_v11_com_copy.md` como documento de direção. A copy do v11 continua valendo onde este PRD apontar pra ela.
**Escopo:** reconstrução total do site. Mesmo repositório, código novo do zero.

---

## 0. Como usar este documento (leia primeiro, Claude)

1. Leia este PRD inteiro antes de qualquer código.
2. Trabalhe **por fases** (seção 9). Cada fase termina num **portão**: pare, mostre o resultado ao Danilo e espere aprovação antes da próxima.
3. **Nunca escreva código de interface antes do mock aprovado** (Fase 2). O fluxo obrigatório é:
   referências → direção de arte → hierarquia → **mock em imagem** → tese de interação → código → auditoria → limpeza.
4. Antes de desenhar layout, consulte **Awwwards** (awwwards.com — Sites of the Day, coleções de portfolio, typography, horizontal scroll) e outras referências da web. Registre o que pegou de cada uma.
5. Skills instaladas que devem ser usadas:
   - `impeccable` — direção de arte, anti-padrões de "cara de IA", auditoria de design
   - `genjutsu` — GSAP, shaders, canvas generativo, princípios de motion
   - `superpowers:brainstorming` / `writing-plans` — antes de cada fase de código
   - `web-quality-audit`, `performance`, `accessibility`, `seo` (Addy Osmani) e `web-design-guidelines` (Vercel) — na Fase 9
   - `grill-me` — se surgir decisão aberta, interrogue o Danilo em vez de assumir
6. No fim de cada sessão, escreva `docs/HANDOFF.md` com: o que foi feito, o que falta, decisões tomadas, problemas abertos.
7. Depois de cada feature: prompt de limpeza — procure código morto, lógica duplicada e complexidade que você mesmo adicionou.

---

## 1. Decisão de projeto: mesmo repo, site novo

- **Continua** o repositório `haruway/danilo_portfolio` (histórico, assets, link da Netlify e docs ficam).
- **Recomeça** o código: o v11 é um `index.html` único de 3.000 linhas com outro design, outra tipografia e outro posicionamento. Nada do HTML/CSS/JS dele é reaproveitado.
- **Reaproveita:** imagens em `site/assets/img/` (Jorik, Bendito, filmes, `danilo.jpg`), a copy de Jorik e Bendito do PRD v11, e os módulos do Tonestamp.

### Reorganização (Fase 0)
```
_arquivo/v11/          ← mover a pasta site/ atual pra cá (intacta)
docs/
  PRD_v12.md           ← este arquivo
  PRD_v11_com_copy.md  ← fonte de copy (Jorik, Bendito, filmes)
  DIRECAO.md           ← criado na Fase 1
  HANDOFF.md           ← atualizado a cada sessão
app/                   ← projeto novo (Vite)
netlify.toml
CLAUDE.md              ← reescrever pro v12 (ver seção 10)
```

### Regras herdadas que continuam valendo
- `FOTOS/` fica fora do git. Fontes licenciadas (Tomato Grotesk, P22 Morris Troy) **nunca** sobem.
- Imagens nunca em base64.
- A regra antiga "nunca quebrar o HTML em múltiplos arquivos" **deixa de valer**: o build do Vite gera o `index.html` na raiz do `dist/`, que é o que resolvia o problema da página em branco da v10.

---

## 2. Objetivo e posicionamento

### O que o site é
A primeira impressão de um possível cliente. Não é pra fechar venda — venda fecha na conversa. É pra **encantar**: nível Awwwards, diferente de tudo, e provar que ele é foda no que faz.

### Tese (evolui a do v11)
> Uma marca precisa virar fachada, embalagem, vídeo, post e site.
> Normalmente isso passa por cinco fornecedores — fotógrafo, designer, finalizador, editor e desenvolvedor.
> **Aqui passa por um.**

O "quinto" é novo: **creative coding** — sites e interações. A prova é o próprio site e as duas ferramentas no Lab (halftone e dither).

### Assina
**Danilo Mariani.** Sem cargo no hero.

### Não usar (herdado + atualizado)
- ❌ "Creative AI Director"
- ❌ "Construo marcas do zero"
- ❌ "Não basta ser, precisa parecer ser" (bordão da Dzigna)
- ❌ Vender Motion Design / After Effects como competência
- ❌ Nome de ferramenta de IA como credencial
- ❌ Qualquer elemento da identidade da Dzigna (Tomato Grotesk, `#FFFA00`)
- ❌ Idade e faculdade

---

## 3. Identidade visual

### Conceito: solar
Danilo é solar — loiro, olho verde, gosta de sol. O site traduz isso em **calor**: a miragem que sobe do asfalto quente, a luz estourada do meio-dia. O calor não é tema decorativo, é **comportamento**: as coisas tremem, deformam e se revelam como se estivessem sob sol forte.

### Cor
Proporção aproximada: **40% preto · 40% branco · 20% amarelo**.
```css
--black:  #0A0A0A;
--white:  #FFFFFF;
--yellow: /* decidir no mock: testar #FFD21F e #FFC61A */;
```
- O amarelo é **detalhe** (efeitos, hover, sol, marcadores), não protagonista. A única exceção é a **capa**, que pode ser muito amarela.
- Proibido: `#FFFA00` (Dzigna) e `#FFBE57` (v11).
- Off-white fica pra uma revisão futura. Por enquanto, preto e branco puros.
- Paleta térmica (preto → vermelho → laranja → amarelo) pode aparecer **só dentro de efeitos** (hover, transição), nunca em layout.

### Tipografia
| Papel | Fonte | Uso | Licença |
|---|---|---|---|
| Assinatura | **Mayluna** (Zarma Type) — provisória | Só o nome "Danilo Mariani": capa, contato, favicon | Arquivo atual é **Demo**. Converter em **SVG paths** (o .otf nunca entra no repo). ⚠️ Antes de publicar: comprar licença ou trocar pela assinatura real do Danilo vetorizada |
| Títulos e texto | **Overused Grotesk** (variável, `.woff2`) | Site inteiro. Títulos em Black/ExtraBold, texto em Book/Roman | OFL — self-host, incluir `OFL.txt` |
| Rótulos técnicos | **DM Mono** | Números, índices, rótulos de código, legendas | OFL — self-host |

Fonte da Overused Grotesk: github.com/RandomMaerks/Overused-Grotesk (`fonts/variable/OverusedGrotesk-VF.woff2`).

Regras:
- Pesos extremos: Black contra Book. Evitar o meio-termo, que deixa a fonte com cara genérica.
- Escala extrema: título de capa ocupando a largura; texto corrido pequeno e bem espaçado.
- Exceção: dentro das seções **Lab**, cada ferramenta usa a tipografia da própria interface (ver seção 5).

### Layout
- **Informação ancorada nas margens**, alinhada à esquerda e à direita, com muito vazio no meio. **Nada centralizado por padrão.**
- Referência de ritmo: canals-amsterdam.com — papéis tipográficos fixos, tipografia e imagem se alternando.
- Cada seção tem **pele própria**. Seções uniformes empilhadas são proibidas.

### Sistema de textura (o lugar da cor chapada)
Fundos de seção **não são cor chapada**: são textura de halftone viva.

**Referência principal:** halftone de linha — linhas diagonais paralelas que engrossam e afinam conforme a luz, levemente tortas, com grão. Exemplo enviado pelo Danilo: fundo verde-petróleo com linhas diagonais claras e um objeto renderizado no mesmo padrão de linhas.

Implementação: **um único shader** (WebGL) com modos:
| Modo | Visual |
|---|---|
| `lines` | halftone de linha (diagonal ~60°), linhas tortas |
| `dots` | halftone de pontos |
| `waves` | linhas onduladas |
| `dither` | 1-bit ordenado/Bayer |

Uniforms mínimas: `uMode`, `uTime`, `uHeat`, `uMouse`, `uScrollVel`, `uInk`, `uPaper`, `uSource` (opcional: imagem ou vídeo como fonte de luminância; sem fonte, usar ruído fbm suave).

**Calor:** deslocamento vertical das coordenadas com ruído fbm subindo, como miragem. Mais forte perto do cursor e quando o scroll acelera; quase parado quando a página está parada.

Regras:
- A textura é sutil, como papel. Nunca disputa com o conteúdo. Contraste de texto sobre textura passa em WCAG AA.
- **Vetor:** o modo `lines` tem que exportar SVG (linha com espessura variável) pra uso fora do site — identidade, apresentação, redes. Reaproveitar a lógica de export SVG do Tonestamp.
- **Fallback:** com `prefers-reduced-motion` ou em mobile fraco, usar imagem estática pré-renderizada do mesmo modo.
- Um único canvas WebGL compartilhado (ou um por seção visível, pausado fora da tela com IntersectionObserver). Nunca um loop rodando em seção invisível.

---

## 4. Arquitetura (ordem aprovada)

| # | Seção | Pele | Conteúdo | Interação principal |
|---|---|---|---|---|
| 01 | **Capa** | Amarelo dominante | Nome em Mayluna + sol em halftone | Sol fervendo com calor que segue o cursor; assinatura se revela |
| 02 | **Manifesto** | Preto, textura `lines` | Quem é, o que faz, tese 5 → 1, que problema resolve | Texto que "esquenta" ao entrar na tela |
| 03 | **Trabalhos** | Branco, editorial | Jorik e Bendito, aprofundados | Scroll vertical editorial, imagens que se revelam via dither → foto |
| 04 | **Vídeos IA** | Preto | Filmes feitos com IA | **Scroll horizontal**, tipografia e vídeo intercalados (como Canals), vídeo toca no hover |
| 05 | **Lab: Halftone** | Interface do Tonestamp | Tonestamp jogável | Upload de imagem / webcam opt-in / presets / export |
| 06 | **Lab: Dither** | Interface 1-bit da dither tool | Dither tool jogável | Idem |
| 07 | **Contato** | Amarelo ou preto (decidir no mock) | Nome de novo, contatos | Calor volta, fechando o ciclo da capa |

Navegação: fixa, mínima, nos cantos. Índice numerado em DM Mono (`01 — Trabalhos`). Seletor de idioma PT/EN no canto. Nunca radical: navegar e achar o contato precisa ser óbvio em 5 segundos.

Fica previsto (não visível agora):
- **Dzigna:** case desligado por flag nos dados (`visible: false`), organizado por superfície quando for liberado.
- **App comercial:** espaço reservado no Contato para um link futuro.

---

## 5. Seções em detalhe

### 01 — Capa
- **Nome:** "Danilo Mariani" em Mayluna, convertido em SVG paths. Grande, ancorado numa margem, não centralizado.
- **Revelação:** a Mayluna é preenchida (não é traço), então o "desenhar" é por máscara: um traço grosso animado na ordem da escrita revela as letras, com leve distorção de calor no fim.
- **Sol:** gerado ao vivo no shader (gradiente radial → halftone de pontos ou de linhas concêntricas). Ferve: calor sobe dele. O cursor puxa o calor.
- Duas versões pro mock: **A)** campo amarelo, sol em halftone preto. **B)** campo preto, sol em halftone amarelo. O Danilo escolhe.
- **Opcional:** vídeo base gerado no Veo 3.1 (sol, asfalto tremendo) usado como `uSource` do shader, que aplica o halftone ao vivo. Ninguém vê o vídeo cru, só a versão processada.
- Mobile: versão reduzida do shader ou loop de vídeo pré-renderizado.

### 02 — Manifesto (copy rascunho — revisar com o Danilo)
> **O trabalho de cinco passa por um.**
> Uma marca precisa virar fachada, embalagem, vídeo, post e site. Normalmente isso passa por cinco fornecedores — fotógrafo, designer, finalizador, editor e desenvolvedor. Aqui passa por um.

**O que eu resolvo** (3 blocos — base no "O que eu faço" do v11, mais o quinto):
1. **Aplicação de marca** — copy do v11, Bloco 1.
2. **Imagem e vídeo** — copy do v11, Bloco 2.
3. **Design, código e interação** — *rascunho:* "Sites e interações que não parecem template. Escrevo as ferramentas que uso — as duas aqui embaixo rodam no seu navegador."

**Quem sou** (curto, com foto real `danilo.jpg` renderizada em halftone que reage ao cursor): copy do v11, §07, ajustada pra incluir creative coding. Linha discreta: *"Atualmente na Dzigna, agência de branding em Maringá."*

### 03 — Trabalhos
Apenas **dois cases**, aprofundados — processo inteiro, não só a peça final.

**Jorik Têxtil — Copa do Mundo** (abre)
- Copy: PRD v11, §03 "Jorik Têxtil — Campanha Copa do Mundo" e "Brasão Brasil".
- Peça central: comparação **original × vetorizado** do brasão (`brasao-fechado.jpg`, `brasao-vetor.jpg`) — slider ou revelação por dither.
- Processo em etapas → aplicação no patch → filme (`jorik-v-filme`, `jorik-v-produto`, `jorik-v-timelapse`, `jorik-copa`).

**Bendito × Antarctica**
- Copy: PRD v11, §04 inteiro (abertura, origem, posicionamento, marca, naipes, colab, corte).
- Assets: `bendito-*.jpg/png`. Grid das cartas.
- ⚠️ Rodapé **obrigatório**: projeto acadêmico, marca fictícia, colab hipotética, sem relação comercial com a Antarctica.
- ⚠️ `carta-33.png` é linha de faca, não carta. Caixas `01` e `03` têm faca; usar a `02`.

**Fora do site:** Old Town (removido), Bianca Botti, Gelaboca e Hawk Code.

### 04 — Vídeos IA (scroll horizontal)
- Conteúdo: os 4 filmes (Carnan/Copacabana, Camaro, Arden Spa, Guaraná) + outros que o Danilo enviar.
- Badge em todos: `ESTUDO · PRODUZIDO COM IA`. Copy no formato do v11 ("Estudo de direção…"). ❌ Nunca "Campanha publicitária visando…".
- Layout: faixa horizontal fixada (GSAP ScrollTrigger pin) alternando bloco tipográfico grande (título do filme, DM Mono com ficha técnica) e vídeo.
- Vídeo: **arquivos próprios** (MP4 H.264 + WebM, ≤ 4 MB cada, com poster), `muted playsinline`, tocam no hover/quando centralizados. Link "ver completo" pro YouTube. Não embedar iframe do YouTube na faixa (pesado e feio).
- Mobile: vira carrossel com swipe ou lista vertical.

> **Correção (07/10/2026, Danilo, Fase 0):** os nomes das duas seções do Lab estavam invertidos.
> **Lab: Dither = Tonestamp** (`github.com/haruway/tonestamp`).
> **Lab: Halftone = Halftone Tool** (`github.com/haruway/halftonetool`, motor de retícula de impressão em JS com harness de navegador).
> O texto abaixo ainda está na versão antiga. Qual interface (a do Tonestamp, com Bricolage/Plex, ou a 1-bit) vai em qual seção ainda precisa ser confirmado.

### 05 — Lab: Halftone (Tonestamp)
- Fonte: github.com/haruway/tonestamp. Reutilizar `renderer.js`, `shapes.js`, `palette.js` e `export.js` **sem reescrever**. Consultar `docs/PRD_tonestamp_secao.md` (porte, auditoria) onde ainda servir.
- **A seção assume a interface do próprio Tonestamp** — inclusive a tipografia dele (Bricolage Grotesque, IBM Plex Mono). É a exceção deliberada: a seção parece "outro software" rodando dentro do site.
- Imagem padrão já carregada (ex.: foto de um case) pra funcionar sem upload. Webcam só com opt-in.
- Crédito visível: inspirado no trabalho de **Anton Burmistrov**.
- Corrigir o README do Tonestamp no repo de origem (exporta MP4, não WebM; SVG funciona com todos os presets).

### 06 — Lab: Dither
- Fonte: dither tool do Danilo (HTML único, modos de cor, shapes SVG). ⚠️ **Localização do repo pendente** — perguntar ao Danilo.
- A seção assume uma interface 1-bit: preto e branco puro, tipografia bitmap/mono, cursor pixelado.
- Mesmo comportamento: imagem padrão, upload, export.
- Crédito: engenharia reversa a partir do trabalho de **Anton Burmistrov**.

### 07 — Contato
- Título e sub: v11, §08 ("Vamos conversar…"). Sem preço.
- CTA primário WhatsApp; secundários E-mail, LinkedIn, Behance.
- ⚠️ O e-mail antigo com handle de edição de vídeo **não pode** aparecer. E-mail profissional pendente.
- Nome em Mayluna de novo, com o calor da capa voltando.
- Espaço reservado (oculto) pro link do app comercial futuro.

---

## 6. Idiomas
- **PT principal, EN secundário**, com botão de troca.
- Estrutura preparada pra inverter (EN principal) no futuro sem refatorar: textos em `app/src/i18n/pt.json` e `en.json`, idioma padrão definido em **uma** constante.
- Persistir a escolha (localStorage com try/catch) e respeitar `?lang=en`.
- `<html lang>` e meta tags trocam junto.
- Nesta versão, o EN pode sair como tradução de rascunho marcada pra revisão.

---

## 7. Stack técnica
- **Vite** + JavaScript puro (sem framework de UI).
- **GSAP + ScrollTrigger** (animação, pin do horizontal) e **Lenis** (smooth scroll). Um único sistema de scroll — o v10 tinha três competindo.
- **Three.js** só como "tela" pros shaders (plano fullscreen + ShaderMaterial). Nada de cena 3D pesada.
- Conteúdo em dados (`app/src/data/cases.json`, `videos.json`), com flag `visible`.
- Fontes self-hosted em `app/public/fonts/`, com `font-display: swap` e preload da Overused.
- Grain/textura **dentro do shader**, não como overlay com z-index 9000 (bug do v10).

### Deploy
- Netlify conectada ao GitHub, deploy automático do `main`.
- `netlify.toml`: `base = "app"`, `command = "npm run build"`, `publish = "dist"`.
- Sem domínio próprio por enquanto (`danilomariani.netlify.app`).
- Branch de trabalho: `v12`. Merge no `main` só quando estiver pronto pra substituir o v11.

### Qualidade (critério de pronto)
- Lighthouse ≥ 90 em performance, acessibilidade, best practices e SEO, no desktop.
- LCP < 2,5 s em 4G. Nenhum vídeo nem shader bloqueia o primeiro paint da capa.
- `prefers-reduced-motion` respeitado em tudo.
- Teclado navega o site inteiro; foco visível.
- Checklist "não parecer vibecoded": título e meta description únicos, Open Graph com imagem (o v11 gerava preview em branco), favicon próprio, 404 personalizada, `sitemap.xml`, `robots.txt`, `llms.txt`, alt text em todas as imagens, zero erro no console, sem source maps em produção, nada de "Vite" na aba ou texto placeholder.
- `npm audit` sem vulnerabilidade alta.

---

## 8. Anti-padrões (reprovam a entrega)
- Tudo centralizado; cards dentro de cards; seções idênticas empilhadas.
- Texto em gradiente; gradiente roxo-azul; borda lateral colorida em card; ícone em quadradinho arredondado em cima de cada título.
- Animação de "fade up" genérica em todo elemento.
- Inter, Roboto ou qualquer fonte que não esteja na seção 3.
- Amarelo usado como cor de fundo fora da capa e do contato.
- Efeito sem fallback de movimento reduzido.

---

## 9. Fases (com portões)

| Fase | Entrega | Portão |
|---|---|---|
| **0 · Setup** | Branch `v12`; mover `site/` → `_arquivo/v11/`; scaffold Vite em `app/`; `netlify.toml`; reescrever `CLAUDE.md`; rodar `/impeccable init` | Danilo confirma que o deploy de preview abre |
| **1 · Referências e direção** | Pesquisa no Awwwards e afins (mín. 10 refs, com o que pegar de cada); `docs/DIRECAO.md` com emoção, arquétipo, tipografia, cor, movimento e tese de interação | Danilo aprova a direção |
| **2 · Mock** | Imagem do layout da **capa** (versões A e B) e de **uma seção interna** (Manifesto ou Trabalhos), com hierarquia definida | **Danilo aprova o mock. Nenhum código de UI antes disso.** |
| **3 · Fundação** | Tokens, fontes, grid, Lenis + ScrollTrigger, i18n, shader de textura com os 4 modos + fallback | Página de teste mostrando os modos |
| **4 · Capa** | Sol, calor, revelação da assinatura | Danilo aprova |
| **5 · Manifesto + Trabalhos** | Copy e cases Jorik e Bendito completos | Danilo aprova |
| **6 · Vídeos** | Faixa horizontal com os filmes | Danilo aprova |
| **7 · Lab** | Tonestamp e dither tool portados, com interface própria | Danilo aprova |
| **8 · Contato + acabamento** | Contato, nav, 404, meta/OG, EN rascunho | Danilo aprova |
| **9 · Auditoria** | Rodar skills de qualidade, corrigir, limpeza, `HANDOFF.md` final | Merge no `main` |

---

## 10. CLAUDE.md novo (resumo do que deve conter)
- Quem é o Danilo e o que o site é (seção 2, curto).
- Estrutura de pastas do v12 e onde fica cada coisa.
- Tokens, fontes e regras de licença (seção 3).
- Lista "não usar" e anti-padrões (seções 2 e 8).
- Fluxo obrigatório: referência → mock aprovado → código.
- Comandos: `npm run dev`, `npm run build`, deploy.
- Ponteiro: "documento de verdade = `docs/PRD_v12.md`".

---

## 11. Pendências do Danilo
| # | Item | Bloqueia |
|---|---|---|
| 1 | Licença da Mayluna **ou** assinatura própria vetorizada | Publicação (não bloqueia o desenvolvimento) |
| 2 | Arquivos originais dos filmes em MP4 | Fase 6 |
| 3 | Onde está o repositório/arquivo da dither tool | Fase 7 |
| 4 | Confirmar se `danilo.jpg` serve ou mandar foto nova | Fase 5 |
| 5 | E-mail profissional | Fase 8 |
| 6 | Escolha do amarelo e da versão da capa (A/B) | Fase 2 |
| 7 | Opcional: vídeo base do sol/asfalto no Veo 3.1 | Fase 4 |
