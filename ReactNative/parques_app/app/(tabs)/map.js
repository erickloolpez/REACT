import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, Polyline, Polygon, Callout } from 'react-native-maps';
import { router } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider';
import { parks } from '../../constants/dummy';
import { ArrowRight01Icon } from 'hugeicons-react-native';

const Map = () => {
    const { userLocation } = useGlobalContext();
    const [origin] = useState({
        latitude: '-0.209028110783209',
        longitude: '-78.49107901848447'
    });
    return (
        <SafeAreaView className="h-full" edges={['top']}>
            <View className="flex-1 ">
                <MapView
                    className="w-full h-full"
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: userLocation ? 5 : 0.4,
                        longitudeDelta: userLocation ? 0.4 : 0.1,
                    }}
                >
                    {parks.map((park, index) => (
                        <React.Fragment key={index}>
                            <Polygon coordinates={park.polygon} fillColor={'rgba(100,100,200,0.3)'} strokeWidth={1} />
                            <Marker coordinate={park.location} title={park.name} >
                                <Callout>
                                    <View className="w-36 h-36 items-center justify-around ">
                                        <View>
                                            <Text>{park.name}</Text>
                                        </View>
                                        <View className="w-full h-1/2">
                                            <Image source={park.image} resizMode="contain" className="w-full h-full" />
                                        </View>
                                        <TouchableOpacity
                                            className=" w-24 h-8 bg-green-800 rounded-full flex-row items-center justify-around "
                                            onPress={()=> router.push(`/modals/${park.name}`)}
                                        >
                                            <Text className="text-white">Ver mas</Text>
                                            <ArrowRight01Icon
                                                size={32}
                                                color={"#ffffff"}
                                                variant={"stroke"}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </Callout>
                            </Marker>
                        </React.Fragment>
                    ))}
                    {userLocation && <Marker coordinate={userLocation} title={'Tú'} />}
                </MapView>


            </View>


        </SafeAreaView>
    )
}

export default Map