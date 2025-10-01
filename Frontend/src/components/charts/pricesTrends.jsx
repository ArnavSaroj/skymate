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
} from "chart.js";


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement,Title,Legend);




const PricesTrends = ({ labels = [], prices = [] }) => {
  

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: prices,
        borderColor: "rgba(0,0,0)",
        borderWidth: 2,
        fill: true,
        tension: 0,
        
      },
    ],
  };
 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      display: false,
      position: "top"
    },
    title: {
      display:true,
      text: "Prices Trends",
    }
  }
};

  return (
    <div>
      <div className="h-[400px] w-[600px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PricesTrends;
