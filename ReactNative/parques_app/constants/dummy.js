import icons from "./icons"
import images from "./images"

const parks = [
  { name: 'Llanganantes', image: images.llanganantes, icons: [icons.senderismo, icons.ciclismo, icons.binoculares], margin:38 },
  { name: 'Galapagos', image: images.galapagos, icons: [icons.buceo, icons.binoculares, icons.camara, icons.senderismo],margin:38 },
  { name: 'Podocarpus', image: images.podocarpus, icons: [icons.senderismo, icons.binoculares, icons.camping, icons.cascada],margin:38 },
  { name: 'Machalilla', image: images.machalilla, icons: [icons.binoculares, icons.buceo, icons.senderismo],margin:38 },
  { name: 'El cajas', image: images.cajas, icons: [icons.camara, icons.senderismo, icons.camping, icons.pesca],margin:38},
  { name: 'Cayambe Coca', image: images.cayambe, icons:[icons.senderismo, icons.cascada, icons.binoculares, icons.cascada],margin:38 },
  { name: 'Sangay', image: images.sangay, icons:[icons.binoculares, icons.camping, icons.senderismo, icons.camara],margin:38 },
  { name: 'Sumaco', image: images.sumaco, icons:[icons.senderismo,icons.binoculares, icons.camping],margin:38},
  { name: 'Yasuni', image: images.yasuni , icons:[icons.camping, icons.senderismo, icons.canotaje, icons.binoculares],margin:38},
  { name: 'Yacuri', image: images.yacuri, icons:[icons.cascada, icons.senderismo, icons.binoculares, icons.pesca] ,margin:38},
  { name: 'Cotopaxi', image: images.cotopaxi, icons:[icons.ciclismo, icons.senderismo,icons.camara] ,margin:38},
]

export { parks }