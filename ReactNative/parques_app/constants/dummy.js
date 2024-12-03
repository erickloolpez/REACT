import icons from "./icons"
import images from "./images"
import isotipos from "./isotipos"
import logos from "./logos"
import trends from "./trends"

const parks = [
  {
    name: 'Llanganates', image: images.llanganantes,
    icon: icons.iconLlanganates,
    isotipo: isotipos.llanganates,
    location: {
      latitude: -1.137165089331531,
      longitude: -78.24608383727785,
    },
    polygon: [
      { latitude: '-1.308705', longitude: '-78.439756' },
      { latitude: '-1.324328', longitude: '-78.099712' },
      { latitude: '-0.974440', longitude: '-78.123070' },
      { latitude: '-0.975787', longitude: '-78.436671' },
    ],
    suggestions: 'Vestimenta. Ropa abrigada, poncho de aguas o chompa impermeable en caso de lluvia o garúa. Calzado apropiado, tipo botines de media caña en caso de caminatas medianas o largas.',
    path: [
      {
        name: 'Quito', order: 'A Sunfopamba. Se toma la vía Quito – Ambato (132 km). Desde Ambato se toma la vía a Píllaro para continuar hasta el sector de Dos Acequias, se pasa por San José de Poaló, hasta llegar al refugio/guardianía de Sunfopamba.A Panzarumi. Por la vía Quito – Salcedo (104 km) se continúa hasta la parroquia San Miguel (de Salcedo) y luego al refugio/guardianía de Panzarumi. Desde Salcedo son 24 kilómetros y 45 minutos en vehículo particular o una hora en transporte público.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
      {
        name: 'Tena', order: 'Se toma la vía Pano – Tálag hasta llegar al poblado  de Tálag, donde se encuentra el puesto de control. Desde ese punto, el parque esta a 4 km',
        color: { heading: "#F0B847", background: "#086441" }
      },
      {
        name: 'Mera', order: 'Se toma la vía Mera – Río Anzu hasta llegar al Km 12 donde se encuentra el puesto de control del parque (zona de amortiguamiento). Aquí se encuentra el punto de partida a las cavernas del Río Anzu, ubicadas en la zona de amortiguamiento del parque.',
        color: { heading: "#2F5285", background: "#9FD6E5" }
      }
    ],
    icons: [
      { name: 'Senderismo', image: icons.senderismo },
      { name: 'Ciclismo', image: icons.ciclismo },
      { name: 'Fotografia', image: icons.camara },
      { name: 'Caballo', image: icons.caballo },
      { name: 'Camping', image: icons.camping }
    ],
    desc: 'Pocos nombres de lugares en el Ecuador despiertan tantos sentimientos de misterio y aventura como “Llanganates”. Es muy posible que la primera idea que venga a nuestras mentes sea la de esos misteriosos parajes al oriente de Píllaro donde Rumiñahui ordenó se escondiera el tesoro de Atahualpa, tras la captura y muerte del Inca en Cajamarca.\n\nEsto, que se ha convertido en una poderosa leyenda, ha despertado la atracción y ambición de muchos buscadores de tesoros cuyas aventuras, en la mayoría de los casos han terminado en fracaso y muerte.\n\nEs que llegar a la zona del supuesto tesoro conlleva una larga y ardua travesía por bosques y páramos muy húmedos de la Cordillera de los Llanganates.El esfuerzo de la caminata, por lo accidentado de la topografía, se ve compensada por parajes de ensueño que incluyen lagunas, bosques de neblina, hasta un extraño páramo de frailejones.La historia se une a una biodiversidad fantástica, que posiblemente sea el verdadero tesoro de los Llanganates.',
    trend:
      [
        {
          name: 'Páramo y laguna de Pisayambo',
          desc: 'En la parte norte, ingresando por Latacunga se puede visitar el sistema lacustre de Salayambo y por Salcedo el sistema lacustre de Anteojos; en la parte occidental, ingresando por Píllaro se llega a la laguna de Pisayambo, que está represada como parte del proyecto hidroeléctrico homónimo. El embalse tiene tres kilómetros de longitud. Cerca del embalse está la mayoría de las 80 lagunas que hay en el parque; y por el sur, ingresando por Patate se llega a Cerro Púlpito y la Cueva de las Calaveras, en este sector se aprecia un majestuoso paisaje del valle interandino.',
          image: trends.llanganatePisayambo,
          location: {
            latitude: -1.0833333,
            longitude: -78.3166667,
          }
        },
        {
          name: 'Cerro Hermoso',
          desc: 'Es la elevación más alta del parque, llamado así muy posiblemente por la belleza de sus picos. Durante su trayecto se atraviesa por una variedad de ambientes: la zona de frailejones, los bosques de Polylepis y las extensas zonas de zuro o bambú andino.Al pie de este cerro se encuentra la laguna Brunner o El Cable y desde su cumbre se aprecia la Cordillera de los Llanganates y varias lagunas como Angascocha, Pujín y Las Tres Marías.',
          image: trends.llanganateHermoso,
          location: {
            latitude: -1.149167,
            longitude: -78.350278,
          }
        },
        {
          name: 'Rios y cascadas',
          desc: 'Del parque descienden innumerables riachuelos y ríos que en su trayecto forman varias cascadas y atractivos naturales como las cuencas de los ríos Jatunyacu, Anzu, Topo, Machay, Piatuas, Verde, Verde Chico y el Yanayacu los cuales han formado hermosos balnearios naturales de agua limpia y cristalina, aptos para la pesca deportiva, rafting y kayak.',
          image: trends.llanganateRios,
          location: {
            latitude: -1.0825,
            longitude: -78.2875,
          }
        },
      ],
    logo: logos.llanganantes
  },
  {
    name: 'Podocarpus', image: images.podocarpus,
    icon: icons.iconPodocarpus,
    isotipo: isotipos.podocarpus,
    location: {
      latitude: -4.296400805573029,
      longitude: -78.99381021780579,
    },
    polygon: [
      { latitude: -4.102, longitude: -78.994 }, // Norte
      { latitude: -4.296, longitude: -78.755 }, // Este
      { latitude: -4.490, longitude: -78.994 }, // Sur
      { latitude: -4.296, longitude: -79.232 }, // Oeste
    ],
    suggestions: 'Vestimenta. Zona alta (Cajanuma): ropa abrigada,poncho de aguas o chompa impermeable en caso de lluvia o garúa. Calzado apropiado, tipo botines de media caña en caso de caminatas medianas o largas. Zona baja (Bombuscaro): ropa ligera y botas de caucho para caminar en los senderos del área.',
    path: [
      {
        name: 'Quito y Guayaquil', order: 'A Sunfopamba. Se toma la vía Quito – Ambato (132 km). Desde Ambato se toma la vía a Píllaro para continuar hasta el sector de Dos Acequias, se pasa por San José de Poaló, hasta llegar al refugio/guardianía de Sunfopamba.A Panzarumi. Por la vía Quito – Salcedo (104 km) se continúa hasta la parroquia San Miguel (de Salcedo) y luego al refugio/guardianía de Panzarumi. Desde Salcedo son 24 kilómetros y 45 minutos en vehículo particular o una hora en transporte público.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
      {
        name: 'Loja', order: 'A Cajanuma. Se toma la vía Loja – Vilcabamba por 15 kilómetros hasta llegar al puesto de control. Desde este sitio se continúa por una vía de tercer orden hasta llegar al Refugio desde el Centro Administrativo (8,5 km).\n\nA Bombuscaro. Se toma la vía Loja – Zamora (60 km). Aquí se continua hacia el sur por un camino de segundo orden (7 km) hasta llegar al inicio de un sendero que conduce al parque.',
        color: { heading: "#173481", background: "#FEC0BC" }
      }
    ],
    icons: [
      { name: "Fotografia", image: icons.camara },
      { name: "Senderismo", image: icons.senderismo },
      { name: "Ciclismo", image: icons.ciclismo },
      { name: "Camping", image: icons.camping },
    ],
    desc: 'El Parque Nacional Podocarpus se encuentra en una zona de gran biodiversidad y endemismo en la región sur del Ecuador. Esto hace que sea un testimonio claro de la influencia de las montañas en tierras tropicales, una de las principales razones de la extraordinaria biodiversidad del Ecuador. Muchos estudios demuestran que la mayor parte de la biodiversidad del país está empacada en estas alturas intermedias, donde el frío no es tan extremo y, en cambio, abundan la humedad, los microclimas y las barreras geográficas. La zona donde se encuentra Podocarpus es considerada un sitio de importancia mundial para la conservación de la biodiversidad.\n\nPor esta razón, junto a otras áreas de la zona como el Parque Nacional Yacuri y la Reserva Biológica Cerro Plateado, desde 2007 forma parte de la Reserva de Biosfera Podocarpus – El Cóndor, un reconocimiento otorgado por la UNESCO. Esta área alberga una gran superficie de páramos, bosques nublados y zonas de matorral, fundamental para la preservación y continuidad de los ecosistemas del sur del Ecuador y norte de Perú.Ficha',
    trend: [
      {
        name: 'Lagunas del Compadre',
        desc: 'Constituyen uno de los principales atractivos turísticos del parque. Es un sitio muy recomendado para los que gustan de la pesca deportiva y la aventura. La mejor época para visitar este sector es el mes de noviembre, cuando se puede acampar en sus orillas y recorrer los alrededores. Con algo de suerte es posible observar algunas especies relativamente comunes del sector, como el tapir de montaña o el lobo de páramo.',
        image: trends.podocarpusCompadre,
        location: {
          latitude: -4.091480,
          longitude: -79.114410,
        }
      },
      {
        name: 'Cajanuma',
        desc: 'En el sector de Cajanuma hay un centro de recepción para visitantes con información sobre el parque. Además, es el punto de entrada principal hacia el sendero que conduce a las Lagunas del Compadre. Posee algunos senderos autoguiados e interpretativos donde es posible apreciar la flora representativa del sector, especialmente del bosque nublado y, más arriba, del páramo arbustivo muy propio del parque. Es un sitio de gran importancia para la observación de algunas especies de aves y mamíferos de las zonas altoandinas.',
        image: trends.podocarpusCajanuma,
        location: {
          latitude: -4.080141,
          longitude: -79.200734,
        }
      },
      {
        name: 'Bombuscaro y Romerillos',
        desc: 'Son dos zonas situadas en el sector oriental del parque. En Bombuscaro existen un centro de interpretación ambiental y un salón de uso múltiple para actividades de educación. En este sitio se han establecido algunos senderos autoguiados para observar especies de flora y fauna típicas del sector. Un atractivo principal son las cascadas naturales que se originan en las zonas altoandinas del parque. Es un sito muy recomendado para la fotografía y la observación de aves',
        image: trends.podocarpusBombuscaro,
        location: {
          latitude: -4.113580,
          longitude: -78.945320,
        }
      },
      {
        name: 'Cerro Toledo',
        desc: 'Situado en el extremo sur del parque, a 12 kilómetros de la vía Yangana – Valladolid, el cerro Toledo constituye un importante mirador natural desde donde es posible apreciar el bosque y la topografía típica de los Andes sureños del país. Además, constituye un sitio estratégico para la observación de aves y algunas especies de mamíferos.',
        image: trends.podocarpusToledo,
        location: {
          latitude: -4.481210,
          longitude: -79.294200,
        }
      },
    ], logo: logos.podocarpus
  },


  {
    name: 'Galapagos', image: images.galapagos,
    icon: icons.iconGalapagos,
    isotipo: isotipos.galapagos,
    location: {
      latitude: -0.6141768221188437,
      longitude: -90.34521020652402,
    },
    polygon: [
      { latitude: -0.163, longitude: -90.345 }, // Norte
      { latitude: -0.614, longitude: -89.849 }, // Este
      { latitude: -1.065, longitude: -90.345 }, // Sur
      { latitude: -0.614, longitude: -90.841 }, // Oeste
    ],
    suggestions: 'La principal amenaza para Galápagos son las especies introducidas desde el continente. Tenga especial cuidado con lo que lleva a Galápagos, entre islas, e incluso a la hora deacamp ar. Consulte con la DPNG y la Agencia de Bioseguridad para Galápagos (ABG).\n\nTenga en cuenta que el clima de las islas es marcadamente estacional, de manera que la observación de algunas especies y eventos naturales depende de la época.',
    path: [
      {
        name: 'Quito y Guayaquil', order: 'A Sunfopamba. Se toma la vía Quito – Ambato (132 km). Desde Ambato se toma la vía a Píllaro para continuar hasta el sector de Dos Acequias, se pasa por San José de Poaló, hasta llegar al refugio/guardianía de Sunfopamba.A Panzarumi. Por la vía Quito – Salcedo (104 km) se continúa hasta la parroquia San Miguel (de Salcedo) y luego al refugio/guardianía de Panzarumi. Desde Salcedo son 24 kilómetros y 45 minutos en vehículo particular o una hora en transporte público.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: "Ciclismo", image: icons.ciclismo },
      { name: "Fotografia", image: icons.camara },
      { name: "Camping", image: icons.camping },
    ],
    desc: 'La flora y fauna extraordinarias, sus rasgos geológicos y la gran cantidad de especies únicas han convertido a este parque en un importante centro mundial de investigación científica y turismo de naturaleza.\n\nComo reconocimiento a sus valores naturales fue declarado Patrimonio de la Humanidad por la UNESCO en 1978. A pesar de todos los problemas que ha enfrentado, especialmente por los organismos introducidos desde el continente, constituye uno de los archipiélagos mejor conservados y un referente mundial de manejo de ecosistemas frágiles.\n\nGalápagos incluye dos áreas protegidas: el Parque Nacional Galápagos, que abarca el 97% de la superficie terrestre del archipiélago, y la Reserva Marina Galápagos, que protege los ambientes marinos a su alrededor.\n\nEl aspecto más llamativo de una visita a Galápagos es experimentar de primera mano cómo sus animales han evolucionado en este mundo paralelo, olvidando el miedo a los humanos. No todo el parque está abierto al turismo, pero cuenta con una extensa red de sitios de visita diseñada especialmente para ofrecer un encuentro cercano con este “laboratorio natural” y, al mismo tiempo, reducir al máximo los impactos.',
    trend:
      [
        {
          name: 'Colonias de aves marinas',
          desc: 'Las colonias de aves marinas, en especial de fragatas, piqueros patas azules, pelicanos, piqueros enmascarados y albatros (estos últimos solamente en Española),constituyen uno de los principales atractivos. En todos los sitios de visita que ofrecen la observación de estas aves existen senderos debidamente señalizados para facilitar el recorrido.',
          image: trends.galapagosPajaro,
          location: {
            latitude: -1.382131,
            longitude: -90.446710,
          }
        },
        {
          name: 'Fenómenos geológicos',
          desc: 'Existen algunos sitios de visita donde el principal atractivo son los paisajes volcánicos o las sorprendentes formaciones geológicas como cráteres, túneles y flujos de lava. En bahía Urbina (Isabela), por ejemplo, se puede observar un arrecife de coral que quedó fuera del agua a causa de un levantamiento geológico ocurrido en 1954. El volcán Sierra Negra presenta una de las calderas más grandes del mundo, además de una exhibición de todo tipo de formaciones volcánicas, como conos, tubos, salpicaduras, fumarolas y depósitos de azufre.',
          image: trends.galapagosFenomeno,
          location: {
            latitude: -0.833333,
            longitude: -91.116667,
          }
        },
      ],
    logo: logos.galapagos
  },

  {
    name: 'Machalilla', image: images.machalilla,
    icon: icons.iconMachalilla,
    isotipo: isotipos.machalilla,
    location: {
      latitude: -1.4585881977897268,
      longitude: -80.76864915621577,
    },
    polygon: [
      { latitude: -1.318, longitude: -80.769 }, // Norte
      { latitude: -1.459, longitude: -80.598 }, // Este
      { latitude: -1.599, longitude: -80.769 }, // Sur
      { latitude: -1.459, longitude: -80.939 }, // Oeste
    ],
    suggestions: 'Vestimenta. Ropa ligera y zapatos cómodos para caminar en los senderos del área. La temporada de observación de ballenas por lo general coincide con los meses fríos por lo que se recomienda llevar ropa abrigada y rompevientos.\n\nObservación de ballenas. Esta actividad se realiza durante los meses de junio a septiembre. Se debe contactar a operadores autorizados por el Parque Nacional.',
    path: [
      {
        name: 'Quito', order: 'Se toma la vía Quito – Sto. Domingo (151 km). De Sto. Domingo se sigue hacia Chone (140 km), al suroeste en dirección a Manta (91 km). Desde Manta se recorre la Troncal del Pacífico hacia el sur, para conectarse con la vía Jipijapa – Puerto Cayo – Puerto López (89 km) y así llegar al parque central de Puerto López, donde se encuentran las oficinas del área protegida.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
      {
        name: 'Guayaquil', order: 'Se toma la vía a Daule hasta llegar a Nobol (41 km). Aquí se continúa por la vía Nobol – Jipijapa, hasta llegar a Jipijapa. Se toma hacia Puerto Cayo (28 km), al oeste, para ir por la Troncal del Pacífico hacia el sur y llegar a Puerto López (33 km).',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: "Fotografia", image: icons.camara },
      { name: "Buceo", image: icons.buceo },
      { name: "Nadar", image: icons.nadar },
      { name: "Canotaje", image: icons.canotaje },
      { name: "Senderismo", image: icons.senderismo },
      { name: "Camping", image: icons.camping },
      { name: "Ciclismo", image: icons.ciclismo },
    ],
    desc: 'Este parque es una de las primeras áreas protegidas del país. Su declaratoria temprana, en 1979, revela que ya en los inicios del Sistema Nacional de Áreas Protegidas del Ecuador se reconoció la importancia de la zona y la urgencia de proteger sus ecosistemas: los bosques secos y semisecos, y los ambientes marino – costeros del sur de Manabí. Su nombre proviene de la cultura Machalilla, una de las culturas prehispánicas más importante de la región litoral, que habitó en esta zona durante 800 años (1800 a. C. – 1000 a. C).\n\nDentro del parque y en las zonas aledañas hay sitios arqueológicos de varias culturas, desde Valdivia hace más de 5 mil años, hasta la cultura Manteño – Huancavilca, hace 500 años.\n\nEs un parque lleno de evidencias de los antiguos pobladores de Manabí. El área protegida incluye playas, varios islotes cercanos a la línea de costa como Salango, Horno de Pan, Sucre, Pedernales y El Sombrerito, y también la célebre Isla de la Plata.',
    trend: [
      {
        name: 'Playa de los Frailes',
        desc: 'Es considerada una de las pocas playas que todavía mantiene sus características naturales. Está ubicada entre los poblados de Machalilla y Puerto López. En este sector existe un sendero que recorre el bosque seco y atraviesa las playas de La Tortuguita y La Playita hasta llegar a Los Frailes.',
        image: trends.machalillaFrailes,
        location: {
          latitude: -1.565854,
          longitude: -80.810486,
        }
      },
      {
        name: 'Isla de la Plata',
        desc: 'Está ubicada a 40 kilómetros de Puerto López. Existen cinco senderos para recorrerla, observar varias especies de aves y contemplar los acantilados de la isla. En los alrededores se puede observar la biodiversidad marina mediante buceo de superficie, principalmente en los arrecifes Palo Santo y El Faro. La visita requiere la compañía de un guía naturalista autorizado por la administración del parque.',
        image: trends.machalillaPlata,
        location: {
          latitude: -1.265810,
          longitude: -81.063780,
        }
      },
      {
        name: 'Comuna Agua Blanca',
        desc: 'Agua Blanca está ubicada a 5 kilómetros al norte de Puerto López; la comuna mantiene un museo arqueológico con piezas de la cultura Manteño – Huancavilca. En esta zona se han encontrado las famosas sillas de piedra o sillas de poder, por lo que los arqueólogos consideran que aquí funcionó uno de sus centros cívico ceremoniales. Sus pobladores, como se puede observar durante los recorridos, están orgullosos de su pasado y su herencia cultural. En la comunidad existe una gran poza de aguas sulfurosas donde se puede tomar un refrescante baño. El lodo del fondo de la poza ofrece también magníficas propiedades relajantes y es una experiencia reconfortante.',
        image: trends.machalillaBlanca,
        location: {
          latitude: -1.541883,
          longitude: -80.804167,
        }
      },
      {
        name: 'Observación de ballenas jorobadas',
        desc: 'Otro atractivo es el avistamiento de las ballenas jorobadas, presentes entre julio y septiembre. Estos mamíferos viajan desde las frías aguas antárticas hasta llegar a nuestras cálidas aguas, en busca de condiciones adecuadas para reproducirse y tener sus crías. Los operadores turísticos que ofrecen los servicios de embarcaciones para observar ballenas, así como los visitantes y turistas deben seguir las normas establecidas.',
        image: trends.machalillaBallena,
        location: {
          latitude: -1.566667,
          longitude: -80.816667,
        }
      },
    ],
    desc: 'Es considerada una de las pocas playas que todavía mantiene sus características naturales. Está ubicada entre los poblados de Machalilla y Puerto López. En este sector existe un sendero que recorre el bosque seco y atraviesa las playas de La Tortuguita y La Playita hasta llegar a Los Frailes.',
    logo: logos.machalilla
  },
  {
    name: 'El cajas', image: images.cajas,
    icon: icons.iconCajas,
    isotipo: isotipos.cajas,
    location: {
      latitude: -2.846042815518646,
      longitude: -79.25541232991348,
    },
    polygon: [
      { latitude: -2.761, longitude: -79.255 }, // Norte
      { latitude: -2.846, longitude: -79.149 }, // Este
      { latitude: -2.931, longitude: -79.255 }, // Sur
      { latitude: -2.846, longitude: -79.361 }, // Oeste
    ],
    suggestions: 'Vestimenta. Ropa abrigada, poncho de aguas o chompa impermeable en caso de lluvia o garúa. Calzado apropiado, tipo botines de media caña en caso de caminatas medianas o largas.\n\nGuianza. Algunos sitios requieren el acompañamiento de un guía naturalista certificado por el parque y con licencia vigente. Pueden conducir grupos de hasta 15 personas.\n\nSe recomienda realizar reservaciones y conocer las regulaciones antes de la visita.',
    path: [
      {
        name: 'Cuenca', order: 'Laguna la Toreadora. Se llega por la vía Cuenca – Molleturo – Puerto Inca, aproximadamente a 40 kilómetros desde Cuenca. En este sitio se encuentran la Oficina Técnica del Parque, un centro de interpretación y el acceso a los diferentes senderos.\n\nLlaviucu. Se llega por la carretera Cuenca – Molleturo – Puerto Inca. A 7,5 kilómetros desde la “Y” de Sayausí en la margen izquierda, se encuentra la vía de ingreso. Desde este punto se atraviesan 2,9 kilómetros por empedrado hasta llegar a la entrada al parque.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: "Fotografia", image: icons.camara },
      { name: "Senderismo", image: icons.senderismo },
      { name: "Camping", image: icons.camping },
      { name: "Pesca", image: icons.pesca },
    ],
    desc: 'El Parque Nacional Cajas está ubicado en la provincia de Azuay, en el sur del Ecuador, donde la cordillera de los Andes es más antigua, con menor actividad volcánica y sin los picos elevados que son tan comunes más al norte. En esta zona, la cordillera forma extensas altiplanicies de gran belleza donde se acumula agua en grandes cantidades.\n\nEl Cajas está lleno de cuerpos de agua: se han contado cerca de 165 lagunas con más de 1 hectárea de superficie y 621 con menos de 1 hectárea; son en total 786 cuerpos de agua. Seguramente los cóndores que lo visitan pueden apreciar su verdadera forma desde el aire: un tapete verde y dorado, muy arrugado y donde cada valle guarda lagunitas conectadas por pequeños arroyos. \n\nDebido a la gran cantidad de lagunas, la presencia de aves migratorias y la importancia que tiene para la captación, almacenamiento y provisión de agua para las poblaciones cercanas, fue reconocido como sitio Ramsar o Humedal de Importancia Internacional. Desde el año 2002, y mediante un convenio suscrito con el Ministerio del Ambiente, el P.N. Cajas es administrado por el Municipio de Cuenca.',
    trend: [
      {
        name: 'Toreadora y Llaviucu',
        desc: 'Por la vía Cuenca – Molleturo, las primeras lagunas en aparecer son Llaviucu y la Toreadora. Allí se puede disfrutar del páramo y de bosques de quínoas, que forman paisajes de ensueño. Desde la Toreadora se puede caminar hasta la laguna de Illincocha.',
        image: trends.cajasToreadora,
        location: {
          latitude: -3.097046,
          longitude: -79.332642,
        }
      },
      {
        name: 'Qhapaq Ñan',
        desc: 'Por la vía Cuenca – Molleturo, las primeras lagunas en aparecer son Llaviucu y la Toreadora. Allí se puede disfrutar del páramo y de bosques de quínoas, que forman paisajes de ensueño. Desde la Toreadora se puede caminar hasta la laguna de Illincocha.',
        image: trends.cajasNam,
        location: {
          latitude: -3.090815,
          longitude: -79.290648,
        }
      },
    ]
    , logo: logos.cajas
  },

  {
    name: 'Cayambe Coca', image: images.cayambe,
    icon: icons.iconCayambe,
    isotipo: isotipos.cayambe,
    location: {
      latitude: -0.07279645221010232,
      longitude: -77.83669601816572,
    },
    polygon: [
      { latitude: 0.251, longitude: -77.837 }, // Norte
      { latitude: -0.073, longitude: -77.432 }, // Este
      { latitude: -0.397, longitude: -77.837 }, // Sur
      { latitude: -0.073, longitude: -78.241 }, // Oeste
    ],
    suggestions: 'Vestimenta. Zona alta: ropa abrigada, poncho de aguas o chompa impermeable en caso de lluvia o garúa. Calzado apropiado, tipo botines de media caña en caso de caminatas medianas o largas. Zona baja: ropa ligera y zapatos cómodos para caminar en los senderos del área.',
    path: [
      {
        name: 'Quito', order: 'Se toma la vía Panamericana norte hasta llegar a la ciudad de Cayambe (78 km). Desde aquí se accede a los siguientes lugares:\n\nAl Refugio del Cayambe.\n Se toma la vía de segundo orden Juan Montalvo – El Hato – Pie Monte que conduce al refugio. Toma 45 minutos hasta el punto de control por una vía que en ciertas épocas demanda uso de vehículo 4x4.\n\nA Oyacachi.\n Se toma la vía que conduce al sector de Cangahua. Desde aquí se recorre 40 kilómetros por una carretera de segundo orden hasta llegar al Punto de Control. A 15 minutos de este lugar se encuentra el poblado de Oyacachi.Para los lugares que se encuentran hacia el oriente, se toma la vía Quito – Papallacta – El Chaco. Desde aquí se accede a los siguientes lugares:\n\nSector Baños.\n En Papallacta, junto a la zona de las aguas termales, se toma un camino de segundo orden (5 km) que conduce al puesto de control y los accesos a los senderos.\n\nCascada de San Rafael.\n Desde la población de El Chaco al ingreso a la cascada hay 50 kilómetros, el poblado más cercano antes de llegar es San Luis.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: 'Senderismo', image: icons.senderismo },
      { name: 'Fotografia', image: icons.camara },
      { name: 'Ciclismo', image: icons.ciclismo },
    ],
    desc: 'Guiados por su nombre, se podría decir que el Parque Nacional Cayambe – Coca protege el volcán nevado Cayambe y las nacientes del río Coca, pero en verdad, éste es más bien el parque nacional del agua. Hay agua por todas partes, en el ambiente por la constante neblina y las lluvias, en la vegetación y la hojarasca del suelo, en los humedales y las lagunas de la parte alta, en el suelo y las almohadillas del páramo, y en los ríos que forman caídas y cascadas.\n\nEn la parte alta hay célebres vertientes de aguas termales y minerales como las de Papallacta y Oyacachi. En esta región están las nacientes de ríos como el Dué, el Chingual, el Cofanes y el Cabeno que alimentan al Aguarico, para que junto con el Coca entreguen sus aguas al gran río Napo.\n\nPor el otro lado, hacia las estribaciones occidentales, está el hogar de cientos de vertientes que nutren a los ríos Mira y Esmeraldas que desembocan en el océano Pacífico.',
    trend: [
      {
        name: 'Volcán Cayambe (5.790 m)',
        desc: 'Es el punto más alto por donde pasa la línea equinoccial en el Ecuador y una de las montañas favoritas de los andinistas. La belleza de su terreno escarpado y las Lagunas formaciones de hielo, así como los cóndores que se pueden ver en el camino a la cima, lo hacen particularmente atractivo.',
        image: trends.cayambeVolcan,
        location: {
          latitude: 0.0789,
          longitude: -78.1389,
        }
      },
      {
        name: 'Cascada San Rafael',
        desc: 'Es un mágico lugar en donde se puede apreciar toda la belleza y fuerza de la naturaleza. Se forma por una caída de 160 metros del río Alto Coca, que nace en las confluencias de los ríos Quijos y el Salado. Es la caída de agua más grande del Ecuador.',
        image: trends.cayambeSan,
        location: {
          latitude: 0.0786,
          longitude: -77.9436,
        }
      },
      {
        name: 'Aguas termales',
        desc: 'Las más conocidas son las de la comunidad de Oyacachi y las de la zona de Papallacta.Las aguas termales alcanzan hasta 60 ºC gracias a la actividad volcánica del Antisana y el Reventador, y también poseen minerales con propiedades curativas.',
        image: trends.cayambeTermas,
        location: {
          latitude: 0.3261,
          longitude: -77.8242,
        }
      },
      {
        name: 'Volcán Reventador (3.485 m)',
        desc: 'Es uno de los volcanes más activos de la cordillera Oriental. Es conocido por sus erupciones violentas y repentinas que expulsan gran cantidad de ceniza, piedras incandescentes y lava. Sus faldas están aún cubiertas de ceniza de la última erupción explosiva que fue en 2002 y sobre ellas, poco a poco, va creciendo la vegetación',
        image: trends.cayambeReventador,
        location: {
          latitude: -0.0777,
          longitude: -77.6386,
        }
      },
    ]
    , logo: logos.cayambe
  },

  {
    name: 'Sangay', image: images.sangay,
    icon: icons.iconSangay,
    isotipo: isotipos.sangay,
    location: {
      latitude: -2.054084296830765,
      longitude: -78.36341582476535,
    },
    polygon: [
      { latitude: -1.688, longitude: -78.363 }, // Norte
      { latitude: -2.054, longitude: -77.915 }, // Este
      { latitude: -2.420, longitude: -78.363 }, // Sur
      { latitude: -2.054, longitude: -78.811 }, // Oeste
    ],
    suggestions: 'Vestimenta.Zona alta: ropa abrigada, poncho de aguas o chompa impermeable en caso de lluvia o garúa. Calzado apropiado, tipo botines de media caña en caso de caminatas medianas o largas.Zona baja: ropa ligera y botas de caucho para caminar en los senderos del área.',
    path: [
      {
        name: 'Quito', order: 'Se dirige por la Panamericana sur de Quito a Riobamba (194 km). Desde esta ciudad se accede a varios sitios. Atillo. Se toma la vía a San Luis hasta llegar a la vía Guamote – Macas que lleva hasta la comunidad de Atillo (74 km).\n\nOzogoche.\n Se toma la Panamericana Sur hasta el desvió de Charicando, en la zona de Palmira (64 km); de ahí se recorren 35 kilómetros en vía asfaltada por el camino que lleva a la “Y” de la comunidad de Totoras. Aquí se toma una vía de segundo orden hasta llegar a Ozogoche Alto.\n\nEl Altar.\n Se toma la vía a Penipe (22 km) y luego se continúa por un camino de segundo orden hasta llegar a la parroquia Candelaria donde se encuentra el puesto de control e ingreso al parque.\n\nCamino del Inca.\n Se toma la vía Riobamba – El Tambo. Al sendero se puede ingresar desde el poblado de Achupallas o desde la laguna de Culebrillas (para llegar a este sitio se parte desde la población de El Tambo).\n\nLaguna de Culebrillas.\n Se toma la Panamericana Sur desde la ciudad de Riobamba hasta 2 km antes de El Tambo. A mano izquierda está el ingreso a Pillcopata',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: "Fotografia", image: icons.camara },
      { name: "Camping", image: icons.camping },
      { name: "Canotaje", image: icons.canotaje },
      { name: "Ciclismo", image: icons.ciclismo },
    ],
    desc: 'Este parque tiene como principales atractivos tres volcanes (dos de ellos activos), una infinidad de lagunas con historias asombrosas, como aquella donde centenares de pájaros acuden a morir, y una enorme biodiversidad. El parque se extiende sobre la cordillera Oriental protegiendo páramos, bosques altoandinos y bosques subtropicales. Por toda esta maravillosa geografía y extraordinaria biodiversidad, en 1983 la UNESCO lo declaró Patrimonio Natural de la Humanidad. \n\nEn el parque están las nacientes del Upano, río que bordea la ciudad oriental de Macas y luego desemboca en el Pastaza hacia el Amazonas. El otro río importante es el Paute que además marca el límite en la parte sur oriental; su caudal represado genera hasta ahora la mayor fuente de hidroelectricidad para el país. El Paute luego fluye hacia el río Santiago en la Amazonía.\n\nEn la parte montañosa y alta del parque habitan los descendientes de los pueblos Cañari y Puruhá, y en la zona de selva están los territorios de la nacionalidad Shuar.',
    trend: [
      {
        name: 'Sangay',
        desc: 'Tiene una forma cónica perfecta cubierta de un esporádico manto de nieve; ocasionalmente se ven columnas de ceniza saliendo de su cráter. Se lo puede admirar desde los páramos de Návac o desde las alturas de Punín, Cacha, Atillo y Ozogoche.',
        image: trends.sangayVolcan,
        location: {
          latitude: -2.0033,
          longitude: -78.2828,
        }
      },
      {
        name: 'Tungurahua',
        desc: 'Tiene forma cónica y ocasionalmente puede vérsele cubierto de nieve. Para admirar cómo arroja lava y nubes se puede ir a uno de los varios miradores que se han acomodado a su alrededor, especialmente en Baños y otros poblados circundantes.\n\nEn el parque se han registrado 327 lagunas, solitarias o formando sistemas lacustres. El sistema de Atillo incluye las lagunas de Kuyuk, Magdalena, Colay, Chapanapungo y Sisñán. El complejo Ozogoche está formado por las lagunas de Cubillín, Magtayán y otras más pequeñas. Las lagunas de Sardinayacu son las únicas rodeadas de bosque andino. Las lagunas de Ozogoche y Atillo cada septiembre reciben al cuviví o chorlito, un ave migratoria de Norteamérica que, extrañamente, parece venir a morir en las lagunas, como una especie de “suicidio masivo”.',
        image: trends.sangayTun,
        location: {
          latitude: -1.2839,
          longitude: -78.4423,
        }
      },
      {
        name: 'El Altar',
        desc: 'Para muchas personas, este volcán inactivo tiene uno de los mejores paisajes del país, debido a que en su última erupción se formó una enorme ágora de picos rocosos que se abren hacia el occidente, con nombres eclesiásticos muy singulares: El Canónigo, Los Frailes, El Tabernáculo, La Monja Menor, La Monja Mayor, El Obispo y El Acólito. En el fondo de la caldera se formó la Laguna Amarilla sobre la que descienden los glaciares.',
        image: trends.sangayAltar,
        location: {
          latitude: -1.4817,
          longitude: -78.5644,
        }
      },
    ]
    , logo: logos.sangay
  },

  {
    name: 'Sumaco', image: images.sumaco,
    icon: icons.iconSumaco,
    isotipo: isotipos.sumaco,
    location: {
      latitude: -0.3609124187566216,
      longitude: -77.46976861934205,
    },
    polygon: [
      { latitude: -0.131, longitude: -77.470 }, // Norte
      { latitude: -0.361, longitude: -77.194 }, // Este
      { latitude: -0.591, longitude: -77.470 }, // Sur
      { latitude: -0.361, longitude: -77.745 }, // Oeste
    ],
    suggestions: 'Vestimenta. Zona alta: ropa abrigada, poncho de aguas o chompa impermeable en caso de lluvia o garúa. Calzado apropiado, tipo botines de media caña en caso de caminatas medianas o largas. Zona baja: ropa ligera y botas de caucho para caminar en los senderos del área.\n\nDeportes acuáticos. Las actividades de canotaje y kayak se pueden realizar en el río Quijos (en el área de amortiguamiento del área protegida) y con operadores de turismo especializados que se encuentran en las ciudades de El Chaco y Tena.',
    path: [
      {
        name: 'Quito', order: 'Se toma la vía Papallacta – Baeza – Tena. En el km 24, sector Narupa, se continúa por la vía Hollín – Loreto hasta llegar el sector denominado Wawa Sumaco.\n\nDesde aquí se continúa hasta la comunidad de Pacto Sumaco donde se encuentra el ingreso al parque.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: "Senderismo", image: icons.senderismo },
      { name: "Fotografia", image: icons.camara },
      { name: "Camping", image: icons.camping },
      { name: "Ciclismo", image: icons.ciclismo },
    ],
    desc: 'A un costado de la cordillera Oriental de los Andes, en la zona norte de nuestra Amazonía, existe una cadena montañosa antigua y relativamente aislada del resto de nevados, rodeada de quebradas y profundos cañones. Allí la agreste topografía y exuberante vegetación reciben todos los días la humedad que sube con la neblina nacida en la parte baja de la gran cuenca amazónica, antes de que continúe su viaje hacia las grandes montañas y nevados.\n\nSe trata de las laderas y cerros que rodean al Sumaco, el único volcán que se encuentra totalmente en territorio amazónico y que, junto a otros cerros de menor tamaño, está rodeado de bosques inconfundibles. Aquí se originan muchos riachuelos que aguas abajo forman los ríos Hollín, Suno, Payamino y Pucuno, afluentes todos del río Quijos o Coca.\n\nComo complemento se encuentra un pequeño ramal ubicado al sur del volcán Sumaco, la cordillera Napo Galeras (de allí el nombre de esta área protegida).'
    ,
    trend: [
      {
        name: 'Volcán Sumaco',
        desc: 'Es la principal elevación del parque y se accede por la población de Pacto Sumaco en la carretera Río Hollín – Loreto. El sendero de ascenso pasa por el cráter Wawa Sumaco, a 2.500 m de altitud, alrededor del cual se pueden visitar numerosas cascadas.',
        image: trends.sumacoVolcan,
        location: {
          latitude: -0.5011,
          longitude: -77.7381,
        }
      },
      {
        name: 'Ríos torrentosos',
        desc: 'En los ríos de la zona de amortiguamiento del parque se pueden practicar deportes de aventura como canotaje en balsa y kayak.\n\nEn el río Quijos se realizan anualmente importantes campeonatos de canotaje, cuyo centro de operaciones es la ciudad de El Chaco.',
        image: trends.sumacoRios,
        location: {
          latitude: -0.2364,
          longitude: -77.6176,
        }
      },
    ],
    logo: logos.sumaco
  },

  {
    name: 'Yasuni', image: images.yasuni,
    icon: icons.iconYasuni,
    isotipo: isotipos.yasuni,
    location: {
      latitude: -0.6559593349788924,
      longitude: -76.07043497186153,
    },
    polygon: [
      { latitude: -0.596, longitude: -76.070 }, // Norte
      { latitude: -0.655, longitude: -75.802 }, // Este
      { latitude: -0.715, longitude: -76.070 }, // Sur
      { latitude: -0.655, longitude: -76.338 }, // Oeste
    ],
    suggestions: 'Guianza. El ingreso al parque se debe hacer únicamente con operadoras de turismo autorizadas y que cuenten con guías naturalistas certificados.\n\nVacunas. Para ingresar al parque se deben portar las vacunas contra la fiebre amarilla y el tétanos.',
    path: [
      {
        name: 'Quito', order: 'Por vía aérea o terrestre se debe llegar a la ciudad de Puerto Francisco de Orellana (Coca). Desde aquí, dependiendo del destino, hay varias rutas, principalmente fluviales.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: "Fotografia", image: icons.camara },
      { name: "Senderismo", image: icons.senderismo },
      { name: "Canotaje", image: icons.canotaje },
    ],
    desc: 'Yasuní, el área protegida más grande del Ecuador continental, resguarda una impresionante biodiversidad en el corazón del bosque húmedo tropical amazónico y protege parte del territorio de la nacionalidad waorani. En el Yasuní se han reportado cifras de biodiversidad sorprendentes para varios grupos de flora y fauna, nunca antes registradas en área protegida alguna.\n\nAquí encontramos cientos de especies de árboles, anchos ríos que se desbordan con las lluvias torrenciales y grandes animales como el jaguar, la anaconda y el águila harpía.\n\nTambién hallamos seres muy pequeños, como el leoncillo o mono de bolsillo, el primate más pequeño del mundo, y una gran variedad de reptiles y anfibios que ubican a este parque entre los más biodiversos del mundo.\n\nEl lado humano del Yasuní está también lleno de sorpresas. Dentro del parque habitan los tagaeri y taromenane, Pueblos Indígenas en Aislamiento Voluntario. Para protegerlos a ellos y a la biodiversidad del Yasuní, secreó en 1999 la Zona Intangible Tagaeri-Taromenane. El Parque Nacional Yasuní, la Zona Intangible y el adyacente territorio waorani fueron declarados Reserva de la Biosfera por la UNESCO en 1989.',
    trend: [
      {
        name: 'Laguna y comunidad de Añangu',
        desc: 'La laguna es de aguas negras y tranquilas, lo que la hace parecer un espejo. Se localiza en la comunidad kichwa de Añangu, al norte del parque, y en la ribera del río Napo.\n\nEs posible navegar en canoa por la laguna, visitar el Centro de Interpretación Kuri Muyo y caminar por varios senderos que recorren el bosque tropical.',
        image: trends.yasuniLaguna,
        location: {
          latitude: -0.5139,
          longitude: -76.7207,
        }
      },
      {
        name: 'El bosque de tierra firme',
        desc: 'La exuberante vegetación que cubre este bosque hace pensar que los suelos amazónicos poseen una gran capa de suelo fértil. Sin embargo, la capa es muy delgada y los suelos son pobres en nutrientes: la riqueza están en la vegetación y en un delgado estrato que se forma con las hojas, ramas, flores, frutos y cortezas que caen y cubren el suelo. Aquí se encuentra un verdadero ejército de seres diminutos que procesan constantemente la materia orgánica; de esta manera, los nutrientes no tienen tiempo de acumularse, sino que regresan de inmediato a la vegetación, produciendo esa exuberancia y verdor. El bosque de tierra firme cubre la mayor parte del PN Yasuní y se lo puede recorrer en las comunidades asentadas en la ribera del río Napo, como Añangu, Nueva Providencia, Indillana, Llanchana o Mandaripanga.',
        image: trends.yasuniBosque,
        location: {
          latitude: -0.7311,
          longitude: -76.6430,
        }
      },
      {
        name: 'Tambococha y laguna de Jatuncocha',
        desc: 'Estas dos lagunas se encuentran dentro del parque y se accede a ellas desde Nuevo Rocafuerte.',
        image: trends.yasuniComunidad,
        location: {
          latitude: -0.6275,
          longitude: -76.7049,
        }
      },
    ]
    , logo: logos.yasuni
  },

  {
    name: 'Yacuri', image: images.yacuri,
    icon: icons.iconYacuri,
    isotipo: isotipos.yacuri,
    location: {
      latitude: -4.597169234904428,
      longitude: -79.31879143778109,
    },
    polygon: [
      { latitude: -4.492, longitude: -79.319 }, // Norte
      { latitude: -4.597, longitude: -79.211 }, // Este
      { latitude: -4.702, longitude: -79.319 }, // Sur
      { latitude: -4.597, longitude: -79.426 }, // Oeste
    ],
    suggestions: 'Vestimenta. Ropa abrigada, poncho de aguas o chompa impermeable en caso de lluvia o garúa. Calzado apropiado, tipo botines de media caña en caso de caminatas medianas o largas.',
    path: [
      {
        name: 'Quito y Guayaquil', order: 'se debe llegar a la ciudad de Loja.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
      {
        name: 'Loja', order: 'Desde Loja. Se toma la vía hacia Amaluza (120 km asfaltados y 30 km lastrados).Desde esta población se puede ingresar a los siguientes sitios:\n\nLagunas Negras 1 y 2.\n Se toma la vía lastrada que conduce hacia la parroquia Jimbura(18 km).Desde aquí se recorren 15 kilómetros vía a Zumba hasta llegar al puesto de control.\n\nLaguna Yacuri.\nSe toma una vía lastrada que conduce al barrio Consapamba y se continúa hasta llegar a la Asociación El Arbolito donde se encuentra el ingreso al sendero El Arbolito.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: "Fotografia", image: icons.camara },
      { name: "Senderismo", image: icons.senderismo },
      { name: "Ciclismo", image: icons.ciclismo },
      { name: "Camping", image: icons.camping },
    ],
    desc: 'Los Andes en el sur del país presentan una cara muy diferente a los del norte y centro: contienen páramos que comienzan a menores altitudes y poseen características muy peculiares en su vegetación; de ahí la importancia de áreas protegidas como el Parque Nacional Yacuri.\n\nEste se encuentra al sureste de la población de Amaluza, entre las provincias de Loja y Zamora Chinchipe, en la frontera con Perú. Al norte de Yacuri se encuentra el Parque Nacional Podocarpus y al sur, en el Perú, el Santuario Nacional Tabaconas – Namballe, por lo que Yacuri es pieza clave para el corredor natural transfronterizo de los dos países.\n\nEl parque protege ambientes de páramos, bosques de neblina y matorrales secos de altura, que son el resultado de la confluencia de las condiciones del occidente seco y del oriente más húmedo. Yacuri es, además, parte de la Reserva de Biosfera Podocarpus – El Cóndor, un área de gran importancia para la conservación de la biodiversidad del sur del país.',
    trend: [
      {
        name: 'Bosque de Angashcola',
        desc: 'El bosque de Angashcola se encuentra en un pequeño valle adyacente a la cordillera de Sabanilla. La mayor parte de esta Reserva Comunal corresponde a bosque nublado altoandino, dominado por árboles de romerillo y grandes parches de poáceas. Las partes altas están cubiertas por bosque achaparrado y más arriba por zonas de páramo.\nEl sitio es ideal para la observación de aves, muchas de ellas exclusivas de esta zona de los Andes. Es frecuente también encontrar rastros de algunos mamíferos como oso de anteojos, tapir de montaña, vizcacha y lobo de páramo.',
        image: trends.yacuriBosque,
        location: {
          latitude: -4.1257,
          longitude: -79.2025
        }
      },
      {
        name: 'Lagunas de Yacuri',
        desc: 'El complejo de lagunas de Yacuri está conformado por un total de 48 cuerpos de agua de diferente tamaño y de origen glaciar. Se encuentran principalmente ubicadas en la parte sur del Parque Nacional Yacuri. La vegetación de páramo que rodea a las lagunas es diferente al de la zona norte del país, y presenta muchas especies endémicas de la región de los Andes del Sur.',
        image: trends.yacuriLaguna,
        location: {
          latitude: -4.3060,
          longitude: -79.5500,
        }
      },
    ],
    logo: logos.yacuri
  },

  {
    name: 'Cotopaxi', image: images.cotopaxi,
    icon: icons.iconCotopaxi,
    isotipo:isotipos.cotopaxi,
    location: {
      latitude: -0.7005484946862225,
      longitude: -78.42977234885215,
    },
    polygon: [
      { latitude: -0.619, longitude: -78.429 }, // Norte
      { latitude: -0.700, longitude: -78.338 }, // Este
      { latitude: -0.782, longitude: -78.429 }, // Sur
      { latitude: -0.700, longitude: -78.522 }, // Oeste
    ],
    suggestions: 'Vestimenta. Ropa abrigada, poncho de aguas o chompa impermeable en caso de lluvia o garúa. Calzado apropiado, tipo botines de media caña en caso de caminatas medianas o largas.\n\nCaminata hacia el refugio. Hay personas a las que les afecta la altura, en especial durante la caminata desde el parqueadero hasta el refugio del Cotopaxi. Camine lento y haga varias paradas para que el cuerpo se acostumbre a la altura. Si se sienten mareos o dolores de cabeza, es mejor descansar o incluso descender.',
    path: [
      {
        name: 'Quito', order: 'Ingreso control Caspi. Para ingresar al parque se sigue por la vía Panamericana sur (tramo Quito – Latacunga) hasta el kilómetro 42, donde se encuentra el desvío para el ingreso al Parque. Desde aquí son 15 minutos por una vía asfaltada para llegar al puesto de control.\n\nIngreso control Norte.\n Se toma la Panamericana Sur hasta Machachi para luego seguir hasta el poblado de Güitig. Desde aquí se continúa por el camino empedrado hasta llegar al Pedregal. A 20 minutos se llega a la caseta de control.',
        color: { heading: "#173481", background: "#FEC0BC" }
      },
    ],
    icons: [
      { name: "Ciclismo", image: icons.ciclismo },
      { name: "Senderismo", image: icons.senderismo },
      { name: "Fotografia", image: icons.camara },
      { name: "Camping", image: icons.camping },
    ],
    desc: 'El volcán Cotopaxi, un cono nevado casi perfecto que se yergue a 5.897 metros de altitud es algo único en el planeta y es quizá, junto a Galápagos, el mayor símbolo de nuestra geografía natural reconocida en el mundo entero.\n\nMillares de montañistas de todas las nacionalidades han logrado su cumbre y otros tantos sueñan con hacerlo. Debido a que se encuentra en el centro del callejón interandino y muy cercano a varias ciudades como Quito y Latacunga, el Parque Nacional Cotopaxi es uno de los más visitados y seguramente donde muchas personas tocan por primera vez la nieve.\n\nEl imponente Cotopaxi, uno de los volcanes activos más altos del mundo, domina todo el paisaje del área protegida, que también incluye otros dos más pequeños, el Morurco (4.880 m), pegado al Cotopaxi, y el Rumiñahui (4.722 m), también muy cercano. El Cotopaxi se encuentra en la zona denominada “Avenida de los Volcanes”, nombre que el naturalista alemán Alexander von Humboldt en 1802 dio al conjunto de volcanes de la Sierra centro y norte del Ecuador. El ecosistema predominante en el parque es el páramo, con su flora y fauna especiales, por lo que la vegetación principal es de pajonal y pequeños arbustos de altura.',
    trend: [
      {
        name: 'Volcán Cotopaxi',
        desc: 'El Cotopaxi también maravilla por su forma perfectamente cónica, su manto de nieves perpetuas y yana – sacha, una enorme pared de roca negra que parece un ojo, visible desde el norte. El cráter mide 800 metros de diámetro y 334 metros de profundidad.\n\nVolcán Rumiñahui y laguna de Limpiopungo El volcán Rumiñahui es una montaña llena de picos que le dan una apariencia agreste. Nos recuerda al último guerrero indígena que resistió heroicamente la invasión española y cuyo nombre significa “rostro de piedra”. Los picos son paredes de 800 metros de alto que rodean la caldera que colapsó probablemente por el vaciamiento violento de la cámara donde se alojaba el magma. La laguna de Limpiopungo se encuentra a 3.800 metros de altitud y cubre 200 hectáreas aproximadamente.\nNo tiene un borde claro como otras lagunas sino que el terreno a su alrededor se va haciendo paulatinamente cenagoso. Tiene muchas plantas de totora entre las que anidan los patos; alrededor de la laguna vuelan gaviotas andinas y otras aves.',
        image: trends.cotopaxiVolcan,
        location: {
          latitude: -0.6833,
          longitude: -78.4375,
        }
      },
      {
        name: 'Valle Encantado y Cañón del Río Pita',
        desc: 'En el lado oriental del parque, entrando por Machachi, se encuentra el Valle Encantado.\nDesde aquí se pueden observar las huellas de la erupción más reciente del Cotopaxi: lahares (ríos de lodo ahora cubiertos por musgos y arbustos muy resistentes) y piedras, a veces enormes, que salieron como bombas del volcán.\nEl río Pita corre a través de un encañonado que se va adentrando en bosques y áreas agrícolas fuera del parque, donde forma cascadas impresionantes. Este es uno de los ríos que provee el agua potable que se consume en Quito.',
        image: trends.cotopaxiRio,
        location: {
          latitude: -0.6393,
          longitude: -78.4071,
        }
      },
    ]
    , logo: logos.cotopaxi
  },
]

export { parks }