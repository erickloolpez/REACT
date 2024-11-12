import { View, Text, Image, TouchableOpacity } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { router } from 'expo-router';

import { images } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';
import Review from './Comment';


const BackDropText = ({ index, scrollX, park }) => {
    const { userLocation } = useGlobalContext();
    const stylez = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollX.value,
                [index - 1, index, index + 1],
                [0, 1, 0]
            ),
            zIndex: interpolate(
                scrollX.value,
                [index - 1, index, index + 1],
                [0, 10, 0] // El valor central (10) es el más alto cuando el índice coincide
            ),
        }
    })

    return (
        <Animated.View className="w-full h-full absolute" style={stylez}>
            <View className="w-full h-[65%]  flex-row">
                <View className="w-[60%] h-full ">
                    <View className="w-[98%] h-full rounded-2xl overflow-hidden relative"  >
                        <MapView
                            className="w-full h-full"
                            initialRegion={{
                                latitude: park.location.latitude,
                                longitude: park.location.longitude,
                                latitudeDelta: userLocation ? 5 : 0.4,
                                longitudeDelta: userLocation ? 0.7 : 0.1,
                            }}
                        >
                            <Marker coordinate={park.location} title={park.name} />
                            {userLocation && <Marker coordinate={userLocation} title={'Tú'} />}
                            {userLocation && (
                                <Polyline coordinates={[userLocation, park.location]} strokeColor="#cf613c" strokeWidth={2} />
                            )}
                        </MapView>
                        <View className=" h-8  rounded-lg absolute top-4 left-2 bg-secondary items-center justify-center p-2" >
                            <Text className="text-white font-bold">Ubicacion</Text>
                        </View>
                    </View>
                </View>

                <View className="w-[40%] h-full justify-between">
                    <View className="w-full h-[48%]">
                        <TouchableOpacity className="w-full h-full relative" onPress={() => {
                            console.log(park.trend[0].name)
                            router.push({
                                pathname: `/attractive/${park.trend[0].desc}`,
                                params: { modalPark: false, trend: JSON.stringify(park.trend[0]), park: JSON.stringify(park) }
                            })
                        }}>
                            <Image source={park.trend[0].image} resizeMode="cover" className="w-full h-full rounded-xl" />
                            <View className="  rounded-lg absolute bottom-4 left-2 bg-secondary items-center justify-center p-2" >
                                <Text className="text-white font-bold">{park.trend[0].name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="w-full h-[48%] ">
                        <TouchableOpacity className="w-full h-full relative" onPress={() => {
                            console.log(park.trend[1].name)
                            router.push({
                                pathname: `/attractive/${park.trend[1].desc}`,
                                params: { modalPark: false, trend: JSON.stringify(park.trend[1]), park: JSON.stringify(park) }
                            })
                        }}>
                            <Image source={park.trend[1].image} resizeMode="cover" className="w-full h-full rounded-xl" />
                            <View className=" rounded-lg absolute bottom-4 left-2 bg-secondary items-center justify-center p-2" >
                                <Text className="text-white font-bold">{park.trend[1].name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <View className="w-full h-[35%]  justify-end">
                <View className="w-full h-[90%]  rounded-2xl items-center justify-center">
                    <Review width={'95%'} />
                </View>
            </View>
        </Animated.View>
    )
}

export default BackDropText