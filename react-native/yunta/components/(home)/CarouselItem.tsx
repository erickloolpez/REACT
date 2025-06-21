import { PlusIcon } from "lucide-react-native"
import { Image, View } from "react-native"
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated"

export default function CarouselItem({ imageUri, index, scrollX, _itemSize }: { imageUri: string, index: number, scrollX: SharedValue<number>, _itemSize: number }) {
  const stylez = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      borderColor: interpolateColor(scrollX.value, [index - 1, index, index + 1], ['transparent', 'white', 'transparent']),
      transform: [{
        translateY: interpolate(scrollX.value, [index - 1, index, index + 1], [_itemSize / 3, 0, _itemSize / 3])
      }]
    }
  })
  return (
    <Animated.View style={[
      {
        width: _itemSize,
        height: _itemSize,
        borderRadius: _itemSize / 2,
      },
      stylez]}>
      {
        imageUri === 'ADD_BUTTON' ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: _itemSize / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "#1e609e",
            }}
          >
            <PlusIcon size={32} color="#fff" />
          </View>
        ) :
          (
            <Image
              source={imageUri}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: _itemSize / 2
              }} />
          )
      }
    </Animated.View >
  )
}
