const API_BASE = "http://localhost:8000/api";

async function getJson(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Erro ${res.status} em ${path}`);
  return res.json();
}

export const api = {
  resumo: () => getJson("/resumo"),
  topOperadores: () => getJson("/top-operadores"),
  topListas: () => getJson("/top-listas"),
  topCampanhas: () => getJson("/top-campanhas"),
};