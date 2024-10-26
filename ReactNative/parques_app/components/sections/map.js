import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useGlobalContext } from '../../context/GlobalProvider';
const Map = ({ place }) => {
    const { userLocation } = useGlobalContext();
    const [currentIndex, setCurrentIndex] = useState(null);
    const [origin] = useState({
        latitude: place.latitude,
        longitude: place.longitude,
    });


    return (
        <View className="w-full">
            <View className="mt-3 mb-4">
                <Text className="text-xl text-terciary">Ubicación:</Text>
            </View>
            <View className="w-full h-[38vh] items-center ">
                <MapView
                    className="w-full h-full"
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: userLocation ? 5 : 0.4,
                        longitudeDelta: userLocation ? 0.4 : 0.1,
                    }}
                >
                    <Polygon coordinates={place.polygon} fillColor={'rgba(100,100,200,0.3)'} strokeWidth={1} />
                    <Marker coordinate={origin} title={place.name} />
                    {userLocation && <Marker coordinate={userLocation} title={'Tú'} />}
                    {userLocation && (
                        <Polyline coordinates={[userLocation, origin]} strokeColor="yellow" strokeWidth={2} />
                    )}
                </MapView>
            </View>
            <View className="w-full mt-4">
                <Text className="text-xl text-terciary font-bold">¿Cómo llegar?</Text>
            </View>
            <View className="w-full h-[48vh] mt-2 bg-green-400">
                {place.path.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setCurrentIndex(index === currentIndex ? null : index);
                            }}
                            className="grow"
                            activeOpacity={0.9}
                        >
                            <View
                             className="grow justify-center items-center"
                             style={{backgroundColor: item.color.background}}
                            >
                                <Text className="text-3xl uppercase font-bold" style={{color: item.color.heading}}>{item.name}</Text>
                                {currentIndex === index && (
                                    <View className="mt-2">
                                        <Text style={{color: item.color.heading}}>{item.order}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default Map;
