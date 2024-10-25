import { Text, TouchableOpacity, View } from 'react-native'
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
      className="w-[360px] h-full bg-green-900 rounded-tl-full rounded-tr-full overflow-hidden items-center justify-center border-2 border-secondary relative"
    >
      <View className="w-full h-28 absolute top-48 z-10 items-center justify-around">
        <Text className="text-xl font-bold text-white">{data.trend.name}</Text>
        <TouchableOpacity className="w-28 h-12 bg-secondary rounded-full items-center justify-center">
          <Text className="text-white">Ver mas</Text>
        </TouchableOpacity>
      </View>
      <Animated.Image source={data.image} className="w-full h-full" resizeMode="cover" style={styles} />
    </Animated.View>
  )
}

export default Cards
