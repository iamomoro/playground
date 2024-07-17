/* eslint-disable @typescript-eslint/no-explicit-any */
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  defaults,
} from 'chart.js';

// Register the components for chart.js
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

defaults.set('animation', {
  duration: 2000,
  easing: 'easeInOutQuart',
});

const CustomLineChart = () => {
  const data = {
    labels: ['', '', '', '', ''],
    datasets: [
      {
        data: [0, 10, 5, 7, 5],
        borderColor: 'rgba(255,0,0,1)',
        backgroundColor: 'rgba(255,0,0,0.2)',
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
        tension: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        borderJoinStyle: 'miter' as const,
        borderCapStyle: 'butt' as const,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    animation: {
      onComplete: (context) => {
        const chart = context.chart;
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        const lastPoint = meta.data[meta.data.length - 1];
        const prevPoint = meta.data[meta.data.length - 2];
        const { x: endX, y: endY } = lastPoint.getProps(['x', 'y'], true);
        const { x: prevX, y: prevY } = prevPoint.getProps(['x', 'y'], true);

        const angle = Math.atan2(endY - prevY, endX - prevX);
        const arrowLength = 10;
        const arrowWidth = 5;

        ctx.save();
        ctx.translate(endX, endY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowLength, -arrowWidth);
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowLength, arrowWidth);
        ctx.strokeStyle = 'rgba(255,0,0,1)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CustomLineChart;
