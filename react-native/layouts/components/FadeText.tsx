import { useState } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

export default function FadeText({ index, scrollX }) {
  const [text, setText] = useState(`hola mundo ${index} uwu.`)
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
      ...(Platform.OS === 'android' && {
        zIndex: Math.round(
          interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [10, 20, 10]
          )
        ),
      }),
    }
  })

  return (
    <Animated.View className="w-full h-full items-center justify-center absolute" style={stylez}>
      <Text >
        {text}
        <Text
          className="text-blue-200 font-semibold"
        >
          ...Mostrar mas
        </Text>
      </Text>
      <View className="w-1/2 h-1/2">
        {
          index % 2 == 0 ? (
            <Image source={require('../assets/images/face-one.png')} className="w-44 h-44" resizeMode='cover' />
          ) : (
            <Image source={require('../assets/images/face-two.png')} className="w-44 h-44" resizeMode='contain' />
          )
        }
      </View>
    </Animated.View >
  )
}
