const BASE = import.meta.env.VITE_API_URL || "/api";

export const api = {
  resumo: () => fetch(`${BASE}/resumo`).then((r) => r.json()),
  topOperadores: () => fetch(`${BASE}/top-operadores`).then((r) => r.json()),
  topListas: () => fetch(`${BASE}/top-listas`).then((r) => r.json()),
  topCampanhas: () => fetch(`${BASE}/top-campanhas`).then((r) => r.json()),
};