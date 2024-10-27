import { Text, TouchableOpacity, View } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { MapsGlobal01Icon, MapingIcon, CelsiusIcon } from 'hugeicons-react-native'
import { CampingTent } from '@vectopus/atlas-icons-react-native'

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
      className="w-[380px] h-full mr-3 bg-green-900 rounded-xl overflow-hidden  relative"
    >
      <View className="w-full h-14  z-10 absolute top-0 flex-row items-center justify-end">
        <View className="bg-terciary rounded-full mr-4 ">
          <MapsGlobal01Icon
            size={34}
            color={"#ffffff"}
            variant={"stroke"}
          />
        </View>
      </View>
      <View className="w-full h-14  z-10 absolute bottom-0 flex-row items-center justify-between">
        <View className="ml-4 flex-row items-center">
          <MapingIcon
            size={34}
            color={"#ffffff"}
            variant={"stroke"}
          />
          <View>
            <Text className="text-3xl text-white"> 2400 m2</Text>
          </View>
        </View>
        <View className="flex-row mr-4 bg-terciary rounded-xl p-2">
          <CampingTent
            size={34}
            color={"white"}
          />
        </View>
      </View>
      <View className="absolute bottom-14 z-10">
        <View className="ml-4 flex-row">
          <Text className="text-white text-3xl">24</Text>
          <CelsiusIcon
            size={34}
            color={"#ffffff"}
            variant={"stroke"}
          />
        </View>
      </View>
      <Animated.Image source={data.image} className="w-full h-full" resizeMode="cover" style={styles} />
    </Animated.View>
  )
}

export default Cards
