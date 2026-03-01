import { useEffect, useState } from "react";
import { api } from "../services/api";
import HorizontalBar from "../components/HorizontalBar";

export default function TopCampanhas() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await api.topCampanhas();
        setData(r?.data ?? r);
      } catch (e) {
        setError(e?.message || "Erro ao carregar top campanhas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <HorizontalBar
      title="Top 10 Fechamentos por Campanha"
      labels={data.map((x) => x.campanha)}
      values={data.map((x) => Number(x.fechamentos))}
    />
  );
}
