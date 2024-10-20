import icons from "./icons"
import images from "./images"

const parks = [
  { name: 'Llanganantes', image: images.llanganantes, icons: [icons.senderismo, icons.ciclismo, icons.camara, icons.caballo, icons.camping], margin:38, desc:'Pocos nombres de lugares en el Ecuador despiertan tantos sentimientos de misterio y aventura como “Llanganates”. Es muy posible que la primera idea que venga a nuestras mentes sea la de esos misteriosos parajes al oriente de Píllaro donde Rumiñahui ordenó se escondiera el tesoro de Atahualpa, tras la captura y muerte del Inca en Cajamarca.' },
  { name: 'Galapagos', image: images.galapagos, icons: [icons.ciclismo, icons.camara, icons.caballo, icons.camping],margin:38 },
  { name: 'Podocarpus', image: images.podocarpus, icons: [icons.camara,icons.senderismo, icons.ciclismo, icons.caballo, icons.camping],margin:38 },
  { name: 'Machalilla', image: images.machalilla, icons: [icons.camara, icons.buceo,icons.nadar,icons.canotaje, icons.senderismo, icons.camping, icons.ciclismo],margin:38 },
  { name: 'El cajas', image: images.cajas, icons: [icons.camara, icons.senderismo, icons.camping, icons.pesca],margin:38},
  { name: 'Cayambe Coca', image: images.cayambe, icons:[icons.senderismo, icons.camara, icons.caballo, icons.camping, icons.ciclismo],margin:38 },
  { name: 'Sangay', image: images.sangay, icons:[icons.camara, icons.camping, icons.canotaje, icons.senderismo,icons.ciclismo],margin:38 },
  { name: 'Sumaco', image: images.sumaco, icons:[icons.senderismo,icons.camara, icons.camping, icons.caballo, icons.ciclismo],margin:38},
  { name: 'Yasuni', image: images.yasuni , icons:[icons.camara, icons.senderismo, icons.canotaje],margin:38},
  { name: 'Yacuri', image: images.yacuri, icons:[icons.camara, icons.senderismo, icons.ciclismo, icons.caballo, icons.camping] ,margin:38},
  { name: 'Cotopaxi', image: images.cotopaxi, icons:[icons.ciclismo, icons.senderismo,icons.camara, icons.camping] ,margin:38},
]

export { parks }