import React from 'react';
import Svg, { Path } from 'react-native-svg';

const TriangleShape = ({
  width = 120,
  height = 100,
  fillColor = '#FFD700',
  strokeColor = '#003366',
  strokeWidth = 2,
  direction = 'right', // 'right', 'left', 'up', 'down'
  style = {},
}) => {
  // Definir los puntos del triángulo dependiendo de la dirección
  let d = '';

  switch (direction) {
    case 'right':
      d = `M0,0 L${width},${height / 2} L0,${height} Z`;
      break;
    case 'left':
      d = `M${width},0 L0,${height / 2} L${width},${height} Z`;
      break;
    case 'up':
      d = `M0,${height} L${width / 2},0 L${width},${height} Z`;
      break;
    case 'down':
      d = `M0,0 L${width / 2},${height} L${width},0 Z`;
      break;
    default:
      d = `M0,0 L${width},${height / 2} L0,${height} Z`;
  }

  return (
    <Svg width={width} height={height} style={style}>
      <Path
        d={d}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default TriangleShape;
