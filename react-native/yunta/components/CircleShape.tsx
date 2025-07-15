import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const CircleShape = ({
  size = 80,              // Diámetro total
  fillColor = '#FFD700', // Color de relleno
  strokeColor = '#003366', // Color del borde
  strokeWidth = 1,       // Grosor del borde
  style = {},
}) => {
  const radius = (size - strokeWidth) / 2; // Radio ajustado por el borde
  const center = size / 2;

  return (
    <Svg width={size} height={size} style={style}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default CircleShape;
