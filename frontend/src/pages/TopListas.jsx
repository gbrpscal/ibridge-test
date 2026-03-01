import { useEffect, useState } from "react";
import { api } from "../services/api";
import HorizontalBar from "../components/HorizontalBar";

export default function TopListas() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await api.topListas();
        setData(r?.data ?? r);
      } catch (e) {
        setError(e?.message || "Erro ao carregar top listas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <HorizontalBar
      title="Top 10 Fechamentos por Lista"
      labels={data.map((x) => x.lista)}
      values={data.map((x) => Number(x.fechamentos))}
    />
  );
}