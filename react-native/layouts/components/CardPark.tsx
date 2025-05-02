import { View } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const Cards = ({ park, scrollX, index, width, height }) => {
  const containerStylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [0.94, 1, 0.94],
            Extrapolation.CLAMP
          )
        }
      ]

    }
  })

  const styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, -15],
            Extrapolation.CLAMP
          )}deg`
        },
        {
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
      style={[{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        overflow: "hidden",
        borderRadius: 20,
      }, containerStylez]}
      className="rounded-xl overflow-hidden relative"
    >
      <View
        style={{
          width: width,
          height: height,
        }}
      >
        <Animated.Image source={park ? park : null} className="w-full h-full" resizeMode="cover" style={styles} />
      </View>
    </Animated.View>
  )
}

export default Cards