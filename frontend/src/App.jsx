import { useEffect, useMemo, useState } from "react";
import { api } from "./services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels,
);

function HorizontalBar({ title, labels, values }) {
  const data = useMemo(
    () => ({
      labels,
      datasets: [{ label: title, data: values }],
    }),
    [labels, values, title],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        datalabels: {
          anchor: "end",
          align: "end",
          formatter: (v) => v,
        },
        tooltip: { enabled: true },
      },
      scales: {
        x: { beginAtZero: true, ticks: { precision: 0 } },
        y: { grid: { display: false } },
      },
    }),
    [],
  );

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [resumo, setResumo] = useState([]);
  const [topOperadores, setTopOperadores] = useState([]);
  const [topListas, setTopListas] = useState([]);
  const [topCampanhas, setTopCampanhas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [r, o, l, c] = await Promise.all([
          api.resumo(),
          api.topOperadores(),
          api.topListas(),
          api.topCampanhas(),
        ]);

        setResumo(r?.data ?? r);
        setTopOperadores(o?.data ?? o);
        setTopListas(l?.data ?? l);
        setTopCampanhas(c?.data ?? c);
      } catch (e) {
        setError(e?.message || "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const operadoresLabels = topOperadores.map((x) => x.operador);
  const operadoresValues = topOperadores.map((x) => Number(x.fechamentos));

  const listasLabels = topListas.map((x) => x.lista);
  const listasValues = topListas.map((x) => Number(x.fechamentos));

  const campanhasLabels = topCampanhas.map((x) => x.campanha);
  const campanhasValues = topCampanhas.map((x) => Number(x.fechamentos));

  return (
    <div className="page">
      <div className="header">
        <div>
          <h1 className="title">Dashboard iBridge</h1>
          <p className="subtitle">Resumo e rankings de fechamentos</p>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Resumo por Lista</h2>

            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>Campanha</th>
                    <th>Lista</th>
                    <th className="num">Chamadas</th>
                    <th className="num">Sem Contato</th>
                    <th className="num">Contato</th>
                    <th className="num">Abordagem</th>
                    <th className="num">Fechamento</th>
                  </tr>
                </thead>
                <tbody>
                  {resumo.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.campanha}</td>
                      <td>{row.lista}</td>
                      <td className="num">{Number(row.chamadas)}</td>
                      <td className="num">{Number(row.sem_contato)}</td>
                      <td className="num">{Number(row.contato)}</td>
                      <td className="num">{Number(row.abordagem)}</td>
                      <td className="num">{Number(row.fechamento)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid">
            <div className="span2">
              <HorizontalBar
                title="Top 10 Fechamentos por Operador"
                labels={operadoresLabels}
                values={operadoresValues}
              />
            </div>

            <HorizontalBar
              title="Top 10 Fechamentos por Lista"
              labels={listasLabels}
              values={listasValues}
            />

            <HorizontalBar
              title="Top 10 Fechamentos por Campanha"
              labels={campanhasLabels}
              values={campanhasValues}
            />
          </div>
        </>
      )}
    </div>
  );
}
