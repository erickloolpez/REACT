import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { Video, ResizeMode } from 'expo-av'

import { useGlobalContext } from '../../../context/GlobalProvider';
import { images } from '../../../constants';
const Map = ({ place }) => {
    const { userLocation } = useGlobalContext();
    const [origin] = useState(place.location);



    return (
        <View className="w-full mb-4">
            <View className="mt-3 mb-4">
                <Text className="text-xl font-bold text-primary">Ubicación:</Text>
            </View>
            {
                place.path.map((option) => {
                    let _height
                    if (option.order.length > 200) {
                        _height = option.order.length - 110
                    } else {
                        _height = 100
                    }
                    return (
                        <View key={`route-${option.name}`} className="w-full  flex-row" style={{ height: _height }}>
                            <View className="w-[25%] h-full items-center justify-center  relative border-r-2">
                                <Text className="text-lg text-primary font-semibold">{option.name}</Text>
                                <View className="w-4 h-4 rounded-full absolute bg-terciary top-0 right-[-8px] z-10" />
                            </View>
                            <View className="w-[75%] h-full  p-2 items-center justify-center">
                                <Text className="text-primary">{option.order}</Text>
                            </View>
                        </View>

                    )
                })

            }
            <View className="w-full h-[35vh] items-center  relative  mt-8 ">
                <View className="w-72 h-72 rounded-full overflow-hidden">
                    <MapView
                        className="w-full h-full"
                        initialRegion={{
                            latitude: origin.latitude,
                            longitude: origin.longitude,
                            latitudeDelta: 20.0,
                            longitudeDelta: 15.0,
                        }}
                    >
                        {/* <Polygon coordinates={place.polygon} fillColor={'rgba(100,100,200,0.3)'} strokeWidth={1} /> */}
                        <Marker coordinate={origin} title={place.name} />
                        {/* {userLocation && <Marker coordinate={userLocation} title={'Tú'} />} */}
                        {/* {userLocation && (
                        <Polyline coordinates={[userLocation, origin]} strokeColor="yellow" strokeWidth={2} />
                    )} */}
                    </MapView>

                </View>
            </View>
        </View>
    );
};

export default Map;
