import { Image, View } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const Cards = ({ data, scrollX, index }) => {
  const styles = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: interpolate(
          scrollX.value,
          [index - 1, index, index + 1],
          [1.6, 1, 1.6],
          Extrapolation.CLAMP
        )
      }
      ]

    }
  })

  return (
    <Animated.View
      className="w-[160px] h-[85%] bg-green-900 mr-5 rounded-lg overflow-hidden mt-3 items-center justify-center border-2 border-white"
    >
      <Animated.Image source={data.image} className="w-full h-full" resizeMode="cover" style={styles} />
    </Animated.View>
  )
}

export default Cards
