import { Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const Cards = ({ activeItem, data }) => {
  return (
    <Animatable.View
      className="w-24 h-[85%] bg-green-400 mr-5 rounded-lg overflow-hidden"
      animation={activeItem === data.name ? zoomIn : zoomOut}
      duration={500}
    >
      <Image source={data.image} className="w-full h-full" resizeMode="cover" />
    </Animatable.View>
  )
}

export default Cards