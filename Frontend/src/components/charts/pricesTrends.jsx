import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const PricesTrends = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30, 25],
        borderColor: "rgba(89, 187, 155, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      hello world
      <div className="h-64 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PricesTrends;
