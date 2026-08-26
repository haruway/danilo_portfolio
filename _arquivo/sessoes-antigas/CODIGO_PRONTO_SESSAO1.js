/**
 * SESSÃO 1: Smooth Scroll + Magnético Buttons
 * Copiar este código inteiro para o <script> do danilo-mariani-v9.html
 *
 * INSERIR APÓS o bloco do cursor (após `document.querySelectorAll('a,button').forEach...`)
 * E ANTES do `// REVEAL`
 *
 * Também: remover ou comentar a linha `html{scroll-behavior:smooth;}` do CSS
 */

// ============================================================================
// SMOOTH SCROLL (lerp inertia) — desktop only
// ============================================================================
const isDesktop = window.innerWidth > 768 && !('ontouchstart' in window);
if(isDesktop){
  let sTarget = window.scrollY;
  let sCurrent = window.scrollY;
  const sEase = 0.085; // ajuste: 0.06=lento, 0.12=rápido

  window.addEventListener('wheel', e => {
    e.preventDefault();
    sTarget += e.deltaY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    sTarget = Math.max(0, Math.min(sTarget, max));
  }, { passive: false });

  // sincronizar target quando user usa keyboard / anchor links
  const syncScroll = () => {
    sTarget = window.scrollY;
    sCurrent = window.scrollY;
  };

  document.addEventListener('keydown', e => {
    if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End','Space'].includes(e.code)){
      setTimeout(syncScroll, 50);
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', () => setTimeout(syncScroll, 80))
  );

  // loop: interpola o scroll atual para o alvo
  (function smoothLoop(){
    sCurrent += (sTarget - sCurrent) * sEase;
    if(Math.abs(sTarget - sCurrent) > 0.4){
      window.scrollTo(0, sCurrent);
      // sincronizar GSAP ScrollTrigger se existir
      if(window.ScrollTrigger) ScrollTrigger.update();
    }
    requestAnimationFrame(smoothLoop);
  })();
}

// ============================================================================
// MAGNETIC BUTTONS — cursor "puxa" o botão
// ============================================================================
document.querySelectorAll('.c-btn, .wa-btn').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    // calcular x, y relativo ao centro do botão
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // aplicar transform com multiplicador 0.28 (suave)
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// ============================================================================
// FIM SESSÃO 1
// ============================================================================
