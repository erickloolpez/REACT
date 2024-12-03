import { View, Text, Image, TouchableOpacity, Platform, FlatList } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { router } from 'expo-router';

import { images } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';
import Review from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';


const BackDropText = ({ index, scrollX, park }) => {
    const { userLocation } = useGlobalContext();
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
            <View className="w-full h-[40%] px-2 ">
                <Text className="text-primary">{park.desc.slice(0, 300)}</Text>
            </View>
            <View className="w-full h-[40%] flex-row justify-around ">
                <FlatList
                    data={park.icons}
                    keyExtractor={(activity) => activity.name}
                    renderItem={({ item: activity, index }) => (
                        <View className="w-20 h-16 items-center justify-around rounded-md" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            <View className="w-8 h-8">
                                <Image source={activity.image} resizeMode="cover" className="w-full h-full" />
                            </View>
                            <Text className="text-white">{activity.name}</Text>
                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={"fast"}
                    contentContainerStyle={{
                        gap: 10,
                        paddingHorizontal: 10,
                        alignItems: "center",
                    }}
                    scrollEventThrottle={16}
                />
            </View>
        </Animated.View>
    )
}

export default BackDropText