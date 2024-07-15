import React from 'react';
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress: React.FC = () => {
  const segments = [
    { value: 10, color: '#4CAF50', label: 'LS' },
    { value: 15, color: '#FFC107', label: 'CR' },
    { value: 5, color: '#FF5722', label: 'PP' },
    { value: 10, color: '#FFEB3B', label: 'ES' },
    { value: 10, color: '#CDDC39', label: 'RR' },
    { value: 15, color: '#FF9800', label: 'DP' },
    { value: 10, color: '#F44336', label: 'AR' },
    { value: 5, color: '#9C27B0', label: 'CP' },
  ];

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const totalValue = segments.reduce((acc, segment) => acc + segment.value, 0);

  let startAngle = 0;

  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <svg width="200" height="200" viewBox="0 0 100 100">
        {segments.map((segment, index) => {
          const segmentAngle = (segment.value / totalValue) * 360;
          const endAngle = startAngle + segmentAngle;
          const largeArcFlag = segmentAngle > 180 ? 1 : 0;

          const startX = 50 + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
          const startY = 50 + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
          const endX = 50 + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
          const endY = 50 + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

          const pathData = [
            `M 50 50`,
            `L ${startX} ${startY}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 50 50`
          ].join(' ');

          startAngle = endAngle;

          return (
            <path key={index} d={pathData} fill={segment.color} />
          );
        })}
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <CircularProgressbar
          value={60}
          text="60%"
          styles={buildStyles({
            textSize: '24px',
            pathColor: '#4CAF50',
            textColor: '#4CAF50',
            trailColor: 'transparent',
            backgroundColor: '#000000',
          })}
        />
      </div>
    </div>
  );
};

export default CircularProgress;
