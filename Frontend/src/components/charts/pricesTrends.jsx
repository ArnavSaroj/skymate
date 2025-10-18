import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  plugins,
  Legend,
  Title,
  scales,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Legend,
  Filler,Tooltip
);

const PricesTrends = ({ labels = [], prices = [] }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Prices",
        data: prices,
        borderColor: "#58508d",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Prices Trends over past 6 months",
      },
    }, tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        label:(ctx)=>`₹${ctx.parsed.y}`
      }
    },
    scales: {
      x: {grid:{display:false},
        ticks: {
          maxTicksLimit: 10,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {grid: { color: "rgba(180,180,180,0.15)" },
        ticks: {
          callback: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        },
      },
      //  grid: { color: "rgba(200,200,200,0.2)" },
    },
  };

  return (
    <div>
      <div className="h-[400px] w-[900px] rounded-xl shadow-md bg-white">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PricesTrends;
