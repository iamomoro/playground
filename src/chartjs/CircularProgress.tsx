import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const CircularProgress: React.FC = () => {
  const data = {
    labels: ['LS', 'CR', 'PP', 'ES', 'RR', 'DP', 'AR', 'CP'],
    datasets: [
      {
        data: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
        backgroundColor: [
          '#4CAF50',
          '#FFC107',
          '#FF5722',
          '#FFEB3B',
          '#CDDC39',
          '#FF9800',
          '#fa1100',
          '#9C27B0',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '75%', // Adjust this to create the desired hole size in the middle
    rotation: -90, // Start angle for the first segment
    circumference: 360, // Full circle
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips
      },
      legend: {
        display: false, // Hide legend
      },
    },
  };

  const radius = 110; // Adjust this to position labels outside the doughnut
  const centerX = 100; // Center X coordinate
  const centerY = 100; // Center Y coordinate

  const labelsPosition = data.labels.map((label, index) => {
    const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return { label, x, y };
  });

  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <Doughnut data={data} options={options} />
      {labelsPosition.map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${pos.x}px`, // Use pixel values for accurate positioning
            top: `${pos.y}px`, // Use pixel values for accurate positioning
            transform: 'translate(-50%, -50%)',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {pos.label}
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
          color: '#4CAF50',
        }}
      >
        60%
      </div>
    </div>
  );
};

export default CircularProgress;
