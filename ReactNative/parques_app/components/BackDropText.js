import { View, Text, Image, TouchableOpacity, Platform, FlatList } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useState } from 'react'

import { useGlobalContext } from '../context/GlobalProvider';
import { router } from 'expo-router';


const BackDropText = ({ index, scrollX, park }) => {
    const { userLocation } = useGlobalContext();
    const [text, setText] = useState(park.desc.slice(0, 207))
    const [readMore, setReadMore] = useState(false)
    const stylez = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollX.value,
                [index - 1, index, index + 1],
                [0, 1, 0]
            ),
            // zIndex: interpolate(
            //     scrollX.value,
            //     [index - 1, index, index + 1],
            //     [10, 20, 10] // El valor central (10) es el más alto cuando el índice coincide
            // ),
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
        <Animated.View className="w-full h-full items-center justify-around absolute" style={stylez}>
            <View className="px-2 ">
                <Text className="text-primary">
                    {text}
                    <Text
                        className="text-[#CF613C] font-semibold"
                        onPress={() => {
                            router.push(`/modals/${park.name}`)
                        }}
                    >
                        ...Mostrar mas
                    </Text>
                </Text>
            </View>
        </Animated.View >
    )
}

export default BackDropText