// Fase 0 — prova de que o build do Vite sobe e abre na Netlify.
// Nada de interface aqui antes do mock aprovado (PRD v12, Fase 2).

const app = document.querySelector('#app')

app.textContent = `v12 · build ${import.meta.env.MODE} · ${new Date().toISOString().slice(0, 10)}`
