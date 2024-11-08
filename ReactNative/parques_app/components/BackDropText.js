import { View, Text, Image, TouchableOpacity } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StarIcon } from 'hugeicons-react-native'

import { images } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';


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
        <Animated.View className="w-full h-full absolute" style={[{}, stylez]}>
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
                    <View className="w-full h-[48%] bg-green-400 ">
                        <TouchableOpacity className="w-full h-full" onPress={() => console.log(park.trend[0].name)}>
                            <Image source={park.trend[0].image} resizeMode="cover" className="w-full h-full rounded-xl" />
                        </TouchableOpacity>
                    </View>
                    <View className="w-full h-[48%] ">
                        <TouchableOpacity className="w-full h-full" onPress={() => console.log(park.trend[1].name)}>
                            <Image source={park.trend[1].image} resizeMode="cover" className="w-full h-full rounded-xl" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <View className="w-full h-[35%]  justify-end">
                <View className="w-full h-[90%]  rounded-2xl items-center justify-center">

                    <View className="w-[98%] h-[80%] bg-primary flex-row items-center justify-around  rounded-xl shadow-sm">
                        <View className="w-[20%] h-full items-center justify-center">
                            <Image source={images.avatar} resizeMode="cover" className="w-16 h-16 rounded-full" />
                        </View>
                        <View className="w-[65%] h-full justify-center">
                            <View className="flex-row">
                                <Text className="font-bold">Laura Martinez</Text>
                                <Text className="text-gray-400 ml-3">15 feb 2018</Text>
                            </View>
                            <Text numberOfLines={4}>
                                Visitarlo es como entrar en otro mundo, con la oportunidad de ver especies que no se encuentran en ningún otro lugar. Es perfecto para quienes aman la naturaleza y buscan una experiencia inolvidable.
                            </Text>
                        </View>
                        <View className="w-[10%] h-full flex-row items-center">
                            <StarIcon
                                size={24}
                                color={"black"}
                                variant={"stroke"}
                            />
                            <Text className="mr-2 ml-1">5</Text>
                        </View>

                    </View>

                </View>
            </View>
        </Animated.View>
    )
}

export default BackDropText