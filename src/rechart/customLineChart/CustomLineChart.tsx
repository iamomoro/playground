import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ],
  datasets: [
    {
      label: "PV",
      data: [24, 13, 98, 39, 48, 38, 43],
      borderColor: "red",
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      pointStyle: (ctx:any) => {
        const index = ctx.dataIndex;
        const dataset = ctx.dataset;
        // Check if the current index is the last one in the dataset
        if (index === dataset.data.length - 1) {
          return "triangle"; // Return triangle for the last point
        }
        return null; // Return null for other points (no shape)
      },
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem:any) {
          return tooltipItem.dataset.label + ": " + tooltipItem.raw;
        },
      },
    },
  },
};

const CustomLineChart = () => {
  return (
    <div>
      <h2>Custom Line Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomLineChart;
