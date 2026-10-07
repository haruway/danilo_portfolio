# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + JavaScript puro (sem framework de UI), GSAP + ScrollTrigger, Lenis, Three.js só como tela pros shaders. Deploy na Netlify a partir de `app/` (`netlify.toml`). Decidido pelo Danilo no PRD v12 §7.

## Users

Dois públicos com peso igual:

- **Agências e estúdios** — diretores de criação e de arte procurando parceiro ou freela que segure a produção de marca, imagem e site.
- **Marcas diretas** — donos e gestores de marketing de empresas, em Maringá e no Brasil, que contratariam o Danilo direto.

Os dois chegam por indicação, link no LinkedIn/Behance ou WhatsApp, e decidem em poucos segundos se vale conversar. O site é a primeira impressão; a venda fecha na conversa, não aqui.

## Product Purpose

Portfólio pessoal de Danilo Mariani, designer em Maringá/PR. Existe pra **encantar** e provar habilidade, não pra vender. O site em si é uma das provas.

Sucesso, nesta versão:
- o visitante **brinca no Lab** e entende que o Danilo também escreve as ferramentas que usa;
- o site ganha **reconhecimento público** (Awwwards, CSSDA e afins) como prova.

O caminho até o contato (WhatsApp primeiro) precisa ser óbvio mesmo assim: navegar e achar o contato em 5 segundos.

## Positioning

Uma marca precisa virar fachada, embalagem, vídeo, post e site. Normalmente isso passa por cinco fornecedores: fotógrafo, designer, finalizador, editor e desenvolvedor. **Aqui passa por um.** O quinto (creative coding: sites e interações) é provado pelo próprio site e pelas duas ferramentas autorais rodando no navegador.

## Operating Context

- Visitante abre o link no desktop (avaliação de agência) ou no celular (link compartilhado no WhatsApp/LinkedIn). O preview do link (Open Graph) faz parte da primeira impressão.
- PT é o idioma principal e EN o secundário, com troca no canto. A estrutura precisa permitir inverter (EN principal) sem refatorar.
- O Danilo trabalha atualmente na Dzigna (agência de branding em Maringá) e cita isso numa linha discreta.

## Capabilities and Constraints

- Sete seções: Capa, Manifesto, Trabalhos, Vídeos IA, Lab: Halftone, Lab: Dither, Contato (PRD v12 §4).
- **Lab: Dither** = Tonestamp (`github.com/haruway/tonestamp`): halftone tonal que carimba 7 shapes SVG por faixa de luminância, com export SVG/PNG/vídeo.
- **Lab: Halftone** = Halftone Tool (`github.com/haruway/halftonetool`): motor de retícula de impressão (12 padrões, tintas customizadas, envelhecimento, separação de chapas), JS puro com harness de navegador e worker.
- As duas ferramentas são do Danilo e rodam inteiras no navegador: imagem padrão já carregada, upload, webcam só com opt-in, export.
- Case da Dzigna previsto mas desligado (`visible: false`). Link de app comercial futuro reservado e oculto no Contato.
- Sem domínio próprio por enquanto (`danilomariani.netlify.app`).
- Qualidade mínima: Lighthouse ≥ 90 nas quatro categorias (desktop), LCP < 2,5 s em 4G, `prefers-reduced-motion` em tudo, teclado navega tudo.
- **Em aberto:** e-mail profissional; licença da Mayluna ou assinatura própria vetorizada; arquivos MP4 dos filmes; se `danilo.jpg` serve.

## Brand Commitments

- Assina "Danilo Mariani", sem cargo na capa.
- Nunca usar: "Creative AI Director", "construo marcas do zero", "não basta ser, precisa parecer ser" (bordão da Dzigna), Motion Design / After Effects como competência, nome de ferramenta de IA como credencial, idade, faculdade, qualquer elemento da identidade da Dzigna.
- Fontes licenciadas (Tomato Grotesk, P22 Morris Troy, o .otf da Mayluna Demo) nunca entram no repositório.
- Trabalho conceitual nunca se passa por comissionado: a colab Bendito × Antarctica é fictícia e leva rodapé obrigatório; filmes de IA levam o badge `ESTUDO · PRODUZIDO COM IA`.
- O e-mail antigo com handle de edição de vídeo não pode aparecer.
- Lab credita Anton Burmistrov como inspiração.

## Evidence on Hand

- **Jorik Têxtil — Copa do Mundo**: brasão original × vetorizado, aplicação no patch, filmes (`jorik-v-filme`, `jorik-v-produto`, `jorik-v-timelapse`, `jorik-copa`). Copy em `docs/PRD_v11_com_copy.md` §03.
- **Bendito × Antarctica**: marca autoral de baralho + colab fictícia, assets `bendito-*`. Copy em `docs/PRD_v11_com_copy.md` §04.
- **Quatro filmes com IA** (estudos de direção): Carnan × Copacabana Palace, Chevrolet Camaro ZL1, Arden Spa, Guaraná Antarctica. Hoje só no YouTube; os arquivos próprios estão pendentes.
- Foto `danilo.jpg`.
- Assets do v11 em `_arquivo/v11/assets/img/`; originais em `FOTOS/` (fora do git).
- **Não existem e não podem ser inventados:** depoimentos, lista de clientes, números de resultado, prêmios, preço.

## Product Principles

1. **O site é a prova.** Toda alegação ("aqui passa por um") tem que ser demonstrada na própria página, não só dita.
2. **Profundidade em vez de volume.** Dois cases contados por inteiro, com processo, valem mais que uma grade de peças.
3. **Honestidade sobre a origem.** Conceito, estudo e comissionado nunca se confundem.
4. **Ousadia no que se vê, clareza no que se usa.** Navegação, leitura do que ele faz e o caminho até o contato nunca são radicais.
5. **Jogável.** As ferramentas do Lab funcionam de verdade, sem upload, na primeira visita.

## Accessibility & Inclusion

WCAG AA, inclusive para texto sobre textura animada. Nada de texto abaixo de 12px. `prefers-reduced-motion` com fallback estático em todo efeito. Navegação completa por teclado com foco visível. Webcam só com opt-in explícito.
