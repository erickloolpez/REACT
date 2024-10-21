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
      className="w-24 h-[80%] bg-green-900 mr-5 rounded-lg overflow-hidden mt-3 items-center justify-center border-2 border-white"
      animation={activeItem === data.name ? zoomIn : zoomOut}
      duration={500}
    >
      <Image source={data.image} className="w-[90%] h-[90%]" resizeMode="cover" />
    </Animatable.View>
  )
}

export default Cards