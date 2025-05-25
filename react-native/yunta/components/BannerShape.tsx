import { icons } from '@/constants';
import React from 'react';
import { Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BannerShape = ({
  width = 220,          // Ancho total del contenedor SVG
  height = 70,          // Altura total del contenedor SVG
  fillColor = '#FFD700', // Color de relleno (dorado/amarillo)
  strokeColor = '#003366',// Color del borde (azul oscuro)
  strokeWidth = 5,      // Ancho del borde
  cornerRadius = 8,     // Radio de las esquinas redondeadas (para la línea central del borde)
  vNotchDepth = 25,      // Profundidad del corte en 'V' desde el borde derecho
  marginTop = 60
}) => {
  const sw = strokeWidth;

  // Coordenadas de inicio del trazado (desplazadas por la mitad del ancho del borde)
  const pathX = sw / 2;
  const pathY = sw / 2;

  // Ancho y alto disponibles para la línea central del trazado (descontando el borde)
  const pathWidth = width - sw;
  const pathHeight = height - sw;

  // Asegurarse de que el radio de la esquina no sea demasiado grande para las dimensiones
  const cr = Math.min(cornerRadius, pathWidth / 2, pathHeight / 2);

  // Asegurarse de que la muesca en V no sea más profunda que el ancho del trazado
  const vDepth = Math.min(vNotchDepth, pathWidth);

  const d = `
    M ${pathX}, ${pathY + cr}
    Q ${pathX}, ${pathY}, ${pathX + cr}, ${pathY}
    L ${pathX + pathWidth - vDepth}, ${pathY}
    L ${pathX + pathWidth}, ${pathY + pathHeight / 2}
    L ${pathX + pathWidth - vDepth}, ${pathY + pathHeight}
    L ${pathX + cr}, ${pathY + pathHeight}
    Q ${pathX}, ${pathY + pathHeight}, ${pathX}, ${pathY + pathHeight - cr}
    Z
  `;
  // Explicación del trazado (d):
  // 1. M ${pathX}, ${pathY + cr}: Mover a (Move to) el punto inicial en el borde izquierdo, justo debajo de donde empieza la curva superior.
  // 2. Q ${pathX}, ${pathY}, ${pathX + cr}, ${pathY}: Curva cuadrática (Quadratic Bezier curve) para la esquina superior izquierda.
  //    - (pathX, pathY) es el punto de control (la esquina teórica si no fuera redondeada).
  //    - (pathX + cr, pathY) es el punto final de la curva (inicio de la línea recta superior).
  // 3. L ${pathX + pathWidth - vDepth}, ${pathY}: Línea (Line to) hasta el inicio del corte en 'V' en el borde superior derecho.
  // 4. L ${pathX + pathWidth}, ${pathY + pathHeight / 2}: Línea hasta la punta del corte en 'V' (centro del borde derecho).
  // 5. L ${pathX + pathWidth - vDepth}, ${pathY + pathHeight}: Línea hasta el final del corte en 'V' en el borde inferior derecho.
  // 6. L ${pathX + cr}, ${pathY + pathHeight}: Línea hasta el inicio de la curva inferior izquierda.
  // 7. Q ${pathX}, ${pathY + pathHeight}, ${pathX}, ${pathY + pathHeight - cr}: Curva cuadrática para la esquina inferior izquierda.
  //    - (pathX, pathY + pathHeight) es el punto de control.
  //    - (pathX, pathY + pathHeight - cr) es el punto final de la curva (en el borde izquierdo).
  // 8. Z: Cerrar el trazado (Close path), dibuja una línea recta de vuelta al punto inicial.

  return (
    <Svg width={width} height={height} className={`relative`} style={{ marginTop: marginTop }}>
      <Image source={icons.catIcon} className="w-36 h-36 absolute right-10 top-[-48px] " resizeMode={'contain'} />
      <Path
        d={d}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="miter" // 'miter' para esquinas puntiagudas en la V, 'round' o 'bevel' para otras apariencias
      />
    </Svg>
  );
};

export default BannerShape;