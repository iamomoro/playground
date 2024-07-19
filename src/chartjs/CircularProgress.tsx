/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const CustomDoughnutChart: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize the chart instance with the canvas element, chart type, data, options, and plugins.
      chartRef.current = new Chart(canvasRef.current, {
        type: 'doughnut',
        data: doughnutData,
        options: doughnutOptions,
        plugins: [ChartDataLabels],
      });

      // Cleanup function to destroy the chart instance when the component unmounts
      return () => {
        chartRef.current?.destroy();
      };
    }
  }, []);

  const doughnutData = {
    labels: ['LS', 'CR', 'PP', 'ES', 'RR', 'DP', 'AR', 'CP'],
    datasets: [
      {
        data: [97, 65, 63, 75, 63, 27, 84, 35],
        backgroundColor: [
          '#4CAF50',
          '#FFC107',
          '#FF5722',
          '#FFEB3B',
          '#CDDC39',
          '#FF9800',
          '#F44336',
          '#9C27B0',
        ],
        borderWidth: 1,
        borderRadius: 50,
        datalabels: {
          labels: {
            index: {
              color: '#404040',
              font: {
                size: 12,
              },
              formatter: (_val: number, ctx: any) =>
                ctx.chart.data.labels[ctx.dataIndex],
              align: 'end' as const,
              anchor: 'end' as const,
            },
          },
        },
      },
    ],
  };

  const doughnutOptions = {
    cutout: '88%',
    layout: {
      padding: {
        top: 30,
        bottom: 30,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        formatter: (val: number) => {
          if ([0, 1, 2, 3, 4, 5, 6, 7].includes(val)) {
            return '';
          } else {
            return val;
          }
        },
      },
    },
  };

  // Function to calculate the average of the dataset values
  const calculateAverage = (data: number[]) => {
    const total = data.reduce((acc, value) => acc + value, 0);
    return parseInt((total / data.length).toFixed(0));
  };

  // Function to determine the colors based on the average value
  const determineColors = (average: number) => {
    if (average >= 70 && average <= 100) {
      return { textColor: '#23B00C', backgroundColor: '#1AAB0242' };
    } else if (average >= 40 && average < 70) {
      return { textColor: '#F2BB36', backgroundColor: '#F2BB3624' };
    } else {
      return { textColor: '#FA4545', backgroundColor: '#FA454542' };
    }
  };

  const average = calculateAverage(doughnutData.datasets[0].data);
  const { textColor, backgroundColor } = determineColors(average);

  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      {/* Container for the doughnut chart with relative positioning. */}
      <canvas ref={canvasRef} />
      {/* Canvas element for the doughnut chart with a ref to access it. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
          color: textColor,
          backgroundColor: backgroundColor,
          width: '60%',
          height: '60%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
        }}
      >
        {/* Overlay div for displaying the average value in the center of the doughnut chart. */}
        {average}%
      </div>
    </div>
  );
};

export default CustomDoughnutChart;
// Exporting the CustomDoughnutChart component to be used in other parts of the application.
