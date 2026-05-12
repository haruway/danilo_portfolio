# Portfólio Danilo Mariani v9 — Enhancements Sessões 1, 2, 3

## Contexto do Projeto
- **Arquivo principal:** `danilo-mariani-v9.html` (arquivo único, nunca quebrar em múltiplos)
- **Stack:** HTML/CSS/JS puro + GSAP 3.12.5 + ScrollTrigger via CDN
- **Design System:** `--bg:#080706`, `--cream:#EDE5D4`, `--gold:#C9923A`, `--muted:rgba(237,229,212,.45)`
- **Seções principais:** Hero → Marquee → Cases (scroll horizontal GSAP) → Identity Visual → Graphic Design → Experience → Stack → Formation → Contact
- **Imagens:** Todas em base64 WebP (problema de contexto — solução: hospedar em `/assets/` no Netlify)

---

## 🎯 OBJETIVO GERAL
Adicionar 3 features + 3 bônus para deixar o site cinematográfico e responsivo ao usuário:

### **FEATURE 1: Smooth Scroll com Inércia** ✅ (SESSÃO 1)
Scroll "flui" — continua deslizando após parar (lerp interpolation).

### **FEATURE 2: Reveal de Texto com Clip-Path** (SESSÃO 2)
Texto sobe de baixo (clip-path animation) em vez de fade-in.

### **FEATURE 3: Efeito Magnético nos Botões** ✅ (SESSÃO 1)
Cursor atraído pelos botões de contato (`.c-btn`, `.wa-btn`).

### **BÔNUS:** Tilt 3D, Marquee Velocity, Parallax Hero (SESSÕES 2-3)

---

## SESSÃO 1: Smooth Scroll + Magnético ✅ COMPLETO

### Mudanças CSS
```css
/* Linha ~20 — MUDAR DE: */
html{scroll-behavior:smooth;}
/* PARA: */
html{scroll-behavior:auto;}
```

### Código JavaScript a Adicionar
Inserir **APÓS o bloco do cursor** (linha ~512) e **ANTES do `// REVEAL`**:

```javascript
// SMOOTH SCROLL (lerp inertia) — desktop only
const isDesktop = window.innerWidth > 768 && !('ontouchstart' in window);
if(isDesktop){
  let sTarget = window.scrollY;
  let sCurrent = window.scrollY;
  const sEase = 0.085;

  window.addEventListener('wheel', e => {
    e.preventDefault();
    sTarget += e.deltaY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    sTarget = Math.max(0, Math.min(sTarget, max));
  }, { passive: false });

  // sync target quando user usa keyboard / anchor links
  const syncScroll = () => { sTarget = window.scrollY; sCurrent = window.scrollY; };
  document.addEventListener('keydown', e => {
    if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End','Space'].includes(e.code)){
      setTimeout(syncScroll, 50);
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => setTimeout(syncScroll, 80)));

  (function smoothLoop(){
    sCurrent += (sTarget - sCurrent) * sEase;
    if(Math.abs(sTarget - sCurrent) > 0.4){
      window.scrollTo(0, sCurrent);
      if(window.ScrollTrigger) ScrollTrigger.update();
    }
    requestAnimationFrame(smoothLoop);
  })();
}

// MAGNETIC BUTTONS
document.querySelectorAll('.c-btn, .wa-btn').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});
```

### O que fazer ao copiar pra v9
1. Remover `scroll-behavior:smooth` do CSS (se houver)
2. Adicionar o bloco de SMOOTH SCROLL
3. Adicionar o bloco de MAGNETIC BUTTONS
4. **Testar:** Scroll com wheel deve ficar "liso", botões devem "puxar" cursor
5. **Alertas:** 
   - Se o scroll horizontal dos cases travar, aumentar a frequência de `ScrollTrigger.update()` (adicionar sem o `if`)
   - Se `.wa-btn` perder o `:hover{scale}`, isso é esperado — o magnético sobrescreve. Pode combinar depois se quiser.

---

## SESSÃO 2: Reveal com Clip-Path + Tilt 3D

### Reveal com Clip-Path
**Estratégia:**
- Classe `.reveal-text` para elementos que devem ter o efeito
- CSS: `clip-path: inset(100% 0 0 0)` (oculto embaixo)
- Quando `.on` é adicionada: animar clip-path para `inset(0 0 0 0)`
- Usar GSAP `.to()` com `clip-path`

**CSS a adicionar:**
```css
.reveal-text {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.reveal-text.on {
  clip-path: inset(0 0 0 0);
}
```

**JS a adicionar** (modificar IntersectionObserver existente):
```javascript
// Após o IntersectionObserver padrão, adicionar GSAP animation:
document.querySelectorAll('.reveal-text').forEach(el => {
  const obs2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        gsap.to(e.target, { duration: 0.8, ease: 'back.out', clip-path: 'inset(0% 0 0 0)' });
        obs2.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  obs2.observe(el);
});
```

**Onde aplicar:** Parágrafos em `#design`, `#experiencia`, `#stack`, `#contato` (adicionar classe `.reveal-text`)

---

### Tilt 3D nos Cases
**Estratégia:**
- Detectar `.cases-card` no mousemove
- Calcular ângulo rotateX/rotateY baseado na posição do mouse
- Animar para rotateX(0) rotateY(0) no mouseleave

**CSS:**
```css
.cases-card {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
}
```

**JS (~20 linhas):**
```javascript
document.querySelectorAll('.cases-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * 15;
    const rotY = (x - 0.5) * -15;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});
```

---

## SESSÃO 3: Bônus (Marquee Velocity + Parallax Hero)

### Marquee Reagindo à Velocidade de Scroll
**Estratégia:**
- Detectar velocidade do scroll (diferença de scrollY entre frames)
- Passar velocidade para a animação do marquee
- Ajustar `.duration` da animação dinamicamente

**JS (~15 linhas):**
```javascript
let lastScrollY = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
  scrollVelocity = Math.abs(window.scrollY - lastScrollY);
  lastScrollY = window.scrollY;
  
  // Ajustar marquee speed (buscar elemento .marquee-text)
  const marquee = document.querySelector('.marquee-text');
  if(marquee) {
    const newDuration = Math.max(20, 40 - scrollVelocity * 0.1);
    marquee.style.animationDuration = newDuration + 's';
  }
});
```

### Parallax Sutil no Hero
**Estratégia:**
- Usar GSAP ScrollTrigger
- Fundo se move mais rápido que texto (velocidade diferente)
- ~10 linhas

**JS:**
```javascript
gsap.to('#hero', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    markers: false
  },
  y: 50,
  ease: 'none'
});

gsap.to('#hero h1', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  },
  y: 20,
  ease: 'none'
});
```

---

## ⚠️ PONTOS CRÍTICOS AO IMPLEMENTAR NA v9

1. **IDs e Classes podem ser diferentes na v9** — cheque se:
   - `.c-btn` existe (botões contato)
   - `.wa-btn` existe (botão WhatsApp)
   - `.cases-card` existe
   - `.marquee-text` existe
   - `#hero`, `#design`, etc.

2. **ScrollTrigger** — v9 pode ter mais animações GSAP que conflitem. Se algo travar:
   - Adicionar `ScrollTrigger.update()` após `window.scrollTo()`
   - Checar se já há `gsap.to()` conflitante nas mesmas seções

3. **Mobile-first** — smooth scroll está desabilitado em mobile (touch devices). Confirme que é comportamento desejado.

4. **Contexto** — Smooth scroll + Magnético pode saturar contexto se não otimizar base64. Solução planejada: hospedar imagens em `/assets/` no Netlify.

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Sessão 1 (Smooth + Magnético) ✅
- [ ] Remover `scroll-behavior:smooth` do CSS
- [ ] Adicionar bloco SMOOTH SCROLL
- [ ] Adicionar bloco MAGNETIC BUTTONS
- [ ] Testar scroll wheel — deve ficar fluido
- [ ] Testar botões — devem "puxar" cursor
- [ ] Conferir scroll horizontal dos cases

### Sessão 2 (Clip-Path + Tilt)
- [ ] Adicionar CSS `.reveal-text`
- [ ] Adicionar JS GSAP clip-path animation
- [ ] Aplicar `.reveal-text` a parágrafos relevantes
- [ ] Adicionar CSS `.cases-card` transform-style
- [ ] Adicionar JS tilt 3D logic
- [ ] Testar hover nos cards

### Sessão 3 (Marquee + Parallax)
- [ ] Detectar velocidade de scroll
- [ ] Ajustar `.marquee-text` animation-duration
- [ ] Implementar parallax no hero com GSAP ScrollTrigger
- [ ] Testar efeito de parallax scrollando

---

## Dúvidas Comuns

**P: E se eu quiser desabilitar smooth scroll no mobile?**
R: Já está desabilitado (verificação `isDesktop`). Mas se quiser em mobile também, remover a condição `if(isDesktop){`.

**P: O botão WhatsApp está estranho com o magnético.**
R: Normal — o `:hover{scale}` do CSS é sobrescrito pelo `transform:translate()` do JS. Pode-se combinar: `transform: scale(1.08) translate(...)`

**P: Meu scroll ficou muito lento/rápido.**
R: Ajuste `sEase` no smooth scroll (linha com `const sEase = 0.085;`):
- 0.06 = mais "flutuante" (demora mais pra parar)
- 0.12 = mais rápido
- 0.085 = default (equilibrado)

---

**Próximo passo:** Cole este documento no novo chat + arquivo v9.html, e execute a Sessão 1 (ou continue de onde parou).
