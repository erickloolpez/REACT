import React from 'react';
import Svg, { Line } from 'react-native-svg';

const LineShape = ({
  length = 100,           // Longitud de la línea
  thickness = 4,         // Grosor (strokeWidth)
  strokeColor = '#003366', // Color de la línea
  direction = 'horizontal', // 'horizontal' o 'vertical'
  style = {},
}) => {
  const isHorizontal = direction === 'horizontal';

  return (
    <Svg
      width={isHorizontal ? length : thickness}
      height={isHorizontal ? thickness : length}
      style={style}
    >
      <Line
        x1={0}
        y1={0}
        x2={isHorizontal ? length : 0}
        y2={isHorizontal ? 0 : length}
        stroke={strokeColor}
        strokeWidth={thickness}
      />
    </Svg>
  );
};

export default LineShape;
