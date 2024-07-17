/* eslint-disable @typescript-eslint/no-explicit-any */
// The above line disables the ESLint rule that disallows the use of the any type in TypeScript.
// It's useful here because we have a context parameter in our animation callback which is of type any.
import { Line } from 'react-chartjs-2';
// Importing the Line component from 'react-chartjs-2', which is a React wrapper for Chart.js.

import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  defaults,
} from 'chart.js';
// Importing necessary components and utilities from Chart.js.
// These are required to build and configure the chart.

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);
// Registering the components with Chart.js. This step is necessary to use these components in your charts.

defaults.set('animation', {
  duration: 2000,
  easing: 'easeInOutQuart',
});
// Setting default animation properties for all charts.
// Here, we set the duration to 2000 milliseconds (2 seconds) and the easing function to 'easeInOutQuart'.

const CustomLineChart = () => {
  const data = {
    labels: ['', '', '', '', ''],
    // Labels for the x-axis, which are empty in this case.
    datasets: [
      {
        data: [0, 10, 5, 7, 25],
        // Data points for the line chart.
        borderColor: 'rgba(255,0,0,1)',
        // Color of the line.
        backgroundColor: 'rgba(255,0,0,0.2)',
        // Background color under the line, with some transparency.
        fill: true,
        // Enables filling the area under the line.
        pointRadius: 0,
        // No visible points on the line.
        borderWidth: 2,
        // Width of the line.
        tension: 0,
        // No curve between points.
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      // Disabling the legend display.
      tooltip: {
        enabled: false,
      },
      // Disabling tooltips.
    },
    scales: {
      x: {
        display: false,
      },
      // Hiding the x-axis.
      y: {
        display: false,
      },
      // Hiding the y-axis.
    },
    elements: {
      line: {
        borderJoinStyle: 'miter' as const,
        // Style of line joins.
        borderCapStyle: 'butt' as const,
        // Style of line caps.
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
      // Adding padding to the chart layout.
    },
    animation: {
      onComplete: (context: { chart: any }) => {
        // This function runs when the animation completes.
        const chart = context.chart;
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        const lastPoint = meta.data[meta.data.length - 1];
        const prevPoint = meta.data[meta.data.length - 2];
        // Getting the last and second last points of the dataset.

        const { x: endX, y: endY } = lastPoint.getProps(['x', 'y'], true);
        const { x: prevX, y: prevY } = prevPoint.getProps(['x', 'y'], true);
        // Extracting x and y coordinates of these points.

        const angle = Math.atan2(endY - prevY, endX - prevX);
        const arrowLength = 10;
        const arrowWidth = 5;
        // Calculating the angle for the arrow and defining its length and width.

        ctx.save();
        ctx.translate(endX, endY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowLength, -arrowWidth);
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowLength, arrowWidth);
        // Drawing an arrow at the end of the line.
        ctx.strokeStyle = 'rgba(255,0,0,1)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        // Applying styles and restoring the context state.
      },
    },
  };

  return <Line data={data} options={options} />;
  // Returning the Line component with the specified data and options.
};

export default CustomLineChart;
// Exporting the CustomLineChart component so it can be used in other parts of the application.
