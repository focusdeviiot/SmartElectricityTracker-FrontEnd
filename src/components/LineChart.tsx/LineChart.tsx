import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<"line"> = {
  // responsive: true,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      // display: true,
      // text: " Volts Line Chart",
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      title: {
        display: false,
      },
      grid: {
        display: true,
        color: "#3f3f46",
      },
      ticks: {
        color: "#718096",
      },
    },
    y: {
      display: true,
      title: {
        display: false,
        text: "Volt",
      },
      // offset: true,
      // grace: "10%",
      suggestedMax: 250,
      suggestedMin: 0,
      // max: 200,
      grid: {
        color: "#3f3f46",
      },
      ticks: {
        stepSize: 25,
        color: "#718096",
        callback: function (value) {
          return value + " V";
        },
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Volt",
      data: labels.map(() => faker.number.int({ min: 100, max: 220 })),
      borderColor: "#eab308",//"rgb(99, 102, 241)",
      backgroundColor: "#eab308",//"rgba(99, 102, 241, 0.5)",
      tension: 0.4,
    },
  ],
};

const LineChart = () => {
  return <Line options={options} data={data} />;
};

export default LineChart;
