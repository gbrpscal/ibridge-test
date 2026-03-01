import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import ColumnFilter from "../components/ColumnFilter";

export default function Resumo() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const [campanhasSel, setCampanhasSel] = useState(new Set());
  const [listasSel, setListasSel] = useState(new Set());

  useEffect(() => {
    (async () => {
      try {
        const r = await api.resumo();
        setRows(r?.data ?? r);
      } catch (e) {
        setError(e?.message || "Erro ao carregar resumo");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const campanhas = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.campanha))).sort();
  }, [rows]);

  const listas = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.lista))).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const campanhaOk =
        campanhasSel.size === 0 || campanhasSel.has(r.campanha);
      const listaOk = listasSel.size === 0 || listasSel.has(r.lista);
      return campanhaOk && listaOk;
    });
  }, [rows, campanhasSel, listasSel]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "baseline",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Resumo por Lista</h2>

        {(campanhasSel.size > 0 || listasSel.size > 0) && (
          <button
            type="button"
            className="smallBtn"
            onClick={() => {
              setCampanhasSel(new Set());
              setListasSel(new Set());
            }}
          >
            Limpar filtros
          </button>
        )}
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>
                <span className="thRow">
                  <span>Campanha</span>
                  <ColumnFilter
                    title="Campanha"
                    values={campanhas}
                    selected={campanhasSel}
                    onChange={setCampanhasSel}
                  />
                </span>
              </th>

              <th>
                <span className="thRow">
                  <span>Lista</span>
                  <ColumnFilter
                    title="Lista"
                    values={listas}
                    selected={listasSel}
                    onChange={setListasSel}
                  />
                </span>
              </th>

              <th className="num">Chamadas</th>
              <th className="num">Sem Contato</th>
              <th className="num">Contato</th>
              <th className="num">Abordagem</th>
              <th className="num">Fechamento</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, i) => (
              <tr key={i}>
                <td>{row.campanha}</td>
                <td>{row.lista}</td>
                <td className="num">{row.chamadas}</td>
                <td className="num">{row.sem_contato}</td>
                <td className="num">{row.contato}</td>
                <td className="num">{row.abordagem}</td>
                <td className="num">{row.fechamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 10, color: "var(--muted)" }}>
        Mostrando <strong>{filtered.length}</strong> de{" "}
        <strong>{rows.length}</strong> linhas
      </p>
    </div>
  );
}
