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
  TimeScale,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export interface LimitProps {
  suggestedMax: number;
  suggestedMin: number;
}
export interface DatasetsProps {
  x: Date;
  y: number;
}

export interface LineChartProps {
  // uuid?: string;
  title: string;
  unit: string;
  limit?: LimitProps;
  datasets?: DatasetsProps[];
}

const LineChart: React.FC<LineChartProps> = ({
  unit,
  title,
  limit,
  datasets,
}) => {
  const limitset = limit ?? { grace: "10%" };
  const data: ChartData<"line"> = {
    // labels: [],
    datasets: [
      {
        label: title,
        data:
          datasets?.map((data) => {
            return {
              x: data.x.getTime(),
              y: data.y,
            };
          }) || [],
        borderColor: "#eab308",
        backgroundColor: "#eab308",
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: 'dd MMM yyyy',
          displayFormats: {
            day: "dd MMM yyyy : hh:mm",
          },
        },
      },
      y: {
        display: true,
        title: {
          display: false,
          text: title,
        },
        ...limitset,
        grid: {
          color: "#3f3f46",
        },
        ticks: {
          stepSize: 25,
          color: "#718096",
          callback: function (value) {
            return value + " " + unit;
          },
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
