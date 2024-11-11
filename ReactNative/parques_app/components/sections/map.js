import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { Video, ResizeMode } from 'expo-av'

import { useGlobalContext } from '../../context/GlobalProvider';
import { images } from '../../constants';
const Map = ({ place }) => {
    const { userLocation } = useGlobalContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [origin] = useState(place.location);

    const [text, setText] = useState(place.path[0].order.slice(0, 100))


    return (
        <View className="w-full mb-4">
            <View className="mt-3 mb-4">
                <Text className="text-xl text-terciary">Ubicación:</Text>
            </View>
            <View className="w-full h-[54vh] items-center border-y-2 border-y-black-200 relative ">
                <MapView
                    className="w-full h-full"
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: userLocation ? 5 : 0.4,
                        longitudeDelta: userLocation ? 0.7 : 0.1,
                    }}
                >
                    <Polygon coordinates={place.polygon} fillColor={'rgba(100,100,200,0.3)'} strokeWidth={1} />
                    <Marker coordinate={origin} title={place.name} />
                    {userLocation && <Marker coordinate={userLocation} title={'Tú'} />}
                    {userLocation && (
                        <Polyline coordinates={[userLocation, origin]} strokeColor="yellow" strokeWidth={2} />
                    )}
                </MapView>
                <View className="w-[40%] h-full absolute left-0">
                    <View
                        className="grow"
                        activeOpacity={0.9}
                    >
                        <View
                            className="grow justify-center items-center"
                            style={{ backgroundColor: place.path[0].color.background }}
                        >
                            <Text className="text-3xl uppercase font-bold" style={{ color: place.path[0].color.heading }}>Como llegar?</Text>
                            <View className="mt-2 px-2 ">
                                <Text style={{ color: place.path[0].color.heading }}>{text}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Map;
