import { Text, TouchableOpacity, View, Image } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { router } from 'expo-router'

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
    <TouchableOpacity
      onPress={() => {
        router.push(`/modals/${park.name}`)
      }}
      className="mb-5"
    >
      <Animated.View
        style={[{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 20
        }, containerStylez]}
        className="rounded-xl overflow-hidden relative"
      >
        <View
          style={{
            width: width,
            height: height,
          }}
        >
          <View className={`w-36 h-16 absolute ${index % 2 !== 0 ? 'top-0' : 'bottom-0'} z-10`}>
            <Image source={park.logo} resizeMode="contain" className="w-full h-full" />
          </View>

          <Animated.Image source={park?.image ? park.image : null} className="w-full h-full" resizeMode="cover" style={styles} />
        </View>

      </Animated.View>

    </TouchableOpacity>
  )
}

export default Cards
