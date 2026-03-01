import { useMemo } from "react";
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

export default function HorizontalBar({ title, labels, values }) {
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: "#0dbb72",
          borderRadius: 6,
        },
      ],
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
          color: "#0dbb72",
          font: {
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: "#9aa0a6",
          },
          grid: {
            color: "rgba(255,255,255,0.05)",
          },
        },
        y: {
          ticks: {
            color: "#e6e8ee",
          },
          grid: {
            display: false,
          },
        },
      },
    }),
    [],
  );

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
