import { View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useGlobalContext } from '../../context/GlobalProvider'

const Map = ({ place }) => {
    const { userLocation, setUserLocation } = useGlobalContext()
    const [currentIndex, setCurrentIndex] = useState(null)
    const [origin, setOrigin] = useState({
        latitude: place.latitude,
        longitude: place.longitude,
    })

    const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
    const animation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height:
                animation.value == 1 ? withTiming(dimensions.height, { duration: 500 }) : withTiming(80, { duration: 500 }),
        }
    })


    if (userLocation) console.log(userLocation)
    return (
        <View className="w-full">
            <View className="mt-3 mb-4">
                <Text className="text-xl text-terciary">Ubicacion:</Text>
            </View>
            <View className="w-full h-[38vh] items-center">
                <MapView className="w-[80%] h-full"
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: userLocation ? 5 : 0.4,
                        longitudeDelta: userLocation ? 0.4 : 0.1
                    }}
                >
                    <Polygon
                        coordinates={place.polygon}
                        fillColor={'rgba(100,100,200,0.3)'}
                        strokeWidth={1}
                    />
                    <Marker
                        coordinate={origin}
                        title={place.name}
                    />
                    {
                        userLocation && (
                            <Marker
                                coordinate={userLocation}
                                title={'Tu'}
                            />
                        )
                    }
                    {
                        userLocation && (
                            <Polyline
                                coordinates={[userLocation, origin]}
                                strokColor="yellow"
                                strokeWidth={2}
                            />
                        )

                    }
                </MapView>

            </View>
            <View className="w-full mt-4">
                <Text className="text-xl text-terciary font-bold">Como llegar?</Text>
            </View>
            <View className="w-full h-[48vh]  mt-2 bg-green-400 ">
                {
                    place.path.map((place, index) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setCurrentIndex(index === currentIndex ? null : index)
                                animation.value = 1
                            }}
                                key={index}
                                className="grow"
                                activeOpacity={0.9}
                            >
                                <View className="bg-red-400 grow justify-center items-center" >
                                    <Text>{place.name}</Text>
                                    {
                                        currentIndex === index && (
                                            <View>
                                                <Text>{place.order}</Text>
                                            </View>

                                        )
                                    }
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>

        </View>
    )
}

export default Map