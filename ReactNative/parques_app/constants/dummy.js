import icons from "./icons"
import images from "./images"
import logos from "./logos"

const parks = [
  {
    name: 'Llanganantes', image: images.llanganantes, icons: [icons.senderismo, icons.ciclismo, icons.camara, icons.caballo, icons.camping], margin: 38, desc: 'Pocos nombres de lugares en el Ecuador despiertan tantos sentimientos de misterio y aventura como “Llanganates”. Es muy posible que la primera idea que venga a nuestras mentes sea la de esos misteriosos parajes al oriente de Píllaro donde Rumiñahui ordenó se escondiera el tesoro de Atahualpa, tras la captura y muerte del Inca en Cajamarca.\n\nEsto, que se ha convertido en una poderosa leyenda, ha despertado la atracción y ambición de muchos buscadores de tesoros cuyas aventuras, en la mayoría de los casos han terminado en fracaso y muerte.\n\nEs que llegar a la zona del supuesto tesoro conlleva una larga y ardua travesía por bosques y páramos muy húmedos de la Cordillera de los Llanganates.El esfuerzo de la caminata, por lo accidentado de la topografía, se ve compensada por parajes de ensueño que incluyen lagunas, bosques de neblina, hasta un extraño páramo de frailejones.La historia se une a una biodiversidad fantástica, que posiblemente sea el verdadero tesoro de los Llanganates.', trend: { name: 'Páramo y laguna de Pisayambo', desc: 'En la parte norte, ingresando por Latacunga se puede visitar el sistema lacustre de Salayambo y por Salcedo el sistema lacustre de Anteojos; en la parte occidental, ingresando por Píllaro se llega a la laguna de Pisayambo, que está represada como parte del proyecto hidroeléctrico homónimo. El embalse tiene tres kilómetros de longitud. Cerca del embalse está la mayoría de las 80 lagunas que hay en el parque; y por el sur, ingresando por Patate se llega a Cerro Púlpito y la Cueva de las Calaveras, en este sector se aprecia un majestuoso paisaje del valle interandino.' }, logo: logos.llanganantes
  },

  { name: 'Galapagos', image: images.galapagos, icons: [icons.ciclismo, icons.camara, icons.caballo, icons.camping], margin: 38, desc: 'La flora y fauna extraordinarias, sus rasgos geológicos y la gran cantidad de especies únicas han convertido a este parque en un importante centro mundial de investigación científica y turismo de naturaleza.\n\nComo reconocimiento a sus valores naturales fue declarado Patrimonio de la Humanidad por la UNESCO en 1978. A pesar de todos los problemas que ha enfrentado, especialmente por los organismos introducidos desde el continente, constituye uno de los archipiélagos mejor conservados y un referente mundial de manejo de ecosistemas frágiles.\n\nGalápagos incluye dos áreas protegidas: el Parque Nacional Galápagos, que abarca el 97% de la superficie terrestre del archipiélago, y la Reserva Marina Galápagos, que protege los ambientes marinos a su alrededor.\n\nEl aspecto más llamativo de una visita a Galápagos es experimentar de primera mano cómo sus animales han evolucionado en este mundo paralelo, olvidando el miedo a los humanos. No todo el parque está abierto al turismo, pero cuenta con una extensa red de sitios de visita diseñada especialmente para ofrecer un encuentro cercano con este “laboratorio natural” y, al mismo tiempo, reducir al máximo los impactos.', trend: { name: 'Colonias de aves marinas', desc: 'Las colonias de aves marinas, en especial de fragatas, piqueros patas azules, pelicanos, piqueros enmascarados y albatros (estos últimos solamente en Española),constituyen uno de los principales atractivos. En todos los sitios de visita que ofrecen la observación de estas aves existen senderos debidamente señalizados parafacilitar el recorrido.' }, logo: logos.galapagos },

  { name: 'Podocarpus', image: images.podocarpus, icons: [icons.camara, icons.senderismo, icons.ciclismo, icons.caballo, icons.camping], margin: 38, desc: 'El Parque Nacional Podocarpus se encuentra en una zona de gran biodiversidad y endemismo en la región sur del Ecuador. Esto hace que sea un testimonio claro de la influencia de las montañas en tierras tropicales, una de las principales razones de la extraordinaria biodiversidad del Ecuador. Muchos estudios demuestran que la mayor parte de la biodiversidad del país está empacada en estas alturas intermedias, donde el frío no es tan extremo y, en cambio, abundan la humedad, los microclimas y las barreras geográficas. La zona donde se encuentra Podocarpus es considerada un sitio de importancia mundial para la conservación de la biodiversidad.\n\nPor esta razón, junto a otras áreas de la zona como el Parque Nacional Yacuri y la Reserva Biológica Cerro Plateado, desde 2007 forma parte de la Reserva de Biosfera Podocarpus – El Cóndor, un reconocimiento otorgado por la UNESCO. Esta área alberga una gran superficie de páramos, bosques nublados y zonas de matorral, fundamental para la preservación y continuidad de los ecosistemas del sur del Ecuador y norte de Perú.Ficha', trend: { name: 'Lagunas del Compadre', desc: 'Constituyen uno de los principales atractivos turísticos del parque. Es un sitio muy recomendado para los que gustan de la pesca deportiva y la aventura. La mejor época para visitar este sector es el mes de noviembre, cuando se puede acampar en sus orillas y recorrer los alrededores. Con algo de suerte es posible observar algunas especies relativamente comunes del sector, como el tapir de montaña o el lobo de páramo.' }, logo: logos.podocarpus },

  { name: 'Machalilla', image: images.machalilla, icons: [icons.camara, icons.buceo, icons.nadar, icons.canotaje, icons.senderismo, icons.camping, icons.ciclismo], margin: 38,desc:'Este parque es una de las primeras áreas protegidas del país. Su declaratoria temprana, en 1979, revela que ya en los inicios del Sistema Nacional de Áreas Protegidas del Ecuador se reconoció la importancia de la zona y la urgencia de proteger sus ecosistemas: los bosques secos y semisecos, y los ambientes marino – costeros del sur de Manabí. Su nombre proviene de la cultura Machalilla, una de las culturas prehispánicas más importante de la región litoral, que habitó en esta zona durante 800 años (1800 a. C. – 1000 a. C).\n\nDentro del parque y en las zonas aledañas hay sitios arqueológicos de varias culturas, desde Valdivia hace más de 5 mil años, hasta la cultura Manteño – Huancavilca, hace 500 años.\n\nEs un parque lleno de evidencias de los antiguos pobladores de Manabí. El área protegida incluye playas, varios islotes cercanos a la línea de costa como Salango, Horno de Pan, Sucre, Pedernales y El Sombrerito, y también la célebre Isla de la Plata.',trend:{name:'Playa de los Frailes',desc:'Es considerada una de las pocas playas que todavía mantiene sus características naturales. Está ubicada entre los poblados de Machalilla y Puerto López. En este sector existe un sendero que recorre el bosque seco y atraviesa las playas de La Tortuguita y La Playita hasta llegar a Los Frailes.'},logo:logos.machalilla },

  { name: 'El cajas', image: images.cajas, icons: [icons.camara, icons.senderismo, icons.camping, icons.pesca], margin: 38, desc:'El Parque Nacional Cajas está ubicado en la provincia de Azuay, en el sur del Ecuador, donde la cordillera de los Andes es más antigua, con menor actividad volcánica y sin los picos elevados que son tan comunes más al norte. En esta zona, la cordillera forma extensas altiplanicies de gran belleza donde se acumula agua en grandes cantidades.\n\nEl Cajas está lleno de cuerpos de agua: se han contado cerca de 165 lagunas con más de 1 hectárea de superficie y 621 con menos de 1 hectárea; son en total 786 cuerpos de agua. Seguramente los cóndores que lo visitan pueden apreciar su verdadera forma desde el aire: un tapete verde y dorado, muy arrugado y donde cada valle guarda lagunitas conectadas por pequeños arroyos. \n\nDebido a la gran cantidad de lagunas, la presencia de aves migratorias y la importancia que tiene para la captación, almacenamiento y provisión de agua para las poblaciones cercanas, fue reconocido como sitio Ramsar o Humedal de Importancia Internacional. Desde el año 2002, y mediante un convenio suscrito con el Ministerio del Ambiente, el P.N. Cajas es administrado por el Municipio de Cuenca.',trend:{name:'Toreadora y Llaviucu', desc:'Por la vía Cuenca – Molleturo, las primeras lagunas en aparecer son Llaviucu y la Toreadora. Allí se puede disfrutar del páramo y de bosques de quínoas, que forman paisajes de ensueño. Desde la Toreadora se puede caminar hasta la laguna de Illincocha.'}, logo: logos.cajas},

  { name: 'Cayambe Coca', image: images.cayambe, icons: [icons.senderismo, icons.camara, icons.caballo, icons.camping, icons.ciclismo], margin: 38, desc:'Guiados por su nombre, se podría decir que el Parque Nacional Cayambe – Coca protege el volcán nevado Cayambe y las nacientes del río Coca, pero en verdad, éste es más bien el parque nacional del agua. Hay agua por todas partes, en el ambiente por la constante neblina y las lluvias, en la vegetación y la hojarasca del suelo, en los humedales y las lagunas de la parte alta, en el suelo y las almohadillas del páramo, y en los ríos que forman caídas y cascadas.\n\nEn la parte alta hay célebres vertientes de aguas termales y minerales como las de Papallacta y Oyacachi. En esta región están las nacientes de ríos como el Dué, el Chingual, el Cofanes y el Cabeno que alimentan al Aguarico, para que junto con el Coca entreguen sus aguas al gran río Napo.\n\nPor el otro lado, hacia las estribaciones occidentales, está el hogar de cientos de vertientes que nutren a los ríos Mira y Esmeraldas que desembocan en el océano Pacífico.', trend:{name:'Volcán Cayambe (5.790 m)',desc:'Es el punto más alto por donde pasa la línea equinoccial en el Ecuador y una de las montañas favoritas de los andinistas. La belleza de su terreno escarpado y las Lagunas formaciones de hielo, así como los cóndores que se pueden ver en el camino a la cima, lo hacen particularmente atractivo.'}, logo:logos.cayambe },

  { name: 'Sangay', image: images.sangay, icons: [icons.camara, icons.camping, icons.canotaje, icons.senderismo, icons.ciclismo], margin: 38, desc:'Este parque tiene como principales atractivos tres volcanes (dos de ellos activos), una infinidad de lagunas con historias asombrosas, como aquella donde centenares de pájaros acuden a morir, y una enorme biodiversidad. El parque se extiende sobre la cordillera Oriental protegiendo páramos, bosques altoandinos y bosques subtropicales. Por toda esta maravillosa geografía y extraordinaria biodiversidad, en 1983 la UNESCO lo declaró Patrimonio Natural de la Humanidad. \n\nEn el parque están las nacientes del Upano, río que bordea la ciudad oriental de Macas y luego desemboca en el Pastaza hacia el Amazonas. El otro río importante es el Paute que además marca el límite en la parte sur oriental; su caudal represado genera hasta ahora la mayor fuente de hidroelectricidad para el país. El Paute luego fluye hacia el río Santiago en la Amazonía.\n\nEn la parte montañosa y alta del parque habitan los descendientes de los pueblos Cañari y Puruhá, y en la zona de selva están los territorios de la nacionalidad Shuar.', trend:{name:'Sangay',desc:'Tiene una forma cónica perfecta cubierta de un esporádico manto de nieve; ocasionalmente se ven columnas de ceniza saliendo de su cráter. Se lo puede admirar desde los páramos de Návac o desde las alturas de Punín, Cacha, Atillo y Ozogoche.'},logo:logos.sangay },

  { name: 'Sumaco', image: images.sumaco, icons: [icons.senderismo, icons.camara, icons.camping, icons.caballo, icons.ciclismo], margin: 38, desc:'A un costado de la cordillera Oriental de los Andes, en la zona norte de nuestra Amazonía, existe una cadena montañosa antigua y relativamente aislada del resto de nevados, rodeada de quebradas y profundos cañones. Allí la agreste topografía y exuberante vegetación reciben todos los días la humedad que sube con la neblina nacida en la parte baja de la gran cuenca amazónica, antes de que continúe su viaje hacia las grandes montañas y nevados.\n\nSe trata de las laderas y cerros que rodean al Sumaco, el único volcán que se encuentra totalmente en territorio amazónico y que, junto a otros cerros de menor tamaño, está rodeado de bosques inconfundibles. Aquí se originan muchos riachuelos que aguas abajo forman los ríos Hollín, Suno, Payamino y Pucuno, afluentes todos del río Quijos o Coca.\n\nComo complemento se encuentra un pequeño ramal ubicado al sur del volcán Sumaco, la cordillera Napo Galeras (de allí el nombre de esta área protegida).',trend:{name:'Volcán Sumaco',desc:'Es la principal elevación del parque y se accede por la población de Pacto Sumaco en la carretera Río Hollín – Loreto. El sendero de ascenso pasa por el cráter Wawa Sumaco, a 2.500 m de altitud, alrededor del cual se pueden visitar numerosas cascadas.'},logo:logos.sumaco},

  { name: 'Yasuni', image: images.yasuni, icons: [icons.camara, icons.senderismo, icons.canotaje], margin: 38, desc:'Yasuní, el área protegida más grande del Ecuador continental, resguarda una impresionante biodiversidad en el corazón del bosque húmedo tropical amazónico y protege parte del territorio de la nacionalidad waorani. En el Yasuní se han reportado cifras de biodiversidad sorprendentes para varios grupos de flora y fauna, nunca antes registradas en área protegida alguna.\n\nAquí encontramos cientos de especies de árboles, anchos ríos que se desbordan con las lluvias torrenciales y grandes animales como el jaguar, la anaconda y el águila harpía.\n\nTambién hallamos seres muy pequeños, como el leoncillo o mono de bolsillo, el primate más pequeño del mundo, y una gran variedad de reptiles y anfibios que ubican a este parque entre los más biodiversos del mundo.\n\nEl lado humano del Yasuní está también lleno de sorpresas. Dentro del parque habitan los tagaeri y taromenane, Pueblos Indígenas en Aislamiento Voluntario. Para protegerlos a ellos y a la biodiversidad del Yasuní, secreó en 1999 la Zona Intangible Tagaeri-Taromenane. El Parque Nacional Yasuní, la Zona Intangible y el adyacente territorio waorani fueron declarados Reserva de la Biosfera por la UNESCO en 1989.', trend:{name:'Laguna y comunidad de Añangu', desc:'La laguna es de aguas negras y tranquilas, lo que la hace parecer un espejo. Se localiza en la comunidad kichwa de Añangu, al norte del parque, y en la ribera del río Napo.Es posible navegar en canoa por la laguna, visitar el Centro de Interpretación Kuri Muyo y caminar por varios senderos que recorren el bosque tropical.'}, logo: logos.yasuni },

  { name: 'Yacuri', image: images.yacuri, icons: [icons.camara, icons.senderismo, icons.ciclismo, icons.caballo, icons.camping], margin: 38, desc:'Los Andes en el sur del país presentan una cara muy diferente a los del norte y centro: contienen páramos que comienzan a menores altitudes y poseen características muy peculiares en su vegetación; de ahí la importancia de áreas protegidas como el Parque Nacional Yacuri.\n\nEste se encuentra al sureste de la población de Amaluza, entre las provincias de Loja y Zamora Chinchipe, en la frontera con Perú. Al norte de Yacuri se encuentra el Parque Nacional Podocarpus y al sur, en el Perú, el Santuario Nacional Tabaconas – Namballe, por lo que Yacuri es pieza clave para el corredor natural transfronterizo de los dos países.\n\nEl parque protege ambientes de páramos, bosques de neblina y matorrales secos de altura, que son el resultado de la confluencia de las condiciones del occidente seco y del oriente más húmedo. Yacuri es, además, parte de la Reserva de Biosfera Podocarpus – El Cóndor, un área de gran importancia para la conservación de la biodiversidad del sur del país.',trend:{name:'Bosque de Angashcola',desc:'El bosque de Angashcola se encuentra en un pequeño valle adyacente a la cordillera de Sabanilla. La mayor parte de esta Reserva Comunal corresponde a bosque nublado altoandino, dominado por árboles de romerillo y grandes parches de poáceas. Las partes altas están cubiertas por bosque achaparrado y más arriba por zonas de páramo.El sitio es ideal para la observación de aves, muchas de ellas exclusivas de esta zona de los Andes. Es frecuente también encontrar rastros de algunos mamíferos como oso de anteojos, tapir de montaña, vizcacha y lobo de páramo.'}, logo:logos.yacuri },

  { name: 'Cotopaxi', image: images.cotopaxi, icons: [icons.ciclismo, icons.senderismo, icons.camara, icons.camping], margin: 38, decs:'El volcán Cotopaxi, un cono nevado casi perfecto que se yergue a 5.897 metros de altitud es algo único en el planeta y es quizá, junto a Galápagos, el mayor símbolo de nuestra geografía natural reconocida en el mundo entero.\n\nMillares de montañistas de todas las nacionalidades han logrado su cumbre y otros tantos sueñan con hacerlo. Debido a que se encuentra en el centro del callejón interandino y muy cercano a varias ciudades como Quito y Latacunga, el Parque Nacional Cotopaxi es uno de los más visitados y seguramente donde muchas personas tocan por primera vez la nieve.\n\nEl imponente Cotopaxi, uno de los volcanes activos más altos del mundo, domina todo el paisaje del área protegida, que también incluye otros dos más pequeños, el Morurco (4.880 m), pegado al Cotopaxi, y el Rumiñahui (4.722 m), también muy cercano. El Cotopaxi se encuentra en la zona denominada “Avenida de los Volcanes”, nombre que el naturalista alemán Alexander von Humboldt en 1802 dio al conjunto de volcanes de la Sierra centro y norte del Ecuador. El ecosistema predominante en el parque es el páramo, con su flora y fauna especiales, por lo que la vegetación principal es de pajonal y pequeños arbustos de altura.',trend:{name:'Volcán Cotopaxi',desc:'El Cotopaxi también maravilla por su forma perfectamente cónica, su manto de nieves perpetuas y yana – sacha, una enorme pared de roca negra que parece un ojo, visible desde el norte. El cráter mide 800 metros de diámetro y 334 metros de profundidad.Volcán Rumiñahui y laguna de Limpiopungo El volcán Rumiñahui es una montaña llena de picos que le dan una apariencia agreste. Nos recuerda al último guerrero indígena que resistió heroicamente la invasión española y cuyo nombre significa “rostro de piedra”. Los picos son paredes de 800 metros de alto que rodean la caldera que colapsó probablemente por el vaciamiento violento de la cámara donde se alojaba el magma. La laguna de Limpiopungo se encuentra a 3.800 metros de altitud y cubre 200 hectáreas aproximadamente.No tiene un borde claro como otras lagunas sino que el terreno a su alrededor se va haciendo paulatinamente cenagoso. Tiene muchas plantas de totora entre las que anidan los patos; alrededor de la laguna vuelan gaviotas andinas y otras aves.'},logo: logos.cotopaxi },
]

export { parks }